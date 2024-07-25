import os
import beanie
import motor.motor_asyncio
from model.vaga import Vaga

uri: str = os.environ["URI"]


async def init_db():
    client = motor.motor_asyncio.AsyncIOMotorClient(uri)
    await beanie.init_beanie(database=client.vagas, document_models=[Vaga])
