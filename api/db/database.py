import os
import beanie
import motor.motor_asyncio
from vaga.model import Vaga

from palavrasbloqueadas.model import Palavrabloqueada

uri: str = os.environ["URI"]


async def init_db():
    client = motor.motor_asyncio.AsyncIOMotorClient(uri)
    await beanie.init_beanie(database=client.vagas, document_models=[Vaga])
    await beanie.init_beanie(database=client.vagas, document_models=[Palavrabloqueada])
