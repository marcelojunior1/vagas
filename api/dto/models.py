from pydantic import BaseModel


class ReqNovaVaga(BaseModel):
    id: str
    isApplied: bool = False
    isEnabled: bool = False
    isUpdated: bool = False
    txtVaga: str

class ReqUpdateVaga(BaseModel):
    isApplied: bool = None
    isEnabled: bool = None
    isUpdated: bool = None
    txtVaga: str = None

class ReqPalavraBloqueada(BaseModel):
    palavra: str
    ativado: bool

class ResPalavraBloqueada(BaseModel):
    palavra: str
    ativado: bool
