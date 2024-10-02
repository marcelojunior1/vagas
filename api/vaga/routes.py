
from beanie.operators import In
from fastapi import APIRouter, Body, HTTPException, Request
from keras.src.utils import pad_sequences
from nltk.tokenize import RegexpTokenizer
from dto.models import ReqNovaVaga, ReqUpdateVaga
from vaga.model import Vaga

tokenizer = RegexpTokenizer(r'\w+')

router = APIRouter()

def converteTextoParaTokens(texto : str):
    tokens = list(map(lambda x: str(x).lower(), tokenizer.tokenize(texto)))
    for i in range(len(tokens)):
        if tokens[i].isdigit():
            tokens[i] = "num"
    return tokens

@router.get("/", status_code=200)
async def findAll(
        req: Request,
        treinamento: bool = False,
        infer: bool | None = None,
        enable: bool | None = None,
        updated: bool | None = None,
        max_sequence=None ):
    if treinamento is True:
        lista_vagas = await Vaga.find(In(Vaga.isUpdated, [True])).to_list()
        qtd_pos = await Vaga.find(In(Vaga.isApplied, [True])).count()
        qtd_neg = await Vaga.find(In(Vaga.isApplied, [False])).count()
        return {
            "message": "Lista de treinamento",
            "data": lista_vagas,
            "qtd_pos": qtd_pos,
            "qtd_neg": qtd_neg,
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

    if infer is not None and infer is True and lista != []:
        char2idx = req.state.ml_model['char2idx']
        UNKNOWN_IDX = (len(char2idx) - 1)
        model = req.state.ml_model['model']
        vagas_tokens = map(lambda x: converteTextoParaTokens(x.txtVaga), lista)
        novoX = list(map(lambda word: [char2idx.get(char) or UNKNOWN_IDX for char in word], vagas_tokens))
        novoX = pad_sequences(novoX, maxlen=80, padding='post', truncating='post')
        y_pred = model.predict(novoX)
        lista_final = list(map(lambda x, y: {"pred": round(float(y[0]), 5), "vaga": x}, lista, y_pred))
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
        isApplied=vagaReq.isApplied,
        isEnabled=vagaReq.isEnabled,
        isUpdated=vagaReq.isUpdated,
        txtVaga=vagaReq.txtVaga
    )
    try:
        await nova_vaga.create()
    except:
        print("Erro ao criar nova vaga", nova_vaga)
        raise HTTPException(status_code=500, detail="Erro ao inserir nova vaga: " + nova_vaga.id)

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


@router.delete("/{id}", status_code=204)
async def delete(id: str):
    vaga = await Vaga.find_one({"_id": id})
    if not vaga:
        raise HTTPException(status_code=404)

    await Vaga.find({"_id": id}).delete()

    return {
        "message": "Vaga deletada com sucesso.",
        "data": vaga
    }