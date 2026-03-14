from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from ..models.issue import Issue


def get_all_issues(db: Session, search=None, status=None, limit=20, offset=0):

    query = db.query(Issue)

    if search:
        safe_search = search.replace("%", "").replace("_", "")
        query = query.filter(Issue.title.contains(safe_search))

    if status:
        query = query.filter(Issue.status == status)

    return query.offset(offset).limit(limit).all()


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