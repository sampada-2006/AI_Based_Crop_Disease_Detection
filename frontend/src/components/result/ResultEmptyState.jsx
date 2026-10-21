import { Activity, Camera } from "lucide-react";

export default function ResultEmptyState({ onNewScan, t }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-10 text-center shadow-xs flex flex-col items-center max-w-md mx-auto my-12">
      <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-primary mb-4 shadow-2xs">
        <Activity className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-bold text-text mb-2">
        {t("result.emptyTitle")}
      </h3>
      <p className="text-xs text-muted mb-6 max-w-sm leading-relaxed">
        {t("result.emptyDesc")}
      </p>
      <button
        type="button"
        onClick={onNewScan}
        className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer text-sm"
      >
        <Camera className="w-4 h-4" />
        <span>{t("result.newScan")}</span>
      </button>
    </div>
  );
}
