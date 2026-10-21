export const WEATHER_SCENARIOS = {
  clear: {
    id: "clear",
    icon: "☀️",
    current: {
      tempC: 28,
      humidity: 72,
      windKmh: 6,
    },
    forecast: [
      { high: 28, low: 22, icon: "☀️" },
      { high: 27, low: 21, icon: "☀️" },
      { high: 26, low: 20, icon: "⛅" },
      { high: 26, low: 19, icon: "⛅" },
      { high: 25, low: 18, icon: "☀️" },
    ],
    spraySuitable: true,
    sprayNote: {
      mr: "आज पाऊस नाही. तापमान 28°C. फवारणीसाठी योग्य.",
      en: "No rain today. Temperature 28°C. Suitable for spraying.",
    },
    farmAdvice: {
      mr: [
        "सकाळच्या वेळेत फवारणी पूर्ण करा, उन्हात औषधाचे बाष्पीभवन टाळा.",
        "जमिनीत पुरेसा ओलावा असल्याची खात्री करा.",
      ],
      en: [
        "Complete spraying in morning hours to prevent evaporation.",
        "Ensure sufficient soil moisture before spraying.",
      ],
    },
  },

  rainSoon: {
    id: "rainSoon",
    icon: "🌧️",
    current: {
      tempC: 25,
      humidity: 88,
      windKmh: 10,
    },
    forecast: [
      { high: 24, low: 20, icon: "🌧️" },
      { high: 25, low: 20, icon: "🌧️" },
      { high: 25, low: 21, icon: "🌦️" },
      { high: 26, low: 20, icon: "⛅" },
      { high: 27, low: 21, icon: "☀️" },
    ],
    spraySuitable: false,
    sprayNote: {
      mr: "६ तासांत पाऊस अपेक्षित आहे. आत्ता फवारणी टाळा — पाऊस औषध वाहून नेऊ शकतो.",
      en: "Rain expected within 6 hours. Avoid spraying now — rain may wash away treatment before it works.",
    },
    farmAdvice: {
      mr: [
        "पावसामुळे शेतात पाणी साचणार नाही याची खबरदारी घ्या.",
        "पाऊस थांबल्यानंतर आणि पाने सुकल्यानंतरच फवारणीचे नियोजन करा.",
      ],
      en: [
        "Ensure proper drainage in fields to avoid water accumulation.",
        "Schedule spraying only after rain stops and leaves are completely dry.",
      ],
    },
  },

  highWind: {
    id: "highWind",
    icon: "💨",
    current: {
      tempC: 28,
      humidity: 72,
      windKmh: 12,
    },
    forecast: [
      { high: 28, low: 22, icon: "💨" },
      { high: 27, low: 21, icon: "💨" },
      { high: 26, low: 20, icon: "⛅" },
      { high: 26, low: 19, icon: "☀️" },
      { high: 25, low: 18, icon: "☀️" },
    ],
    spraySuitable: false,
    sprayNote: {
      mr: "फवारणीसाठी आज योग्य नाही: वारा वेग जास्त आहे. कृपया फवारणी पुढे ढकला.",
      en: "Not suitable for spraying today: wind speed is too high. Please postpone spraying.",
    },
    farmAdvice: {
      mr: [
        "पुढील 3 दिवस पाऊस नाही.",
        "पिकांवर लक्ष ठेवा, अलीकडे प्रादुर्भाव वाढू शकतो.",
      ],
      en: [
        "No rain expected for the next 3 days.",
        "Monitor crops closely; pest and disease spread may increase recently.",
      ],
    },
  },
};

export default WEATHER_SCENARIOS;
