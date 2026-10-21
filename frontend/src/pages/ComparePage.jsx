import { useTranslation } from "react-i18next";
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  Lightbulb,
  Camera,
  AlertCircle,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { getLeafImage } from "../data/leafImages";
import { getConfidenceTier } from "../utils/confidence";
import { formatScanDate } from "../utils/formatDate";

export default function ComparePage() {
  const { t, i18n } = useTranslation();
  const { activeResult, scanHistory, navigate } = useApp();

  const currentLang = i18n.language;

  // Identify current scan
  const current =
    scanHistory.find((e) => e.id === activeResult?.entryId) || activeResult;

  // Identify previous scan (most recent entry OLDER than current with same cropId and diseaseId)
  let previous = null;
  if (current && current.cropId && current.diseaseId) {
    const currentId = current.id || current.entryId;
    const currentDate = current.scannedAt
      ? new Date(current.scannedAt).getTime()
      : Infinity;

    const olderMatches = scanHistory.filter((entry) => {
      if (entry.id === currentId) return false;
      if (
        entry.cropId !== current.cropId ||
        entry.diseaseId !== current.diseaseId
      ) {
        return false;
      }
      const entryDate = new Date(entry.scannedAt).getTime();
      return !isNaN(entryDate) && entryDate < currentDate;
    });

    olderMatches.sort(
      (a, b) =>
        new Date(b.scannedAt).getTime() - new Date(a.scannedAt).getTime()
    );

    if (olderMatches.length > 0) {
      previous = olderMatches[0];
    }
  }

  // No previous scan state
  if (!current || !previous) {
    return (
      <div className="p-6 md:p-8 max-w-xl mx-auto w-full my-8 animate-fade-in">
        <div className="bg-white rounded-2xl border border-border p-10 text-center shadow-xs flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-primary mb-4 shadow-2xs">
            <AlertCircle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-text mb-2">
            {t("compare.noPreviousTitle")}
          </h3>
          <p className="text-xs text-muted mb-6 max-w-sm leading-relaxed">
            {t("compare.noPreviousDesc")}
          </p>
          <button
            type="button"
            onClick={() => navigate("scan")}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer text-sm"
          >
            <Camera className="w-4 h-4" />
            <span>{t("compare.newScanBtn")}</span>
          </button>
        </div>
      </div>
    );
  }

  // Verdict calculation using affectedAreaPercent
  const prevArea = Number(previous.affectedAreaPercent) || 0;
  const currArea = Number(current.affectedAreaPercent) || 0;
  const pointDiff = currArea - prevArea;

  const isImproving = pointDiff <= -5; // ≥5 points lower
  const isWorsening = pointDiff >= 5; // ≥5 points higher

  const previousDate = previous.scannedAt
    ? formatScanDate(previous.scannedAt, currentLang).split(",")[0]
    : "";
  const currentDate = current.scannedAt
    ? formatScanDate(current.scannedAt, currentLang).split(",")[0]
    : "";

  const prevTier = getConfidenceTier(previous.confidence);
  const currTier = getConfidenceTier(current.confidence);

  const prevImg =
    previous.rawImage ||
    getLeafImage({
      diseaseId: previous.diseaseId,
      affectedAreaPercent: previous.affectedAreaPercent,
      cropId: previous.cropId,
      entryId: previous.id,
    });

  const currImg =
    current.rawImage ||
    getLeafImage({
      diseaseId: current.diseaseId,
      affectedAreaPercent: current.affectedAreaPercent,
      cropId: current.cropId,
      entryId: current.entryId || current.id,
    });

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto w-full space-y-6 animate-fade-in">
      {/* 1. Two Comparison Cards Side-by-Side with VS Badge */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-stretch">
        {/* Round VS Badge */}
        <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 border-2 border-white shadow-md font-extrabold text-xs items-center justify-center select-none">
          VS
        </div>

        {/* Previous Card (Left: पूर्वी) */}
        <div className="bg-white rounded-2xl border border-border p-4 md:p-5 shadow-xs flex flex-col items-center text-center">
          <div className="w-full h-44 sm:h-48 md:h-52 rounded-xl overflow-hidden bg-slate-50 border border-border mb-3 flex items-center justify-center">
            <img
              src={prevImg}
              alt={t("compare.previous")}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-sm font-bold text-text mb-1">
            {t("compare.previous")}
          </h3>
          <p className="text-xs text-muted font-medium mb-2">{previousDate}</p>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full border mb-2 shadow-2xs ${
              prevTier === "high"
                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                : prevTier === "medium"
                ? "bg-amber-100 text-amber-800 border-amber-300"
                : "bg-red-100 text-red-800 border-red-300"
            }`}
          >
            {previous.confidence}%
          </span>
          <p className="text-xs text-muted font-medium">
            {t("compare.affectedArea")}: {previous.affectedAreaPercent}%
          </p>
        </div>

        {/* Current Card (Right: आता) */}
        <div className="bg-white rounded-2xl border border-border p-4 md:p-5 shadow-xs flex flex-col items-center text-center">
          <div className="w-full h-44 sm:h-48 md:h-52 rounded-xl overflow-hidden bg-slate-50 border border-border mb-3 flex items-center justify-center">
            <img
              src={currImg}
              alt={t("compare.current")}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-sm font-bold text-text mb-1">
            {t("compare.current")}
          </h3>
          <p className="text-xs text-muted font-medium mb-2">{currentDate}</p>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full border mb-2 shadow-2xs ${
              currTier === "high"
                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                : currTier === "medium"
                ? "bg-amber-100 text-amber-800 border-amber-300"
                : "bg-red-100 text-red-800 border-red-300"
            }`}
          >
            {current.confidence}%
          </span>
          <p className="text-xs text-muted font-medium">
            {t("compare.affectedArea")}: {current.affectedAreaPercent}%
          </p>
        </div>
      </div>

      {/* 2. Verdict Card using affectedAreaPercent */}
      <div
        className={`rounded-2xl border p-4 md:p-5 shadow-xs flex items-start gap-3.5 transition-all ${
          isImproving
            ? "bg-success-bg border-success-border text-success-text"
            : isWorsening
            ? "bg-danger-bg border-danger-border text-danger-text"
            : "bg-info-bg border-info-border text-info-text"
        }`}
      >
        {isImproving ? (
          <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
        ) : isWorsening ? (
          <AlertTriangle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
        ) : (
          <Info className="w-5 h-5 text-info shrink-0 mt-0.5" />
        )}

        <div className="text-xs md:text-sm">
          <h4 className="font-bold text-sm md:text-base mb-0.5">
            {isImproving
              ? t("compare.statusImproving")
              : isWorsening
              ? t("compare.statusWorsening")
              : t("compare.statusNoChange")}
          </h4>
          <p className="leading-relaxed opacity-95">
            {isImproving
              ? t("compare.descImproving")
              : isWorsening
              ? t("compare.descWorsening")
              : t("compare.descNoChange")}
          </p>
        </div>
      </div>

      {/* 3. Info Strip Disclaimer */}
      <div className="bg-slate-50 border border-border text-muted rounded-xl p-3 text-xs flex items-center gap-2 shadow-2xs">
        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
        <span>{t("compare.infoDisclaimer")}</span>
      </div>
    </div>
  );
}
