from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime
from typing import Optional


class IssueStatus(str, Enum):
    open = "open"
    in_progress = "in_progress"
    closed = "closed"


class IssuePriority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class IssueCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    description: str = Field(..., min_length=0, max_length=1000)
    status: IssueStatus = IssueStatus.open
    priority: IssuePriority = IssuePriority.medium



class IssueUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=255)
    description: Optional[str] = Field(None, min_length=0, max_length=1000)
    status: Optional[IssueStatus]
    priority: Optional[IssuePriority]


class IssueOut(BaseModel):
    id: int
    title: str
    description: str
    status: IssueStatus
    priority: IssuePriority
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True