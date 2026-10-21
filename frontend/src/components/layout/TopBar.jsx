import { useTranslation } from "react-i18next";
import { ArrowLeft, User } from "lucide-react";
import { useApp } from "../../context/AppContext";

const PAGES_WITH_HEADER = [
  "scan",
  "result",
  "advice",
  "history",
  "weather",
  "settings",
  "compare",
];

export default function TopBar({ variant = "default" }) {
  const { t, i18n } = useTranslation();
  const { page, goBack } = useApp();

  const showHeader = PAGES_WITH_HEADER.includes(page);
  const currentLang = i18n.language;
  const isOverlay = variant === "overlay";

  const setLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header
      className={`h-16 px-8 flex items-center justify-between shrink-0 transition-all ${
        isOverlay
          ? "absolute top-0 left-0 right-0 z-20 bg-transparent border-b-0 pointer-events-none"
          : "bg-white border-b border-border shadow-xs z-10"
      }`}
    >
      {/* Left side: Back button and Title (hidden on home and diseases) */}
      <div className={`flex items-center gap-3 min-w-0 ${isOverlay ? "pointer-events-auto" : ""}`}>
        {showHeader ? (
          <>
            <button
              onClick={goBack}
              className="w-9 h-9 rounded-lg border border-border hover:bg-page-bg text-text flex items-center justify-center transition cursor-pointer bg-white"
              title={t("back")}
              aria-label={t("back")}
            >
              <ArrowLeft className="w-4 h-4 text-muted" />
            </button>
            <h2 className="text-lg font-bold text-text truncate">
              {t(`pageTitles.${page}`)}
            </h2>
          </>
        ) : (
          <div />
        )}
      </div>

      {/* Right side: Segmented language pill + round user avatar */}
      <div className={`flex items-center gap-4 ${isOverlay ? "pointer-events-auto" : ""}`}>
        {/* Segmented language pill */}
        <div
          className={`flex items-center p-1 rounded-full border text-xs shadow-xs transition ${
            isOverlay
              ? "bg-white/95 border-emerald-200/80 backdrop-blur-sm"
              : "bg-slate-100 border-border"
          }`}
        >
          <button
            onClick={() => setLanguage("mr")}
            className={`px-3 py-1 rounded-full font-medium transition cursor-pointer ${
              currentLang === "mr"
                ? "bg-success-bg text-success font-bold border border-success-border shadow-xs"
                : "text-muted hover:text-text"
            }`}
          >
            मराठी
          </button>
          <span className="text-slate-300 px-0.5">|</span>
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded-full font-medium transition cursor-pointer ${
              currentLang === "en"
                ? "bg-success-bg text-success font-bold border border-success-border shadow-xs"
                : "text-muted hover:text-text"
            }`}
          >
            English
          </button>
        </div>

        {/* Round avatar in green ring */}
        <div
          className={`w-9 h-9 rounded-full border-2 border-primary/50 flex items-center justify-center text-primary shadow-xs transition ${
            isOverlay ? "bg-white/95 backdrop-blur-sm" : "bg-success-bg"
          }`}
          title={t("userProfile")}
          aria-label={t("userProfile")}
        >
          <User className="w-4 h-4 text-primary" />
        </div>
      </div>
    </header>
  );
}
