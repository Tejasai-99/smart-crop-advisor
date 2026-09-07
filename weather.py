import requests


# ============================================
# Find location
# ============================================

def get_location(village, state):

    url = "https://geocoding-api.open-meteo.com/v1/search"

    params = {
        "name": village,
        "count": 10,
        "language": "en",
        "format": "json"
    }

    try:
        response = requests.get(url, params=params, timeout=15)

        print("📍 Location API status:", response.status_code)

        if response.status_code != 200:
            print("❌ Location API response:", response.text)
            return None

        data = response.json()

        if "results" not in data:
            print("❌ Location not found")
            return None

        # Try to find matching state
        for place in data["results"]:

            admin1 = place.get("admin1", "")

            if state.lower() in admin1.lower():

                location = {
                    "name": place["name"],
                    "state": admin1,
                    "latitude": place["latitude"],
                    "longitude": place["longitude"]
                }

                print("📍 Location found:", location)

                return location

        print("❌ No matching location found for state:", state)

        return None

    except Exception as e:

        print("❌ Location API exception:", str(e))

        return None


# ============================================
# Get 7-day weather forecast
# ============================================

def get_forecast(latitude, longitude):

    url = "https://api.open-meteo.com/v1/forecast"

    params = {

        "latitude": latitude,
        "longitude": longitude,

        "daily": (
            "weather_code,"
            "temperature_2m_max,"
            "temperature_2m_min,"
            "precipitation_sum,"
            "wind_speed_10m_max"
        ),

        "hourly": "relative_humidity_2m",

        "forecast_days": 7,

        "timezone": "auto"
    }

    try:

        response = requests.get(
            url,
            params=params,
            timeout=15
        )

        # Print status for debugging
        print("🌦️ Weather API status:", response.status_code)

        # If API returns an error
        if response.status_code != 200:

            print("❌ Weather API response:")
            print(response.text)

            return None

        # Convert response to JSON
        data = response.json()

        print("✅ Weather data received successfully")

        return data

    except requests.exceptions.Timeout:

        print("❌ Weather API timeout")

        return None

    except requests.exceptions.RequestException as e:

        print("❌ Weather API request error:", str(e))

        return None

    except Exception as e:

        print("❌ Weather API exception:", str(e))

        return None


# ============================================
# Weather condition
# ============================================

def weather_description(code):

    if code == 0:
        return "Clear sky"

    elif code in [1, 2, 3]:
        return "Partly cloudy / Cloudy"

    elif code in [45, 48]:
        return "Fog"

    elif code in [51, 53, 55, 56, 57]:
        return "Drizzle"

    elif code in [61, 63, 65, 66, 67]:
        return "Rain"

    elif code in [71, 73, 75, 77]:
        return "Snow"

    elif code in [80, 81, 82]:
        return "Rain showers"

    elif code in [95, 96, 99]:
        return "Thunderstorm"

    else:
        return "Unknown"


# ============================================
# Analyze weather risks
# ============================================

def analyze_weather(
    max_temp,
    rainfall,
    wind_speed,
    weather_code
):

    alerts = []

    # ========================================
    # Heavy rain
    # ========================================

    if rainfall >= 50:

        alerts.append(
            "🌧️ HEAVY RAIN ALERT: "
            "Heavy rainfall is expected. "
            "Check field drainage and protect harvested crops."
        )

    elif rainfall >= 20:

        alerts.append(
            "🌧️ RAIN ALERT: "
            "Significant rainfall is expected. "
            "Monitor your fields for waterlogging."
        )

    # ========================================
    # Extreme heat
    # ========================================

    if max_temp >= 40:

        alerts.append(
            "🔥 EXTREME HEAT ALERT: "
            "Very high temperature is expected. "
            "Take appropriate precautions for crops and livestock."
        )

    elif max_temp >= 35:

        alerts.append(
            "🌡️ HIGH TEMPERATURE: "
            "High temperature is expected. "
            "Monitor crops for heat stress."
        )

    # ========================================
    # Strong wind
    # ========================================

    if wind_speed >= 50:

        alerts.append(
            "💨 STRONG WIND ALERT: "
            "Strong winds are expected. "
            "Secure vulnerable farm structures."
        )

    elif wind_speed >= 35:

        alerts.append(
            "💨 WIND WARNING: "
            "Strong winds may occur. "
            "Take necessary precautions."
        )

    # ========================================
    # Thunderstorm
    # ========================================

    if weather_code in [95, 96, 99]:

        alerts.append(
            "⛈️ THUNDERSTORM ALERT: "
            "Thunderstorms are expected. "
            "Take necessary safety precautions."
        )

    return alerts


# ============================================
# Main program
# ============================================