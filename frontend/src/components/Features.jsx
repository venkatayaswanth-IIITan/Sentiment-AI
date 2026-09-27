import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Network, Zap, CheckCircle2, ChevronRight, Activity } from "lucide-react";

const features = [
  {
    id: "lr-model",
    icon: BrainCircuit,
    title: "Trained Logistic Regression",
    subtitle: "Mathematical Binary Classification",
    description:
      "Trained on over 1.6 million Sentiment140 tweets. Uses an optimized sigmoid decision boundary to compute rigorous probability distributions for positive and negative sentiment.",
    accent: "#818CF8",
    gradient: "linear-gradient(135deg, rgba(129,140,248,0.14), rgba(99,102,241,0.03))",
    border: "rgba(129,140,248,0.28)",
    glow: "rgba(129,140,248,0.22)",
    demoType: "sigmoid",
  },
  {
    id: "tfidf",
    icon: Network,
    title: "TF-IDF Vectorization Engine",
    subtitle: "Term Frequency Inverse Document Frequency",
    description:
      "Penalizes ubiquitous stopwords while spotlighting rare, sentiment-dense adjectives and bigrams. Converts unstructured raw tweet text into high-dimensional numerical vectors.",
    accent: "#A78BFA",
    gradient: "linear-gradient(135deg, rgba(167,139,250,0.14), rgba(139,92,246,0.03))",
    border: "rgba(167,139,250,0.28)",
    glow: "rgba(167,139,250,0.22)",
    demoType: "tokens",
  },
  {
    id: "fastapi",
    icon: Zap,
    title: "Sub-15ms FastAPI Inference",
    subtitle: "High Throughput REST Engine",
    description:
      "Blazingly fast asynchronous Python FastAPI microservice serving the pickled model. Delivers instant prediction responses, CORS validation, and seamless client integration.",
    accent: "#34D399",
    gradient: "linear-gradient(135deg, rgba(52,211,153,0.12), rgba(16,185,129,0.03))",
    border: "rgba(52,211,153,0.28)",
    glow: "rgba(52,211,153,0.2)",
    demoType: "speed",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="features" className="section features">
      <div className="container">
        {/* Heading */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-eyebrow">
            <Activity size={14} />
            <span>Architecture & Technology Stack</span>
          </div>
          <h2 className="section-title">
            Engineered for precision.
            <br />
            <span className="section-title-gradient">Built for instant answers.</span>
          </h2>
          <p className="section-subtitle">
            Explore how modern NLP vectorization and statistical classification combine to decode human expression at scale.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          className="features__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                className="feature-card"
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  boxShadow: `0 24px 60px ${feat.glow}`,
                  borderColor: feat.border,
                }}
                style={{
                  background: feat.gradient,
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                {/* Icon area */}
                <div className="feature-card__top">
                  <div
                    className="feature-card__icon-wrap"
                    style={{ background: `${feat.accent}18`, border: `1px solid ${feat.accent}35` }}
                  >
                    <Icon size={24} color={feat.accent} strokeWidth={1.8} />
                  </div>
                  <span className="feature-card__badge" style={{ color: feat.accent }}>
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="feature-card__title">{feat.title}</h3>
                <div className="feature-card__subtitle" style={{ color: feat.accent }}>
                  {feat.subtitle}
                </div>
                <p className="feature-card__desc">{feat.description}</p>

                {/* Interactive Card Micro-Visualizer */}
                <div className="feature-card__preview">
                  {feat.demoType === "sigmoid" && (
                    <div className="preview-sigmoid">
                      <div className="preview-sigmoid__bar">
                        <span className="preview-sigmoid__label">P(Positive)</span>
                        <div className="preview-sigmoid__track">
                          <motion.div
                            className="preview-sigmoid__fill"
                            animate={{ width: ["30%", "92%", "45%", "88%"] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                          />
                        </div>
                      </div>
                      <div className="preview-sigmoid__formula">σ(z) = 1 / (1 + e^-z)</div>
                    </div>
                  )}

                  {feat.demoType === "tokens" && (
                    <div className="preview-tokens">
                      <span className="token-tag token-tag--strong">"revolutionary" (1.84)</span>
                      <span className="token-tag">"performance" (1.12)</span>
                      <span className="token-tag token-tag--dim">"the" (0.01)</span>
                    </div>
                  )}

                  {feat.demoType === "speed" && (
                    <div className="preview-speed">
                      <div className="preview-speed__ping">
                        <span className="ping-dot" />
                        <span>POST /predict · 200 OK</span>
                      </div>
                      <span className="preview-speed__val">~11ms response</span>
                    </div>
                  )}
                </div>

                {/* Bottom accent line */}
                <div
                  className="feature-card__accent-line"
                  style={{ background: `linear-gradient(90deg, ${feat.accent}80, transparent)` }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
