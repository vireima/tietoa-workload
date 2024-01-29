import datetime

import httpx
import loads
import models
import mongo
from config import settings
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
from pydantic import BaseModel, Field

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


class AddComment(BaseModel):
    id: str
    comment: str


async def get_grist_users():
    headers = {"Authorization": f"Bearer {settings.grist_api_key}"}

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{settings.grist_api_url}/{settings.grist_api_userdoc}/tables/{settings.grist_api_usertable}/records",
            headers=headers,
        )

        return [x["fields"] for x in response.json()["records"]]


@app.get("/")
def root():
    return [
        {
            "message": "Hello!",
            "arvo1": 12,
            "arvo2": -3.6,
            "kommentti": "testikommentti",
        },
        {
            "message": "Hello again!",
            "arvo1": 13,
            "arvo2": 0.62,
            "kommentti": "ei kommenttia",
        },
    ]


@app.get("/loads")
async def get_loads(query: models.LoadQueryInputModel = Depends()):
    return (await loads.loads(query)).to_dict(orient="records")

    # return [
    #     {
    #         "workload": 0.4,
    #         "mentalload": 0.2,
    #         "user": "reima",
    #         "comment": "vähä kyrsii",
    #         "timestamp": "2024-01-20T12:30+02:00",
    #     },
    #     {
    #         "workload": 0.45,
    #         "mentalload": 0.3,
    #         "user": "reima",
    #         "comment": "",
    #         "timestamp": "2024-01-23T14:30+02:00",
    #     },
    #     {
    #         "workload": 0.35,
    #         "mentalload": 0.1,
    #         "user": "kirsi",
    #         "comment": "",
    #         "timestamp": "2024-01-19T7:30+02:00",
    #     },
    #     {
    #         "workload": 0.25,
    #         "mentalload": 0.91,
    #         "user": "leila",
    #         "comment": "ääääähh",
    #         "timestamp": "2024-01-22T11:30+02:00",
    #     },
    # ]


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
async def users():
    return await get_grist_users()


@app.get("/user/{user}")
async def users(user: str):
    users = await get_grist_users()

    for user_data in users:
        if user_data["user"] == user:
            return user_data

    raise HTTPException(status_code=404, detail="User not found")

    # return [
    #     {
    #         "user": "reima",
    #         "slackname": "Ville",
    #         "slackuser": "xxx",
    #         "tags": ["TIE", "luottari"],
    #     },
    #     {"user": "kirsi", "slackname": "Kirrsi", "slackuser": "xyy"},
    #     {"user": "leila", "slackname": "Leila86", "slackuser": "xxy"},
    # ]


@app.get("/test")
async def test():
    # https://<docs|TEAM>.getgrist.com/api/docs/
    headers = {"Authorization": f"Bearer {settings.grist_api_key}"}

    logger.debug(headers)

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{settings.grist_api_url}/{settings.grist_api_userdoc}/tables/{settings.grist_api_usertable}/records",
            headers=headers,
        )

        logger.debug(response)
        return [x["fields"] for x in response.json()["records"]]


@app.get("/test2")
async def test3():
    item = models.LoadInputModel(user="A", workload=0.4, mentalload=0.3)
    return await mongo.insert_load(item)


@app.get("/test2/{id}")
async def test3(id: str):
    return await mongo.update_comment(id, "Uusi kommentti")


@app.get("/fetch/{after}")
async def test3(after: datetime.datetime):
    return await loads.loads(after)
