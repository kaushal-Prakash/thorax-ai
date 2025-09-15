from fastapi import APIRouter
from controllers import user_controller

router = APIRouter()

@router.get("/users")
def get_users():
    return user_controller.get_users()

@router.get("/users/bob")
def get_users():
    return 