from fastapi import APIRouter
from controllers import user_controller
# from controllers import user_controller

router = APIRouter()

@router.get("/users")
async def get_users():
    users = await user_controller.get_all_users();
    return users
