from pydantic import BaseModel

#Tag related
class TagBase(BaseModel):
    # task_id: int
    tag: str | None = None

class TagCreate(BaseModel):
    pass    

class Tag(TagBase):
    id: int
    
    class Config:
        from_attributes = True


#Tasks related
class TaskBase(BaseModel):
    title: str
    status: str

class TaskCreate(TaskBase):
    tags: list[str] | None = None

class Task(TaskBase):
    id: int
    tags: list[Tag]
    class Config:
        from_attributes = True






