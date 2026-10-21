import { useApp } from "../../context/AppContext";

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 border border-white/10 animate-fade-in pointer-events-none transition-all"
    >
      <span>{toastMessage}</span>
    </div>
  );
}
