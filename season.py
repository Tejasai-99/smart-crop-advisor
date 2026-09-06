# ============================================
# Season-based crop suitability
# ============================================

SEASON_CROPS = {

    "Kharif": {
        "rice",
        "maize",
        "pigeonpeas",
        "mothbeans",
        "mungbean",
        "blackgram",
        "cotton",
        "jute",
        "banana",
        "watermelon",
        "muskmelon"
    },

    "Rabi": {
        "chickpea",
        "kidneybeans",
        "lentil",
        "maize",
        "pigeonpeas",
        "peas",
        "apple",
        "grapes",
        "orange",
        "pomegranate"
    },

    "Zaid": {
        "watermelon",
        "muskmelon",
        "mungbean",
        "blackgram",
        "maize",
        "cucumber",
        "banana",
        "papaya"
    }
}


def is_crop_suitable_for_season(crop, season):

    if season not in SEASON_CROPS:
        return True

    return crop.lower() in {
        c.lower() for c in SEASON_CROPS[season]
    }