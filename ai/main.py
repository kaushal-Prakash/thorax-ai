from fastapi import FastAPI

app = FastAPI()

# include routers
# app.include_router(user.router)

@app.get("/")
def root():
    return {"message": "AI backend is running 🚀"}


