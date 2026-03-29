from sqlalchemy import Column, Integer, String
from ..database import Base
from sqlalchemy.sql import func
from sqlalchemy import DateTime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String(255), unique=True, index=True, nullable=False)

    password = Column(String(255), nullable=False)

    role = Column(String(20), default="user")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())