import { useState } from "react";
import "./App.css";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  // ==========================================
  // LANGUAGE
  // ==========================================

  const [language, setLanguage] = useState("en");

  // ==========================================
  // CROP RECOMMENDATION STATES
  // ==========================================

  const [file, setFile] = useState(null);
  const [state, setState] = useState("");
  const [village, setVillage] = useState("");
  const [season, setSeason] = useState("Kharif");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // WEATHER STATES
  // ==========================================

  const [weatherState, setWeatherState] = useState("");
  const [weatherVillage, setWeatherVillage] = useState("");

  const [weatherResult, setWeatherResult] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  // ==========================================
  // TRANSLATIONS
  // ==========================================

  const translations = {
    en: {
      logo: "🌱 Smart Farmer AI",

      cropRecommendation: "Crop Recommendation",
      weatherAlerts: "Weather & Alerts",

      heroTitle1: "Smart Farming with",
      heroTitle2: "Artificial Intelligence",
      heroDescription:
        "Get intelligent crop recommendations and weather alerts using your soil report and local weather conditions.",

      recommendCrops: "🌾 Recommend Crops",
      checkWeather: "🌦️ Check Weather",

      cropTitle: "🌾 Crop Recommendation",
      cropDescription:
        "Upload your soil report and enter your farming location to get AI-powered crop recommendations.",

      soilReport: "Soil Report",
      uploadSoil: "Upload JPG, PNG or PDF soil report",

      state: "State",
      village: "Village",
      season: "Farming Season",

      statePlaceholder: "Example: Andhra Pradesh",
      villagePlaceholder: "Example: Mummidivaram",

      kharif: "Kharif",
      rabi: "Rabi",
      zaid: "Zaid",

      analyzing: "🔄 Analyzing...",
      getRecommendation: "🌾 Get Crop Recommendation",

      soilAnalysis: "🧪 Soil Analysis",
      nitrogen: "Nitrogen",
      phosphorus: "Phosphorus",
      potassium: "Potassium",
      ph: "pH",

      weather: "🌦️ Weather",
      temperature: "Temperature",
      humidity: "Humidity",
      rainfall: "Rainfall",
      windSpeed: "Wind Speed",

      aiRecommendation: "🌱 AI Recommendation",
      recommendedCrops: "🌾 Recommended Crops",

      weatherTitle: "🌦️ Weather & Alerts",
      weatherDescription:
        "Check the 7-day weather forecast and agricultural weather alerts for your village.",

      gettingWeather: "🔄 Getting Weather...",
      checkWeatherButton: "🌦️ Check Weather",

      forecastTitle: "🌦️ 7-Day Weather Forecast",
      location: "📍 Location",

      alerts: "⚠️ Alerts",
      noAlerts: "✅ No major weather alerts",

      howItWorks: "How Smart Farmer AI Works",

      uploadStep: "Upload Soil Report",
      uploadStepDesc: "Upload your soil test report.",

      locationStep: "Enter Location",
      locationStepDesc: "Enter your state and village.",

      analysisStep: "AI Analysis",
      analysisStepDesc: "Soil and weather data are analyzed.",

      resultStep: "Get Results",
      resultStepDesc: "Receive recommendations and alerts.",

      footer:
        "© 2026 Smart Farmer AI | AI-powered agricultural decision support",

      uploadError: "Please upload a soil report.",
      fieldsError: "Please fill in all fields.",
      weatherFieldsError: "Please enter State and Village.",
      serverError:
        "Unable to connect to the FastAPI server. Make sure the backend is running.",
      somethingWrong: "Something went wrong.",
      weatherUnavailable: "Unable to get weather data."
    },

    te: {
      logo: "🌱 స్మార్ట్ ఫార్మర్ AI",

      cropRecommendation: "పంట సిఫార్సు",
      weatherAlerts: "వాతావరణం & హెచ్చరికలు",

      heroTitle1: "కృత్రిమ మేధస్సుతో",
      heroTitle2: "స్మార్ట్ వ్యవసాయం",
      heroDescription:
        "మీ నేల నివేదిక మరియు స్థానిక వాతావరణ పరిస్థితుల ఆధారంగా తెలివైన పంట సిఫార్సులు మరియు వాతావరణ హెచ్చరికలను పొందండి.",

      recommendCrops: "🌾 పంటలను సిఫార్సు చేయండి",
      checkWeather: "🌦️ వాతావరణం చూడండి",

      cropTitle: "🌾 పంట సిఫార్సు",
      cropDescription:
        "మీ నేల నివేదికను అప్‌లోడ్ చేసి, మీ వ్యవసాయ ప్రాంతాన్ని నమోదు చేయండి. AI ఆధారిత పంట సిఫార్సులను పొందండి.",

      soilReport: "నేల నివేదిక",
      uploadSoil: "JPG, PNG లేదా PDF నేల నివేదికను అప్‌లోడ్ చేయండి",

      state: "రాష్ట్రం",
      village: "గ్రామం",
      season: "వ్యవసాయ సీజన్",

      statePlaceholder: "ఉదాహరణ: ఆంధ్రప్రదేశ్",
      villagePlaceholder: "ఉదాహరణ: ముమ్మిడివరం",

      kharif: "ఖరీఫ్",
      rabi: "రబీ",
      zaid: "జైద్",

      analyzing: "🔄 విశ్లేషిస్తోంది...",
      getRecommendation: "🌾 పంట సిఫార్సు పొందండి",

      soilAnalysis: "🧪 నేల విశ్లేషణ",
      nitrogen: "నైట్రోజన్",
      phosphorus: "ఫాస్ఫరస్",
      potassium: "పొటాషియం",
      ph: "pH",

      weather: "🌦️ వాతావరణం",
      temperature: "ఉష్ణోగ్రత",
      humidity: "తేమ",
      rainfall: "వర్షపాతం",
      windSpeed: "గాలి వేగం",

      aiRecommendation: "🌱 AI సిఫార్సు",
      recommendedCrops: "🌾 సిఫార్సు చేసిన పంటలు",

      weatherTitle: "🌦️ వాతావరణం & హెచ్చరికలు",
      weatherDescription:
        "మీ గ్రామానికి 7 రోజుల వాతావరణ సూచన మరియు వ్యవసాయ వాతావరణ హెచ్చరికలను చూడండి.",

      gettingWeather: "🔄 వాతావరణాన్ని పొందుతోంది...",
      checkWeatherButton: "🌦️ వాతావరణం చూడండి",

      forecastTitle: "🌦️ 7 రోజుల వాతావరణ సూచన",
      location: "📍 ప్రాంతం",

      alerts: "⚠️ హెచ్చరికలు",
      noAlerts: "✅ ముఖ్యమైన వాతావరణ హెచ్చరికలు లేవు",

      howItWorks: "స్మార్ట్ ఫార్మర్ AI ఎలా పనిచేస్తుంది",

      uploadStep: "నేల నివేదిక అప్‌లోడ్",
      uploadStepDesc: "మీ నేల పరీక్ష నివేదికను అప్‌లోడ్ చేయండి.",

      locationStep: "ప్రాంతాన్ని నమోదు చేయండి",
      locationStepDesc: "మీ రాష్ట్రం మరియు గ్రామాన్ని నమోదు చేయండి.",

      analysisStep: "AI విశ్లేషణ",
      analysisStepDesc: "నేల మరియు వాతావరణ డేటాను విశ్లేషిస్తుంది.",

      resultStep: "ఫలితాలను పొందండి",
      resultStepDesc: "పంట సిఫార్సులు మరియు హెచ్చరికలను పొందండి.",

      footer:
        "© 2026 Smart Farmer AI | AI ఆధారిత వ్యవసాయ నిర్ణయ సహాయక వ్యవస్థ",

      uploadError: "దయచేసి నేల నివేదికను అప్‌లోడ్ చేయండి.",
      fieldsError: "దయచేసి అన్ని వివరాలను నమోదు చేయండి.",
      weatherFieldsError: "దయచేసి రాష్ట్రం మరియు గ్రామాన్ని నమోదు చేయండి.",
      serverError:
        "FastAPI సర్వర్‌కు కనెక్ట్ కాలేకపోయింది. Backend నడుస్తుందో లేదో చూడండి.",
      somethingWrong: "ఏదో తప్పు జరిగింది.",
      weatherUnavailable: "వాతావరణ డేటాను పొందలేకపోయాము."
    },

    hi: {
      logo: "🌱 स्मार्ट फार्मर AI",

      cropRecommendation: "फसल की सिफारिश",
      weatherAlerts: "मौसम और चेतावनी",

      heroTitle1: "कृत्रिम बुद्धिमत्ता के साथ",
      heroTitle2: "स्मार्ट खेती",
      heroDescription:
        "अपनी मिट्टी की रिपोर्ट और स्थानीय मौसम की स्थिति के आधार पर स्मार्ट फसल सिफारिश और मौसम चेतावनी प्राप्त करें।",

      recommendCrops: "🌾 फसल की सिफारिश करें",
      checkWeather: "🌦️ मौसम देखें",

      cropTitle: "🌾 फसल की सिफारिश",
      cropDescription:
        "अपनी मिट्टी की रिपोर्ट अपलोड करें और अपना कृषि स्थान दर्ज करके AI आधारित फसल सिफारिश प्राप्त करें।",

      soilReport: "मिट्टी की रिपोर्ट",
      uploadSoil: "JPG, PNG या PDF मिट्टी की रिपोर्ट अपलोड करें",

      state: "राज्य",
      village: "गाँव",
      season: "कृषि मौसम",

      statePlaceholder: "उदाहरण: आंध्र प्रदेश",
      villagePlaceholder: "उदाहरण: मुम्मिडिवरम",

      kharif: "खरीफ",
      rabi: "रबी",
      zaid: "जायद",

      analyzing: "🔄 विश्लेषण हो रहा है...",
      getRecommendation: "🌾 फसल की सिफारिश प्राप्त करें",

      soilAnalysis: "🧪 मिट्टी का विश्लेषण",
      nitrogen: "नाइट्रोजन",
      phosphorus: "फॉस्फोरस",
      potassium: "पोटैशियम",
      ph: "pH",

      weather: "🌦️ मौसम",
      temperature: "तापमान",
      humidity: "आर्द्रता",
      rainfall: "वर्षा",
      windSpeed: "हवा की गति",

      aiRecommendation: "🌱 AI सिफारिश",
      recommendedCrops: "🌾 अनुशंसित फसलें",

      weatherTitle: "🌦️ मौसम और चेतावनी",
      weatherDescription:
        "अपने गाँव के लिए 7 दिनों का मौसम पूर्वानुमान और कृषि मौसम चेतावनी देखें।",

      gettingWeather: "🔄 मौसम प्राप्त हो रहा है...",
      checkWeatherButton: "🌦️ मौसम देखें",

      forecastTitle: "🌦️ 7 दिनों का मौसम पूर्वानुमान",
      location: "📍 स्थान",

      alerts: "⚠️ चेतावनी",
      noAlerts: "✅ कोई बड़ी मौसम चेतावनी नहीं",

      howItWorks: "स्मार्ट फार्मर AI कैसे काम करता है",

      uploadStep: "मिट्टी की रिपोर्ट अपलोड करें",
      uploadStepDesc: "अपनी मिट्टी की परीक्षण रिपोर्ट अपलोड करें।",

      locationStep: "स्थान दर्ज करें",
      locationStepDesc: "अपना राज्य और गाँव दर्ज करें।",

      analysisStep: "AI विश्लेषण",
      analysisStepDesc: "मिट्टी और मौसम के डेटा का विश्लेषण किया जाता है।",

      resultStep: "परिणाम प्राप्त करें",
      resultStepDesc: "फसल सिफारिश और चेतावनी प्राप्त करें।",

      footer:
        "© 2026 Smart Farmer AI | AI आधारित कृषि निर्णय सहायता प्रणाली",

      uploadError: "कृपया मिट्टी की रिपोर्ट अपलोड करें।",
      fieldsError: "कृपया सभी विवरण भरें।",
      weatherFieldsError: "कृपया राज्य और गाँव दर्ज करें।",
      serverError:
        "FastAPI सर्वर से कनेक्ट नहीं हो सका। सुनिश्चित करें कि Backend चल रहा है।",
      somethingWrong: "कुछ गलत हो गया।",
      weatherUnavailable: "मौसम का डेटा प्राप्त नहीं हो सका।"
    }
  };

  const t = translations[language];

  // ==========================================
  // CROP NAME TRANSLATIONS
  // ==========================================

  const cropTranslations = {
    rice: {
      en: "Rice",
      te: "వరి",
      hi: "चावल"
    },
    maize: {
      en: "Maize",
      te: "మొక్కజొన్న",
      hi: "मक्का"
    },
    chickpea: {
      en: "Chickpea",
      te: "శనగ",
      hi: "चना"
    },
    kidneybeans: {
      en: "Kidney Beans",
      te: "రాజ్మా",
      hi: "राजमा"
    },
    pigeonpeas: {
      en: "Pigeon Peas",
      te: "కందులు",
      hi: "अरहर दाल"
    },
    mothbeans: {
      en: "Moth Beans",
      te: "మొత్ బీన్స్",
      hi: "मोठ बीन्स"
    },
    mungbean: {
      en: "Mung Bean",
      te: "పెసలు",
      hi: "मूंग"
    },
    blackgram: {
      en: "Black Gram",
      te: "మినుములు",
      hi: "उड़द"
    },
    lentil: {
      en: "Lentil",
      te: "మసూర్ పప్పు",
      hi: "मसूर"
    },
    pomegranate: {
      en: "Pomegranate",
      te: "దానిమ్మ",
      hi: "अनार"
    },
    banana: {
      en: "Banana",
      te: "అరటి",
      hi: "केला"
    },
    mango: {
      en: "Mango",
      te: "మామిడి",
      hi: "आम"
    },
    grapes: {
      en: "Grapes",
      te: "ద్రాక్ష",
      hi: "अंगूर"
    },
    watermelon: {
      en: "Watermelon",
      te: "పుచ్చకాయ",
      hi: "तरबूज"
    },
    muskmelon: {
      en: "Muskmelon",
      te: "ఖర్బూజ",
      hi: "खरबूजा"
    },
    apple: {
      en: "Apple",
      te: "ఆపిల్",
      hi: "सेब"
    },
    orange: {
      en: "Orange",
      te: "నారింజ",
      hi: "संतरा"
    },
    papaya: {
      en: "Papaya",
      te: "బొప్పాయి",
      hi: "पपीता"
    },
    coconut: {
      en: "Coconut",
      te: "కొబ్బరి",
      hi: "नारियल"
    },
    cotton: {
      en: "Cotton",
      te: "పత్తి",
      hi: "कपास"
    },
    jute: {
      en: "Jute",
      te: "జనపనార",
      hi: "जूट"
    },
    coffee: {
      en: "Coffee",
      te: "కాఫీ",
      hi: "कॉफी"
    }
  };

  const getCropName = (crop) => {
    const key = String(crop).toLowerCase();

    if (cropTranslations[key]) {
      return cropTranslations[key][language];
    }

    return crop;
  };

  // ==========================================
  // ALERT TRANSLATIONS
  // ==========================================

  const translateAlert = (alert) => {
    if (language === "en") return alert;

    if (language === "te") {
      if (alert.includes("HEAVY RAIN ALERT")) {
        return "🌧️ భారీ వర్ష హెచ్చరిక: భారీ వర్షపాతం అంచనా వేయబడింది. పొలాల్లో నీటి పారుదల సక్రమంగా ఉండేలా చూసుకోండి మరియు కోత కోసిన పంటలను రక్షించండి.";
      }

      if (alert.includes("RAIN ALERT")) {
        return "🌧️ వర్ష హెచ్చరిక: గణనీయమైన వర్షపాతం అంచనా వేయబడింది. పొలాల్లో నీరు నిలిచిపోకుండా జాగ్రత్త వహించండి.";
      }

      if (alert.includes("EXTREME HEAT ALERT")) {
        return "🔥 తీవ్రమైన వేడి హెచ్చరిక: చాలా అధిక ఉష్ణోగ్రత అంచనా వేయబడింది. పంటలు మరియు పశువుల కోసం తగిన జాగ్రత్తలు తీసుకోండి.";
      }

      if (alert.includes("HIGH TEMPERATURE")) {
        return "🌡️ అధిక ఉష్ణోగ్రత: అధిక ఉష్ణోగ్రత అంచనా వేయబడింది. పంటల్లో వేడి ఒత్తిడిని గమనించండి.";
      }

      if (alert.includes("STRONG WIND ALERT")) {
        return "💨 బలమైన గాలి హెచ్చరిక: బలమైన గాలులు అంచనా వేయబడ్డాయి. బలహీనమైన వ్యవసాయ నిర్మాణాలను భద్రపరచండి.";
      }

      if (alert.includes("WIND WARNING")) {
        return "💨 గాలి హెచ్చరిక: బలమైన గాలులు వీచే అవకాశం ఉంది. అవసరమైన జాగ్రత్తలు తీసుకోండి.";
      }

      if (alert.includes("THUNDERSTORM ALERT")) {
        return "⛈️ ఉరుములతో కూడిన వర్షం హెచ్చరిక: ఉరుములతో కూడిన వర్షం అంచనా వేయబడింది. అవసరమైన భద్రతా జాగ్రత్తలు తీసుకోండి.";
      }
    }

    if (language === "hi") {
      if (alert.includes("HEAVY RAIN ALERT")) {
        return "🌧️ भारी वर्षा चेतावनी: भारी बारिश होने की संभावना है। खेतों में जल निकासी की व्यवस्था देखें और कटी हुई फसलों को सुरक्षित रखें।";
      }

      if (alert.includes("RAIN ALERT")) {
        return "🌧️ वर्षा चेतावनी: महत्वपूर्ण वर्षा होने की संभावना है। खेतों में जलभराव पर नजर रखें।";
      }

      if (alert.includes("EXTREME HEAT ALERT")) {
        return "🔥 अत्यधिक गर्मी चेतावनी: बहुत अधिक तापमान होने की संभावना है। फसलों और पशुओं के लिए उचित सावधानी बरतें।";
      }

      if (alert.includes("HIGH TEMPERATURE")) {
        return "🌡️ उच्च तापमान: अधिक तापमान होने की संभावना है। फसलों पर गर्मी के प्रभाव पर नजर रखें।";
      }

      if (alert.includes("STRONG WIND ALERT")) {
        return "💨 तेज हवा चेतावनी: तेज हवाएं चलने की संभावना है। कमजोर कृषि संरचनाओं को सुरक्षित करें।";
      }

      if (alert.includes("WIND WARNING")) {
        return "💨 हवा चेतावनी: तेज हवाएं चल सकती हैं। आवश्यक सावधानी बरतें।";
      }

      if (alert.includes("THUNDERSTORM ALERT")) {
        return "⛈️ आंधी-तूफान चेतावनी: गरज के साथ बारिश होने की संभावना है। आवश्यक सुरक्षा सावधानी बरतें।";
      }
    }

    return alert;
  };

  // ==========================================
  // CROP RECOMMENDATION
  // ==========================================

  const handleRecommendation = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);

    if (!file) {
      setError(t.uploadError);
      return;
    }

    if (!state || !village || !season) {
      setError(t.fieldsError);
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("state", state);
    formData.append("village", village);
    formData.append("season", season);

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/recommend`,
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || t.somethingWrong);
        return;
      }

      setResult(data);

    } catch (err) {
      setError(t.serverError);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // WEATHER
  // ==========================================

  const handleWeather = async (e) => {
    e.preventDefault();

    setWeatherError("");
    setWeatherResult(null);

    if (!weatherState || !weatherVillage) {
      setWeatherError(t.weatherFieldsError);
      return;
    }

    try {
      setWeatherLoading(true);

      const url =
        `${API_URL}/weather` +
        `?state=${encodeURIComponent(weatherState)}` +
        `&village=${encodeURIComponent(weatherVillage)}`;

      const response = await fetch(url);

      const data = await response.json();

      if (!response.ok || !data.success) {
        setWeatherError(
          data.message || t.weatherUnavailable
        );
        return;
      }

      setWeatherResult(data);

    } catch (err) {
      setWeatherError(t.serverError);
    } finally {
      setWeatherLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="app">

      {/* =====================================
          HEADER
      ====================================== */}

      <header className="header">

        <div className="logo">
          {t.logo}
        </div>

        <nav>
          <a href="#crop">
            {t.cropRecommendation}
          </a>

          <a href="#weather">
            {t.weatherAlerts}
          </a>
        </nav>

        {/* LANGUAGE SELECTOR */}

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "7px",
            border: "1px solid #d1d5db",
            background: "white",
            color: "#166534",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          <option value="en">English</option>
          <option value="te">తెలుగు</option>
          <option value="hi">हिन्दी</option>
        </select>

      </header>


      {/* =====================================
          HERO
      ====================================== */}

      <section className="hero">

        <div className="hero-content">

          <h1>
            {t.heroTitle1}
            <span>{t.heroTitle2}</span>
          </h1>

          <p>
            {t.heroDescription}
          </p>

          <div className="hero-buttons">

            <a
              href="#crop"
              className="primary-button"
            >
              {t.recommendCrops}
            </a>

            <a
              href="#weather"
              className="secondary-button"
            >
              {t.checkWeather}
            </a>

          </div>

        </div>

      </section>


      {/* =====================================
          CROP RECOMMENDATION
      ====================================== */}

      <section
        className="crop-section"
        id="crop"
      >

        <div className="section-container">

          <h2>
            {t.cropTitle}
          </h2>

          <p className="section-description">
            {t.cropDescription}
          </p>


          <form
            className="recommendation-form"
            onSubmit={handleRecommendation}
          >

            {/* Soil Report */}

            <div className="form-group">

              <label>
                {t.soilReport}
              </label>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }
              />

              <small>
                {t.uploadSoil}
              </small>

            </div>


            {/* State */}

            <div className="form-group">

              <label>
                {t.state}
              </label>

              <input
                type="text"
                placeholder={t.statePlaceholder}
                value={state}
                onChange={(e) =>
                  setState(e.target.value)
                }
              />

            </div>


            {/* Village */}

            <div className="form-group">

              <label>
                {t.village}
              </label>

              <input
                type="text"
                placeholder={t.villagePlaceholder}
                value={village}
                onChange={(e) =>
                  setVillage(e.target.value)
                }
              />

            </div>


            {/* Season */}

            <div className="form-group">

              <label>
                {t.season}
              </label>

              <select
                value={season}
                onChange={(e) =>
                  setSeason(e.target.value)
                }
              >

                <option value="Kharif">
                  {t.kharif}
                </option>

                <option value="Rabi">
                  {t.rabi}
                </option>

                <option value="Zaid">
                  {t.zaid}
                </option>

              </select>

            </div>


            {/* Error */}

            {error && (
              <div className="error-message">
                ❌ {error}
              </div>
            )}


            {/* Submit */}

            <button
              type="submit"
              className="recommend-button"
              disabled={loading}
            >

              {loading
                ? t.analyzing
                : t.getRecommendation}

            </button>

          </form>


          {/* =================================
              CROP RESULTS
          ================================== */}

          {result && (

            <div className="results">

              <h2>
                {t.aiRecommendation}
              </h2>


              {/* Soil */}

              <div className="result-card">

                <h3>
                  {t.soilAnalysis}
                </h3>

                <p>
                  {t.nitrogen}:{" "}
                  <strong>
                    {result.soil.nitrogen}
                  </strong>
                </p>

                <p>
                  {t.phosphorus}:{" "}
                  <strong>
                    {result.soil.phosphorus}
                  </strong>
                </p>

                <p>
                  {t.potassium}:{" "}
                  <strong>
                    {result.soil.potassium}
                  </strong>
                </p>

                <p>
                  {t.ph}:{" "}
                  <strong>
                    {result.soil.ph}
                  </strong>
                </p>

              </div>


              {/* Weather used for recommendation */}

              <div className="result-card">

                <h3>
                  {t.weather}
                </h3>

                <p>
                  {t.temperature}:{" "}
                  <strong>
                    {result.weather.temperature} °C
                  </strong>
                </p>

                <p>
                  {t.humidity}:{" "}
                  <strong>
                    {result.weather.humidity} %
                  </strong>
                </p>

                <p>
                  {t.rainfall}:{" "}
                  <strong>
                    {result.weather.rainfall} mm
                  </strong>
                </p>

                <p>
                  {t.windSpeed}:{" "}
                  <strong>
                    {result.weather.wind_speed} km/h
                  </strong>
                </p>

              </div>


              {/* Recommended Crops */}

              <div className="result-card">

                <h3>
                  {t.recommendedCrops}
                </h3>

                {result.recommendations.map(
                  (item, index) => (

                    <div
                      className="crop-result"
                      key={index}
                    >

                      <span>
                        {index + 1}.{" "}
                        {getCropName(item.crop)}
                      </span>

                      <strong>
                        {item.probability}%
                      </strong>

                    </div>

                  )
                )}

              </div>

            </div>

          )}

        </div>

      </section>


      {/* =====================================
          WEATHER SECTION
      ====================================== */}

      <section
        className="weather-section"
        id="weather"
      >

        <div className="section-container">

          <h2>
            {t.weatherTitle}
          </h2>

          <p className="section-description">
            {t.weatherDescription}
          </p>


          {/* Weather Form */}

          <form
            className="recommendation-form"
            onSubmit={handleWeather}
          >

            {/* State */}

            <div className="form-group">

              <label>
                {t.state}
              </label>

              <input
                type="text"
                placeholder={t.statePlaceholder}
                value={weatherState}
                onChange={(e) =>
                  setWeatherState(e.target.value)
                }
              />

            </div>


            {/* Village */}

            <div className="form-group">

              <label>
                {t.village}
              </label>

              <input
                type="text"
                placeholder={t.villagePlaceholder}
                value={weatherVillage}
                onChange={(e) =>
                  setWeatherVillage(e.target.value)
                }
              />

            </div>


            {/* Error */}

            {weatherError && (
              <div className="error-message">
                ❌ {weatherError}
              </div>
            )}


            {/* Weather Button */}

            <button
              type="submit"
              className="weather-button"
              disabled={weatherLoading}
            >

              {weatherLoading
                ? t.gettingWeather
                : t.checkWeatherButton}

            </button>

          </form>


          {/* =================================
              WEATHER RESULTS
          ================================== */}

          {weatherResult && (

            <div className="results">

              <h2>
                {t.forecastTitle}
              </h2>


              {/* Location */}

              <div className="result-card">

                <h3>
                  {t.location}
                </h3>

                <p>
                  {t.village}:{" "}
                  <strong>
                    {weatherResult.location.name}
                  </strong>
                </p>

                <p>
                  {t.state}:{" "}
                  <strong>
                    {weatherResult.location.state}
                  </strong>
                </p>

              </div>


              {/* Forecast */}

              {weatherResult.forecast.map(
                (day, index) => (

                  <div
                    className="result-card weather-day"
                    key={index}
                  >

                    <h3>
                      📅 {day.date}
                    </h3>

                    <p>
                      🌡️ {t.temperature}:{" "}
                      <strong>
                        {day.min_temperature}°C -
                        {day.max_temperature}°C
                      </strong>
                    </p>

                    <p>
                      🌧️ {t.rainfall}:{" "}
                      <strong>
                        {day.rainfall} mm
                      </strong>
                    </p>

                    <p>
                      💨 {t.windSpeed}:{" "}
                      <strong>
                        {day.wind_speed} km/h
                      </strong>
                    </p>


                    {/* Alerts */}

                    {day.alerts &&
                      day.alerts.length > 0 && (

                        <div className="alerts">

                          <h4>
                            {t.alerts}
                          </h4>

                          {day.alerts.map(
                            (alert, alertIndex) => (

                              <p
                                key={alertIndex}
                                className="alert"
                              >
                                {translateAlert(alert)}
                              </p>

                            )
                          )}

                        </div>

                      )}


                    {!day.alerts ||
                    day.alerts.length === 0 ? (

                      <p className="no-alert">
                        {t.noAlerts}
                      </p>

                    ) : null}

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </section>


      {/* =====================================
          HOW IT WORKS
      ====================================== */}

      <section className="how-it-works">

        <h2>
          {t.howItWorks}
        </h2>

        <div className="steps">

          <div className="step">

            <span>1</span>

            <h3>
              {t.uploadStep}
            </h3>

            <p>
              {t.uploadStepDesc}
            </p>

          </div>


          <div className="step">

            <span>2</span>

            <h3>
              {t.locationStep}
            </h3>

            <p>
              {t.locationStepDesc}
            </p>

          </div>


          <div className="step">

            <span>3</span>

            <h3>
              {t.analysisStep}
            </h3>

            <p>
              {t.analysisStepDesc}
            </p>

          </div>


          <div className="step">

            <span>4</span>

            <h3>
              {t.resultStep}
            </h3>

            <p>
              {t.resultStepDesc}
            </p>

          </div>

        </div>

      </section>


      {/* =====================================
          FOOTER
      ====================================== */}

      <footer>

        <p>
          {t.footer}
        </p>

      </footer>

    </div>
  );
}

export default App;