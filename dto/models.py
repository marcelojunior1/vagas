from typing import Optional, Any
from pydantic import BaseModel


class ReqNovaVaga(BaseModel):
    id: str
    tokens: list[str]
    isApplied: bool = False
    isEnabled: bool = False
