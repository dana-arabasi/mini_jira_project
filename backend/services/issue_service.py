from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import case
from ..models.issue import Issue


def get_all_issues(db: Session, search=None, status=None, priority=None,
                   sort_by="id", order="asc", limit=20, offset=0):

    query = db.query(Issue)

    if search:
        safe = search.replace("%", "").replace("_", "")
        query = query.filter(
            (Issue.title.contains(safe)) |
            (Issue.description.contains(safe))
        )

    if status:
        query = query.filter(Issue.status == status)

    if priority:
        query = query.filter(Issue.priority == priority)

    total = query.count()

    if sort_by == "priority":
        priority_order = case(
            (Issue.priority == "low", 1),
            (Issue.priority == "medium", 2),
            (Issue.priority == "high", 3),
            else_=4
        )
        sort_column = priority_order
    else:
        sort_column = getattr(Issue, sort_by, Issue.id)

    if order == "desc":
        sort_column = sort_column.desc()

    items = query.order_by(sort_column).offset(offset).limit(limit).all()

    return items, total


def get_issue(db: Session, issue_id: int):

    return db.query(Issue).filter(Issue.id == issue_id).first()


def create_issue(db: Session, data):

    try:
        issue = Issue(**data)

        db.add(issue)
        db.commit()
        db.refresh(issue)

        return issue

    except SQLAlchemyError:
        db.rollback()
        raise


def update_issue(db: Session, issue_id: int, data):

    issue = get_issue(db, issue_id)

    if not issue:
        return None

    try:

        for key, value in data.items():
            if value is not None:
                setattr(issue, key, value)

        db.commit()
        db.refresh(issue)

        return issue

    except SQLAlchemyError:
        db.rollback()
        raise


def delete_issue(db: Session, issue_id: int):

    issue = get_issue(db, issue_id)

    if not issue:
        return None

    db.delete(issue)
    db.commit()

    return issue