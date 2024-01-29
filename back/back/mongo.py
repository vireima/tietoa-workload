import datetime

import arrow
import models
from bson import ObjectId
from config import settings
from loguru import logger
from motor.motor_asyncio import (
    AsyncIOMotorClient,
    AsyncIOMotorCollection,
    AsyncIOMotorCursor,
    AsyncIOMotorDatabase,
)

client = AsyncIOMotorClient(str(settings.mongo_url))

workload_db = client[settings.mongo_db]
workload_collection = workload_db[settings.mongo_collection]


async def insert_load(item: models.LoadInputModel) -> str:
    item_dict = item.model_dump()
    item_dict.update({"datetime": arrow.utcnow().datetime})
    logger.debug(item_dict)
    result = await workload_collection.insert_one(item_dict)

    logger.debug(f"Insert result: {result.inserted_id}")
    logger.debug(f"Type of _id: {type(result.inserted_id)}")
    return str(result.inserted_id)


async def update_comment(
    id: str,
    comment: str | None = None,
    workload: float | None = None,
    mentalload: float | None = None,
) -> int:
    updates = {}

    if comment is not None:
        updates.update({"comment": comment})

    if workload is not None:
        updates.update({"workload": workload})

    if mentalload is not None:
        updates.update({"mentalload": mentalload})

    result = await workload_collection.update_one(
        {"_id": ObjectId(id)}, {"$set": updates}
    )

    return result.matched_count


async def get_loads(
    after: datetime.datetime | None = None,
    before: datetime.datetime | None = None,
    users: list[str] | None = None,
) -> list[models.LoadOutputModel]:
    query = {}

    if after is not None or before is not None:
        datetime_query = {}

        if after is not None:
            datetime_query.update({"$gte": after})

        if before is not None:
            datetime_query.update({"$lte": before})

        query.update({"datetime": datetime_query})

    if users:
        query.update({"user": {"$in": users}})

    logger.warning(query)
    cursor = workload_collection.find(query)

    items = await cursor.to_list(None)

    return [models.LoadOutputModel(**item) for item in items]
