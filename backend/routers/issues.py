from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import SessionLocal, engine, Base, get_db
from ..schemas.issue import IssueCreate, IssueUpdate, IssueOut
from ..services.issue_service import (
    get_all_issues,
    create_issue,
    update_issue,
    delete_issue
)
from ..utils.response import success_response, error_response

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


@router.get("/")
def list_issues(
    search: str = None,
    status: str = None,
    priority: str = None,
    sort_by: str = "id",
    order: str = "asc",
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    items, total = get_all_issues(
        db, search, status, priority, sort_by, order, limit, offset
    )

    return success_response(
        data={
            "items": items,
            "total": total
        },
        message="Issues retrieved successfully"
    )


@router.post("/", response_model=IssueOut, status_code=status.HTTP_201_CREATED)
def add_issue(issue: IssueCreate, db: Session = Depends(get_db)):

    try:
        new_issue = create_issue(db, issue.dict())
        return new_issue

    except Exception as e:
        raise HTTPException(status_code=409, detail="Issue creation failed")


@router.put("/{issue_id}", response_model=IssueOut)
def edit_issue(issue_id: int, issue: IssueUpdate, db: Session = Depends(get_db)):

    updated = update_issue(db, issue_id, issue.dict())

    if not updated:
        raise HTTPException(status_code=404, detail="Issue not found")

    return updated



@router.delete("/{issue_id}")
def remove_issue(issue_id: int, db: Session = Depends(get_db)):

    deleted = delete_issue(db, issue_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Issue not found")

    return success_response(message="Issue deleted successfully")