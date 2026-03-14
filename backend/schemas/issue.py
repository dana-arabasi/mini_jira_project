from pydantic import BaseModel
from enum import Enum


class IssueStatus(str, Enum):
    open = "open"
    in_progress = "in_progress"
    closed = "closed"


class IssuePriority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class IssueCreate(BaseModel):

    title: str
    description: str
    status: IssueStatus
    priority: IssuePriority


class IssueUpdate(BaseModel):

    title: str
    description: str
    status: IssueStatus
    priority: IssuePriority


class IssueOut(BaseModel):

    id: int
    title: str
    description: str
    status: IssueStatus
    priority: IssuePriority

    class Config:
        from_attributes = True