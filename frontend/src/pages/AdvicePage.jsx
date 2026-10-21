import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Leaf,
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { DISEASES } from "../data/diseases";
import { WEATHER_SCENARIOS } from "../data/weather";
import ResultEmptyState from "../components/result/ResultEmptyState";

export default function AdvicePage() {
  const { t, i18n } = useTranslation();
  const { activeResult, weatherId, navigate } = useApp();
  const [tab, setTab] = useState("organic"); // "organic" | "chemical"

  const currentLang = i18n.language;

  const resultKey = `${activeResult?.entryId || ""}-${activeResult?.diseaseId || ""}`;
  const [prevResultKey, setPrevResultKey] = useState(resultKey);

  if (resultKey !== prevResultKey) {
    setPrevResultKey(resultKey);
    setTab("organic");
  }

  // 1. activeResult is null -> empty state matching result page
  if (!activeResult) {
    return (
      <div className="p-6 md:p-8 max-w-4xl mx-auto w-full">
        <ResultEmptyState onNewScan={() => navigate("scan")} t={t} />
      </div>
    );
  }

  // 2. diseaseId is null (low confidence) -> empty state with button back to result
  if (!activeResult.diseaseId) {
    return (
      <div className="p-6 md:p-8 max-w-xl mx-auto w-full my-8">
        <div className="bg-white rounded-2xl border border-border p-10 text-center shadow-xs flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4 shadow-2xs">
            <AlertCircle className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-lg font-bold text-text mb-2">
            {t("advice.lowConfidenceTitle")}
          </h3>
          <p className="text-xs text-muted mb-6 max-w-sm leading-relaxed">
            {t("advice.lowConfidenceDesc")}
          </p>
          <button
            type="button"
            onClick={() => navigate("result")}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("advice.backToResult")}</span>
          </button>
        </div>
      </div>
    );
  }

  // Retrieve advisory list
  const isHealthy = activeResult.diseaseId === "healthy";
  const disease = !isHealthy && activeResult.diseaseId ? DISEASES[activeResult.diseaseId] : null;

  let advisoryList = [];
  if (isHealthy) {
    advisoryList =
      tab === "organic"
        ? t("advice.healthyOrganic", { returnObjects: true })
        : t("advice.healthyChemical", { returnObjects: true });
  } else if (disease && disease.advisory && disease.advisory[tab]) {
    advisoryList =
      disease.advisory[tab][currentLang] ||
      disease.advisory[tab].mr ||
      [];
  }

  // Weather scenario
  const weather = WEATHER_SCENARIOS[weatherId] || WEATHER_SCENARIOS.clear;
  const isSpraySafe = weather.spraySuitable;
  const sprayNoteText =
    weather.sprayNote?.[currentLang] || weather.sprayNote?.mr || "";

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto w-full space-y-6 animate-fade-in">
      {/* 1. Full-width Two-Tab Segmented Control */}
      <div className="grid grid-cols-2 gap-3 w-full">
        <button
          type="button"
          onClick={() => setTab("organic")}
          className={`py-3.5 px-4 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
            tab === "organic"
              ? "bg-primary text-white shadow-xs"
              : "bg-white text-text border border-border hover:bg-page-bg"
          }`}
        >
          <Leaf className="w-4 h-4 shrink-0" />
          <span>{t("advice.organicTab")}</span>
        </button>

        <button
          type="button"
          onClick={() => setTab("chemical")}
          className={`py-3.5 px-4 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
            tab === "chemical"
              ? "bg-primary text-white shadow-xs"
              : "bg-white text-text border border-border hover:bg-page-bg"
          }`}
        >
          <span>{t("advice.chemicalTab")}</span>
        </button>
      </div>

      {/* 2. Content Card (Light Success Tint) */}
      <div className="bg-success-bg/40 border border-success-border rounded-2xl p-6 md:p-7 shadow-xs space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-primary shrink-0 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-base md:text-lg font-bold text-text">
            {tab === "organic"
              ? t("advice.organicTitle")
              : t("advice.chemicalTitle")}
          </h3>
        </div>

        <ul className="space-y-3.5">
          {Array.isArray(advisoryList) &&
            advisoryList.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200/80 shadow-2xs">
                  {idx + 1}
                </span>
                <span className="text-xs md:text-sm text-text font-medium leading-relaxed">
                  {step}
                </span>
              </li>
            ))}
        </ul>
      </div>

      {/* 3. Weather Reminder Card */}
      <div
        className={`p-4 md:p-5 rounded-2xl border flex items-start gap-3.5 transition-all shadow-xs ${
          isSpraySafe
            ? "bg-info-bg border-info-border text-info-text"
            : "bg-warn-bg border-warn-border text-warn-text"
        }`}
      >
        <span className="text-2xl md:text-3xl leading-none shrink-0">
          {weather.icon}
        </span>
        <div className="text-xs md:text-sm">
          <p className="font-bold mb-1 text-sm md:text-base">
            {t("advice.weatherTitle")}
          </p>
          <p className="leading-relaxed opacity-95">{sprayNoteText}</p>
        </div>
      </div>

      {/* 4. Always-visible Warn Strip */}
      <div className="bg-warn-bg border border-warn-border text-warn-text rounded-xl p-3.5 text-xs font-semibold flex items-center gap-2.5 shadow-2xs">
        <AlertTriangle className="w-4 h-4 text-warn shrink-0" />
        <span>{t("advice.safetyWarning")}</span>
      </div>
    </div>
  );
}
