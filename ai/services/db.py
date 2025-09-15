import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
MONGO_DB = os.getenv("MONGO_DB")

client = AsyncIOMotorClient(MONGO_URL)
db = client[MONGO_DB]


@asynccontextmanager
async def lifespan(app):
    # --- startup ---
    try:
        await db.command("ping")
        print("MongoDB connected successfully")
    except Exception as e:
        print("❌ MongoDB connection failed:", e)

    yield  # 👈 FastAPI runs after this point

    print("👋 Shutting down...")
    db.client.close()  # close

