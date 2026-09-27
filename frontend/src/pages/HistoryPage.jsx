import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { History, Clock, TrendingUp, TrendingDown, Search, Filter } from "lucide-react";

const HISTORY = [
  { id: 1, text: "The new product launch exceeded all expectations!", sentiment: "Positive", confidence: 94.2, model: "Logistic Regression", date: "Sep 27, 2026 · 14:32" },
  { id: 2, text: "Customer support was absolutely terrible today.", sentiment: "Negative", confidence: 91.7, model: "Logistic Regression", date: "Sep 27, 2026 · 14:08" },
  { id: 3, text: "Delivery was late but the product quality is great.", sentiment: "Positive", confidence: 62.8, model: "Logistic Regression", date: "Sep 27, 2026 · 13:55" },
  { id: 4, text: "We just hit 50,000 active users today!", sentiment: "Positive", confidence: 97.3, model: "Logistic Regression", date: "Sep 27, 2026 · 13:22" },
  { id: 5, text: "App crashed during checkout, payment was deducted but order failed.", sentiment: "Negative", confidence: 98.1, model: "Logistic Regression", date: "Sep 27, 2026 · 12:48" },
  { id: 6, text: "Mind blown by this AI interface. It feels so futuristic!", sentiment: "Positive", confidence: 96.4, model: "Logistic Regression", date: "Sep 27, 2026 · 12:10" },
  { id: 7, text: "Total waste of money. The product broke after 2 days.", sentiment: "Negative", confidence: 95.9, model: "Logistic Regression", date: "Sep 26, 2026 · 18:40" },
  { id: 8, text: "Excellent integration with our existing workflow.", sentiment: "Positive", confidence: 88.3, model: "Logistic Regression", date: "Sep 26, 2026 · 16:15" },
];

export default function HistoryPage() {
  const { compactLayout } = useTheme();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = HISTORY.filter(h => {
    const matchSearch = h.text.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || h.sentiment.toLowerCase() === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className={`dash-page ${compactLayout ? "dash-page--compact" : ""}`}>
      <div className="dash-page__header">
        <div>
          <h1 className="dash-page__title">Analysis History</h1>
          <p className="dash-page__subtitle">Browse all past sentiment predictions</p>
        </div>
        <div className="history-count-chip">
          <History size={14} />
          <span>{HISTORY.length} analyses</span>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="history-filters">
        <div className="history-search-wrap">
          <Search size={16} className="history-search-icon" />
          <input
            className="history-search-input"
            placeholder="Search analyses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="history-filter-chips">
          {["all", "positive", "negative"].map(f => (
            <button key={f} className={`filter-chip ${filter === f ? "filter-chip--active" : ""}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* History List */}
      <div className="dash-card">
        {filtered.length === 0 ? (
          <div className="history-empty">
            <History size={36} />
            <p>No analyses found</p>
          </div>
        ) : (
          filtered.map((item, i) => (
            <motion.div
              key={item.id}
              className={`history-row ${i < filtered.length - 1 ? "history-row--bordered" : ""}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <div className="history-row__icon">
                {item.sentiment === "Positive"
                  ? <TrendingUp size={18} className="history-icon--pos" />
                  : <TrendingDown size={18} className="history-icon--neg" />
                }
              </div>
              <div className="history-row__body">
                <p className="history-row__text">{item.text}</p>
                <div className="history-row__meta">
                  <span className={`badge ${item.sentiment === "Positive" ? "badge--pos" : "badge--neg"}`}>{item.sentiment}</span>
                  <span className="history-row__confidence">{item.confidence}% confidence</span>
                  <span className="history-row__model">{item.model}</span>
                </div>
              </div>
              <div className="history-row__date">
                <Clock size={12} />
                <span>{item.date}</span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
