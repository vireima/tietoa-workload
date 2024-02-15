import datetime

import arrow
import pytz
from loguru import logger
from pydantic import AnyHttpUrl, BaseModel, BeforeValidator, Field
from typing_extensions import Annotated

TZ_UTC = pytz.timezone("UTC")
TZ_LOCAL = pytz.timezone("Europe/Helsinki")


def validate_tags(tags: list[str]):
    return [] if tags is None else [tag for tag in tags if tag != "L"]


def validate_utc_datetime(dt: datetime.datetime | str):
    if isinstance(dt, str):
        dt = arrow.get(dt).datetime
    return TZ_UTC.localize(dt) if dt.tzinfo is None else dt


def validate_local_datetime(dt: datetime.datetime | str):
    if isinstance(dt, str):
        dt = arrow.get(dt).datetime
    return TZ_LOCAL.localize(dt) if dt.tzinfo is None else dt


Tags = Annotated[
    list[str],
    BeforeValidator(validate_tags),
]

DatetimeUTC = Annotated[datetime.datetime, BeforeValidator(validate_utc_datetime)]

DatetimeLocal = Annotated[datetime.datetime, BeforeValidator(validate_local_datetime)]


class LoadBaseModel(BaseModel):
    workload: float = Field(ge=0.0, le=1.0)
    mentalload: float = Field(ge=0.0, le=1.0)


class StatisticsOutputModel(LoadBaseModel):
    count: float


class LoadInputModel(LoadBaseModel):
    user: str
    comment: str | None = None


class LoadPatchInputModel(BaseModel):
    workload: float | None = None
    mentalload: float | None = None
    comment: str | None = None


class LoadOutputModel(LoadInputModel):
    datetime: DatetimeUTC
    # _id: str


class SlackProfileModel(BaseModel):
    real_name: str
    status_text: str
    status_emoji: str
    image_512: AnyHttpUrl


class SlackUserModel(BaseModel):
    deleted: bool
    name: str
    updated: int
    profile: SlackProfileModel


class UserOutputModel(BaseModel):
    username: str
    user: str
    tags: Tags
    active: bool
    notifications: bool
    slack: SlackUserModel


class LoadQueryInputModel(BaseModel):
    after: DatetimeLocal | None = None
    before: DatetimeLocal | None = None


class LoadQueryInputModelWithLists(LoadQueryInputModel):
    users: list[str] | None = None
    tags: list[str] | None = None
