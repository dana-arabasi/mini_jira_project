from fastapi import HTTPException, Header

def require_admin(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header required")

    try:
        # For now, we'll expect the user data as JSON in the authorization header
        # In production, this should be a proper JWT token
        import json
        user_data = json.loads(authorization)
        if user_data.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admin access required")
        return user_data
    except (json.JSONDecodeError, KeyError):
        raise HTTPException(status_code=401, detail="Invalid authorization")