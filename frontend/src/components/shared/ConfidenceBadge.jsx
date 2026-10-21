export default function ConfidenceBadge({ confidence, tier, t }) {
  const colors = {
    high: "bg-emerald-100 text-emerald-800 border-emerald-200",
    medium: "bg-amber-100 text-amber-800 border-amber-200",
    low: "bg-red-100 text-red-800 border-red-200",
  };

  const labels = {
    high: t("highConfidence"),
    medium: t("mediumConfidence"),
    low: t("lowConfidence"),
  };

  return (
    <span
      className={`text-xs font-bold px-2.5 py-1 rounded-full border ${colors[tier]}`}
    >
      {confidence}% · {labels[tier]}
    </span>
  );
}
