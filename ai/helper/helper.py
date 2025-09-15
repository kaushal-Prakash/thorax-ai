from datetime import datetime

def serialize_user(user):
    return {
        "id": str(user["_id"]),  # convert ObjectId to string
        "name": user["name"],
        "email": user["email"],
        "isPremium": user["isPremium"],
        "subscriptionId": user.get("subscriptionId"),
        "createdAt": user["createdAt"].isoformat() if isinstance(user["createdAt"], datetime) else user["createdAt"],
        "updatedAt": user["updatedAt"].isoformat() if isinstance(user["updatedAt"], datetime) else user["updatedAt"]
    }