from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Database connection URL from environment variable or default PostgreSQL
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres@localhost:5432/restaurant_db")

# Engine configuration handling SQLite specifically for development
if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """
    Dependency to get a database session.
    Yields a session and ensures it is closed after the request is processed.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
