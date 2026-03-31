from fastapi import APIRouter, Depends, HTTPException, Header
from backend.utils.dependencies import require_admin
from backend.utils.response import success_response, error_response
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.user import User
from backend.schemas.user import UserCreate, UserOut
from backend.services.auth_service import create_user, authenticate_user
from backend.utils.limiter import limiter


router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@router.post("/signup", response_model=UserOut)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")
    return create_user(db, user)


@router.post("/login")
def login(user: UserCreate, db: Session = Depends(get_db)):
    auth_user = authenticate_user(db, user.email, user.password)
    if not auth_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return success_response(
        data={
            "id": auth_user.id,
            "email": auth_user.email,
            "role": auth_user.role
        },
        message="Login successful"
    )

@router.get("/users")
def get_all_users(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header required")

    try:
        import json
        user_data = json.loads(authorization)
        if user_data.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admin access required")
    except (json.JSONDecodeError, KeyError):
        raise HTTPException(status_code=401, detail="Invalid authorization")

    return success_response(data=db.query(User).all())

@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header required")

    try:
        import json
        admin_data = json.loads(authorization)
        if admin_data.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admin access required")
        if admin_data.get("id") == user_id:
            raise HTTPException(status_code=400, detail="Cannot delete your own account")
    except (json.JSONDecodeError, KeyError):
        raise HTTPException(status_code=401, detail="Invalid authorization")

    user_to_delete = db.query(User).filter(User.id == user_id).first()
    if not user_to_delete:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user_to_delete)
    db.commit()

    return success_response(message="User deleted successfully")

@router.put("/users/{user_id}/promote")
def promote_user(
    user_id: int,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header required")

    try:
        import json
        admin_data = json.loads(authorization)
        if admin_data.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admin access required")
    except (json.JSONDecodeError, KeyError):
        raise HTTPException(status_code=401, detail="Invalid authorization")

    user_to_promote = db.query(User).filter(User.id == user_id).first()
    if not user_to_promote:
        raise HTTPException(status_code=404, detail="User not found")

    if user_to_promote.role == "admin":
        raise HTTPException(status_code=400, detail="User is already an admin")

    user_to_promote.role = "admin"
    db.commit()

    return success_response(message="User promoted to admin successfully")

