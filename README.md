# Smart Crop Advisor

Smart Crop Advisor is a full-stack agricultural decision-support application that uses **Soil OCR, Machine Learning, Weather Data, and Season-based rules** to recommend suitable crops.

##  Live Demo

🌐 https://smart-crop-advisor-iota.vercel.app/

##  Features

-  Upload soil reports in PDF, JPG, JPEG, or PNG format
-  Extract N, P, K and pH automatically using OCR
-  Get local weather information
-  Predict suitable crops using Machine Learning
-  Season-aware crop ranking for Kharif, Rabi and Zaid
-  Display Top 5 crop recommendations
-  7-day weather forecast and general weather alerts
-  English, Telugu and Hindi interface

##  Machine Learning

The project uses a **Random Forest Classifier** trained on:

- 2,200 samples
- 7 features

### Input Features

N
P
K
Temperature
Humidity
pH
Rainfall
Model Performance

99.55% test-set accuracy

Note: This is test-set performance and does not represent real-world agricultural accuracy. Field validation would be required.

 Architecture
Crop Recommendation
React
  ↓
FastAPI
  ↓
Soil OCR
  ↓
N / P / K / pH
  ↓
Weather Data
  ↓
Random Forest
  ↓
Season-Based Ranking
  ↓
Top 5 Crops
Weather & Alerts
React
  ↓
Open-Meteo
  ↓
7-Day Forecast
  ↓
Weather Alerts
🛠️ Tech Stack

Frontend

React
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

OCR & Documents

Tesseract OCR
PyMuPDF
Pillow

Weather

Open-Meteo

Deployment

Vercel
Render
Docker
GitHub



📁 Project Structure
smart-crop-advisor/
│
├── frontend/
├── main.py
├── soil_reader.py
├── weather.py
├── season.py
├── Crop_recommendation.csv
├── crop_model.pkl
├── requirements.txt
├── Dockerfile
└── README.md
⚙️ Run Locally
Backend
python -m venv venv

Windows:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Run FastAPI:

python -m uvicorn main:app --reload

Backend:

http://127.0.0.1:8000
Frontend
cd frontend
npm install
npm run dev

Frontend:

http://localhost:5173
📌 Project Highlights
Full-stack React + FastAPI application
OCR-based automatic soil parameter extraction
Machine-learning crop prediction
Season-aware recommendation logic
Real-time weather integration
REST API development
Cloud deployment
Production API failure handling and testing
👨‍💻 Author

Teja Sai Nalamati

B.Tech Information Technology
Pragati Engineering College

🔗 GitHub: https://github.com/Tejasai-99


This version is **much better for your GitHub repository** because recruiters can understand the project in about **1–2 minutes** without reading a huge document.
