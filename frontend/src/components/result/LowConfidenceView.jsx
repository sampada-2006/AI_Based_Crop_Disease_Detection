import { AlertTriangle, ShieldCheck } from "lucide-react";
import ConfidenceBadge from "../shared/ConfidenceBadge";
import { getConfidenceTier } from "../../utils/confidence";
import { DISEASES } from "../../data/diseases";

export default function LowConfidenceView({
  alternates = [],
  onAskExpert,
  currentLang,
  t,
}) {
  const getAlternateName = (alt) => {
    if (alt.diseaseId && DISEASES[alt.diseaseId]) {
      return currentLang === "mr"
        ? DISEASES[alt.diseaseId].nameMr
        : DISEASES[alt.diseaseId].nameEn;
    }
    if (alt.name) {
      return currentLang === "mr" ? alt.name.mr : alt.name.en;
    }
    if (alt.diseaseMr || alt.diseaseEn) {
      return currentLang === "mr" ? alt.diseaseMr : alt.diseaseEn;
    }
    return "";
  };

  return (
    <div className="bg-warn-bg border-2 border-warn-border rounded-2xl p-6 shadow-xs space-y-5">
      {/* Warning Header */}
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-warn shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-sm md:text-base text-warn-text leading-snug">
            {t("result.lowConfidenceTitle")}
          </h3>
          <p className="text-xs text-warn-text/80 mt-1 leading-relaxed">
            {t("lowConfidenceExplainer")}
          </p>
        </div>
      </div>

      {/* Alternates List with Confidence Pills */}
      <div className="space-y-2.5">
        {alternates.map((alt, idx) => {
          const name = getAlternateName(alt);
          const tier = getConfidenceTier(alt.confidence);
          return (
            <div
              key={idx}
              className="flex items-center justify-between bg-white border border-border rounded-xl p-3.5 shadow-2xs"
            >
              <span className="text-xs md:text-sm font-bold text-text">
                {name}
              </span>
              <ConfidenceBadge confidence={alt.confidence} tier={tier} t={t} />
            </div>
          );
        })}
      </div>

      {/* Ask Expert CTA Button */}
      <button
        type="button"
        onClick={onAskExpert}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-6 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer text-sm"
      >
        <ShieldCheck className="w-4 h-4" />
        <span>{t("result.askExpert")}</span>
      </button>
    </div>
  );
}
