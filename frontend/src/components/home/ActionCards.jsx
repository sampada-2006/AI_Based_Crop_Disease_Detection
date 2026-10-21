import { useTranslation } from "react-i18next";
import { Camera, ArrowRight, BookOpen, CloudSun } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ActionCards() {
  const { t } = useTranslation();
  const { navigate } = useApp();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 -mt-10 relative z-10 px-4 md:px-6">
      {/* 1. नवीन तपासणी */}
      <button
        onClick={() => navigate("scan")}
        className="bg-primary hover:bg-primary-dark text-white rounded-2xl p-6 text-left shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex flex-col justify-between min-h-[160px] cursor-pointer group"
      >
        <div>
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-3 shadow-xs group-hover:scale-105 transition-transform">
            <Camera className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">
            {t("home.newScan")}
          </h3>
          <p className="text-xs text-emerald-100/90 leading-relaxed">
            {t("home.newScanDesc")}
          </p>
        </div>
        <div className="flex justify-end pt-2">
          <ArrowRight className="w-5 h-5 text-white/90 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>

      {/* 2. माझे स्कॅन */}
      <button
        onClick={() => navigate("history")}
        className="bg-[#EDF0FD] hover:bg-[#E2E7FC] border border-[#DCE3FA] text-text rounded-2xl p-6 text-left shadow-xs hover:shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 flex flex-col justify-between min-h-[160px] cursor-pointer group"
      >
        <div>
          <div className="w-12 h-12 rounded-xl bg-[#E0E7FF] flex items-center justify-center mb-3 shadow-xs group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6 text-[#4338CA]" />
          </div>
          <h3 className="text-base font-bold text-[#1E1B4B] mb-1">
            {t("home.myScans")}
          </h3>
          <p className="text-xs text-[#4F46E5]/80 leading-relaxed">
            {t("home.myScansDesc")}
          </p>
        </div>
      </button>

      {/* 3. हवामान */}
      <button
        onClick={() => navigate("weather")}
        className="bg-[#EAF5FD] hover:bg-[#DEF0FD] border border-[#CFE5F8] text-text rounded-2xl p-6 text-left shadow-xs hover:shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 flex flex-col justify-between min-h-[160px] cursor-pointer group"
      >
        <div>
          <div className="w-12 h-12 rounded-xl bg-[#BAE6FD] flex items-center justify-center mb-3 shadow-xs group-hover:scale-105 transition-transform">
            <CloudSun className="w-6 h-6 text-[#0284C7]" />
          </div>
          <h3 className="text-base font-bold text-[#0C4A6E] mb-1">
            {t("home.weather")}
          </h3>
          <p className="text-xs text-[#0284C7]/80 leading-relaxed">
            {t("home.weatherDesc")}
          </p>
        </div>
      </button>
    </div>
  );
}
