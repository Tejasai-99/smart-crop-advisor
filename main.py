from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

import shutil
import os
import joblib
import pandas as pd

from season import is_crop_suitable_for_season
from soil_reader import extract_soil_values
from weather import get_location, get_forecast, analyze_weather



# ============================================
# FastAPI Application
# ============================================

app = FastAPI(
    title="Smart Farmer AI",
    description="Crop Recommendation and Weather Alert API",
    version="1.0"
)


# ============================================
# CORS
# ============================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================
# Load ML model
# ============================================

model = joblib.load("crop_model.pkl")


# ============================================
# Home
# ============================================

@app.get("/")
def home():
    return {
        "message": "Smart Farmer AI API is running"
    }


# ============================================
# Health
# ============================================

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# ============================================
# Weather
# ============================================

@app.get("/weather")
def weather(state: str, village: str):

    location = get_location(village, state)

    if location is None:
        return {
            "success": False,
            "message": "Location not found"
        }

    forecast = get_forecast(
        location["latitude"],
        location["longitude"]
    )

    if forecast is None:
        return {
            "success": False,
            "message": "Weather data unavailable"
        }

    daily = forecast["daily"]

    forecast_data = []

    for i in range(len(daily["time"])):

        max_temp = daily["temperature_2m_max"][i]
        min_temp = daily["temperature_2m_min"][i]
        rainfall = daily["precipitation_sum"][i]
        wind_speed = daily["wind_speed_10m_max"][i]
        weather_code = daily["weather_code"][i]

        alerts = analyze_weather(
            max_temp,
            rainfall,
            wind_speed,
            weather_code
        )

        forecast_data.append({
            "date": daily["time"][i],
            "min_temperature": min_temp,
            "max_temperature": max_temp,
            "rainfall": rainfall,
            "wind_speed": wind_speed,
            "weather_code": weather_code,
            "alerts": alerts
        })

    return {
        "success": True,
        "location": location,
        "forecast": forecast_data
    }


# ============================================
# Soil Report Upload
# ============================================

@app.post("/soil-report")
async def soil_report(
    file: UploadFile = File(...)
):

    allowed_types = [
        "image/jpeg",
        "image/png",
        "application/pdf"
    ]

    if file.content_type not in allowed_types:
        return {
            "success": False,
            "message": "Please upload JPG, PNG or PDF soil report."
        }

    file_extension = ".png"

    if file.content_type == "image/jpeg":
        file_extension = ".jpg"

    elif file.content_type == "application/pdf":
        file_extension = ".pdf"

    file_path = "uploaded_soil_report" + file_extension

    try:

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        soil = extract_soil_values(file_path)
        return {
            "success": True,
            "soil": {
                "nitrogen": soil["N"],
                "phosphorus": soil["P"],
                "potassium": soil["K"],
                "ph": soil["ph"]
            }
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }


# ============================================
# Crop Recommendation
# ============================================

@app.get("/recommend-crop")
def recommend_crop(
    N: float,
    P: float,
    K: float,
    ph: float,
    temperature: float,
    humidity: float,
    rainfall: float
):

    input_data = pd.DataFrame([{
        "N": N,
        "P": P,
        "K": K,
        "temperature": temperature,
        "humidity": humidity,
        "ph": ph,
        "rainfall": rainfall
    }])

    probabilities = model.predict_proba(
        input_data
    )[0]

    classes = model.classes_

    top5_indices = probabilities.argsort()[-5:][::-1]

    recommendations = []

    for index in top5_indices:

        recommendations.append({
            "crop": classes[index],
            "probability": round(
                float(probabilities[index] * 100),
                2
            )
        })

    return {
        "success": True,
        "recommendations": recommendations
    }


# ============================================
# COMPLETE CROP RECOMMENDATION
# ============================================

@app.post("/recommend")
async def recommend(
    file: UploadFile = File(...),
    state: str = Form(...),
    village: str = Form(...),
    season: str = Form(...)
):

    # ----------------------------------------
    # 1. Check file
    # ----------------------------------------

    allowed_types = [
    "image/jpeg",
    "image/png",
    "application/pdf"]

    if file.content_type not in allowed_types:

        return {
            "success": False,
            "message": "Please upload JPG or PNG soil report."
        }


    try:

        # ------------------------------------
        # 2. Save soil report
        # ------------------------------------

        file_extension = ".png"

        if file.content_type == "image/jpeg":
            file_extension = ".jpg"

        elif file.content_type == "application/pdf":
            file_extension = ".pdf"

        file_path = "uploaded_soil_report" + file_extension

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer
            )


        # ------------------------------------
        # 3. Extract soil values
        # ------------------------------------

        soil = extract_soil_values(file_path)

        N = soil["N"]
        P = soil["P"]
        K = soil["K"]
        ph = soil["ph"]


        # ------------------------------------
        # 4. Find farmer location
        # ------------------------------------

        location = get_location(
            village,
            state
        )

        if location is None:

            return {
                "success": False,
                "message": "Location not found."
            }


        # ------------------------------------
        # 5. Get weather forecast
        # ------------------------------------

        forecast = get_forecast(
            location["latitude"],
            location["longitude"]
        )

        if forecast is None:

            return {
                "success": False,
                "message": "Weather data unavailable."
            }


        # ------------------------------------
        # 6. Get weather information
        # ------------------------------------

        daily = forecast["daily"]
        hourly = forecast["hourly"]

        temperature = daily[
            "temperature_2m_max"
        ][0]

        rainfall = daily[
            "precipitation_sum"
        ][0]

        wind_speed = daily[
            "wind_speed_10m_max"
        ][0]

        humidity = hourly[
            "relative_humidity_2m"
        ][0]


        # ------------------------------------
        # 7. Prepare ML input
        # ------------------------------------

        input_data = pd.DataFrame([{

            "N": N,

            "P": P,

            "K": K,

            "temperature": temperature,

            "humidity": humidity,

            "ph": ph,

            "rainfall": rainfall

        }])


        # ------------------------------------
        # 8. Predict crops
        # ------------------------------------


        probabilities = model.predict_proba(
            input_data
        )[0]

        classes = model.classes_


        # ------------------------------------
        # 9. Apply season-aware ranking
        # ------------------------------------

        season_scores = []

        for index, crop in enumerate(classes):

            probability = float(probabilities[index])

            if is_crop_suitable_for_season(
                crop,
                season
            ):
                # Suitable crop gets a boost
                adjusted_score = probability * 1.5

            else:
                # Non-suitable crop gets a strong penalty
                adjusted_score = probability * 0.2

            season_scores.append({
                "crop": crop,
                "probability": probability,
                "adjusted_score": adjusted_score
            })


        # ------------------------------------
        # 10. Sort by season-adjusted score
        # ------------------------------------

        season_scores.sort(
            key=lambda x: x["adjusted_score"],
            reverse=True
        )


        # ------------------------------------
        # 11. Get final Top 5
        # ------------------------------------

        recommendations = []

        for item in season_scores[:5]:

            recommendations.append({

                "crop": item["crop"],

                # Original ML probability
                "probability": round(
                    item["probability"] * 100,
                    2
                )

            })


        # ------------------------------------
        # 9. Return complete result
        # ------------------------------------

        return {

            "success": True,

            "farmer": {

                "state": state,

                "village": village,

                "season": season

            },

            "location": location,

            "soil": {

                "nitrogen": N,

                "phosphorus": P,

                "potassium": K,

                "ph": ph

            },

            "weather": {

                "temperature": temperature,

                "humidity": humidity,

                "rainfall": rainfall,

                "wind_speed": wind_speed

            },

            "recommendations": recommendations

        }


    except Exception as e:

        return {

            "success": False,

            "message": str(e)

        }