from fastapi import FastAPI
from pydantic import BaseModel
import dill
import numpy as np
from fastapi.responses import JSONResponse

# Load pickled model
with open("model.pkl", "rb") as f:
    model = dill.load(f)
    print(type(model))
    print("Input shape:", model.input_shape)
    print("Output shape:", model.output_shape)

app = FastAPI(title="Feature-based COVID Prediction API")

# Input schema: 20 numerical features
class InputData(BaseModel):
    features: list[float]  # expects exactly 20 numbers

# Class labels
CLASS_NAMES = ["Normal", "COVID", "Pneumonia"]

@app.post("/predict")
def predict(data: InputData):
    try:
        # Ensure correct number of features
        if len(data.features) != 20:
            return JSONResponse(
                content={"error": "Expected 20 features."}, status_code=400
            )

        # Convert to numpy array
        x = np.array([data.features], dtype=np.float32)  # shape (1, 20)

        # Predict
        preds = model.predict(x)
        pred_class = CLASS_NAMES[np.argmax(preds)]
        confidence = float(np.max(preds))

        return {"prediction": pred_class, "confidence": round(confidence * 100, 2)}

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
