import { useState } from "react";
import { Info, ChevronDown } from "lucide-react";

export default function WhyIdentifiedCard({ explainerText, t }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-xl border border-border bg-slate-50/70 overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3.5 text-left font-bold text-xs md:text-sm text-text hover:bg-slate-100/60 transition cursor-pointer select-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-primary shrink-0" />
          <span>{t("result.whyIdentified")}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-3.5 pb-3.5 pt-1 text-xs text-muted leading-relaxed border-t border-border/60">
          <p>
            {explainerText}{" "}
            <span className="font-semibold text-primary-dark">
              {t("result.gradcamConfirmed")}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
