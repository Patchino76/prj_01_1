from sqlalchemy import create_engine, URL
from sqlalchemy.orm import sessionmaker, declarative_base

url = URL.create(
    drivername="postgresql",
    username="sve",
    password="123",
    database="tasks_db",
    # host="83.228.122.134",
    host="localhost",
    port=5432,
)

engine = create_engine(url, echo=True) #echo - to view logs

SessionPool = sessionmaker(bind=engine)
Base = declarative_base()