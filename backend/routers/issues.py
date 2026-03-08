from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..schemas.issue import IssueCreate, IssueUpdate, IssueOut
from ..services.issue_service import *

router = APIRouter(
    prefix="/issues",
    tags=["Issues"]
)



def get_db():

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[IssueOut])
def list_issues(search: str = None, status: str = None, db: Session = Depends(get_db)):

    return get_all_issues(db, search, status)


@router.post("/", response_model=IssueOut)
def add_issue(issue: IssueCreate, db: Session = Depends(get_db)):

    return create_issue(db, issue.dict())


@router.put("/{issue_id}", response_model=IssueOut)
def edit_issue(issue_id: int, issue: IssueUpdate, db: Session = Depends(get_db)):

    return update_issue(db, issue_id, issue.dict())


@router.delete("/{issue_id}")
def remove_issue(issue_id: int, db: Session = Depends(get_db)):

    delete_issue(db, issue_id)

    return {"message": "Issue deleted"}