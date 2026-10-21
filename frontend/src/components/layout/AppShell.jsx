import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import DemoPanel from "../demo/DemoPanel";
import Toast from "../shared/Toast";
import OnboardingModal from "../onboarding/OnboardingModal";

import HomePage from "../../pages/HomePage";
import ScanPage from "../../pages/ScanPage";
import ResultPage from "../../pages/ResultPage";
import AdvicePage from "../../pages/AdvicePage";
import HistoryPage from "../../pages/HistoryPage";
import WeatherPage from "../../pages/WeatherPage";
import DiseasesPage from "../../pages/DiseasesPage";
import SettingsPage from "../../pages/SettingsPage";
import ComparePage from "../../pages/ComparePage";

export default function AppShell() {
  const { t } = useTranslation();
  const { page, isOffline } = useApp();

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage />;
      case "scan":
        return <ScanPage />;
      case "result":
        return <ResultPage />;
      case "advice":
        return <AdvicePage />;
      case "history":
        return <HistoryPage />;
      case "weather":
        return <WeatherPage />;
      case "diseases":
        return <DiseasesPage />;
      case "settings":
        return <SettingsPage />;
      case "compare":
        return <ComparePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-page-bg text-text font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        <TopBar variant={page === "home" ? "overlay" : "default"} />

        {isOffline && (
          <div className="bg-slate-200 border-b border-slate-300 px-6 py-2 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 shrink-0 z-30">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            <span>{t("offlineBanner")}</span>
          </div>
        )}

        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>

        <DemoPanel />
        <Toast />
        <OnboardingModal />
      </div>
    </div>
  );
}
