import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  SendHorizontal, RotateCcw, Loader2, Sparkles,
  TrendingUp, TrendingDown, AlertCircle, Copy, Check
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function SentimentGauge({ positive, negative }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const posArc = (positive / 100) * circ;

  return (
    <svg viewBox="0 0 120 120" className="gauge-svg">
      <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
      <circle cx="60" cy="60" r={r} fill="none" stroke="#F43F5E" strokeWidth="12"
        strokeDasharray={circ} strokeLinecap="round" />
      <circle cx="60" cy="60" r={r} fill="none" stroke="var(--accent)" strokeWidth="12"
        strokeDasharray={`${posArc} ${circ - posArc}`}
        strokeDashoffset={circ * 0.25} strokeLinecap="round" />
      <text x="60" y="55" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">{positive}%</text>
      <text x="60" y="72" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Positive</text>
    </svg>
  );
}

export default function AnalysisPage() {
  const { compactLayout } = useTheme();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) { setError("Please enter text to analyze."); return; }
    setLoading(true); setError(null); setResult(null);

    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Prediction failed.");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`dash-page ${compactLayout ? "dash-page--compact" : ""}`}>
      <div className="dash-page__header">
        <div>
          <h1 className="dash-page__title">Sentiment Analysis</h1>
          <p className="dash-page__subtitle">Analyze text sentiment using Logistic Regression + TF-IDF</p>
        </div>
      </div>

      <div className="analysis-layout">
        {/* Input */}
        <div className="dash-card analysis-input-card">
          <h3 className="dash-card__title">Enter Text</h3>
          <textarea
            className="analysis-textarea"
            placeholder="Type a tweet, review, or any text to analyze sentiment..."
            value={text}
            onChange={e => { setText(e.target.value); setError(null); }}
            rows={5}
          />
          {error && (
            <div className="analysis-error">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}
          <div className="analysis-actions">
            <button className="dash-action-btn dash-action-btn--ghost" onClick={() => { setText(""); setResult(null); setError(null); }}>
              <RotateCcw size={16} /> Clear
            </button>
            <button className="dash-action-btn dash-action-btn--primary" onClick={handleAnalyze} disabled={loading || !text.trim()}>
              {loading ? <><Loader2 size={16} className="spin" /> Analyzing...</> : <><Sparkles size={16} /> Analyze Sentiment</>}
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <motion.div
            className="dash-card analysis-result-card"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="analysis-result-header">
              <h3 className="dash-card__title">Result</h3>
              <button className="dash-copy-btn" onClick={handleCopy}>
                {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy JSON</>}
              </button>
            </div>

            <div className="analysis-result-body">
              <div className="analysis-gauge-wrap">
                <SentimentGauge positive={result.positive_probability} negative={result.negative_probability} />
              </div>
              <div className="analysis-result-details">
                <div className={`analysis-sentiment-badge ${result.sentiment === "Positive" ? "pos" : "neg"}`}>
                  {result.sentiment === "Positive" ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  <span>{result.sentiment}</span>
                </div>
                <div className="analysis-prob-rows">
                  <div className="analysis-prob-row">
                    <span>Positive</span>
                    <div className="analysis-prob-track">
                      <motion.div
                        className="analysis-prob-fill analysis-prob-fill--pos"
                        initial={{ width: 0 }}
                        animate={{ width: `${result.positive_probability}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                    <strong>{result.positive_probability}%</strong>
                  </div>
                  <div className="analysis-prob-row">
                    <span>Negative</span>
                    <div className="analysis-prob-track">
                      <motion.div
                        className="analysis-prob-fill analysis-prob-fill--neg"
                        initial={{ width: 0 }}
                        animate={{ width: `${result.negative_probability}%` }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                      />
                    </div>
                    <strong>{result.negative_probability}%</strong>
                  </div>
                </div>
                <div className="analysis-meta">
                  <span className="analysis-meta-chip">Model: {result.model}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
