import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  TrendingUp, TrendingDown, Minus, BarChart2,
  MessageCircle, Zap, Activity, Clock, Star,
  ArrowUpRight, ArrowDownRight, RefreshCw
} from "lucide-react";

const RECENT_ANALYSES = [
  { text: "The new product launch exceeded all expectations!", sentiment: "Positive", score: 94.2, time: "2 min ago" },
  { text: "Customer support was absolutely terrible today.", sentiment: "Negative", score: 91.7, time: "8 min ago" },
  { text: "Average experience, nothing special about it.", sentiment: "Negative", score: 54.1, time: "15 min ago" },
  { text: "Best purchase decision I've made all year!", sentiment: "Positive", score: 97.3, time: "22 min ago" },
  { text: "Delivery was late but the product quality is great.", sentiment: "Positive", score: 62.8, time: "31 min ago" },
];

const STAT_CARDS = [
  { label: "Total Analyses", value: "2,847", change: "+12.5%", trend: "up", icon: BarChart2, color: "var(--accent)" },
  { label: "Positive Sentiment", value: "64.5%", change: "+3.2%", trend: "up", icon: TrendingUp, color: "#10B981" },
  { label: "Negative Sentiment", value: "35.5%", change: "-1.8%", trend: "down", icon: TrendingDown, color: "#F43F5E" },
  { label: "Avg Confidence", value: "87.3%", change: "+0.9%", trend: "up", icon: Star, color: "#F59E0B" },
];

const CHART_DATA = [65, 72, 58, 80, 75, 90, 84, 70, 88, 92, 76, 95];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function MiniChart({ data }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 340;
  const height = 80;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 16) - 8;
    return `${x},${y}`;
  }).join(" ");
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mini-chart" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#chartGrad)" />
      <polyline points={points} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SentimentBadge({ sentiment }) {
  if (sentiment === "Positive") return <span className="badge badge--pos">Positive</span>;
  if (sentiment === "Negative") return <span className="badge badge--neg">Negative</span>;
  return <span className="badge badge--neu">Neutral</span>;
}

export default function DashboardOverview() {
  const { user } = useAuth();
  const { compactLayout } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className={`dash-page ${compactLayout ? "dash-page--compact" : ""}`}>
      {/* Page header */}
      <div className="dash-page__header">
        <div>
          <h1 className="dash-page__title">Overview</h1>
          <p className="dash-page__subtitle">
            Welcome back, <strong>{user?.name || "there"}</strong> — here's your sentiment dashboard.
          </p>
        </div>
        <button className={`dash-refresh-btn ${refreshing ? "spinning" : ""}`} onClick={handleRefresh}>
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="dash-kpi-grid">
        {STAT_CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              className="dash-kpi-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="dash-kpi-card__top">
                <div className="dash-kpi-card__icon-wrap" style={{ background: `${card.color}20` }}>
                  <Icon size={20} style={{ color: card.color }} />
                </div>
                <span className={`dash-kpi-card__change ${card.trend === "up" ? "change--up" : "change--down"}`}>
                  {card.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {card.change}
                </span>
              </div>
              <div className="dash-kpi-card__value">{card.value}</div>
              <div className="dash-kpi-card__label">{card.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="dash-charts-row">
        {/* Trend chart */}
        <motion.div
          className="dash-card dash-card--chart"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="dash-card__header">
            <div>
              <h3 className="dash-card__title">Positive Sentiment Trend</h3>
              <p className="dash-card__sub">Last 12 months • Logistic Regression model</p>
            </div>
            <Activity size={18} className="dash-card__icon" />
          </div>
          <MiniChart data={CHART_DATA} />
          <div className="chart-months">
            {MONTHS.map(m => <span key={m}>{m}</span>)}
          </div>
        </motion.div>

        {/* Donut breakdown */}
        <motion.div
          className="dash-card dash-card--donut"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="dash-card__header">
            <div>
              <h3 className="dash-card__title">Sentiment Breakdown</h3>
              <p className="dash-card__sub">Current period distribution</p>
            </div>
          </div>
          <div className="donut-wrap">
            <svg viewBox="0 0 120 120" className="donut-svg">
              <circle cx="60" cy="60" r="48" fill="none" stroke="var(--border)" strokeWidth="14" />
              <circle cx="60" cy="60" r="48" fill="none" stroke="var(--accent)" strokeWidth="14"
                strokeDasharray={`${64.5 * 3.016} ${35.5 * 3.016}`}
                strokeDashoffset="75.4" strokeLinecap="round" />
              <circle cx="60" cy="60" r="48" fill="none" stroke="#F43F5E" strokeWidth="14"
                strokeDasharray={`${35.5 * 3.016} 999`}
                strokeDashoffset={`${75.4 - (64.5 * 3.016)}`} strokeLinecap="round" />
            </svg>
            <div className="donut-center">
              <span className="donut-main">64.5%</span>
              <span className="donut-sub">Positive</span>
            </div>
          </div>
          <div className="donut-legend">
            <div className="donut-legend__item">
              <div className="donut-legend__dot" style={{ background: "var(--accent)" }} />
              <span>Positive (64.5%)</span>
            </div>
            <div className="donut-legend__item">
              <div className="donut-legend__dot" style={{ background: "#F43F5E" }} />
              <span>Negative (35.5%)</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Analyses Table */}
      <motion.div
        className="dash-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="dash-card__header">
          <div>
            <h3 className="dash-card__title">Recent Analyses</h3>
            <p className="dash-card__sub">Latest sentiment predictions</p>
          </div>
          <MessageCircle size={18} className="dash-card__icon" />
        </div>
        <div className="dash-table">
          <div className="dash-table__head">
            <span>Text</span>
            <span>Sentiment</span>
            <span>Confidence</span>
            <span>Time</span>
          </div>
          {RECENT_ANALYSES.map((row, i) => (
            <motion.div
              key={i}
              className="dash-table__row"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.06 }}
            >
              <span className="dash-table__text" title={row.text}>{row.text}</span>
              <SentimentBadge sentiment={row.sentiment} />
              <div className="dash-table__score-wrap">
                <div className="dash-table__score-bar">
                  <div
                    className="dash-table__score-fill"
                    style={{
                      width: `${row.score}%`,
                      background: row.sentiment === "Positive" ? "linear-gradient(90deg,#059669,#34D399)" : "linear-gradient(90deg,#e11d48,#FB7185)"
                    }}
                  />
                </div>
                <span className="dash-table__score-val">{row.score}%</span>
              </div>
              <span className="dash-table__time"><Clock size={12} /> {row.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
