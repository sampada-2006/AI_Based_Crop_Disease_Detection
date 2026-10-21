import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Activity } from "lucide-react";
import { useApp } from "../context/AppContext";
import { SCENARIOS } from "../data/scenarios";
import DropzoneCard from "../components/scan/DropzoneCard";
import PhotoTipsCard from "../components/scan/PhotoTipsCard";

export default function ScanPage() {
  const { t } = useTranslation();
  const {
    selectedImage,
    setSelectedImage,
    isBlurry,
    analyzing,
    setAnalyzing,
    pendingScenario,
    setPendingScenario,
    setScanHistory,
    setActiveResult,
    navigate,
  } = useApp();

  const analyzeTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (analyzeTimerRef.current) {
        clearTimeout(analyzeTimerRef.current);
        setAnalyzing(false);
      }
    };
  }, [setAnalyzing]);

  const handleAnalyze = () => {
    if (!selectedImage || isBlurry || analyzing) return;

    setAnalyzing(true);

    analyzeTimerRef.current = setTimeout(() => {
      const scenario = pendingScenario || SCENARIOS.sampleHigh;

      const newEntry = {
        id: "hist-" + Date.now(),
        scannedAt: new Date().toISOString(),
        cropId: scenario.cropId,
        diseaseId: scenario.diseaseId,
        confidence: scenario.confidence,
        affectedAreaPercent: scenario.affectedAreaPercent,
        rawImage: selectedImage,
      };

      setScanHistory((prev) => [newEntry, ...prev]);

      setActiveResult({
        ...scenario,
        entryId: newEntry.id,
        rawImage: selectedImage,
      });

      setSelectedImage(null);
      setPendingScenario(null);
      setAnalyzing(false);
      analyzeTimerRef.current = null;
      navigate("result");
    }, 2000);
  };

  const isButtonDisabled = !selectedImage || isBlurry || analyzing;

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto w-full relative">
      {/* Subtitle directly under TopBar */}
      <div className="mb-6">
        <p className="text-sm text-muted">
          {t("scan.subtitle")}
        </p>
      </div>

      <div className="space-y-6">
        {/* Upload Dropzone Card */}
        <DropzoneCard />

        {/* Primary Action Button: Analyze Leaf */}
        {selectedImage && (
          <div>
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isButtonDisabled}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Activity className="w-5 h-5" />
              <span>{t("scan.analyzeBtn")}</span>
            </button>
          </div>
        )}

        {/* Photo Tips Card */}
        <PhotoTipsCard />
      </div>

      {/* Analyzing Spinner Overlay */}
      {analyzing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white p-6 animate-fade-in">
          <div className="bg-slate-900/90 rounded-2xl p-8 flex flex-col items-center max-w-sm text-center shadow-xl border border-white/10">
            <Activity className="w-12 h-12 text-emerald-400 animate-spin mb-4" />
            <h4 className="text-base font-bold mb-2">
              {t("analyzing")}
            </h4>
            <p className="text-xs text-slate-300">
              {t("scan.analyzingText")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
