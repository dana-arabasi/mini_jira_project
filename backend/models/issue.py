from sqlalchemy import Column, Integer, String, Text
from ..database import Base


class Issue(Base):

    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)

    description = Column(Text)

    status = Column(String(20), default="open")

    priority = Column(String(20), default="medium")