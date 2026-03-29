from sqlalchemy import Column, Integer, String, Text
from ..database import Base
from sqlalchemy.sql import func
from sqlalchemy import DateTime

class Issue(Base):

    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)

    description = Column(Text)

    status = Column(String(20), default="open")

    priority = Column(String(20), default="medium")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())