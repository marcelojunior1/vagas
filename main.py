from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.database import init_db
from vaga.routes import router as Vagas

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def start_db():
    await init_db()

@app.get("/")
async def root():
    return {"res": "Sistema Vagas"}

app.include_router(Vagas, tags=["vagas"], prefix="/api/vagas")
