import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { useApp } from "../../context/AppContext";

const STEPS = [
  {
    titleKey: "onboarding.step1Title",
    descKey: "onboarding.step1Desc",
  },
  {
    titleKey: "onboarding.step2Title",
    descKey: "onboarding.step2Desc",
  },
  {
    titleKey: "onboarding.step3Title",
    descKey: "onboarding.step3Desc",
  },
  {
    titleKey: "onboarding.step4Title",
    descKey: "onboarding.step4Desc",
  },
];

export default function OnboardingModal() {
  const { t, i18n } = useTranslation();
  const {
    onboardingOpen,
    setOnboardingOpen,
    onboardingStep,
    setOnboardingStep,
  } = useApp();

  const currentLang = i18n.language;

  // Dismiss on Escape key
  useEffect(() => {
    if (!onboardingOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOnboardingOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onboardingOpen, setOnboardingOpen]);

  if (!onboardingOpen) return null;

  const currentStep = STEPS[onboardingStep] || STEPS[0];
  const isFirstStep = onboardingStep === 0;
  const isLastStep = onboardingStep === STEPS.length - 1;

  const handleBack = () => {
    if (!isFirstStep) {
      setOnboardingStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      setOnboardingOpen(false);
    } else {
      setOnboardingStep((prev) => prev + 1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOnboardingOpen(false);
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-modal-title"
        className="bg-white rounded-3xl border border-border shadow-2xl w-full max-w-md p-6 sm:p-8 flex flex-col relative animate-scale-in"
      >
        {/* Top Header Row: Language Pill (left) + Close X Button (right) */}
        <div className="flex items-center justify-between pb-2 mb-2">
          {/* Segmented language pill */}
          <div className="flex items-center p-0.5 rounded-full border border-border bg-slate-100 text-[11px] shadow-2xs">
            <button
              type="button"
              onClick={() => i18n.changeLanguage("mr")}
              className={`px-2.5 py-0.5 rounded-full font-medium transition cursor-pointer ${
                currentLang === "mr"
                  ? "bg-success-bg text-success font-bold border border-success-border shadow-2xs"
                  : "text-muted hover:text-text"
              }`}
            >
              {t("onboarding.marathi")}
            </button>
            <span className="text-slate-300 px-0.5">|</span>
            <button
              type="button"
              onClick={() => i18n.changeLanguage("en")}
              className={`px-2.5 py-0.5 rounded-full font-medium transition cursor-pointer ${
                currentLang === "en"
                  ? "bg-success-bg text-success font-bold border border-success-border shadow-2xs"
                  : "text-muted hover:text-text"
              }`}
            >
              {t("onboarding.english")}
            </button>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={() => setOnboardingOpen(false)}
            className="w-8 h-8 rounded-full border border-border hover:bg-page-bg text-muted hover:text-text flex items-center justify-center transition cursor-pointer"
            title={t("onboarding.close")}
            aria-label={t("onboarding.close")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Center Illustration: Emoji composition on soft green circle */}
        <div className="my-4 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-emerald-100/70 border-2 border-emerald-200/80 flex items-center justify-center shadow-inner relative select-none">
            <span className="text-6xl">🧑‍🌾</span>
            <span className="absolute bottom-2 right-3 text-2xl drop-shadow-xs">📱</span>
            <span className="absolute top-2 right-4 text-2xl drop-shadow-xs">🌿</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="text-center px-2 mb-4">
          <h3
            id="onboarding-modal-title"
            className="text-lg sm:text-xl font-bold text-text mb-2"
          >
            {t(currentStep.titleKey)}
          </h3>
          <p className="text-xs sm:text-sm text-muted max-w-sm mx-auto leading-relaxed min-h-[44px]">
            {t(currentStep.descKey)}
          </p>
        </div>

        {/* 4 Step Dots */}
        <div className="flex items-center justify-center gap-3 my-3">
          {STEPS.map((_, idx) => {
            const isActive = onboardingStep === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setOnboardingStep(idx)}
                className={`w-7 h-7 rounded-full text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                  isActive
                    ? "bg-[#0D4F3C] text-white shadow-xs"
                    : "bg-slate-100 text-muted border border-border hover:bg-slate-200"
                }`}
                aria-label={`Step ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Bottom Button Row */}
        <div className="flex items-center justify-between gap-3 pt-5 mt-2 border-t border-border">
          <button
            type="button"
            disabled={isFirstStep}
            onClick={handleBack}
            className={`py-2.5 px-6 rounded-xl text-xs sm:text-sm font-bold border transition ${
              isFirstStep
                ? "border-border text-slate-300 opacity-50 cursor-not-allowed bg-slate-50"
                : "border-border text-text hover:bg-page-bg cursor-pointer bg-white"
            }`}
          >
            {t("onboarding.back")}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-7 rounded-xl transition shadow-xs cursor-pointer text-xs sm:text-sm"
          >
            {isLastStep ? t("onboarding.start") : t("onboarding.next")}
          </button>
        </div>
      </div>
    </div>
  );
}
