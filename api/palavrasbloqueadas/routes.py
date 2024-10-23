from fastapi import APIRouter, Body, HTTPException
from dto.models import ReqPalavraBloqueada
from palavrasbloqueadas.model import Palavrabloqueada

router = APIRouter()

@router.post("/", status_code=201)
async def create(palavraNovaReq: ReqPalavraBloqueada = Body(...)):
    nova_palavra = Palavrabloqueada(
        palavra = palavraNovaReq.palavra,
        ativado = palavraNovaReq.ativado
    )

    try:
        await nova_palavra.create()
    except:
        print("Erro ao criar nova palavra bloqueada", nova_palavra)
        raise HTTPException(status_code=500, detail="Erro ao inserir nova vaga: " + nova_palavra.palavra)

    return {
        "message": "Palavra bloqueada salva com sucesso.",
        "data": nova_palavra
    }

@router.get("/", status_code=200)
async def findAll():
    palavras = await Palavrabloqueada.find_all().to_list()

    print(palavras)
    return {
        "message": "Lista de palavras bloqueadas.",
        "data": palavras
    }






