import httpx
from config import settings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
from pydantic import BaseModel, Field

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "https://tietoa-fron.up.railway.app",
    "http://tietoa-fron.up.railway.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.debug("> Aloitus.")


class Load(BaseModel):
    user: str
    workload: float = Field(ge=0.0, le=1.0)
    mentalload: float = Field(ge=0.0, le=1.0)
    comment: str | None = None


class AddComment(BaseModel):
    id: str
    comment: str


@app.get("/")
def root():
    logger.debug("> root().")
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
def loads():
    return [
        {
            "workload": 0.4,
            "mentalload": 0.2,
            "user": "reima",
            "comment": "vähä kyrsii",
            "timestamp": "2024-01-20T12:30+02:00",
        },
        {
            "workload": 0.45,
            "mentalload": 0.3,
            "user": "reima",
            "comment": "",
            "timestamp": "2024-01-23T14:30+02:00",
        },
        {
            "workload": 0.35,
            "mentalload": 0.1,
            "user": "kirsi",
            "comment": "",
            "timestamp": "2024-01-19T7:30+02:00",
        },
        {
            "workload": 0.25,
            "mentalload": 0.91,
            "user": "leila",
            "comment": "ääääähh",
            "timestamp": "2024-01-22T11:30+02:00",
        },
    ]


@app.post("/loads")
def input_load(load: Load):
    logger.debug(f"POST: {load.user} {load.workload} {load.mentalload}")
    return {"id": "EFG523y"}


@app.patch("/loads")
def input_load(comment: AddComment):
    logger.debug(f"PATCH: {comment.id} {comment.comment}")
    return ""


@app.get("/users")
def users():
    return [
        {
            "user": "reima",
            "slackname": "Ville",
            "slackuser": "xxx",
            "tags": ["TIE", "luottari"],
        },
        {"user": "kirsi", "slackname": "Kirrsi", "slackuser": "xyy"},
        {"user": "leila", "slackname": "Leila86", "slackuser": "xxy"},
    ]


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
