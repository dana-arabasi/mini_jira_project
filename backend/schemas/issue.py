from pydantic import BaseModel


class IssueCreate(BaseModel):

    title: str
    description: str
    status: str
    priority: str


class IssueUpdate(BaseModel):

    title: str
    description: str
    status: str
    priority: str



class IssueOut(BaseModel):

    id: int
    title: str
    description: str
    status: str
    priority: str

    class Config:
        from_attributes = True