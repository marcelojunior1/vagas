from datetime import datetime

from beanie import Document
from pydantic import Field
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated

PyObjectId = Annotated[str, BeforeValidator(str)]


class Vaga(Document):
    id: PyObjectId = Field(alias="_id", default=None)
    tokens: list[str] = []
    isApplied: bool = False
    timestamp: datetime = datetime.now()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
