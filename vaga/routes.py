from fastapi import APIRouter, Body, HTTPException

from dto.models import ReqNovaVaga, ReqUpdateVaga
from vaga.model import Vaga

router = APIRouter()


@router.get("/", status_code=200)
async def findAll():
    lista = await Vaga.find_all().to_list()
    return {
        "message": "Lista de vagas",
        "data": lista
    }

@router.get("/{id}", status_code=200)
async def findById(id: str):
    vaga = await Vaga.find_one({"_id": id})
    return {
        "message": "Vaga.",
        "data": vaga
    }


@router.post("/", status_code=201)
async def create(vagaReq: ReqNovaVaga = Body(...)):
    nova_vaga = Vaga(
        id=vagaReq.id,
        tokens=vagaReq.tokens,
        isApplied=vagaReq.isApplied,
        isEnabled=vagaReq.isEnabled,
        txtVaga=vagaReq.txtVaga
    )
    await nova_vaga.create()
    return {
        "message": "Vaga salva com sucesso.",
        "data": nova_vaga
    }

@router.put("/{id}", status_code=201)
async def update(id: str, reqUpdateVaga: ReqUpdateVaga = Body(...)):

    vaga = await Vaga.find_one({"_id": id})

    if not vaga:
        raise HTTPException(
            status_code=404
        )

    reqUpdateVaga = {field: value for field, value in reqUpdateVaga if value is not None}
    update_query = {"$set": reqUpdateVaga}

    await vaga.update(update_query)
    return {
        "message": "Vaga atualizada com sucesso.",
        "data": vaga
    }


