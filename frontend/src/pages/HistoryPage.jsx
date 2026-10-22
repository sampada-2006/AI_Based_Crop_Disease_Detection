import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight, RotateCcw } from "lucide-react";
import { useApp } from "../context/AppContext";
import { CROPS } from "../data/crops";
import { DISEASES } from "../data/diseases";
import { getLeafImage } from "../data/leafImages";
import { getConfidenceTier } from "../utils/confidence";
import { formatScanDate } from "../utils/formatDate";

export default function HistoryPage() {
  const { t, i18n } = useTranslation();
  const { scanHistory, setActiveResult, navigate } = useApp();
  const [activeFilter, setActiveFilter] = useState("all"); // "all" | "tomato" | "chilli" | "other"

  const currentLang = i18n.language;
  const isMr = currentLang === "mr";

  // Compute counts per group
  const counts = useMemo(() => {
    const res = { all: scanHistory.length, tomato: 0, chilli: 0, other: 0 };
    scanHistory.forEach((entry) => {
      const crop = CROPS[entry.cropId];
      const group = crop?.group || "other";
      if (group === "tomato") res.tomato += 1;
      else if (group === "chilli") res.chilli += 1;
      else res.other += 1;
    });
    return res;
  }, [scanHistory]);

  const filterOptions = [
    { key: "all", label: t("history.allFilter") },
    { key: "tomato", label: t("history.tomatoFilter") },
    { key: "chilli", label: t("history.chilliFilter") },
    { key: "other", label: t("history.otherFilter") },
  ];

  // Filter and sort newest first
  const sortedHistory = useMemo(() => {
    const filtered =
      activeFilter === "all"
        ? scanHistory
        : scanHistory.filter((entry) => {
            const crop = CROPS[entry.cropId];
            const group = crop?.group || "other";
            return group === activeFilter;
          });

    return [...filtered].sort(
      (a, b) => new Date(b.scannedAt).getTime() - new Date(a.scannedAt).getTime()
    );
  }, [scanHistory, activeFilter]);

  const handleSelectEntry = (entry, leafSrc) => {
    setActiveResult({
      entryId: entry.id,
      cropId: entry.cropId,
      diseaseId: entry.diseaseId,
      confidence: entry.confidence,
      affectedAreaPercent: entry.affectedAreaPercent,
      alternates: entry.alternates,
      scannedAt: entry.scannedAt,
      rawImage: leafSrc,
    });
    navigate("result");
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto w-full space-y-6 animate-fade-in">
      {/* 1. Filter Chips Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {filterOptions.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => setActiveFilter(opt.key)}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
              activeFilter === opt.key
                ? "bg-primary text-white shadow-xs"
                : "bg-white text-text border border-border hover:bg-page-bg"
            }`}
          >
            {opt.label} ({counts[opt.key] || 0})
          </button>
        ))}
      </div>

      {/* 2. Rows: White cards, newest first */}
      <div className="space-y-3">
        {sortedHistory.map((entry) => {
          const crop = CROPS[entry.cropId] || CROPS.tomato;
          const cropName = isMr ? crop.nameMr : crop.nameEn;
          const isHealthy = entry.diseaseId === "healthy";
          const disease =
            !isHealthy && entry.diseaseId ? DISEASES[entry.diseaseId] : null;
          const diseaseName = isHealthy
            ? t("result.healthyName")
            : disease
            ? isMr
              ? disease.nameMr
              : disease.nameEn
            : "";

          const title = `${cropName} - ${diseaseName}`;
          const dateFormatted = formatScanDate(entry.scannedAt, currentLang);
          const tier = getConfidenceTier(entry.confidence);

          const leafSrc =
            entry.rawImage ||
            getLeafImage({
              diseaseId: entry.diseaseId,
              affectedAreaPercent: entry.affectedAreaPercent,
              cropId: entry.cropId,
              entryId: entry.id,
            });

          return (
            <div
              key={entry.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelectEntry(entry, leafSrc);
                }
              }}
              onClick={() => handleSelectEntry(entry, leafSrc)}
              className="bg-white rounded-2xl border border-border p-3.5 md:p-4 shadow-xs hover:border-primary/40 transition cursor-pointer flex items-center justify-between gap-4 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={leafSrc}
                  alt={title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = getLeafImage({
                      diseaseId: entry.diseaseId,
                      affectedAreaPercent: entry.affectedAreaPercent,
                      cropId: entry.cropId,
                      entryId: entry.id,
                    });
                  }}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 border border-border/80 bg-slate-50"
                />
                <div className="min-w-0">
                  <h3 className="text-sm md:text-base font-bold text-text truncate">
                    {title}
                  </h3>
                  <p className="text-xs text-muted font-medium mt-0.5">
                    {dateFormatted}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`font-bold text-xs px-2.5 py-1 rounded-full border shadow-2xs ${
                    tier === "high"
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : tier === "medium"
                      ? "bg-amber-100 text-amber-800 border-amber-300"
                      : "bg-red-100 text-red-800 border-red-300"
                  }`}
                >
                  {entry.confidence}%
                </span>
                <ChevronRight className="w-4 h-4 text-muted/60" />
              </div>
            </div>
          );
        })}

        {/* Empty state per filter */}
        {sortedHistory.length === 0 && (
          <div className="bg-white rounded-2xl border border-border p-10 text-center shadow-xs flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-muted mb-3">
              <RotateCcw className="w-6 h-6 text-muted" />
            </div>
            <h3 className="text-sm md:text-base font-bold text-text mb-1">
              {t("history.emptyTitle")}
            </h3>
            <p className="text-xs text-muted max-w-xs leading-relaxed">
              {t("history.emptyDesc")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
