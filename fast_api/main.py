from fastapi import FastAPI

import uvicorn
from routers.tasks_router import router as tasks_router
from contextlib import asynccontextmanager
from modeling.database import database

@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.connect()
    yield
    await database.disconnect()



host = "localhost"
port = 8000
app = FastAPI(lifespan=lifespan)
app.include_router(tasks_router, prefix="/tasks")



if __name__ == "__main__":
    uvicorn.run("__main__:app", host=host, port=port, reload=True)
