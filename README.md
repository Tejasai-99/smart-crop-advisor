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
