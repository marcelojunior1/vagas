from datetime import datetime

from beanie import Document

class Palavrabloqueada(Document):
    palavra: str
    ativado: bool = True
    timestamp: datetime = datetime.now()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
