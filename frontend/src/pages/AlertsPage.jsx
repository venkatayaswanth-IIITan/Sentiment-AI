import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Bell, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";

const SAMPLE_ALERTS = [
  { id: 1, type: "warning", title: "High Negative Spike", message: "Customer Support topic hit 78% negative in the last hour.", time: "5 min ago", read: false },
  { id: 2, type: "success", title: "Positive Trend Recovery", message: "Product category sentiment improved from 45% to 68% positive.", time: "2h ago", read: false },
  { id: 3, type: "info", title: "Weekly Report Ready", message: "Your weekly sentiment analysis report is ready to download.", time: "1d ago", read: true },
  { id: 4, type: "warning", title: "Model Confidence Low", message: "Several analyses returned confidence scores below 55%. Review inputs.", time: "2d ago", read: true },
];

const ICON_MAP = { warning: AlertTriangle, success: CheckCircle2, info: Info };
const COLOR_MAP = { warning: "#F59E0B", success: "#10B981", info: "var(--accent)" };

export default function AlertsPage() {
  const { compactLayout } = useTheme();
  const [alerts, setAlerts] = useState(SAMPLE_ALERTS);

  const dismiss = (id) => setAlerts(prev => prev.filter(a => a.id !== id));

  const unread = alerts.filter(a => !a.read).length;

  return (
    <div className={`dash-page ${compactLayout ? "dash-page--compact" : ""}`}>
      <div className="dash-page__header">
        <div>
          <h1 className="dash-page__title">Alerts</h1>
          <p className="dash-page__subtitle">Sentiment notifications and system alerts</p>
        </div>
        {unread > 0 && <div className="alerts-unread-badge">{unread} unread</div>}
      </div>

      <div className="dash-card">
        {alerts.length === 0 ? (
          <div className="alerts-empty">
            <Bell size={36} />
            <p>All caught up — no alerts</p>
          </div>
        ) : alerts.map((alert, i) => {
          const Icon = ICON_MAP[alert.type];
          const color = COLOR_MAP[alert.type];
          return (
            <motion.div
              key={alert.id}
              className={`alert-row ${!alert.read ? "alert-row--unread" : ""} ${i < alerts.length - 1 ? "alert-row--bordered" : ""}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="alert-row__icon-wrap" style={{ background: `${color}20`, color }}>
                <Icon size={18} />
              </div>
              <div className="alert-row__body">
                <div className="alert-row__title-row">
                  <span className="alert-row__title">{alert.title}</span>
                  {!alert.read && <div className="alert-row__dot" style={{ background: color }} />}
                </div>
                <p className="alert-row__message">{alert.message}</p>
                <span className="alert-row__time">{alert.time}</span>
              </div>
              <button className="alert-dismiss-btn" onClick={() => dismiss(alert.id)} title="Dismiss">
                <X size={15} />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
