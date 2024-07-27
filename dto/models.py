from typing import Optional, Any
from pydantic import BaseModel, Field


class ReqNovaVaga(BaseModel):
    id: str
    tokens: list[str] = []
    isApplied: bool = False
    isEnabled: bool = False
    txtVaga: str


class ReqUpdateVaga(BaseModel):
    isApplied: bool = None
    isEnabled: bool = None
    tokens: list[str] = None
