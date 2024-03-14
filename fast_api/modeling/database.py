import databases
import sqlalchemy
from sqlalchemy.orm import sessionmaker


DATABSE_URL = "sqlite:///./test.db"

metadata = sqlalchemy.MetaData()

tasks_table = sqlalchemy.Table(
    "tasks",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String),
    sqlalchemy.Column("status", sqlalchemy.String),
)

tags_table = sqlalchemy.Table(
    "tags",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column('task_id', sqlalchemy.ForeignKey("tasks.id"), nullable=False),
    sqlalchemy.Column("tag", sqlalchemy.String),
)

engine = sqlalchemy.create_engine(DATABSE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
metadata.create_all(engine)

database = databases.Database(DATABSE_URL, force_rollback=False)