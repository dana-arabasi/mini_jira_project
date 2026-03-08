from sqlalchemy.orm import Session
from models.issue import Issue


def get_all_issues(db: Session, search=None, status=None):

    query = db.query(Issue)

    if search:
        query = query.filter(Issue.title.contains(search))

    if status:
        query = query.filter(Issue.status == status)

    return query.all()


def get_issue(db: Session, issue_id: int):

    return db.query(Issue).filter(Issue.id == issue_id).first()


def create_issue(db: Session, data):

    issue = Issue(**data)

    db.add(issue)

    db.commit()

    db.refresh(issue)

    return issue


def update_issue(db: Session, issue_id: int, data):

    issue = get_issue(db, issue_id)

    if not issue:
        return None

    for key, value in data.items():
        setattr(issue, key, value)

    db.commit()

    db.refresh(issue)

    return issue


def delete_issue(db: Session, issue_id: int):

    issue = get_issue(db, issue_id)

    if not issue:
        return None

    db.delete(issue)

    db.commit()

    return issue