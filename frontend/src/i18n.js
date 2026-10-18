import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appTitle: "Crop Disease Detection System",
      subTitle: "AI-Powered Farmer Advisory",
      selectLanguage: "Language / भाषा",
      uploadTitle: "Upload Crop Leaf Photo",
      uploadDesc: "Drag & drop leaf photo here, or click to browse",
      qualityCheck: "Image Quality Verification",
      qualityGood: "Good Quality - Ready for analysis",
      qualityBlurry: "Warning: Image appears blurry. Results may be inaccurate.",
      analyzeBtn: "Analyze Leaf",
      analyzing: "Analyzing leaf patterns...",
      diseaseDetected: "Disease Detected",
      outbreakAlertTitle: "Outbreak Alert",
      healthyCrop: "Crop Appears Healthy",
      confidence: "Confidence Level",
      highConfidence: "High",
      mediumConfidence: "Medium",
lowConfidence: "Low",
mediumConfidenceNote: "Likely diagnosis — consider comparing symptoms before treating.",
notFullySure: "Not fully sure — here are possible conditions",
lowConfidenceExplainer: "The photo doesn't clearly match one disease. Compare the possibilities below or consult an expert before treating.",
askExpertCta: "Ask a Local Agri-Expert",
expertConnectMock: "This would connect you to a local agri-extension officer.",
      affectedArea: "Show Affected Area (Grad-CAM)",
      whyThisDiagnosis: "Why this diagnosis?",
      advisoryTitle: "Actionable Advisory for Farmer",
      organicTab: "Organic / Home Remedy",
chemicalTab: "Chemical Treatment",
chemicalSafetyNote: "Follow label instructions carefully. Wear protective gear and avoid spraying before rain.",
      tryAnother: "Check Another Leaf",
      onlineStatus: "Online",
offlineStatus: "Offline",
offlineSyncNote: "You're offline. This result is saved locally and will sync once you're back online.",
historyBtn: "History",
historyTitle: "Your Scan History",
historyEmpty: "No scans yet. Analyze a leaf to start building your farm journal.",
onboardingNext: "Next",
onboardingDone: "Get Started",
onboardingSkip: "Skip",
decreaseFontSize: "Decrease text size",
increaseFontSize: "Increase text size",
    }
  },
  mr: {
    translation: {
      appTitle: "पिक रोग निदान प्रणाली",
      subTitle: "कृत्रिम बुद्धिमत्ता आधारित शेतकरी सल्लागार",
      selectLanguage: "भाषा / Language",
      uploadTitle: "पिकाच्या पानाचा फोटो अपलोड करा",
      uploadDesc: "येथे फोटो टाका किंवा ब्राउझ करण्यासाठी क्लिक करा",
      qualityCheck: "फोटो गुणवत्ता तपासणी",
      qualityGood: "उत्तम गुणवत्ता - विश्लेषणासाठी तयार",
      qualityBlurry: "टीप: फोटो स्पष्ट नाही. कृपया पुन्हा चांगला फोटो घ्या.",
      analyzeBtn: "पानाचे विश्लेषण करा",
      analyzing: "पानावरील ठिपके आणि पॅटर्न तपासत आहे...",
      diseaseDetected: "रोग आढळला",
      outbreakAlertTitle: "प्रादुर्भाव इशारा",
      healthyCrop: "पिक निरोगी दिसत आहे",
      confidence: "खात्री पातळी",
      highConfidence: "उच्च",
      mediumConfidence: "मध्यम",
lowConfidence: "कमी",
mediumConfidenceNote: "संभाव्य निदान — उपचार करण्यापूर्वी लक्षणे नीट तपासा.",
notFullySure: "पूर्ण खात्री नाही — शक्य असलेले आजार खाली दिले आहेत",
lowConfidenceExplainer: "फोटोमध्ये एकाच आजाराशी स्पष्ट जुळणी होत नाही. कृपया खालील पर्याय तपासा किंवा उपचारापूर्वी तज्ज्ञांचा सल्ला घ्या.",
askExpertCta: "स्थानिक कृषी-तज्ज्ञांना विचारा",
expertConnectMock: "हे तुम्हाला स्थानिक कृषी-विस्तार अधिकाऱ्याशी जोडेल.",
      affectedArea: "प्रभावित भाग दाखवा (Grad-CAM)",
      whyThisDiagnosis: "हे निदान का?",
      advisoryTitle: "शेतकऱ्यांसाठी महत्त्वाचा सल्ला",
      organicTab: "सेंद्रिय / घरगुती उपाय",
chemicalTab: "रासायनिक उपचार",
chemicalSafetyNote: "लेबलवरील सूचना काळजीपूर्वक पाळा. संरक्षक साधने वापरा आणि पावसापूर्वी फवारणी टाळा.",
      tryAnother: "दुसऱ्या पानाचे परीक्षण करा",
      onlineStatus: "ऑनलाइन",
offlineStatus: "ऑफलाइन",
offlineSyncNote: "तुम्ही ऑफलाइन आहात. हा निकाल स्थानिक पातळीवर जतन केला आहे आणि इंटरनेट आल्यावर सिंक होईल.",
historyBtn: "इतिहास",
historyTitle: "तुमचा स्कॅन इतिहास",
historyEmpty: "अजून कोणताही स्कॅन नाही. तुमची नोंदवही सुरू करण्यासाठी पानाचे विश्लेषण करा.",
onboardingNext: "पुढे",
onboardingDone: "सुरू करा",
onboardingSkip: "वगळा",
decreaseFontSize: "अक्षराचा आकार कमी करा",
increaseFontSize: "अक्षराचा आकार वाढवा",

    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'mr', // Default language set to Marathi
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;