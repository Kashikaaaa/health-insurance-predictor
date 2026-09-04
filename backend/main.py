from fastapi import FastAPI
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from typing import Literal
import pandas as pd
import joblib


# Create FastAPI app
app = FastAPI(
    title="Health Insurance Premium Predictor",
    description="Predict insurance charges using a trained ML model",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained pipeline
model = joblib.load("model.pkl")


# Input validation model
class InsuranceInput(BaseModel):
    age: int = Field(ge=0, le=100)
    sex: Literal["male", "female"]
    bmi: float = Field(gt=0, le=100)
    children: int = Field(ge=0, le=20)
    smoker: Literal["yes", "no"]
    region: Literal[
        "southwest",
        "southeast",
        "northwest",
        "northeast"
    ]


# Home endpoint
@app.get("/")
def home():
    return {
        "message": "Health Insurance Premium Predictor API is running"
    }


# Prediction endpoint
@app.post("/predict")
def predict_insurance(data: InsuranceInput):

    input_data = pd.DataFrame([{
        "age": data.age,
        "sex": data.sex,
        "bmi": data.bmi,
        "children": data.children,
        "smoker": data.smoker,
        "region": data.region
    }])

    prediction = model.predict(input_data)[0]

    return {
        "predicted_charge": round(float(prediction), 2)
    }