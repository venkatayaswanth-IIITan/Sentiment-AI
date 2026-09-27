import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FileText, Download, Calendar, BarChart2, TrendingUp, Clock } from "lucide-react";

const REPORTS = [
  { id: 1, title: "Weekly Sentiment Summary", period: "Sep 20–27, 2026", analyses: 284, positive: 67, created: "Sep 27, 2026", format: "PDF", size: "1.2 MB" },
  { id: 2, title: "Monthly Analytics Report", period: "September 2026", analyses: 1204, positive: 64.5, created: "Oct 1, 2026", format: "PDF", size: "4.8 MB" },
  { id: 3, title: "Customer Support Analysis", period: "Q3 2026", analyses: 3847, positive: 52, created: "Sep 30, 2026", format: "XLSX", size: "2.1 MB" },
  { id: 4, title: "Brand Health Dashboard Export", period: "Aug 2026", analyses: 987, positive: 70, created: "Aug 31, 2026", format: "CSV", size: "890 KB" },
];

export default function ReportsPage() {
  const { compactLayout } = useTheme();

  return (
    <div className={`dash-page ${compactLayout ? "dash-page--compact" : ""}`}>
      <div className="dash-page__header">
        <div>
          <h1 className="dash-page__title">Reports</h1>
          <p className="dash-page__subtitle">Download and manage sentiment analysis reports</p>
        </div>
        <button className="dash-action-btn dash-action-btn--primary">
          <FileText size={16} /> Generate Report
        </button>
      </div>

      <div className="reports-grid">
        {REPORTS.map((r, i) => (
          <motion.div
            key={r.id}
            className="dash-card report-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="report-card__icon">
              <FileText size={22} />
            </div>
            <div className="report-card__body">
              <h3 className="report-card__title">{r.title}</h3>
              <div className="report-card__meta">
                <span><Calendar size={12} /> {r.period}</span>
                <span><BarChart2 size={12} /> {r.analyses.toLocaleString()} analyses</span>
                <span><TrendingUp size={12} /> {r.positive}% positive</span>
              </div>
              <div className="report-card__footer">
                <div className="report-card__info">
                  <span className="report-badge">{r.format}</span>
                  <span className="report-size">{r.size}</span>
                </div>
                <button className="report-download-btn">
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
