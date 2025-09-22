from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from joblib import load
import numpy as np
from typing import List
import cv2

router = APIRouter()

# Request schema
class PredictionRequest(BaseModel):
    data: List[List[float]]  # 2D input data

# Load model once at startup
try:
    
    raw_model = load("model.pkl")
    print(type(raw_model))
    if isinstance(raw_model, dict):
        model = raw_model.get("model", None)  # extract actual model
    else:
        model = raw_model
    print("✅ Model loaded successfully:", type(model))
except FileNotFoundError:
    print("❌ Model file not found at model.pkl")
    model = None
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None


@router.post("/predict")
async def predict(request: PredictionRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not available")

    if not request.data:
        raise HTTPException(status_code=400, detail="No input data provided")

    try:
        # Convert to numpy
        input_data = np.array(request.data)

        # Validate input dimensions
        if len(input_data.shape) != 2:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid data shape {input_data.shape}. Expected 2D array."
            )

        # Run prediction
        prediction = model.predict(input_data)

        return {
            "prediction": prediction.tolist(),
            "input_shape": input_data.shape
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid input: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@router.post("/predict/image")
async def predict_image(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not available")

    try:
        # Read file into numpy
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            raise HTTPException(status_code=400, detail="Invalid image")

        # Preprocess (example: resize to 224x224 and flatten)
        img_resized = cv2.resize(img, (224, 224))  # adjust size if needed
        img_scaled = img_resized / 255.0           # normalize
        img_flatten = img_scaled.flatten().reshape(1, -1)

        # Predict
        prediction = model.predict(img_flatten)

        return {"prediction": prediction.tolist()}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
