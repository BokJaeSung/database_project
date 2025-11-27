from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from Service.user_service import UserService

router = APIRouter(prefix="/users", tags=["users"])
user_service = UserService()

class UserCreate(BaseModel):
    id: str
    password: str
    name: str
    email: str

class UserLogin(BaseModel):
    id: str
    password: str

class UserUpdate(BaseModel):
    name: str
    email: str

@router.post("/register")
def register_user(user_data: UserCreate):
    result = user_service.create_user(user_data.model_dump())
    if result:
        return {"message": "User registered successfully"}
    raise HTTPException(status_code=400, detail="Failed to register user")

@router.post("/login")
def login_user(login_data: UserLogin):
    user = user_service.authenticate_user(login_data.id, login_data.password)
    if user:
        return {"message": "Login successful", "user_id": user.user_id}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.get("/{user_id}")
def get_user_profile(user_id: int):
    user = user_service.get_user_by_id(user_id)
    if user:
        return user.__dict__
    raise HTTPException(status_code=404, detail="User not found")

@router.put("/{user_id}")
def update_user_profile(user_id: int, user_data: UserUpdate):
    result = user_service.update_user(user_id, user_data.model_dump())
    if result:
        return {"message": "User updated successfully"}
    raise HTTPException(status_code=404, detail="User not found")

@router.delete("/{user_id}")
def delete_user_account(user_id: int):
    result = user_service.delete_user(user_id)
    if result:
        return {"message": "User deleted successfully"}
    raise HTTPException(status_code=404, detail="User not found")