import { useTranslation } from "react-i18next";
import { RotateCcw } from "lucide-react";
import { useApp } from "../context/AppContext";
import ResultImageSection from "../components/result/ResultImageSection";
import ResultDetailsSection from "../components/result/ResultDetailsSection";
import ResultEmptyState from "../components/result/ResultEmptyState";

export default function ResultPage() {
  const { t } = useTranslation();
  const { activeResult, selectedImage, isOffline, navigate } = useApp();

  if (!activeResult) {
    return (
      <div className="p-6 md:p-8 max-w-6xl mx-auto w-full">
        <ResultEmptyState onNewScan={() => navigate("scan")} t={t} />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto w-full space-y-6">
      {/* Offline sync note */}
      {isOffline && (
        <div className="p-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-2 shadow-2xs">
          <RotateCcw className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span>{t("result.offlineNote")}</span>
        </div>
      )}

      {/* Two Column Layout: LEFT ≈ 40%, RIGHT ≈ 60% */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: ~40% */}
        <div className="lg:col-span-5 w-full">
          <ResultImageSection
            diseaseId={activeResult.diseaseId}
            affectedAreaPercent={activeResult.affectedAreaPercent}
            rawImage={activeResult.rawImage || selectedImage}
          />
        </div>

        {/* RIGHT COLUMN: ~60% */}
        <div className="lg:col-span-7 w-full">
          <ResultDetailsSection result={activeResult} />
        </div>
      </div>
    </div>
  );
}
