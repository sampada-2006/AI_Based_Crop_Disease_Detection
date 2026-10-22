import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Flame } from "lucide-react";
import { getLeafImage } from "../../data/leafImages";

export default function ResultImageSection({ diseaseId, affectedAreaPercent, rawImage }) {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState("original"); // "original" | "heatmap"

  const originalSrc =
    rawImage || getLeafImage({ diseaseId, affectedAreaPercent: affectedAreaPercent || 0 });

  return (
    <div className="space-y-4">
      {/* Main Image View */}
      <div className="relative rounded-2xl overflow-hidden border border-border bg-black/5 shadow-xs flex items-center justify-center min-h-[300px] max-h-[420px]">
        <img
          src={originalSrc}
          alt="Analysis Result Leaf"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = getLeafImage({
              diseaseId,
              affectedAreaPercent: affectedAreaPercent || 0,
            });
          }}
          className="w-full max-h-[420px] object-cover"
        />

        {/* Grad-CAM Thermal Heatmap Overlay */}
        {activeView === "heatmap" && diseaseId !== "healthy" && (
          <div
            className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-80 animate-fade-in"
            style={{
              background: `radial-gradient(circle at 45% 42%, rgba(239,68,68,0.85) 0%, rgba(249,115,22,0.65) 28%, rgba(234,179,8,0.45) 50%, transparent 72%),
                           radial-gradient(circle at 62% 58%, rgba(239,68,68,0.75) 0%, rgba(249,115,22,0.55) 24%, transparent 55%)`,
            }}
          />
        )}

        {/* Grad-CAM Tag when Heatmap is active */}
        {activeView === "heatmap" && (
          <div className="absolute top-3 left-3 bg-red-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 backdrop-blur-xs animate-fade-in">
            <Flame className="w-3.5 h-3.5 text-yellow-300" />
            <span>{t("result.gradCamTag")}</span>
          </div>
        )}
      </div>

      {/* Selectable Thumbnail Strip */}
      <div className="grid grid-cols-2 gap-3">
        {/* 1. मूळ फोटो (Original) */}
        <button
          type="button"
          onClick={() => setActiveView("original")}
          className={`flex items-center gap-2.5 p-2 rounded-xl transition text-left cursor-pointer ${
            activeView === "original"
              ? "border-2 border-primary bg-emerald-50/60 shadow-xs"
              : "border border-border hover:bg-page-bg bg-white"
          }`}
        >
          <img
            src={originalSrc}
            alt="Original Thumbnail"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = getLeafImage({
                diseaseId,
                affectedAreaPercent: affectedAreaPercent || 0,
              });
            }}
            className="w-12 h-12 object-cover rounded-lg border border-border shrink-0"
          />
          <div className="min-w-0">
            <span
              className={`text-xs block truncate ${
                activeView === "original"
                  ? "font-bold text-primary-dark"
                  : "font-semibold text-text"
              }`}
            >
              {t("result.originalPhoto")}
            </span>
          </div>
        </button>

        {/* 2. हीटमॅप (Grad-CAM) */}
        <button
          type="button"
          onClick={() => setActiveView("heatmap")}
          className={`flex items-center gap-2.5 p-2 rounded-xl transition text-left cursor-pointer ${
            activeView === "heatmap"
              ? "border-2 border-primary bg-emerald-50/60 shadow-xs"
              : "border border-border hover:bg-page-bg bg-white"
          }`}
        >
          <div className="w-12 h-12 rounded-lg border border-border shrink-0 overflow-hidden relative">
            <img
              src={originalSrc}
              alt="Heatmap Thumbnail"
              className="w-full h-full object-cover"
            />
            {diseaseId !== "healthy" && (
              <div
                className="absolute inset-0 mix-blend-multiply opacity-80"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(239,68,68,0.85) 0%, rgba(249,115,22,0.6) 35%, transparent 70%)`,
                }}
              />
            )}
          </div>
          <div className="min-w-0">
            <span
              className={`text-xs block truncate ${
                activeView === "heatmap"
                  ? "font-bold text-primary-dark"
                  : "font-semibold text-text"
              }`}
            >
              {t("result.heatmapThumb")}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
