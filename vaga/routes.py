from fastapi import APIRouter, Body
from dto.models import ReqNovaVaga
from vaga.model import Vaga

router = APIRouter()


@router.get("/", status_code=200)
async def findAll():
    lista = await Vaga.find_all().to_list()
    return {
        "message": "lista de vagas",
        "data": lista
    }


@router.post("/", status_code=201)
async def create(vagaReq: ReqNovaVaga = Body(...)):
    nova_vaga = Vaga(id=vagaReq.id, tokens=vagaReq.tokens, isApplied=vagaReq.isApplied)
    await nova_vaga.create()
    return {
        "message": "Vaga salva com sucesso.",
        "data": nova_vaga
    }
