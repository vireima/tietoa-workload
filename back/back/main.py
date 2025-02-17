import datetime
from typing import Annotated, List

import httpx
from fastapi import Depends, FastAPI, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
from pydantic import BaseModel, Field

from back import loads, models, mongo
from back.config import settings

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "https://tietoa-front.up.railway.app",
    "http://tietoa-front.up.railway.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/loads")
async def get_loads(
    tags: Annotated[List[str] | None, Query()] = None,
    users: Annotated[List[str] | None, Query()] = None,
    after: datetime.datetime | None = None,
    before: datetime.datetime | None = None,
):
    query_with_lists = models.LoadQueryInputModelWithLists(
        tags=tags, users=users, after=after, before=before
    )

    data = await loads.loads(query_with_lists)
    stats = loads.calculate_stats(data)

    return {"data": data.to_dict(orient="records"), "summary": stats}


@app.post("/loads")
async def input_load(load: models.LoadInputModel):
    logger.debug(f"POST: {load.user} {load.workload} {load.mentalload}")
    return await mongo.insert_load(load)


@app.patch("/loads/{load_id}")
async def input_load(load_id: str, load: models.LoadPatchInputModel):
    logger.debug(f"PATCH: {load_id} {load.comment}")
    logger.debug(load)
    if await mongo.update_comment(load_id, load.comment) > 0:
        return load_id

    logger.warning("ei löytyny!")
    raise HTTPException(status_code=404, detail="Load not found")


@app.get("/users")
async def users() -> list[models.UserOutputModel]:
    return await loads.fetch_users()


@app.get("/user/{user}")
async def users(user: str) -> models.UserOutputModel:
    users = await loads.fetch_users()

    for user_data in users:
        if user_data.user == user:
            return user_data

    raise HTTPException(status_code=404, detail="User not found")
