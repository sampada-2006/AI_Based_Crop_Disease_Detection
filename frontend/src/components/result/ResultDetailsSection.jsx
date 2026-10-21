import { useTranslation } from "react-i18next";
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Sprout,
  GitCompare,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { CROPS } from "../../data/crops";
import { DISEASES } from "../../data/diseases";
import { getConfidenceTier } from "../../utils/confidence";
import WhyIdentifiedCard from "./WhyIdentifiedCard";
import LowConfidenceView from "./LowConfidenceView";

export default function ResultDetailsSection({ result }) {
  const { t, i18n } = useTranslation();
  const { navigate, showToast } = useApp();

  const currentLang = i18n.language;
  const isMr = currentLang === "mr";

  const tier = getConfidenceTier(result.confidence);
  const isHealthy = result.diseaseId === "healthy";
  const isLowConfidence = tier === "low" || result.diseaseId === null;

  // Crop Information
  const crop = CROPS[result.cropId] || CROPS.tomato;
  const cropName = isMr ? crop.nameMr : crop.nameEn;
  const cropEmoji = crop.emoji;

  // 1. LOW CONFIDENCE VIEW
  if (isLowConfidence) {
    return (
      <LowConfidenceView
        alternates={result.alternates}
        onAskExpert={() => showToast(t("result.expertToast"))}
        currentLang={currentLang}
        t={t}
      />
    );
  }

  // 2. HEALTHY CROP VIEW
  if (isHealthy) {
    return (
      <div className="space-y-4">
        {/* Success Banner */}
        <div className="bg-success-bg border border-success-border text-success-text rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5 font-bold text-sm md:text-base">
            <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
            <span>{t("result.cropHealthy")}</span>
          </div>
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs px-3 py-1 rounded-full shadow-2xs">
            {result.confidence}% {t("result.confidenceSuffix")}
          </span>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-xs space-y-5">
          {/* Crop Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
              <span>{cropEmoji}</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-text truncate">
                {cropName} - {t("result.healthyName")}
              </h1>
              <p className="text-xs md:text-sm text-muted font-medium mt-0.5">
                <span className="text-text font-semibold">
                  {t("result.possibleCause")}
                </span>{" "}
                <span>{t("result.noCause")}</span>
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-50 border border-border/80 rounded-xl p-3.5 text-xs text-muted leading-relaxed">
            <p>{t("result.healthyDesc")}</p>
          </div>

          {/* Buttons: Advice and Compare */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("advice")}
              className="w-full sm:flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-5 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Sprout className="w-4 h-4" />
              <span>{t("result.viewAdviceShort")}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("compare")}
              className="w-full sm:w-auto bg-white hover:bg-page-bg text-text font-bold py-3.5 px-5 rounded-xl border border-border transition shadow-2xs flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <GitCompare className="w-4 h-4 text-muted" />
              <span>{t("result.compare")}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. HIGH / MEDIUM CONFIDENCE DISEASE VIEW
  const disease = DISEASES[result.diseaseId];
  const diseaseName = disease
    ? isMr
      ? disease.nameMr
      : disease.nameEn
    : result.diseaseId;
  const secondaryDiseaseName = disease ? (isMr ? disease.nameEn : disease.nameMr) : "";
  const explainerText =
    disease?.explainer?.[currentLang] || disease?.explainer?.mr || "";

  return (
    <div className="space-y-4">
      {/* Danger Banner */}
      <div className="bg-danger-bg border border-danger-border text-danger-text rounded-2xl p-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5 font-bold text-sm md:text-base">
          <AlertTriangle className="w-5 h-5 text-danger shrink-0" />
          <span>{t("result.diseaseDetected")}</span>
        </div>
        <span
          className={`font-bold text-xs px-3 py-1 rounded-full shadow-2xs border ${
            tier === "high"
              ? "bg-emerald-100 text-emerald-800 border-emerald-300"
              : "bg-amber-100 text-amber-800 border-amber-300"
          }`}
        >
          {result.confidence}% {t("result.confidenceSuffix")}
        </span>
      </div>

      {/* Main Details Card */}
      <div className="bg-white rounded-2xl border border-border p-6 shadow-xs space-y-5">
        {/* Crop emoji chip + Title */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
            <span>{cropEmoji}</span>
          </div>
          <div className="min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-text truncate">
              {cropName} - {diseaseName}
            </h1>
            {secondaryDiseaseName && (
              <p className="text-xs font-medium text-muted mt-0.5">
                ({secondaryDiseaseName})
              </p>
            )}
          </div>
        </div>

        {/* Possible Cause */}
        <p className="text-xs md:text-sm text-muted font-medium">
          <span className="text-text font-semibold">
            {t("result.possibleCause")}
          </span>{" "}
          <span className="italic">{disease?.cause || t("result.noCause")}</span>
        </p>

        {/* MEDIUM confidence amber warning strip */}
        {tier === "medium" && (
          <div className="bg-warn-bg border border-warn-border text-warn-text rounded-xl p-3 text-xs font-semibold flex items-center gap-2.5 shadow-2xs">
            <AlertCircle className="w-4 h-4 text-warn shrink-0" />
            <span>{t("result.mediumConfidenceWarning")}</span>
          </div>
        )}

        {/* Collapsible "Why was this identified?" */}
        <WhyIdentifiedCard explainerText={explainerText} t={t} />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("advice")}
            className="w-full sm:flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-5 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <Sprout className="w-4 h-4" />
            <span>{t("result.viewAdvice")}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("compare")}
            className="w-full sm:w-auto bg-white hover:bg-page-bg text-text font-bold py-3.5 px-5 rounded-xl border border-border transition shadow-2xs flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <GitCompare className="w-4 h-4 text-muted" />
            <span>{t("result.compare")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
