from fastapi import FastAPI
from routes import prediction_route 

app = FastAPI(
    title="ML Model API",
    description="FastAPI service for predictions from model.pkl",
    version="1.0.0"
)

# Register router
app.include_router(prediction_route.router, prefix="/api", tags=["Prediction"])

@app.get("/")
async def root():
    return {"message": "Welcome to the ML Model API"}
