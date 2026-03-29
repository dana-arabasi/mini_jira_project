from sqlalchemy.orm import Session
from ..models.user import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_user(db: Session, user):
    password = user.password[:72]
    hashed_pw = pwd_context.hash(password)
    db_user = User(email=user.email, password=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if user and pwd_context.verify(password[:72], user.password):
        return user
    return None