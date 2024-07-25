from typing import Optional, Any
from pydantic import BaseModel


class ReqNovaVaga(BaseModel):
    id: str
    tokens: list[str]
    isApplied: Optional[bool] = False
