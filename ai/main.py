from fastapi import FastAPI
from routes import user
from services.db import lifespan

app = FastAPI(lifespan=lifespan)

# include routers
app.include_router(user.router)

@app.get("/")
def root():
    return {"message": "AI backend is running"}


