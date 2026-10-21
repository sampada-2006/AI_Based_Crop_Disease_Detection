import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, ChevronDown } from "lucide-react";
import { DISEASES } from "../data/diseases";
import { CROPS } from "../data/crops";
import { getLeafImage } from "../data/leafImages";

export default function DiseasesPage() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const currentLang = i18n.language;
  const isMr = currentLang === "mr";

  // Exclude 'healthy' from the list
  const diseaseList = Object.values(DISEASES).filter((d) => d.id !== "healthy");

  // Filtering live by Marathi OR English name
  const filteredDiseases = diseaseList.filter((d) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const mrMatch = d.nameMr?.toLowerCase().includes(q);
    const enMatch = d.nameEn?.toLowerCase().includes(q);
    return mrMatch || enMatch;
  });

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto w-full space-y-6 animate-fade-in">
      {/* 1. Search input */}
      <div className="relative">
        <Search className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("diseases.searchPlaceholder")}
          className="w-full bg-white border border-border rounded-xl pl-11 pr-4 py-3 text-xs md:text-sm text-text placeholder:text-muted focus:outline-none focus:border-primary shadow-xs transition"
        />
      </div>

      {/* 2. Heading "प्रमुख रोग" */}
      <h2 className="text-base md:text-lg font-bold text-text">
        {t("diseases.heading")}
      </h2>

      {/* 3. White list cards / Accordion */}
      <div className="space-y-3">
        {filteredDiseases.map((disease) => {
          const isExpanded = expandedId === disease.id;
          const cropSubtitle = (disease.cropIds || [])
            .map((cropId) => {
              const c = CROPS[cropId];
              return isMr ? c?.nameMr : c?.nameEn;
            })
            .filter(Boolean)
            .join(", ");

          return (
            <div
              key={disease.id}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleExpand(disease.id);
                }
              }}
              onClick={() => toggleExpand(disease.id)}
              className={`bg-white rounded-2xl border transition-all cursor-pointer shadow-xs p-4 select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
                isExpanded
                  ? "border-primary/50 shadow-sm"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={getLeafImage({
                      diseaseId: disease.id,
                      cropId: disease.cropIds?.[0],
                      affectedAreaPercent: 18,
                    })}
                    alt={isMr ? disease.nameMr : disease.nameEn}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-border/80 bg-slate-50"
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm md:text-base font-bold text-text truncate">
                      {isMr ? disease.nameMr : disease.nameEn}{" "}
                      <span className="font-normal text-muted text-xs md:text-sm">
                        ({isMr ? disease.nameEn : disease.nameMr})
                      </span>
                    </h3>
                    <p className="text-xs text-muted font-medium truncate mt-0.5">
                      {cropSubtitle}
                    </p>
                  </div>
                </div>

                <ChevronDown
                  className={`w-5 h-5 text-muted transition-transform duration-200 shrink-0 ${
                    isExpanded ? "rotate-180 text-primary" : ""
                  }`}
                />
              </div>

              {/* Accordion content: Symptoms and Cause */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-border/80 text-xs text-muted space-y-2 animate-fade-in">
                  {disease.cause && (
                    <p>
                      <span className="font-bold text-text">
                        {t("diseases.cause")}:
                      </span>{" "}
                      <span className="italic">{disease.cause}</span>
                    </p>
                  )}
                  <p>
                    <span className="font-bold text-text">
                      {t("diseases.symptoms")}:
                    </span>{" "}
                    <span className="leading-relaxed">
                      {disease.symptoms?.[currentLang] || disease.symptoms?.mr}
                    </span>
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty state when no matches */}
        {filteredDiseases.length === 0 && (
          <div className="bg-white rounded-2xl border border-border p-8 text-center shadow-xs flex flex-col items-center">
            <Search className="w-8 h-8 text-muted/60 mb-2" />
            <h3 className="text-sm font-bold text-text mb-1">
              {t("diseases.noResultsTitle")}
            </h3>
            <p className="text-xs text-muted mb-4 max-w-xs leading-relaxed">
              {t("diseases.noResultsDesc")}
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              {t("diseases.clearSearch")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
