def get_users():
    return [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]

def get_user_by_id(user_id: int):
    return {"id": user_id, "name": f"User {user_id}"}
