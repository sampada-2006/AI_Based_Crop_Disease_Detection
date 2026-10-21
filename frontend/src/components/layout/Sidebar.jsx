import { useTranslation } from "react-i18next";
import {
  Home,
  ScanLine,
  History,
  CloudSun,
  Leaf,
  Settings,
  Sprout,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const NAV_ITEMS = [
  { id: "home", labelKey: "nav.home", icon: Home, targetPage: "home" },
  { id: "scan", labelKey: "nav.scan", icon: ScanLine, targetPage: "scan" },
  { id: "history", labelKey: "nav.history", icon: History, targetPage: "history" },
  { id: "weather", labelKey: "nav.weather", icon: CloudSun, targetPage: "weather" },
  { id: "diseases", labelKey: "nav.diseases", icon: Leaf, targetPage: "diseases" },
  { id: "settings", labelKey: "nav.settings", icon: Settings, targetPage: "settings" },
];

function getActiveNavId(page) {
  if (page === "home") return "home";
  if (page === "scan") return "scan";
  if (["history", "result", "advice", "compare"].includes(page)) return "history";
  if (page === "weather") return "weather";
  if (page === "diseases") return "diseases";
  if (page === "settings") return "settings";
  return "home";
}

export default function Sidebar() {
  const { t } = useTranslation();
  const { page, navigate } = useApp();
  const activeNavId = getActiveNavId(page);

  return (
    <aside className="w-[240px] shrink-0 bg-sidebar text-white min-h-screen flex flex-col justify-between p-4 select-none">
      <div>
        {/* Logo block */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6">
          <div className="bg-primary p-2.5 rounded-xl text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sprout className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-bold text-white leading-snug max-w-[140px] break-words">
              {t("appTitle")}
            </h1>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="space-y-1.5" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeNavId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => navigate(item.targetPage)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm transition text-left cursor-pointer ${
                  isActive
                    ? "bg-nav-active text-white font-semibold shadow-xs"
                    : "text-emerald-100/80 hover:bg-white/10 hover:text-white font-medium"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="truncate">{t(item.labelKey)}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
