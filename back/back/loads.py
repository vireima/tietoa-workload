import datetime

import httpx
import models
import mongo
import pandas as pd
from config import settings
from loguru import logger


async def fetch_users() -> list[models.UserOutputModel]:
    headers = {"Authorization": f"Bearer {settings.grist_api_key}"}

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{settings.grist_api_url}/{settings.grist_api_userdoc}/tables/{settings.grist_api_usertable}/records",
            headers=headers,
        )

        lst = [x["fields"] for x in response.json()["records"]]

        return [models.UserOutputModel(**x) for x in lst]


async def loads(query: models.LoadQueryInputModel):
    loads = await mongo.get_loads(**query.model_dump(exclude={"tags"}))
    users = await fetch_users()

    loads_df = pd.DataFrame(
        {
            "user": pd.Series(dtype="str"),
            "workload": pd.Series(dtype="float"),
            "mentalload": pd.Series(dtype="float"),
            "comment": pd.Series(dtype="str"),
        }
    )
    loads_df = pd.concat((loads_df, pd.DataFrame(load.model_dump() for load in loads)))

    users_df = pd.DataFrame(
        {
            "username": pd.Series(dtype="str"),
            "user": pd.Series(dtype="str"),
            "tags": pd.Series(dtype="object"),
            "active": pd.Series(dtype="bool"),
        }
    )
    users_df = pd.concat(
        (users_df, pd.DataFrame((user.model_dump() for user in users)))
    )

    merged = loads_df.merge(users_df, how="left", on="user")

    if query.tags is None:
        return merged

    tag_mask = merged.tags.map(set(query.tags).issubset)

    return merged[tag_mask]


def calculate_stats(loads: pd.DataFrame):
    count = loads.shape[0]
    mean_mental = loads.mentalload.mean()
    mean_work = loads.workload.mean()
    pass
