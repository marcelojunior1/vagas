from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.database import init_db
from ml.ml import get_char2idx, get_model
from vaga.routes import router as Vagas


ml_model = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()

    ml_model["char2idx"] = get_char2idx()
    ml_model["model"] = get_model()

    yield {'ml_model': ml_model}

    ml_model.clear()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "http://localhost:3000", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(Vagas, tags=["vagas"], prefix="/api/vagas")
