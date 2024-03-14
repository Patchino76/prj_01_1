from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from contextlib import contextmanager

from module import crud, models, schemas


from module.database import SessionPool, engine
import uvicorn

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
origins = [
    "http://localhost:5173",
    # "http://localhost:8000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)

@contextmanager
def db_session():
    db = SessionPool()
    try:
        yield db
    finally:
        db.close()

# Dependency that can be used in FastAPI route handlers
def get_db():
    with db_session() as db:
        yield db
        

@app.post("/tasks/", response_model=schemas.Task)
def create_task(task_tags: schemas.TaskCreate, db: Session = Depends(get_db)):
    task_created =  crud.create_task(db, task=task_tags)

    return task_created
    

@app.get("/tasks/", response_model=list[schemas.Task])
def read_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tasks = crud.get_tasks(db, skip=skip, limit=limit)
    return tasks

@app.get("/tasks/{task_id}", response_model=schemas.Task)
def read_task(task_id: int, db: Session = Depends(get_db)):
    db_task = crud.get_task(db, task_id=task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

app.get("/tags/", response_model=list[schemas.Tag])
def read_task_tags(task_id: int, db: Session = Depends(get_db)):
    tags = crud.get_task_tags(db, task_id=task_id)
    return tags


host = "localhost"
port = 8000
if __name__ == "__main__":
    uvicorn.run("__main__:app", host=host, port=port, reload=True)

#RUN
# uvicorn sql_app.main: app --reload --port = 8000