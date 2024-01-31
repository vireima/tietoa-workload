import datetime

from loguru import logger
from pydantic import BaseModel, BeforeValidator, Field
from typing_extensions import Annotated


def validate_tags(tags: list[str]):
    return [] if tags is None else [tag for tag in tags if tag != "L"]


Tags = Annotated[
    list[str],
    BeforeValidator(validate_tags),
]


class LoadInputModel(BaseModel):
    user: str
    workload: float = Field(ge=0.0, le=1.0)
    mentalload: float = Field(ge=0.0, le=1.0)
    comment: str | None = None


class LoadPatchInputModel(BaseModel):
    workload: float | None = None
    mentalload: float | None = None
    comment: str | None = None


class LoadOutputModel(LoadInputModel):
    datetime: datetime.datetime
    # _id: str


class UserOutputModel(BaseModel):
    username: str
    user: str
    tags: Tags
    active: bool


class LoadQueryInputModel(BaseModel):
    after: datetime.datetime | datetime.date | None = None
    before: datetime.datetime | datetime.date | None = None


class LoadQueryInputModelWithLists(LoadQueryInputModel):
    users: list[str] | None = None
    tags: list[str] | None = None
