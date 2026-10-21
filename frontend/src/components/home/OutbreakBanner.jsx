import { useTranslation } from "react-i18next";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { OUTBREAK } from "../../data/outbreaks";
import { CROPS } from "../../data/crops";
import { DISEASES } from "../../data/diseases";

export default function OutbreakBanner() {
  const { t, i18n } = useTranslation();
  const { navigate } = useApp();

  const isMr = i18n.language === "mr";
  const crop = CROPS[OUTBREAK.cropId];
  const disease = DISEASES[OUTBREAK.diseaseId];

  const cropName = isMr ? crop?.nameMr || "टोमॅटो" : crop?.nameEn || "Tomato";
  const diseaseName = isMr ? disease?.nameMr || "अर्ली ब्लाइट" : disease?.nameEn || "Early Blight";

  const alertMessage = t("home.alertMessage", {
    count: OUTBREAK.count,
    crop: cropName,
    disease: diseaseName,
  });

  return (
    <div className="mt-6 mx-4 md:mx-6">
      <button
        onClick={() => navigate("weather")}
        className="w-full bg-danger-bg hover:bg-[#FCDEDE] border border-danger-border rounded-2xl p-4 flex items-center justify-between text-left transition shadow-xs cursor-pointer group"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-full bg-danger/10 border border-danger-border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <AlertTriangle className="w-5 h-5 text-danger" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-text leading-snug">
              <span className="font-extrabold text-danger mr-2">
                {t("home.alertTitle")}
              </span>
              <span>{alertMessage}</span>
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-danger shrink-0 ml-3 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
