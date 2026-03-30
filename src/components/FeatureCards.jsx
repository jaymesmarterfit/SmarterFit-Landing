/* eslint-disable */
import React from "react";
import { RulerIcon, ShieldCheck, Cpu } from "lucide-react";
import "./FeatureCards.css";

const features = [
  {
    icon: <Cpu size={42} strokeWidth={1.4} />,
    title: "AI Fit Intelligence Engine",
    text: "Adaptive sizing logic tuned across brands, styles and body profiles.",
  },
  {
    icon: <ShieldCheck size={42} strokeWidth={1.4} />,
    title: "Privacy-First Technology",
    text: "Body data stays on your device. SmarterFit never stores measurements.",
  },
  {
    icon: <RulerIcon size={42} strokeWidth={1.4} />,
    title: "Universal Fit Passport",
    text: "Scan once. Use everywhere. Supported across fashion categories.",
  },
];

const FeatureCards = () => {
  return (
    <section className="feature-section">
      <h2 className="feature-title">Why SmarterFit Works</h2>

      <div className="feature-grid">
        {features.map((item, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-icon">{item.icon}</div>
            <h3 className="feature-heading">{item.title}</h3>
            <p className="feature-text">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
