import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, CheckCircle2 } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "How does SentimentAI analyze tweet sentiment in under 15ms?",
    a: "SentimentAI pairs a compiled Scikit-Learn Logistic Regression model with a pre-fit TF-IDF vectorizer serialized in memory. When a tweet is ingested, the text is cleaned, mapped to numerical n-gram frequencies, and passed through a mathematical dot product and sigmoid function — providing instant probability calculations without GPU latency or cold starts.",
  },
  {
    q: "Why choose Logistic Regression over heavy deep learning models?",
    a: "For real-time binary sentiment classification at scale, Logistic Regression offers deterministic inference, exceptional speed (<15ms per tweet), explainable feature weights (clear token attribution), and zero GPU memory overhead. It delivers strong benchmark performance on the Sentiment140 corpus while remaining lightweight enough to process millions of tweets per day.",
  },
  {
    q: "How does the TF-IDF vectorizer handle hashtags, mentions, and emoticons?",
    a: "Our preprocessing pipeline converts text to lowercase, removes raw URLs and @mentions, strips punctuation, and extracts hashtag terms as meaningful sentiment tokens. TF-IDF then calculates term frequency penalizing common stopwords while heavily weighting sentiment-rich words.",
  },
  {
    q: "What dataset is SentimentAI trained on?",
    a: "SentimentAI is trained on the Stanford Sentiment140 corpus, which contains 1.6 million tweets automatically labeled for binary sentiment polarity. The dataset provides balanced exposure to colloquial phrasing, internet shorthand, and modern conversational patterns.",
  },
  {
    q: "Can this pipeline be integrated into an automated social monitoring system?",
    a: "Yes. The backend provides a RESTful FastAPI `/predict` endpoint that accepts standard JSON payloads and returns predicted sentiment alongside calibrated probability estimates. It can easily connect to Twitter API webhooks, customer support queues, or internal BI dashboards.",
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="section faq-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-eyebrow">
            <HelpCircle size={14} />
            <span>Machine Learning & Architecture FAQ</span>
          </div>
          <h2 className="section-title">
            Frequently asked
            <br />
            <span className="section-title-gradient">questions.</span>
          </h2>
          <p className="section-subtitle">
            Understand the science, engineering decisions, and mathematical pipeline powering SentimentAI.
          </p>
        </motion.div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={item.q}
                className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <button
                  className="faq-question"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question__text">{item.q}</span>
                  <motion.div
                    className="faq-question__icon"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="faq-answer__text">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
