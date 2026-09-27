import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardOverview from "./DashboardOverview";
import AnalysisPage from "./AnalysisPage";
import AnalyticsPage from "./AnalyticsPage";
import HistoryPage from "./HistoryPage";
import AlertsPage from "./AlertsPage";
import ReportsPage from "./ReportsPage";
import SettingsPage from "./SettingsPage";
import { useTheme } from "../context/ThemeContext";

const PAGE_MAP = {
  overview: DashboardOverview,
  analysis: AnalysisPage,
  analytics: AnalyticsPage,
  history: HistoryPage,
  alerts: AlertsPage,
  reports: ReportsPage,
  settings: SettingsPage,
};

export default function Dashboard() {
  const [activePage, setActivePage] = useState("overview");
  const { compactLayout } = useTheme();

  const PageComponent = PAGE_MAP[activePage] || DashboardOverview;

  return (
    <div className="dashboard-shell">
      <DashboardSidebar activePage={activePage} onNavigate={setActivePage} />
      <main className={`dashboard-main ${compactLayout ? "dashboard-main--compact" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            className="dashboard-page-wrapper"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <PageComponent />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
