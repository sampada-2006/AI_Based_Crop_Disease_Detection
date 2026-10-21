import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Sliders, X, Wifi, WifiOff } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { SCENARIOS } from "../../data/scenarios";
import { getLeafImage } from "../../data/leafImages";

export default function DemoPanel() {
  const { t } = useTranslation();
  const {
    setSelectedImage,
    setIsBlurry,
    setPendingScenario,
    isOffline,
    setIsOffline,
    weatherId,
    setWeatherId,
    navigate,
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const loadScenario = (scenario, blurry = false) => {
    const leafImg = getLeafImage({
      diseaseId: scenario.diseaseId,
      cropId: scenario.cropId,
      affectedAreaPercent: scenario.affectedAreaPercent,
    });
    setSelectedImage(leafImg);
    setPendingScenario(scenario);
    setIsBlurry(blurry);
    navigate("scan");
    setIsOpen(false);
  };

  return (
    <div ref={panelRef} className="fixed bottom-5 right-5 z-40 select-none">
      {/* Low-contrast floating Demo Pill */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-800/85 hover:bg-slate-900 text-white/90 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-xs flex items-center gap-1.5 cursor-pointer border border-white/10 transition-all hover:scale-105"
        title="Open Evaluation Demo Controls"
      >
        <Sliders className="w-3.5 h-3.5 text-emerald-400" />
        <span>{t("demo.pill")}</span>
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={t("demo.title")}
          className="absolute bottom-10 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-border p-4 text-text z-50 animate-fade-in"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-border">
            <span className="text-xs font-bold text-text flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-primary" />
              {t("demo.title")}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-text p-1 rounded-md cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Scenario Buttons */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => loadScenario(SCENARIOS.sampleHigh, false)}
              className="w-full text-left bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 text-xs font-semibold py-2 px-3 rounded-xl border border-emerald-200 transition cursor-pointer flex items-center justify-between"
            >
              <span>{t("demo.sampleHigh")}</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-white px-1.5 py-0.5 rounded-full">
                94%
              </span>
            </button>

            <button
              type="button"
              onClick={() => loadScenario(SCENARIOS.sampleMedium, false)}
              className="w-full text-left bg-amber-50 hover:bg-amber-100/80 text-amber-900 text-xs font-semibold py-2 px-3 rounded-xl border border-amber-200 transition cursor-pointer flex items-center justify-between"
            >
              <span>{t("demo.sampleMedium")}</span>
              <span className="text-[10px] font-bold text-amber-700 bg-white px-1.5 py-0.5 rounded-full">
                72%
              </span>
            </button>

            <button
              type="button"
              onClick={() => loadScenario(SCENARIOS.sampleLow, false)}
              className="w-full text-left bg-red-50 hover:bg-red-100/80 text-red-900 text-xs font-semibold py-2 px-3 rounded-xl border border-red-200 transition cursor-pointer flex items-center justify-between"
            >
              <span>{t("demo.sampleLow")}</span>
              <span className="text-[10px] font-bold text-red-700 bg-white px-1.5 py-0.5 rounded-full">
                52%
              </span>
            </button>

            <button
              type="button"
              onClick={() => loadScenario(SCENARIOS.sampleHealthy, false)}
              className="w-full text-left bg-teal-50 hover:bg-teal-100/80 text-teal-900 text-xs font-semibold py-2 px-3 rounded-xl border border-teal-200 transition cursor-pointer flex items-center justify-between"
            >
              <span>{t("demo.sampleHealthy")}</span>
              <span className="text-[10px] font-bold text-teal-700 bg-white px-1.5 py-0.5 rounded-full">
                96%
              </span>
            </button>

            <button
              type="button"
              onClick={() => loadScenario(SCENARIOS.sampleHigh, true)}
              className="w-full text-left bg-amber-50/70 hover:bg-amber-100/80 text-amber-900 text-xs font-semibold py-2 px-3 rounded-xl border border-amber-300 transition cursor-pointer flex items-center justify-between"
            >
              <span>{t("demo.blurry")}</span>
              <span className="text-[10px] text-amber-700">⚠️</span>
            </button>
          </div>

          {/* Weather Selection Controls */}
          <div className="mt-3 pt-3 border-t border-border">
            <span className="text-[11px] font-bold text-muted block mb-2">
              🌤️ {t("demo.weatherTitle")}
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setWeatherId("clear")}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition cursor-pointer flex flex-col items-center gap-0.5 ${
                  weatherId === "clear"
                    ? "bg-sky-50 text-sky-800 border-sky-300 font-bold shadow-2xs"
                    : "bg-white text-muted border-border hover:bg-page-bg"
                }`}
              >
                <span className="text-sm">☀️</span>
                <span className="truncate max-w-full">{t("demo.weatherClear")}</span>
              </button>

              <button
                type="button"
                onClick={() => setWeatherId("rainSoon")}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition cursor-pointer flex flex-col items-center gap-0.5 ${
                  weatherId === "rainSoon"
                    ? "bg-sky-50 text-sky-800 border-sky-300 font-bold shadow-2xs"
                    : "bg-white text-muted border-border hover:bg-page-bg"
                }`}
              >
                <span className="text-sm">🌧️</span>
                <span className="truncate max-w-full">{t("demo.weatherRain")}</span>
              </button>

              <button
                type="button"
                onClick={() => setWeatherId("highWind")}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition cursor-pointer flex flex-col items-center gap-0.5 ${
                  weatherId === "highWind"
                    ? "bg-sky-50 text-sky-800 border-sky-300 font-bold shadow-2xs"
                    : "bg-white text-muted border-border hover:bg-page-bg"
                }`}
              >
                <span className="text-sm">💨</span>
                <span className="truncate max-w-full">{t("demo.weatherWind")}</span>
              </button>
            </div>
          </div>

          {/* Online/Offline Toggle */}
          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
            <span className="text-xs font-semibold text-muted flex items-center gap-1.5">
              {isOffline ? (
                <WifiOff className="w-3.5 h-3.5 text-red-500" />
              ) : (
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              )}
              <span>{t("demo.offlineToggle")}</span>
            </span>

            <button
              type="button"
              onClick={() => setIsOffline(!isOffline)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                isOffline
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isOffline ? "bg-red-500" : "bg-emerald-500"
                }`}
              />
              <span>{isOffline ? t("demo.offline") : t("demo.online")}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
