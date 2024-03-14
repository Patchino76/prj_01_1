from pydantic import BaseModel

class UserTaskIn(BaseModel):
    __tablename__ = "tasks"
    name: str
    status: str
    tags: list[str]

    class Config:
        orm_mode = True
class UserTaskOut(UserTaskIn):
    __tablename__ = "tasks"
    id: int
    class Config:
        orm_mode = True
