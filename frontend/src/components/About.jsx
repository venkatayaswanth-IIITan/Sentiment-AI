import { motion } from "framer-motion";
import { Code2, Server, FlaskConical, Brain, Hash } from "lucide-react";

const techs = [
  { icon: Code2, label: "React", color: "#61DAFB" },
  { icon: Server, label: "FastAPI", color: "#05998B" },
  { icon: FlaskConical, label: "Python", color: "#FFD43B" },
  { icon: Brain, label: "Scikit-learn", color: "#F89939" },
  { icon: Hash, label: "TF-IDF", color: "#A78BFA" },
  { icon: Brain, label: "Logistic Regression", color: "#34D399" },
];

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.div
          className="about__inner"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about__copy">
            <h2 className="section-title">
              Built with machine learning.
              <br />
              <span className="section-title-gradient">Designed for clarity.</span>
            </h2>
            <p className="section-subtitle" style={{ textAlign: "left", maxWidth: "500px" }}>
              SentimentAI is trained on the{" "}
              <span className="about__highlight">Sentiment140 dataset</span>, a
              large-scale collection of labeled tweets. The model pipeline uses
              TF-IDF to convert text into numerical features, then applies
              Logistic Regression to classify sentiment as positive or negative.
            </p>
          </div>

          {/* Tech badges */}
          <div className="about__badges">
            {techs.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.label}
                  className="tech-badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: "backOut" }}
                  whileHover={{
                    scale: 1.08,
                    borderColor: `${tech.color}50`,
                    boxShadow: `0 4px 24px ${tech.color}25`,
                  }}
                  style={{ borderColor: `${tech.color}25` }}
                >
                  <Icon size={16} color={tech.color} />
                  <span style={{ color: "#E2E8F0" }}>{tech.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
