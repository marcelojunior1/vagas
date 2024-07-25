from fastapi import FastAPI

from db.database import init_db
from route.vagas import router as Vagas

app = FastAPI()


@app.on_event("startup")
async def start_db():
    await init_db()

@app.get("/")
async def root():
    return {"res": "Sistema Vagas"}

app.include_router(Vagas, tags=["vagas"], prefix="/api/vagas")
