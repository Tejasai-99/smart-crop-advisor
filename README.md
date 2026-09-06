# Smart Crop Advisor

Smart Crop Advisor is an AI-based agricultural decision-support system designed to help farmers make informed crop decisions using soil information, machine learning, weather data, and seasonal analysis.

## Overview

Smart Crop Advisor combines soil report processing, machine learning-based crop recommendation, location-based weather information, and season-aware crop ranking into a single web application.

The system allows farmers to upload a soil report and provide their state, village, and growing season. The application extracts important soil parameters from the report, retrieves weather information for the selected location, and uses a machine learning model to generate crop recommendations.

The application also provides a separate weather and agricultural alert feature that can be used without uploading a soil report.

## Key Features

### Crop Recommendation

- Upload soil reports in JPG, PNG, or PDF format.
- Extract Nitrogen, Phosphorus, Potassium, and pH values using OCR.
- Retrieve weather information based on state and village.
- Use temperature, humidity, and rainfall as environmental features.
- Predict suitable crops using a Random Forest classification model.
- Generate the top five crop recommendations.
- Apply season-aware ranking for Kharif, Rabi, and Zaid seasons.
- Display crop names in English, Telugu, and Hindi.

### Weather and Agricultural Alerts

- Search for weather information using state and village.
- Retrieve a seven-day weather forecast.
- Display minimum and maximum temperature.
- Display expected rainfall.
- Display maximum wind speed.
- Generate general agricultural weather alerts for heavy rainfall, high temperature, extreme heat, strong winds, and thunderstorms.

### Soil Report Processing

The system uses Tesseract OCR to process soil reports.

The following parameters are extracted from the uploaded report:

- Nitrogen (N)
- Phosphorus (P)
- Potassium (K)
- Soil pH

For PDF files, the system first attempts to extract selectable text. If the PDF is scanned, the system uses OCR to process the document pages.

## Machine Learning

The crop recommendation component uses a Random Forest Classifier.

### Input Features

The model uses seven input features:

| Feature | Source |
| --- | --- |
| Nitrogen (N) | Soil report |
| Phosphorus (P) | Soil report |
| Potassium (K) | Soil report |
| Temperature | Weather API |
| Humidity | Weather API |
| pH | Soil report |
| Rainfall | Weather API |

The model produces crop probabilities for the available crop classes. The application then applies season-aware ranking to prioritize crops suitable for the selected growing season.

## Machine Learning Performance

The Random Forest model achieved approximately 99.5% accuracy on the held-out test set used during model evaluation.

This result represents performance on the available dataset and should not be interpreted as real-world agricultural prediction accuracy.

## System Architecture

```text
User
 |
 v
React Frontend
 |
 v
FastAPI Backend
 |
 +----------------------+----------------------+
 |                      |                      |
 v                      v                      v
Soil Report OCR     Location API          Weather API
 |                      |                      |
 v                      |                      v
N, P, K, pH             |              Temperature
 |                      |              Humidity
 |                      |              Rainfall
 +----------------------+----------------------+
                        |
                        v
                Random Forest Model
                        |
                        v
                Crop Probabilities
                        |
                        v
                Season-Aware Ranking
                        |
                        v
                 Top 5 Recommendations


Technology Stack
Frontend
React
Vite
JavaScript
CSS
Backend
Python
FastAPI
Uvicorn
Machine Learning
Scikit-learn
Random Forest
Pandas
Joblib
OCR and Document Processing
Tesseract OCR
Pytesseract
Pillow
PyMuPDF
External APIs
Open-Meteo Geocoding API
Open-Meteo Weather API
Development and Deployment
Git
GitHub
Vercel
Render
Project Structure
smart-crop-advisor/
|
├── frontend/
|   ├── src/
|   |   ├── App.jsx
|   |   ├── App.css
|   |   └── index.css
|   ├── package.json
|   └── vite.config.js
|
├── Crop_recommendation.csv
├── crop_model.pkl
├── main.py
├── predict.py
├── requirements.txt
├── season.py
├── soil_reader.py
├── train.py
├── weather.py
├── .gitignore
└── README.md
API Endpoints
Health Check
GET /health

Returns the health status of the backend service.

Weather
GET /weather?state={state}&village={village}

Returns location information, seven-day weather data, and agricultural weather alerts.

Soil Report
POST /soil-report

Accepts a soil report and extracts soil parameters using OCR.

Crop Recommendation
POST /recommend

Accepts a soil report, state, village, and season and returns soil information, weather information, and crop recommendations.

Local Installation
Clone the Repository
git clone https://github.com/Tejasai-99/smart-crop-advisor.git
cd smart-crop-advisor
Backend Setup

Install the Python dependencies:

pip install -r requirements.txt

Start the FastAPI server:

python -m uvicorn main:app --reload

The backend will be available at:

http://127.0.0.1:8000

FastAPI documentation:

http://127.0.0.1:8000/docs
Frontend Setup

Open a new terminal:

cd frontend
npm install
npm run dev

The frontend will be available at:

http://localhost:5173
Prediction Workflow
1. Farmer uploads soil report
2. OCR extracts N, P, K, and pH
3. Farmer selects state, village, and season
4. Location is identified using the geocoding service
5. Weather information is retrieved
6. Seven ML features are prepared
7. Random Forest generates crop probabilities
8. Season suitability is applied to the predictions
9. Top five crop recommendations are returned
10. Results are displayed in the React application
Future Improvements
Improve village matching for locations with duplicate names.
Expand and improve the agricultural training dataset.
Add additional soil parameters.
Improve weather-based agricultural recommendations.
Incorporate historical weather information.
Evaluate the model using external datasets.
Add farmer authentication and personalized profiles.
Improve model validation and monitoring.
Deploy the application for public use.
Project Objective

The objective of Smart Crop Advisor is to provide farmers with an accessible decision-support platform that combines soil information, environmental conditions, weather forecasts, and seasonal considerations to assist with crop selection.

The system is intended as a decision-support tool and not as a replacement for professional agricultural advice.

Author

Nalamati Teja Sai

GitHub: https://github.com/Tejasai-99

License

This project is intended for educational and development purposes.


### After pasting

Click **Commit changes** on GitHub.

Then your repository README will be much more professional and useful for recruiters.

After that, **we'll deploy the FastAPI backend on Render**.
