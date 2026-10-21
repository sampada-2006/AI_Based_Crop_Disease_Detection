import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Check,
  HelpCircle,
  Info,
  ChevronRight,
  Sprout,
  X,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import Toggle from "../components/shared/Toggle";

const FONT_OPTIONS = [
  { scale: 0.9, labelKey: "settings.fontSmall" },
  { scale: 1, labelKey: "settings.fontNormal" },
  { scale: 1.2, labelKey: "settings.fontLarge" },
];

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const {
    fontScale,
    setFontScale,
    showQualityDetails,
    setShowQualityDetails,
    notificationsOn,
    setNotificationsOn,
    isOffline,
    setIsOffline,
    setOnboardingOpen,
    setOnboardingStep,
    showToast,
  } = useApp();

  const [showAboutModal, setShowAboutModal] = useState(false);
  const currentLang = i18n.language;

  useEffect(() => {
    if (!showAboutModal) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowAboutModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showAboutModal]);

  const handleToggleNotifications = (checked) => {
    setNotificationsOn(checked);
    showToast(
      checked
        ? t("settings.notificationsEnabled")
        : t("settings.notificationsDisabled")
    );
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto w-full space-y-6 animate-fade-in">
      {/* Settings White Card with dividers */}
      <div className="bg-white rounded-2xl border border-border p-6 shadow-xs divide-y divide-border">
        {/* 1. भाषा (Language) */}
        <div className="pb-5">
          <h3 className="text-sm font-bold text-text mb-3">
            {t("settings.language")}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => i18n.changeLanguage("mr")}
              className={`py-3 px-4 rounded-xl border flex items-center justify-between text-sm transition cursor-pointer ${
                currentLang === "mr"
                  ? "border-primary bg-emerald-50/60 text-primary-dark font-bold shadow-xs"
                  : "border-border bg-white text-text font-medium hover:bg-page-bg"
              }`}
            >
              <span>{t("settings.marathi")}</span>
              {currentLang === "mr" && (
                <Check className="w-4 h-4 text-primary shrink-0" />
              )}
            </button>

            <button
              type="button"
              onClick={() => i18n.changeLanguage("en")}
              className={`py-3 px-4 rounded-xl border flex items-center justify-between text-sm transition cursor-pointer ${
                currentLang === "en"
                  ? "border-primary bg-emerald-50/60 text-primary-dark font-bold shadow-xs"
                  : "border-border bg-white text-text font-medium hover:bg-page-bg"
              }`}
            >
              <span>{t("settings.english")}</span>
              {currentLang === "en" && (
                <Check className="w-4 h-4 text-primary shrink-0" />
              )}
            </button>
          </div>
        </div>

        {/* 2. फॉन्ट आकार (Font Size) */}
        <div className="py-5">
          <h3 className="text-sm font-bold text-text mb-3">
            {t("settings.fontSize")}
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {FONT_OPTIONS.map((opt) => {
              const isActive = fontScale === opt.scale;
              return (
                <button
                  key={opt.scale}
                  type="button"
                  onClick={() => setFontScale(opt.scale)}
                  className={`py-2.5 px-3 rounded-xl border text-sm font-bold transition flex items-center justify-center cursor-pointer ${
                    isActive
                      ? "border-primary bg-emerald-50/60 text-primary shadow-xs"
                      : "border-border bg-white text-muted hover:bg-page-bg"
                  }`}
                >
                  {t(opt.labelKey)}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. फोटो-क्वालिटी (स्पष्टीकरण) दाखवा (Photo Quality Details) */}
        <div className="py-5 flex items-center justify-between gap-4">
          <div className="pr-2">
            <h3 className="text-sm font-bold text-text">
              {t("settings.showQualityDetails")}
            </h3>
            <p className="text-xs text-muted mt-0.5">
              {t("settings.showQualityDetailsHelper")}
            </p>
          </div>
          <Toggle
            checked={showQualityDetails}
            onChange={setShowQualityDetails}
            ariaLabel={t("settings.showQualityDetails")}
          />
        </div>

        {/* 4. सूचना (Notification) */}
        <div className="py-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-text">
              {t("settings.notifications")}
            </h3>
          </div>
          <Toggle
            checked={notificationsOn}
            onChange={handleToggleNotifications}
            ariaLabel={t("settings.notifications")}
          />
        </div>

        {/* 5. ऑफलाइन मोड (Offline Mode) */}
        <div className="py-5 flex items-center justify-between gap-4">
          <div className="pr-2">
            <h3 className="text-sm font-bold text-text">
              {t("settings.offlineMode")}
            </h3>
            <p className="text-xs text-muted mt-0.5">
              {t("settings.offlineModeHelper")}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-semibold border flex items-center gap-1.5 shadow-2xs ${
                isOffline
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isOffline ? "bg-red-500" : "bg-emerald-500"
                }`}
              />
              <span>
                {isOffline
                  ? t("settings.offlineStatus")
                  : t("settings.onlineStatus")}
              </span>
            </span>
            <Toggle
              checked={isOffline}
              onChange={setIsOffline}
              ariaLabel={t("settings.offlineMode")}
            />
          </div>
        </div>

        {/* 6. मदत व सहाय्य (Help & Support) */}
        <div className="py-2">
          <button
            type="button"
            onClick={() => {
              setOnboardingStep(0);
              setOnboardingOpen(true);
            }}
            className="w-full flex items-center justify-between py-3 hover:bg-page-bg/50 -mx-3 px-3 rounded-xl transition cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-muted">
                <HelpCircle className="w-4 h-4 text-muted" />
              </div>
              <span className="text-sm font-bold text-text">
                {t("settings.helpAndSupport")}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted/60" />
          </button>
        </div>

        {/* 7. अॅप बद्दल (About App) */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowAboutModal(true)}
            className="w-full flex items-center justify-between py-3 hover:bg-page-bg/50 -mx-3 px-3 rounded-xl transition cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-muted">
                <Info className="w-4 h-4 text-muted" />
              </div>
              <span className="text-sm font-bold text-text">
                {t("settings.aboutApp")}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted/60" />
          </button>
        </div>
      </div>

      {/* Small About App Modal */}
      {showAboutModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAboutModal(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-modal-title"
            className="bg-white rounded-2xl border border-border p-6 sm:p-7 max-w-sm w-full shadow-2xl text-center space-y-4 animate-scale-in relative"
          >
            <button
              type="button"
              onClick={() => setShowAboutModal(false)}
              className="absolute top-4 right-4 text-muted hover:text-text p-1 rounded-md cursor-pointer"
              title={t("settings.closeModal")}
              aria-label={t("settings.closeModal")}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-sidebar flex items-center justify-center text-white mx-auto shadow-sm">
              <Sprout className="w-7 h-7 text-emerald-300" />
            </div>

            <div>
              <h3
                id="about-modal-title"
                className="text-lg font-bold text-text"
              >
                {t("settings.aboutTitle")}
              </h3>
              <p className="text-xs text-muted font-medium mt-1">
                {t("settings.aboutSubtitle")}
              </p>
            </div>

            <div className="bg-slate-50 border border-border/80 rounded-xl p-3.5 text-xs text-muted space-y-1">
              <p className="font-semibold text-text">
                {t("settings.aboutVersion")}
              </p>
              <p>{t("settings.aboutTeam")}</p>
            </div>

            <button
              type="button"
              onClick={() => setShowAboutModal(false)}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-xl transition shadow-xs cursor-pointer text-xs"
            >
              {t("settings.closeModal")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
