
import pandas as pd
import joblib

from soil_reader import extract_soil_values
from weather import get_location, get_weather


# ============================================
# 1. Load trained crop model
# ============================================

model = joblib.load("crop_model.pkl")


# ============================================
# 2. Extract soil values from soil report
# ============================================

print("\n📄 Reading Soil Report...")
print("-------------------------")

try:
    soil = extract_soil_values()

except Exception as e:
    print("\n❌ Could not read the soil report.")
    print("Error:", e)
    exit()


N = soil["N"]
P = soil["P"]
K = soil["K"]
ph = soil["ph"]


print("\n🌱 Soil Report Values")
print("---------------------")
print("Nitrogen (N):", N)
print("Phosphorus (P):", P)
print("Potassium (K):", K)
print("pH:", ph)


# ============================================
# 3. Get farmer details
# ============================================

print("\n👨‍🌾 Farmer Details")
print("------------------")

state = input("Enter State: ")
village = input("Enter Village: ")
season = input("Enter Season (Kharif/Rabi/Zaid): ")


# ============================================
# 4. Find location coordinates
# ============================================

print("\n📍 Finding Location...")

location = get_location(village, state)

if location is None:
    print("\n❌ Could not find the location.")
    print("Please check the State and Village name.")
    exit()


print("\n📍 Location Found")
print("-----------------")
print("Village:", location["name"])
print("State:", location["state"])
print("Latitude:", location["latitude"])
print("Longitude:", location["longitude"])


# ============================================
# 5. Get weather
# ============================================

print("\n🌦️ Getting Weather Information...")

weather = get_weather(
    location["latitude"],
    location["longitude"]
)

if weather is None:
    print("\n❌ Could not get weather information.")
    exit()


temperature = weather["temperature"]
humidity = weather["humidity"]
rainfall = weather["rainfall"]


print("\n🌦️ Current Weather")
print("-------------------")
print("Temperature:", temperature, "°C")
print("Humidity:", humidity, "%")
print("Rain:", rainfall, "mm")


# ============================================
# 6. Prepare input for ML model
# ============================================

input_data = pd.DataFrame([{
    "N": N,
    "P": P,
    "K": K,
    "temperature": temperature,
    "humidity": humidity,
    "ph": ph,
    "rainfall": rainfall
}])


# ============================================
# 7. Get crop probabilities
# ============================================

probabilities = model.predict_proba(input_data)[0]

classes = model.classes_


# ============================================
# 8. Get Top 5 crops
# ============================================

top5_indices = probabilities.argsort()[-5:][::-1]


print("\n🌾 Top 5 Recommended Crops")
print("==========================")

for i, index in enumerate(top5_indices, start=1):

    crop = classes[index]
    probability = probabilities[index] * 100

    print(f"{i}. {crop} - {probability:.2f}%")


# ============================================
# 9. Display selected season
# ============================================

print("\n📅 Season")
print("---------")
print(season)


print("\n✅ Crop recommendation completed!")

