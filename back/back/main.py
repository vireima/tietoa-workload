from fastapi import FastAPI
from loguru import logger

app = FastAPI()

logger.debug("> Aloitus.")


@app.get("/")
def root():
    logger.debug("> root().")
    return {"message": "Hello!"}
