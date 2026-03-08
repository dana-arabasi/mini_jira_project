from sqlalchemy import Column, Integer, String, Text
from ..database import Base



class Issue(Base):

    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    description = Column(Text)

    status = Column(String, default="open")

    priority = Column(String, default="medium")