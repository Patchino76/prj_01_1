from fastapi import FastAPI, APIRouter
from modeling.database import database, tags_table, tasks_table
from modeling.schemas import UserTaskIn, UserTaskOut
from sqlalchemy.orm import Session

router = APIRouter()

async def find_task_by_id(task_id: int):
    query = tags_table.select().where(tags_table.c.task_id == task_id) #c is for column
    return await database.fetch_one(query)

@router.get("/")
async def root():
    return {"message": "Hello from TASKS ROUTER"}

@router.get("/tasks", response_model=list[UserTaskOut])
async def get_tasks():
    q_tasks = tasks_table.select()
    rez_tasks = await database.fetch_all(q_tasks)
    q_tags = tags_table.select()
    rez_tags = await database.fetch_all(q_tags)

    rez_tasks_with_tags = []
    for task in rez_tasks:
        tags = []
        for tag in rez_tags:
            if task["id"] == tag["task_id"]:
                tags.append(tag["tag"])
        rez_tasks_with_tags.append({"id": task["id"], "name": task["name"], "status": task["status"], "tags": tags})
    return rez_tasks_with_tags


@router.post("/create")
async def post_task(task: UserTaskIn):
    task_data = {"name": task.name, "status": task.status}
    query = tasks_table.insert().values(task_data)
    last_record_id = await database.execute(query)

    for tag in task.tags:
        task_tags = {"task_id": last_record_id, "tag": tag}
        query = tags_table.insert().values(task_tags)
        await database.execute(query)

    print({"name": task.name, "status": task.status, "tags": task.tags}) 
    return {"name": task.name, "status": task.status, "tags": task.tags}