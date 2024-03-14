from sqlalchemy.orm import Session

from . import models

from . import schemas

def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()

def get_task_by_title(db: Session, title: str):
    return db.query(models.Task).filter(models.Task.title == title).first()

def get_tasks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Task).offset(skip).limit(limit).all()

def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(title=task.title, status=task.status)
    db.add(db_task)
    db.flush()

    tags = []
    for tag in task.tags:
        db_tag = models.Tag(tag=tag, task_id=db_task.id)
        db.add(db_tag)
        db.flush()
        tags.append(db_tag)

    db.commit()
    return db_task

def get_task_tags(db: Session, task_id: int):
    return db.query(models.Tag).filter(models.Tag.task_id == task_id).all()

def create_tags(db: Session, tags: list[str], task_id: int):
    tags_returned = []

    for tag in tags:
        db_tag = models.Tag(tag=tag, task_id=task_id)
        db.add(db_tag)
        db.commit()
        db.refresh(db_tag)
        tags_returned.append(db_tag)
        return tags_returned