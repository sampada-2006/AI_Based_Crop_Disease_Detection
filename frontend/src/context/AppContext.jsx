/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { SEED_HISTORY } from "../data/seedHistory";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [page, setPage] = useState("home");
  const [historyStack, setHistoryStack] = useState([]);

  // App core state
  const [selectedImage, setSelectedImage] = useState(null);
  const [isBlurry, setIsBlurry] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeResult, setActiveResult] = useState(null);
  const [pendingScenario, setPendingScenario] = useState(null);
  const [scanHistory, setScanHistory] = useState(SEED_HISTORY);
  const [weatherId, setWeatherId] = useState("clear");
  const [isOffline, setIsOffline] = useState(false);
  const [fontScale, setFontScale] = useState(1); // 0.9 | 1 | 1.2
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [showQualityDetails, setShowQualityDetails] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  const toastTimerRef = useRef(null);

  // Font scale effect
  useEffect(() => {
    document.documentElement.style.fontSize = `${16 * fontScale}px`;
    return () => {
      document.documentElement.style.fontSize = "";
    };
  }, [fontScale]);

  // Toast timer cleanup
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const navigate = (nextPage) => {
    if (nextPage === page) return;

    // Reset dropzone to clean state when routing to scan, unless an evaluation scenario was selected
    if (nextPage === "scan" && !pendingScenario) {
      setSelectedImage(null);
      setIsBlurry(false);
    }

    setHistoryStack((prev) => [...prev, page]);
    setPage(nextPage);
  };

  const goBack = () => {
    if (historyStack.length === 0) {
      setPage("home");
      return;
    }
    const previousPage = historyStack[historyStack.length - 1];
    setHistoryStack((prev) => prev.slice(0, -1));
    setPage(previousPage || "home");
  };

  const showToast = (message, duration = 3000) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage(message);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, duration);
  };

  const value = {
    page,
    historyStack,
    navigate,
    goBack,
    selectedImage,
    setSelectedImage,
    isBlurry,
    setIsBlurry,
    analyzing,
    setAnalyzing,
    activeResult,
    setActiveResult,
    pendingScenario,
    setPendingScenario,
    scanHistory,
    setScanHistory,
    weatherId,
    setWeatherId,
    isOffline,
    setIsOffline,
    fontScale,
    setFontScale,
    notificationsOn,
    setNotificationsOn,
    showQualityDetails,
    setShowQualityDetails,
    onboardingOpen,
    setOnboardingOpen,
    onboardingStep,
    setOnboardingStep,
    toastMessage,
    showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

export default AppContext;
