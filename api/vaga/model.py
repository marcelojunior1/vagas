from datetime import datetime

from beanie import Document
from pydantic import Field
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated

PyObjectId = Annotated[str, BeforeValidator(str)]


class Vaga(Document):
    id: PyObjectId = Field(alias="_id", default=None)
    isApplied: bool = False
    isEnabled: bool = False
    isUpdated: bool = False
    txtVaga: str
    timestamp: datetime = datetime.now()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
