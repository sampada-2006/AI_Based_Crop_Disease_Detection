import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Upload,
  Sprout,
  Languages,
  CheckCircle2,
  AlertTriangle,
  Eye,
  RotateCcw,
  Activity,
  ShieldCheck,
} from "lucide-react";

// Hardcoded mock samples for evaluation
// Reliable inline SVG sample images (No internet dependency required)
const SAMPLE_LEAF_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%23e2e8f0"/><path d="M300,80 C180,120 120,240 220,320 C320,400 420,280 380,180 Z" fill="%232e7d32"/><path d="M300,80 L280,320" stroke="%23fef08a" stroke-width="4"/><circle cx="260" cy="180" r="16" fill="%23854d0e" opacity="0.8"/><circle cx="310" cy="230" r="22" fill="%23854d0e" opacity="0.8"/><circle cx="230" cy="250" r="14" fill="%23854d0e" opacity="0.8"/><text x="300" y="370" font-family="sans-serif" font-size="18" font-weight="bold" fill="%23334155" text-anchor="middle">Tomato Leaf Sample (Tomato / टमाटर)</text></svg>`;

const GRAD_CAM_LEAF_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%23e2e8f0"/><path d="M300,80 C180,120 120,240 220,320 C320,400 420,280 380,180 Z" fill="%232e7d32"/><path d="M300,80 L280,320" stroke="%23fef08a" stroke-width="4"/><circle cx="260" cy="180" r="35" fill="%23ef4444" opacity="0.75"/><circle cx="310" cy="230" r="45" fill="%23f97316" opacity="0.75"/><circle cx="230" cy="250" r="30" fill="%23eab308" opacity="0.75"/><text x="300" y="370" font-family="sans-serif" font-size="18" font-weight="bold" fill="%23d97706" text-anchor="middle">Grad-CAM Heatmap Active (High Focus Area)</text></svg>`;

const MOCK_DATA = {
  earlyBlight: {
    diseaseEn: "Early Blight",
    diseaseMr: "अर्ली ब्लाइट (तांबेरा)",
    cropEn: "Tomato",
    cropMr: "टमाटर",
    confidence: 94,
    rawImage: SAMPLE_LEAF_SVG,
    gradCamImage: GRAD_CAM_LEAF_SVG,
    explainer: {
      en: "The highlighted (red/orange) spots show concentric dark rings with yellowing edges — a classic sign of Early Blight. This pattern usually spreads from older, lower leaves upward, especially in warm, humid conditions.",
      mr: "लाल/नारंगी रंगात दाखवलेले भाग गडद वर्तुळाकार ठिपके व पिवळसर कडा दर्शवतात — हे अर्ली ब्लाइटचे ठळक लक्षण आहे. हा रोग सहसा जुन्या, खालच्या पानांपासून सुरू होऊन वरच्या दिशेने पसरतो, विशेषतः उष्ण व दमट वातावरणात.",
    },
    outbreak: {
      count: 12,
      districtEn: "your district",
      districtMr: "तुमच्या जिल्ह्यात",
      trend: "rising", // "rising" | "stable" | "falling"
    },
    advisory: {
      organic: {
        en: [
          "Prune and destroy infected lower leaves immediately.",
          "Water at the base of the plant, avoiding leaf wetness.",
          "Apply neem oil spray every 5-7 days as a preventive measure.",
        ],
        mr: [
          "बाधित पाने लगेच कापून नष्ट करा.",
          "झाडाच्या मुळाशी पाणी द्या, पानांवर पाणी साचू देऊ नका.",
          "प्रतिबंधात्मक उपाय म्हणून दर ५-७ दिवसांनी निंबोळी तेलाची फवारणी करा.",
        ],
      },
      chemical: {
        en: [
          "Apply copper-based fungicide according to package directions.",
          "Use Mancozeb 75% WP at 2-2.5 g/liter of water, spray every 10 days.",
          "Always wear gloves and mask during spraying; avoid spraying before rain.",
        ],
        mr: [
          "कॉपरयुक्त बुरशीनाशकाची योग्य प्रमाणात फवारणी करा.",
          "मॅन्कोझेब ७५% डब्ल्यूपी २-२.५ ग्रॅम प्रति लिटर पाण्यात मिसळून दर १० दिवसांनी फवारणी करा.",
          "फवारणी करताना हातमोजे व मास्क वापरा; पावसापूर्वी फवारणी टाळा.",
        ],
      },
    },
  },

  mediumConfidence: {
    diseaseEn: "Early Blight",
    diseaseMr: "अर्ली ब्लाइट (तांबेरा)",
    cropEn: "Tomato",
    cropMr: "टमाटर",
    confidence: 72,
    rawImage: SAMPLE_LEAF_SVG,
    gradCamImage: GRAD_CAM_LEAF_SVG,
    explainer: {
      en: "The highlighted (red/orange) spots show concentric dark rings with yellowing edges — a classic sign of Early Blight. This pattern usually spreads from older, lower leaves upward, especially in warm, humid conditions.",
      mr: "लाल/नारंगी रंगात दाखवलेले भाग गडद वर्तुळाकार ठिपके व पिवळसर कडा दर्शवतात — हे अर्ली ब्लाइटचे ठळक लक्षण आहे. हा रोग सहसा जुन्या, खालच्या पानांपासून सुरू होऊन वरच्या दिशेने पसरतो, विशेषतः उष्ण व दमट वातावरणात.",
    },
    outbreak: {
      count: 12,
      districtEn: "your district",
      districtMr: "तुमच्या जिल्ह्यात",
      trend: "rising", // "rising" | "stable" | "falling"
    },
    advisory: {
      organic: {
        en: [
          "Prune and destroy infected lower leaves immediately.",
          "Water at the base of the plant, avoiding leaf wetness.",
          "Apply neem oil spray every 5-7 days as a preventive measure.",
        ],
        mr: [
          "बाधित पाने लगेच कापून नष्ट करा.",
          "झाडाच्या मुळाशी पाणी द्या, पानांवर पाणी साचू देऊ नका.",
          "प्रतिबंधात्मक उपाय म्हणून दर ५-७ दिवसांनी निंबोळी तेलाची फवारणी करा.",
        ],
      },
      chemical: {
        en: [
          "Apply copper-based fungicide according to package directions.",
          "Use Mancozeb 75% WP at 2-2.5 g/liter of water, spray every 10 days.",
          "Always wear gloves and mask during spraying; avoid spraying before rain.",
        ],
        mr: [
          "कॉपरयुक्त बुरशीनाशकाची योग्य प्रमाणात फवारणी करा.",
          "मॅन्कोझेब ७५% डब्ल्यूपी २-२.५ ग्रॅम प्रति लिटर पाण्यात मिसळून दर १० दिवसांनी फवारणी करा.",
          "फवारणी करताना हातमोजे व मास्क वापरा; पावसापूर्वी फवारणी टाळा.",
        ],
      },
    },
  },

  lowConfidence: {
    cropEn: "Tomato",
    cropMr: "टमाटर",
    confidence: 52,
    rawImage: SAMPLE_LEAF_SVG,
    gradCamImage: GRAD_CAM_LEAF_SVG,
    alternates: [
      { diseaseEn: "Early Blight", diseaseMr: "अर्ली ब्लाइट", confidence: 52 },
      {
        diseaseEn: "Septoria Leaf Spot",
        diseaseMr: "सेप्टोरिया लीफ स्पॉट",
        confidence: 41,
      },
    ],
  },
};

// Classifies a confidence number into a UI tier
const getConfidenceTier = (confidence) => {
  if (confidence >= 85) return "high";
  if (confidence >= 60) return "medium";
  return "low";
};
const getTrendIcon = (trend) => {
  if (trend === "rising") return "📈";
  if (trend === "falling") return "📉";
  return "➖";
};
// Mock weather states for advisory timing demonstration
const WEATHER_STATES = {
  clear: {
    condition: "clear",
    icon: "☀️",
    labelEn: "Clear skies",
    labelMr: "स्वच्छ आकाश",
    adviceEn: "Good time to spray — no rain expected for 24 hours.",
    adviceMr: "फवारणीसाठी योग्य वेळ — पुढील २४ तासांत पाऊस अपेक्षित नाही.",
    safe: true,
  },
  rainSoon: {
    condition: "rainSoon",
    icon: "🌧️",
    labelEn: "Rain expected in 6 hrs",
    labelMr: "६ तासांत पाऊस अपेक्षित",
    adviceEn:
      "Avoid spraying now — rain may wash away treatment before it works.",
    adviceMr: "आत्ता फवारणी टाळा — पाऊस औषध वाहून नेऊ शकतो.",
    safe: false,
  },
  highWind: {
    condition: "highWind",
    icon: "💨",
    labelEn: "High wind advisory",
    labelMr: "जोरदार वाऱ्याचा इशारा",
    adviceEn:
      "Spraying not recommended — wind may cause uneven coverage and drift.",
    adviceMr: "फवारणी करू नका — वाऱ्यामुळे औषध असमान पसरू शकते.",
    safe: false,
  },
};
const ONBOARDING_STEPS = [
  {
    icon: "📸",
    titleEn: "Upload a Leaf Photo",
    titleMr: "पानाचा फोटो अपलोड करा",
    descEn:
      "Take or upload a clear photo of the affected leaf on the left panel.",
    descMr: "डाव्या बाजूला बाधित पानाचा स्पष्ट फोटो घ्या किंवा अपलोड करा.",
  },
  {
    icon: "🔍",
    titleEn: "Get Instant Analysis",
    titleMr: "त्वरित विश्लेषण मिळवा",
    descEn:
      "Our system checks photo quality, then analyzes it for diseases in seconds.",
    descMr:
      "प्रणाली फोटोची गुणवत्ता तपासते, नंतर काही सेकंदात रोगाचे विश्लेषण करते.",
  },
  {
    icon: "🌿",
    titleEn: "View Advisory & Treatment",
    titleMr: "सल्ला व उपचार पहा",
    descEn:
      "See the diagnosis, why it was detected, and organic or chemical treatment steps.",
    descMr:
      "निदान, ते का आढळले, आणि सेंद्रिय किंवा रासायनिक उपचार पायऱ्या पहा.",
  },
  {
    icon: "🗂️",
    titleEn: "Revisit Past Scans",
    titleMr: "मागील स्कॅन पुन्हा पहा",
    descEn: "Tap the History button anytime to review previous diagnoses.",
    descMr: "मागील निदाने पाहण्यासाठी कधीही इतिहास बटणावर क्लिक करा.",
  },
];
function ConfidenceBadge({ confidence, tier, t }) {
  const colors = {
    high: "bg-emerald-100 text-emerald-800 border-emerald-200",
    medium: "bg-amber-100 text-amber-800 border-amber-200",
    low: "bg-red-100 text-red-800 border-red-200",
  };

  const labels = {
    high: t("highConfidence"),
    medium: t("mediumConfidence"),
    low: t("lowConfidence"),
  };

  return (
    <span
      className={`text-xs font-bold px-2.5 py-1 rounded-full border ${colors[tier]}`}
    >
      {confidence}% · {labels[tier]}
    </span>
  );
}
function LowConfidenceView({ result, lang, t, isOffline }) {
  return (
    <div className="bg-white p-6 rounded-2xl border-2 border-amber-300 shadow-sm flex-1 flex flex-col justify-between">
      <div>
        {isOffline && (
          <div className="mb-4 p-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-2">
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            {t("offlineSyncNote")}
          </div>
        )}
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-bold text-slate-800">
            {t("notFullySure")}
          </h2>
        </div>

        <p className="text-sm text-slate-600 mb-5">
          {t("lowConfidenceExplainer")}
        </p>

        <div className="space-y-3 mb-6">
          {result.alternates.map((alt, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-xl p-4"
            >
              <span className="text-sm font-semibold text-slate-800">
                {lang === "mr" ? alt.diseaseMr : alt.diseaseEn}
              </span>
              <ConfidenceBadge
                confidence={alt.confidence}
                tier={getConfidenceTier(alt.confidence)}
                t={t}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => alert(t("expertConnectMock"))}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-6 rounded-xl transition flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          {t("askExpertCta")}
        </button>
      </div>
    </div>
  );
}
function OutbreakAlertCard({ outbreak, lang, diseaseName, t }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
      <span className="text-xl leading-none">
        {getTrendIcon(outbreak.trend)}
      </span>
      <div className="text-xs text-red-900">
        <p className="font-bold mb-0.5">{t("outbreakAlertTitle")}</p>
        <p>
          {lang === "mr"
            ? `${outbreak.count} शेतकऱ्यांनी ${outbreak.districtMr} या आठवड्यात "${diseaseName}" नोंदवला आहे.`
            : `${outbreak.count} farmers in ${outbreak.districtEn} reported "${diseaseName}" this week.`}
        </p>
      </div>
    </div>
  );
}
function HistoryPanel({ history, lang, t, onClose, onSelect }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />

      {/* Drawer */}
      <div className="relative bg-white w-full max-w-sm h-full shadow-xl p-5 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800">
            {t("historyTitle")}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-sm font-bold px-2 py-1"
          >
            ✕
          </button>
        </div>

        {history.length === 0 ? (
          <p className="text-sm text-slate-500">{t("historyEmpty")}</p>
        ) : (
          <div className="space-y-3">
            {history.map((entry) => (
              <button
                key={entry.id}
                onClick={() => onSelect(entry)}
                className="w-full flex items-center gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-3 text-left transition"
              >
                <img
                  src={entry.thumbnail}
                  alt=""
                  className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">
                    {lang === "mr" ? entry.diseaseMr : entry.diseaseEn}
                  </p>
                  <p className="text-xs text-slate-500">
                    {lang === "mr" ? entry.cropMr : entry.cropEn} ·{" "}
                    {entry.timestamp}
                  </p>
                </div>
                <ConfidenceBadge
                  confidence={entry.confidence}
                  tier={entry.tier}
                  t={t}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function OnboardingOverlay({ step, lang, t, onNext, onSkip, totalSteps }) {
  const current = ONBOARDING_STEPS[step];
  const isLastStep = step === totalSteps - 1;

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/60 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
        <div className="text-4xl mb-3">{current.icon}</div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">
          {lang === "mr" ? current.titleMr : current.titleEn}
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          {lang === "mr" ? current.descMr : current.descEn}
        </p>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mb-6">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === step ? "bg-emerald-700" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onSkip}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 px-3 py-2"
          >
            {t("onboardingSkip")}
          </button>
          <button
            onClick={onNext}
            className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-2.5 px-5 rounded-xl transition"
          >
            {isLastStep ? t("onboardingDone") : t("onboardingNext")}
          </button>
        </div>
      </div>
    </div>
  );
}
export default function DesktopLayout() {
  const { t, i18n } = useTranslation();

  // App state for UI demonstration
  const [selectedImage, setSelectedImage] = useState(null);
  const [isBlurry, setIsBlurry] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showGradCam, setShowGradCam] = useState(false);
  const [activeResult, setActiveResult] = useState(MOCK_DATA.earlyBlight);
  const [treatmentTab, setTreatmentTab] = useState("organic"); // "organic" | "chemical"
  const [showExplainer, setShowExplainer] = useState(false);
  const [activeWeather, setActiveWeather] = useState(WEATHER_STATES.clear);
  const [isOffline, setIsOffline] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [fontScale, setFontScale] = useState(1); // 1 = 100%, steps of 0.1, range 0.85–1.3
  useEffect(() => {
    document.documentElement.style.fontSize = `${16 * fontScale}px`;
    return () => {
      document.documentElement.style.fontSize = ""; // cleanup on unmount
    };
  }, [fontScale]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "mr" ? "en" : "mr");
  };
  const addToHistory = (mockResult) => {
    const isLow = getConfidenceTier(mockResult.confidence) === "low";
    const entry = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(
        i18n.language === "mr" ? "mr-IN" : "en-IN",
        {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        },
      ),
      thumbnail: mockResult.rawImage,
      confidence: mockResult.confidence,
      tier: getConfidenceTier(mockResult.confidence),
      diseaseEn: isLow ? "Uncertain diagnosis" : mockResult.diseaseEn,
      diseaseMr: isLow ? "अनिश्चित निदान" : mockResult.diseaseMr,
      cropEn: mockResult.cropEn,
      cropMr: mockResult.cropMr,
      mockResult, // keep full object so we can reload it on tap
    };
    setScanHistory((prev) => [entry, ...prev].slice(0, 8)); // keep most recent 8
  };
  const reopenHistoryEntry = (entry) => {
    setSelectedImage(entry.mockResult.rawImage);
    setActiveResult(entry.mockResult);
    setIsBlurry(false);
    setShowResult(true);
    setTreatmentTab("organic");
    setShowExplainer(false);
    setShowHistoryPanel(false);
  };
  const handleOnboardingNext = () => {
    if (onboardingStep < ONBOARDING_STEPS.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setShowOnboarding(false);
    }
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
  };
  // Simulate file upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setShowResult(false);
      setIsBlurry(false);
    }
  };
  const increaseFontSize = () => {
    setFontScale((prev) => Math.min(prev + 0.1, 1.3));
  };

  const decreaseFontSize = () => {
    setFontScale((prev) => Math.max(prev - 0.1, 0.85));
  };

  // Use pre-loaded mock leaf for quick presentation
  const loadMockLeaf = (mockResult, blurry = false) => {
    setSelectedImage(mockResult.rawImage);
    setActiveResult(mockResult);
    setIsBlurry(blurry);
    setShowResult(false);
    setTreatmentTab("organic");
    setShowExplainer(false);
  };

  // Simulate ML inference
  // Simulate ML inference
  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResult(true);
      addToHistory(activeResult);
    }, 2000);
  };

  const resetAll = () => {
    setSelectedImage(null);
    setShowResult(false);
    setIsBlurry(false);
    setShowGradCam(false);
    setTreatmentTab("organic");
    setShowExplainer(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header Bar */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-xl text-emerald-800">
            <Sprout className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              {t("appTitle")}
            </h1>
            <p className="text-xs text-slate-500">{t("subTitle")}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Offline/Online Status Indicator (click to simulate toggle for demo) */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition ${
              isOffline
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-emerald-50 text-emerald-700 border-emerald-200"
            }`}
            title="Click to simulate offline/online (demo only)"
          >
            <span
              className={`w-2 h-2 rounded-full ${isOffline ? "bg-red-500" : "bg-emerald-500"}`}
            />
            {isOffline ? t("offlineStatus") : t("onlineStatus")}
          </button>
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl border border-slate-300 p-1">
            <button
              onClick={decreaseFontSize}
              disabled={fontScale <= 0.85}
              className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg text-xs font-bold transition"
              title={t("decreaseFontSize")}
            >
              A-
            </button>
            <button
              onClick={increaseFontSize}
              disabled={fontScale >= 1.3}
              className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg text-sm font-bold transition"
              title={t("increaseFontSize")}
            >
              A+
            </button>
          </div>
          <button
            onClick={() => {
              setOnboardingStep(0);
              setShowOnboarding(true);
            }}
            className="w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full border border-slate-300 text-sm font-bold transition"
            title="Show walkthrough"
          >
            ?
          </button>
          <button
            onClick={() => setShowHistoryPanel(true)}
            className="relative flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-300 transition"
          >
            <RotateCcw className="w-4 h-4 text-emerald-700" />
            {t("historyBtn")}
            {scanHistory.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {scanHistory.length}
              </span>
            )}
          </button>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-300 transition"
          >
            <Languages className="w-4 h-4 text-emerald-700" />
            {i18n.language === "mr" ? "English" : "मराठी"}
          </button>
        </div>
      </header>

      {/* Main Split-Screen Desktop Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8 grid grid-cols-12 gap-8">
        {/* Left Column: Image Input & Quality Control (5 Columns) */}
        <section className="col-span-5 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-700" />
              {t("uploadTitle")}
            </h2>

            {/* Dropzone Area */}
            {!selectedImage ? (
              <label className="border-2 border-dashed border-slate-300 hover:border-emerald-600 bg-slate-50 hover:bg-emerald-50/50 rounded-xl flex-1 flex flex-col justify-center items-center p-6 cursor-pointer transition text-center">
                <Upload className="w-12 h-12 text-slate-400 mb-3" />
                <p className="text-sm font-semibold text-slate-700 mb-1">
                  {t("uploadDesc")}
                </p>
                <span className="text-xs text-slate-400">
                  Supports PNG, JPG
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-black flex-1 flex items-center justify-center min-h-[300px]">
                <img
                  src={showGradCam ? activeResult.gradCamImage : selectedImage}
                  alt="Crop Leaf"
                  className={`max-h-80 w-full object-cover ${isBlurry ? "blur-sm" : ""}`}
                />

                {/* Heatmap Simulation Overlay */}
                {showGradCam && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-600/40 via-yellow-500/20 to-transparent pointer-events-none flex items-center justify-center">
                    <span className="bg-red-600/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      Grad-CAM Spot Identified
                    </span>
                  </div>
                )}

                {/* Scanning Animation */}
                {analyzing && (
                  <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-white">
                    <Activity className="w-10 h-10 text-emerald-400 animate-spin mb-2" />
                    <p className="text-sm font-semibold">{t("analyzing")}</p>
                  </div>
                )}
              </div>
            )}

            {/* Quick Demo Controls for Tutor Presentation */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
              <span className="text-xs text-slate-400 font-medium">
                Evaluation Demo Controls:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => loadMockLeaf(MOCK_DATA.earlyBlight, false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 px-3 rounded-lg border border-slate-300"
                >
                  Load Sample Leaf
                </button>
                <button
                  onClick={() => loadMockLeaf(MOCK_DATA.earlyBlight, true)}
                  className="bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold py-2 px-3 rounded-lg border border-amber-200"
                >
                  Test Blurry Image
                </button>
                <button
                  onClick={() =>
                    loadMockLeaf(MOCK_DATA.mediumConfidence, false)
                  }
                  className="bg-orange-50 hover:bg-orange-100 text-orange-800 text-xs font-semibold py-2 px-3 rounded-lg border border-orange-200"
                >
                  Test Medium Confidence
                </button>
                <button
                  onClick={() => loadMockLeaf(MOCK_DATA.lowConfidence, false)}
                  className="bg-red-50 hover:bg-red-100 text-red-800 text-xs font-semibold py-2 px-3 rounded-lg border border-red-200"
                >
                  Test Low Confidence
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <button
                  onClick={() => setActiveWeather(WEATHER_STATES.clear)}
                  className="bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-semibold py-2 px-2 rounded-lg border border-sky-200"
                >
                  ☀️ Clear
                </button>
                <button
                  onClick={() => setActiveWeather(WEATHER_STATES.rainSoon)}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-semibold py-2 px-2 rounded-lg border border-blue-200"
                >
                  🌧️ Rain Soon
                </button>
                <button
                  onClick={() => setActiveWeather(WEATHER_STATES.highWind)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 px-2 rounded-lg border border-slate-300"
                >
                  💨 High Wind
                </button>
              </div>
            </div>

            {/* Image Quality Banner (HCI Error Prevention) */}
            {selectedImage && !analyzing && (
              <div
                className={`mt-4 p-4 rounded-xl border flex items-start gap-3 ${
                  isBlurry
                    ? "bg-amber-50 border-amber-200 text-amber-900"
                    : "bg-emerald-50 border-emerald-200 text-emerald-900"
                }`}
              >
                {isBlurry ? (
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <div className="text-xs">
                  <p className="font-bold mb-0.5">{t("qualityCheck")}</p>
                  <p>{isBlurry ? t("qualityBlurry") : t("qualityGood")}</p>
                </div>
              </div>
            )}

            {/* Primary Action Button */}
            {selectedImage && !showResult && (
              <button
                onClick={handleAnalyze}
                disabled={analyzing || isBlurry}
                className="mt-4 w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold py-3.5 px-6 rounded-xl transition shadow flex items-center justify-center gap-2"
              >
                <Activity className="w-5 h-5" />
                {t("analyzeBtn")}
              </button>
            )}
          </div>
        </section>

        {/* Right Column: Dynamic Workspace / Results (7 Columns) */}
        <section className="col-span-7 flex flex-col">
          {!showResult ? (
            /* Initial Helper State */
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-2">
                {i18n.language === "mr"
                  ? "पानाचे फोटो अपलोड करा"
                  : "Awaiting Crop Leaf Photo"}
              </h3>
              <p className="text-sm text-slate-500 max-w-md">
                {i18n.language === "mr"
                  ? 'डाव्या बाजूला फोटो निवडून "पानाचे विश्लेषण करा" बटणावर क्लिक करा.'
                  : 'Select an image on the left and click "Analyze Leaf" to view detection results and advisory.'}
              </p>
            </div>
          ) : getConfidenceTier(activeResult.confidence) === "low" ? (
            <LowConfidenceView
              result={activeResult}
              lang={i18n.language}
              t={t}
              isOffline={isOffline}
            />
          ) : (
            /* Result Workspace */
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col justify-between">
              <div>
                {isOffline && (
                  <div className="mb-4 p-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-2">
                    <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                    {t("offlineSyncNote")}
                  </div>
                )}

                {/* Status Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-red-100 text-red-800 border border-red-200 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    {t("diseaseDetected")}
                  </span>

                  <ConfidenceBadge
                    confidence={activeResult.confidence}
                    tier={getConfidenceTier(activeResult.confidence)}
                    t={t}
                  />
                </div>

                {/* Disease Details */}
                <div className="mb-6">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {i18n.language === "mr"
                      ? "पिक व आढळलेला रोग"
                      : "Crop & Detected Disease"}
                  </span>
                  <h2 className="text-2xl font-black text-slate-800 mt-1">
                    🍅{" "}
                    {i18n.language === "mr"
                      ? activeResult.cropMr
                      : activeResult.cropEn}{" "}
                    -{" "}
                    <span className="text-red-600">
                      {i18n.language === "mr"
                        ? activeResult.diseaseMr
                        : activeResult.diseaseEn}
                    </span>
                  </h2>

                  {getConfidenceTier(activeResult.confidence) === "medium" && (
                    <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-3 flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      {t("mediumConfidenceNote")}
                    </p>
                  )}
                  <div className="mt-4">
                    <OutbreakAlertCard
                      outbreak={activeResult.outbreak}
                      lang={i18n.language}
                      diseaseName={
                        i18n.language === "mr"
                          ? activeResult.diseaseMr
                          : activeResult.diseaseEn
                      }
                      t={t}
                    />
                  </div>
                </div>

                {/* Explainability Toggle (Grad-CAM) */}

                <div className="bg-slate-50 border border-slate-200 rounded-xl mb-6 overflow-hidden">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-emerald-700" />
                      <span className="text-xs font-bold text-slate-700">
                        {t("affectedArea")}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const next = !showGradCam;
                        setShowGradCam(next);
                        if (!next) setShowExplainer(false); // auto-collapse note when heatmap turned off
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition ${
                        showGradCam
                          ? "bg-emerald-700 text-white border-emerald-700"
                          : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {showGradCam ? "ON" : "OFF"}
                    </button>
                  </div>

                  {/* Plain-language "why" explainer — only when heatmap is active */}
                  {showGradCam && (
                    <div className="border-t border-slate-200 bg-white">
                      <button
                        onClick={() => setShowExplainer(!showExplainer)}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 transition"
                      >
                        <span className="flex items-center gap-1.5">
                          💡 {t("whyThisDiagnosis")}
                        </span>
                        <span className="text-slate-400">
                          {showExplainer ? "▲" : "▼"}
                        </span>
                      </button>
                      {showExplainer && (
                        <p className="px-4 pb-4 text-xs text-slate-600 leading-relaxed">
                          {i18n.language === "mr"
                            ? activeResult.explainer.mr
                            : activeResult.explainer.en}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Farmer Advisory Section */}
                {/* Weather-Aware Advisory Banner */}
                <div
                  className={`mb-4 p-4 rounded-xl border flex items-start gap-3 ${
                    activeWeather.safe
                      ? "bg-sky-50 border-sky-200 text-sky-900"
                      : "bg-amber-50 border-amber-300 text-amber-900"
                  }`}
                >
                  <span className="text-xl leading-none">
                    {activeWeather.icon}
                  </span>
                  <div className="text-xs">
                    <p className="font-bold mb-0.5">
                      {i18n.language === "mr"
                        ? activeWeather.labelMr
                        : activeWeather.labelEn}
                    </p>
                    <p>
                      {i18n.language === "mr"
                        ? activeWeather.adviceMr
                        : activeWeather.adviceEn}
                    </p>
                  </div>
                </div>
                {/* Farmer Advisory Section with Organic/Chemical Tabs */}
                <div className="bg-emerald-50/60 border border-emerald-200 p-5 rounded-xl">
                  <h4 className="text-sm font-bold text-emerald-900 mb-3 flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-emerald-700" />
                    {t("advisoryTitle")}
                  </h4>

                  {/* Tab Switcher */}
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setTreatmentTab("organic")}
                      className={`flex-1 text-xs font-bold py-2 px-3 rounded-lg border transition flex items-center justify-center gap-1.5 ${
                        treatmentTab === "organic"
                          ? "bg-emerald-700 text-white border-emerald-700"
                          : "bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50"
                      }`}
                    >
                      🌿 {t("organicTab")}
                    </button>
                    <button
                      onClick={() => setTreatmentTab("chemical")}
                      className={`flex-1 text-xs font-bold py-2 px-3 rounded-lg border transition flex items-center justify-center gap-1.5 ${
                        treatmentTab === "chemical"
                          ? "bg-orange-600 text-white border-orange-600"
                          : "bg-white text-orange-800 border-orange-300 hover:bg-orange-50"
                      }`}
                    >
                      🧪 {t("chemicalTab")}
                    </button>
                  </div>

                  {/* Safety note for chemical tab only */}
                  {treatmentTab === "chemical" && (
                    <p className="text-[11px] text-orange-800 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 mb-3 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      {t("chemicalSafetyNote")}
                    </p>
                  )}

                  <ul className="space-y-2.5">
                    {activeResult.advisory[treatmentTab][
                      i18n.language === "mr" ? "mr" : "en"
                    ].map((step, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-emerald-950 flex items-start gap-2 leading-relaxed"
                      >
                        <span className="bg-emerald-200 text-emerald-900 font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Reset Control */}
              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  onClick={resetAll}
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 px-5 rounded-xl border border-slate-300 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t("tryAnother")}
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {showHistoryPanel && (
        <HistoryPanel
          history={scanHistory}
          lang={i18n.language}
          t={t}
          onClose={() => setShowHistoryPanel(false)}
          onSelect={reopenHistoryEntry}
        />
      )}

      {showOnboarding && (
        <OnboardingOverlay
          step={onboardingStep}
          lang={i18n.language}
          t={t}
          onNext={handleOnboardingNext}
          onSkip={handleOnboardingSkip}
          totalSteps={ONBOARDING_STEPS.length}
        />
      )}
    </div>
  );
}
