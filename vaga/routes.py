from beanie.operators import In
from fastapi import APIRouter, Body, HTTPException, Request
from keras.preprocessing import sequence
from keras.src.utils import pad_sequences

from dto.models import ReqNovaVaga, ReqUpdateVaga
from vaga.model import Vaga

router = APIRouter()


@router.get("/", status_code=200)
async def findAll(req: Request, treinamento: bool = False, infer: bool | None = None, enable: bool | None = None, updated: bool | None = None,
                  max_sequence=None):

    if treinamento is True:
        vagas_pos = await Vaga.find(
            In(Vaga.isApplied, [True])
        ).to_list()

        size_train_pos = len(vagas_pos)

        vagas_neg = await Vaga.find_many(
            In(Vaga.isApplied, [False]),
            In(Vaga.isEnabled, [True]),
            limit=size_train_pos
        ).to_list()

        size_split = int(size_train_pos * 0.2)

        return {
            "message": "Lista de treinamento",
            "train": vagas_pos[size_split+1:] + vagas_neg[size_split+1:],
            "test": vagas_pos[:size_split] + vagas_neg[:size_split],
        }

    if updated is not None:
        lista = await Vaga.find(
            In(Vaga.isUpdated, [updated]),
            In(Vaga.isEnabled, [True])
        ).to_list()
    elif enable is not None:
        lista = await Vaga.find(In(Vaga.isEnabled, [enable])).to_list()
    else:
        lista = await Vaga.find_all().to_list()

    lista_final = []

    if infer is not None and infer is True:
        char2idx = req.state.ml_model['char2idx']
        UNKNOWN_IDX = (len(char2idx) - 1)
        model = req.state.ml_model['model']

        for i in lista:
            titulo_vaga = i.txtVaga.replace("\n", " ").lower()
            novoX = list(map(lambda word: [char2idx.get(char) or UNKNOWN_IDX for char in word], [titulo_vaga]))
            novoX = pad_sequences(novoX, maxlen=max_sequence, padding='post', truncating='post')
            novoX = sequence.pad_sequences(novoX, maxlen=200)
            y_pred = model.predict(novoX)[0][0]
            y_pred = round(float(y_pred), 3)
            lista_final.append({
                "pred": y_pred,
                "vaga": i
            })

        lista_final.sort(key=lambda x: x['pred'], reverse=True)
        lista = lista_final

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
        isUpdated=vagaReq.isUpdated,
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


@router.get("/treinamento", status_code=200)
async def treinamento():
    vagas_aplicadas = await Vaga.find(
        In(Vaga.isApplied, [True])
    ).to_list()

    tamanho_lista_vagas_aplicadas = len(vagas_aplicadas)

    vagas_nao_aplicadas = await Vaga.find_many(
        In(Vaga.isApplied, [False]),
        In(Vaga.isEnabled, [True]),
        limit=tamanho_lista_vagas_aplicadas
    ).to_list()

    lista = vagas_nao_aplicadas + vagas_aplicadas

    return {
        "message": "Vagas de treinamento",
        "data": lista
    }
