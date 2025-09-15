from services.db import db
from helper.helper import serialize_user

async def get_all_users():
    users_cursor = db.users.find()
    users = await users_cursor.to_list(length=None)
    return [serialize_user(user) for user in users]
