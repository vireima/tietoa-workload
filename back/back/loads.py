import datetime

import arrow
import httpx

# import mongo
import pandas as pd
from loguru import logger

from back import models, mongo
from back.config import settings


async def fetch_users() -> list[models.UserOutputModel]:
    headers = {"Authorization": f"Bearer {settings.grist_api_key}"}

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{settings.grist_api_url}/{settings.grist_api_userdoc}/tables/{settings.grist_api_usertable}/records",
            headers=headers,
        )

        lst = [x["fields"] for x in response.json()["records"]]

        return [models.UserOutputModel(**x) for x in lst]


async def loads(query: models.LoadQueryInputModelWithLists):
    loads = await mongo.get_loads(**query.model_dump(exclude={"tags"}))
    users = await fetch_users()

    loads_df = pd.DataFrame(
        {
            "user": pd.Series(dtype="str"),
            "workload": pd.Series(dtype="float"),
            "mentalload": pd.Series(dtype="float"),
            "comment": pd.Series(dtype="str"),
            "datetime": pd.Series(dtype="datetime64[ns]"),
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
    merged.datetime = pd.to_datetime(merged.datetime)
    merged = merged.sort_values(by="datetime")

    if query.tags is None:
        return merged

    tag_mask = merged.tags.map(set(query.tags).issubset)

    return merged[tag_mask]


def calculate_means(df: pd.DataFrame):
    means = df[["mentalload", "workload"]].mean().mean()
    count = df[["mentalload"]].count().mean()

    return {
        "mean_mentalload": means["mentalload"],
        "mean_workload": means["workload"],
        "mean_count": count["mentalload"],
    }


def calculate_stats(loads: pd.DataFrame):
    # count = loads.shape[0]
    # mean_mental = loads.mentalload.mean()
    # mean_work = loads.workload.mean()

    df = loads
    # df["date"] = df.datetime.dt.normalize()
    iso = df.datetime.dt.isocalendar()
    df["week"] = iso["year"].astype(str) + iso["week"].astype(str).str.pad(
        2, fillchar="0"
    )
    # groups = df.groupby(["week", "user"])

    # weekly_means = groups[["mentalload", "workload"]].mean().mean()
    # weekly_mean_mentalload = weekly_means["mentalload"]
    # weekly_mean_workload = weekly_means["workload"]
    # weekly_mean_count = groups[["mentalload"]].count().mean()["mentalload"]

    return {
        "weekly": calculate_means(df.groupby(["week", "user"])),
        "latest": calculate_means(
            df[df.datetime > arrow.utcnow().shift(days=-7).datetime].groupby(["user"])
        ),
    }
