/* eslint-disable */
import React, { useMemo, useRef, useState } from "react";
import "./App.css";
import CreateFitPassport from "./components/CreateFitPassport";
import CreateFitPassportPilot from "./components/CreateFitPassport_PILOT";
import CreateFitPassportLorna from "./components/CreateFitPassport_LORNA";

import LightLogo from "./assets/SmarterFit_Light.png";
import DarkLogo from "./assets/SmarterFit_Dark.png";

import {
  ShieldCheck,
  Cpu,
  ShoppingBag,
  Smartphone,
  Ruler,
  Sparkles,
  X,
} from "lucide-react";

const DEMO_CONFIG = {
  master: {
    label: "Master Demo",
    current: "Master Demo Active",
    audience: "General / Investor / Product",
    focus: "Platform story + product vision",
    component: CreateFitPassport,
    eyebrowColorDark: "rgba(125,211,252,0.92)",
    eyebrowColorLight: "#2563eb",
    accentBorderDark: "rgba(56,189,248,0.16)",
    accentBorderLight: "rgba(59,130,246,0.14)",
    panelGlowDark:
      "0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(56,189,248,0.04)",
    activePillDark:
      "linear-gradient(135deg, rgba(56,189,248,0.24), rgba(99,102,241,0.26))",
    activePillLight:
      "linear-gradient(135deg, rgba(59,130,246,0.16), rgba(99,102,241,0.18))",
    metaGlowDark: "0 14px 36px rgba(56,189,248,0.06)",
    metaGlowLight: "0 10px 24px rgba(59,130,246,0.06)",
    badge: null,
  },
  pilot: {
    label: "Culture Kings Pilot",
    current: "Culture Kings Pilot Active",
    audience: "Retail Pilot / Buyer / Ecommerce Team",
    focus: "Streetwear fit clarity + return reduction",
    component: CreateFitPassportPilot,
    eyebrowColorDark: "rgba(196,181,253,0.92)",
    eyebrowColorLight: "#6d28d9",
    accentBorderDark: "rgba(139,92,246,0.18)",
    accentBorderLight: "rgba(139,92,246,0.14)",
    panelGlowDark:
      "0 24px 80px rgba(0,0,0,0.42), 0 0 0 1px rgba(139,92,246,0.05)",
    activePillDark:
      "linear-gradient(135deg, rgba(91,33,182,0.34), rgba(37,99,235,0.28))",
    activePillLight:
      "linear-gradient(135deg, rgba(124,58,237,0.16), rgba(59,130,246,0.16))",
    metaGlowDark: "0 14px 36px rgba(139,92,246,0.08)",
    metaGlowLight: "0 10px 24px rgba(124,58,237,0.06)",
    badge: null,
  },
  lorna: {
    label: "Lorna Jane Pilot",
    current: "Lorna Jane Pilot Active",
    audience: "Retail Pilot / Buyer / Activewear Team",
    focus: "Activewear fit confidence + contour accuracy",
    component: CreateFitPassportLorna,
    eyebrowColorDark: "rgba(103,232,249,0.96)",
    eyebrowColorLight: "#0891b2",
    accentBorderDark: "rgba(103,232,249,0.18)",
    accentBorderLight: "rgba(6,182,212,0.14)",
    panelGlowDark:
      "0 24px 80px rgba(0,0,0,0.42), 0 0 0 1px rgba(103,232,249,0.05), 0 0 48px rgba(244,114,182,0.06)",
    activePillDark:
      "linear-gradient(135deg, rgba(6,182,212,0.3), rgba(236,72,153,0.28))",
    activePillLight:
      "linear-gradient(135deg, rgba(6,182,212,0.16), rgba(236,72,153,0.16))",
    metaGlowDark:
      "0 14px 36px rgba(103,232,249,0.08), 0 0 24px rgba(244,114,182,0.05)",
    metaGlowLight:
      "0 10px 24px rgba(6,182,212,0.06), 0 0 18px rgba(236,72,153,0.04)",
    badge: "Flagship Pilot Mode",
  },
};

function App() {
  const demoRef = useRef(null);

  const [darkMode, setDarkMode] = useState(true);
  const [demoMode, setDemoMode] = useState("master");
  const [showPilotModal, setShowPilotModal] = useState(false);
  const [pilotSubmitted, setPilotSubmitted] = useState(false);
  const [pilotLoading, setPilotLoading] = useState(false);

  const [pilotForm, setPilotForm] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    monthlyOrders: "",
    message: "",
  });

  const modeMeta = useMemo(() => DEMO_CONFIG[demoMode], [demoMode]);
  const ActiveDemoComponent = modeMeta.component;

  const scrollToDemo = () => {
    if (demoRef.current) {
      demoRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openPilotModal = () => {
    setShowPilotModal(true);
    setPilotSubmitted(false);
  };

  const closePilotModal = () => {
    setShowPilotModal(false);
    setPilotLoading(false);
  };

  const handlePilotInputChange = (e) => {
    const { name, value } = e.target;
    setPilotForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePilotSubmit = async (e) => {
  e.preventDefault();
  setPilotLoading(true);

  try {
    const API_BASE =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

const res = await fetch(`${API_BASE}/api/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: pilotForm.email,
        name: pilotForm.name,
        company: pilotForm.company,
        website: pilotForm.website,
        monthlyOrders: pilotForm.monthlyOrders,
        message: pilotForm.message,
      }),
    });

    const data = await res.json();
    console.log("Pilot submit response:", data);

    if (!res.ok) {
      throw new Error(
        data?.details?.error?.message ||
        data?.details?.error ||
        data?.error ||
        "Submission failed"
      );
    }

    setPilotSubmitted(true);

    setPilotForm({
      name: "",
      email: "",
      company: "",
      website: "",
      monthlyOrders: "",
      message: "",
    });
  } catch (error) {
    console.error("Pilot request error:", error);
    alert(error.message || "Something went wrong. Please try again.");
  } finally {
    setPilotLoading(false);
  }
};

  const controlPanelStyle = {
    width: "100%",
    maxWidth: "1100px",
    borderRadius: "32px",
    padding: "24px",
    border: darkMode
      ? `1px solid ${modeMeta.accentBorderDark}`
      : `1px solid ${modeMeta.accentBorderLight}`,
    background: darkMode
      ? "linear-gradient(180deg, rgba(8,14,30,0.78), rgba(8,14,30,0.52))"
      : "rgba(255,255,255,0.84)",
    boxShadow: darkMode
      ? modeMeta.panelGlowDark
      : "0 24px 80px rgba(15,23,42,0.08)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    position: "relative",
    overflow: "hidden",
  };

  const ambientTopGlowStyle = {
    position: "absolute",
    width: "280px",
    height: "280px",
    top: "-110px",
    right: "-80px",
    borderRadius: "999px",
    filter: "blur(48px)",
    opacity: darkMode ? 0.55 : 0.3,
    pointerEvents: "none",
    background:
      demoMode === "lorna"
        ? "radial-gradient(circle, rgba(244,114,182,0.18), transparent 68%)"
        : demoMode === "pilot"
        ? "radial-gradient(circle, rgba(139,92,246,0.18), transparent 68%)"
        : "radial-gradient(circle, rgba(56,189,248,0.18), transparent 68%)",
  };

  const ambientBottomGlowStyle = {
    position: "absolute",
    width: "240px",
    height: "240px",
    bottom: "-100px",
    left: "-80px",
    borderRadius: "999px",
    filter: "blur(52px)",
    opacity: darkMode ? 0.45 : 0.22,
    pointerEvents: "none",
    background:
      demoMode === "lorna"
        ? "radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)"
        : demoMode === "pilot"
        ? "radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%)"
        : "radial-gradient(circle, rgba(99,102,241,0.16), transparent 70%)",
  };

  const pillContainerStyle = {
    display: "inline-flex",
    gap: "8px",
    padding: "8px",
    borderRadius: "999px",
    background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.05)",
    border: darkMode
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(15,23,42,0.08)",
    alignSelf: "flex-start",
    flexWrap: "wrap",
    boxShadow: darkMode ? "inset 0 1px 0 rgba(255,255,255,0.03)" : "none",
  };

  const getToggleButtonStyle = (key) => {
    const isActive = demoMode === key;

    return {
      padding: "10px 18px",
      borderRadius: "999px",
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: "14px",
      transition: "all 0.22s ease",
      color: isActive
        ? darkMode
          ? "#f8fbff"
          : "#0f172a"
        : darkMode
        ? "rgba(226,232,240,0.72)"
        : "rgba(15,23,42,0.66)",
      background: isActive
        ? darkMode
          ? modeMeta.activePillDark
          : modeMeta.activePillLight
        : "transparent",
      boxShadow: isActive
        ? darkMode
          ? "0 10px 26px rgba(0,0,0,0.22)"
          : "0 8px 22px rgba(15,23,42,0.08)"
        : "none",
      transform: isActive ? "translateY(-1px)" : "translateY(0)",
    };
  };

  const metaCardStyle = {
    borderRadius: "20px",
    padding: "16px 18px",
    background: darkMode ? "rgba(255,255,255,0.035)" : "rgba(15,23,42,0.04)",
    border: darkMode
      ? "1px solid rgba(255,255,255,0.07)"
      : "1px solid rgba(15,23,42,0.06)",
    boxShadow: darkMode ? modeMeta.metaGlowDark : modeMeta.metaGlowLight,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  };

  const metaLabelStyle = {
    margin: 0,
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: darkMode ? "rgba(186,230,253,0.74)" : "#475569",
  };

  const metaValueStyle = {
    margin: "8px 0 0",
    fontWeight: 700,
    color: darkMode ? "#f8fbff" : "#0f172a",
    lineHeight: 1.2,
  };

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "14px",
    padding: "9px 14px",
    borderRadius: "999px",
    background: darkMode
      ? "linear-gradient(90deg, rgba(103,232,249,0.12), rgba(244,114,182,0.12))"
      : "linear-gradient(90deg, rgba(6,182,212,0.08), rgba(236,72,153,0.08))",
    border: darkMode
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(15,23,42,0.08)",
    color: darkMode ? "rgba(240,253,255,0.92)" : "#0f172a",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    alignSelf: "flex-start",
  };

  const badgeDotStyle = {
    width: "8px",
    height: "8px",
    borderRadius: "999px",
    background: "linear-gradient(180deg, #67e8f9, #f472b6)",
    boxShadow: "0 0 16px rgba(103,232,249,0.7)",
  };

  const scanStoryShellStyle = {
    width: "100%",
    maxWidth: "920px",
    margin: "0 auto",
    padding: "30px 24px",
    borderRadius: "30px",
    border: darkMode
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(15,23,42,0.08)",
    background: darkMode
      ? "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.025))"
      : "rgba(255,255,255,0.78)",
    boxShadow: darkMode
      ? "0 24px 70px rgba(0,0,0,0.24)"
      : "0 18px 40px rgba(15,23,42,0.06)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
  };

  const scanMiniPillsStyle = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "18px",
    marginBottom: "6px",
  };

  const scanMiniPillStyle = {
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.04)",
    border: darkMode
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(15,23,42,0.08)",
    color: darkMode ? "rgba(240,248,255,0.82)" : "#334155",
  };

  return (
    <>
      <div className={`app ${darkMode ? "dark" : "light"} demo-${demoMode}`}>
        <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light" : "Dark"}
        </button>

        <section className="hero">
          <div className="hero-logos">
            <img
              src={darkMode ? DarkLogo : LightLogo}
              alt="SmarterFit Logo"
              className={`hero-logo ${darkMode ? "hero-logo-dark" : "hero-logo-light"}`}
            />
          </div>

          <h1 className="hero-title">
            The fit intelligence layer for global commerce.
          </h1>

          <p className="hero-sub">
            SmarterFit gives shoppers a consumer-owned Fit Passport and gives
            brands a privacy-first fit decision layer for better sizing, higher
            conversion, and fewer returns.
          </p>

          <div className="hero-cta">
            <button className="primary-btn hero-primary-btn" onClick={openPilotModal}>
              Request a Pilot
            </button>

            <p className="hero-cta-sub">
              For retail partners exploring smarter fit infrastructure
            </p>
          </div>

          <p className="hero-sub-secondary">
            Scan once. Fit works everywhere SmarterFit is integrated.
          </p>

          <div className="tag-row">
            <span className="tag">Consumer-owned Fit Passport</span>
            <span className="tag">Compounding fit intelligence</span>
            <span className="tag">Cross-brand infrastructure</span>
            <span className="tag">Privacy-first by design</span>
          </div>
        </section>

        <section className="commerce-strip">
          <p className="commerce-strip-label">Powering modern commerce</p>

          <div className="commerce-strip-row">
            <span>Shopify</span>
            <span>Stripe</span>
            <span>Afterpay</span>
            <span>Amazon</span>
          </div>
        </section>

        <section className="features features-top">
          <h2 className="features-title">The infrastructure behind better fit.</h2>

          <div className="feature-grid">
            <div className="feature-card">
              <ShieldCheck className="feature-icon" />
              <h3>Capture the fit identity</h3>
              <p>
                Your fit data belongs to you. Scan once, and your Fit Passport
                travels across every participating brand — without exposing raw
                body data.
              </p>
              <span className="feature-tag">PRIVACY-FIRST</span>
            </div>

            <div className="feature-card">
              <Cpu className="feature-icon" />
              <h3>Predict across brands</h3>
              <p>
                The Fit Engine maps body profile, fit preference, and garment
                behaviour into smarter recommendations across multiple brands and
                categories.
              </p>
              <span className="feature-tag">LEARNING SYSTEM</span>
            </div>

            <div className="feature-card">
              <ShoppingBag className="feature-icon" />
              <h3>Compound intelligence over time</h3>
              <p>
                Fit outcomes feed back into the system, continuously improving
                accuracy and turning every decision into stronger infrastructure.
              </p>
              <span className="feature-tag">PLATFORM</span>
            </div>
          </div>
        </section>

        <section className={`scan-section scan-section-${demoMode}`}>
          <div className="scan-ambient scan-ambient-1" />
          <div className="scan-ambient scan-ambient-2" />

          <div className="scan-device-wrap">
            <div style={scanStoryShellStyle}>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: darkMode ? "rgba(125,211,252,0.9)" : "#2563eb",
                }}
              >
                Scan once
              </p>

              <h2
                style={{
                  margin: "12px 0 14px",
                  fontSize: "clamp(28px, 4vw, 46px)",
                  lineHeight: 1.05,
                  color: darkMode ? "#f8fbff" : "#0f172a",
                }}
              >
                From one scan to a reusable fit graph.
              </h2>

              <p
                style={{
                  maxWidth: "760px",
                  margin: "0 auto",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: darkMode
                    ? "rgba(226,232,240,0.78)"
                    : "rgba(15,23,42,0.72)",
                }}
              >
                The shopper creates a Fit Passport once. SmarterFit then turns
                body profile, fit preference, garment behaviour, and real outcomes
                into a reusable intelligence layer across brands.
              </p>

              <div style={scanMiniPillsStyle}>
                <span style={scanMiniPillStyle}>Capture</span>
                <span style={scanMiniPillStyle}>Predict</span>
                <span style={scanMiniPillStyle}>Learn</span>
                <span style={scanMiniPillStyle}>Compound</span>
              </div>
            </div>
          </div>

          <button
            className="scan-btn"
            style={{ marginTop: "14px" }}
            onClick={scrollToDemo}
          >
            Experience the Fit Passport
          </button>

          <p className="demo-note">
            Explore the full Fit Passport journey across brands
          </p>
        </section>

        <section
          id="demo-section"
          ref={demoRef}
          className="demo-section"
          style={{
            padding: "40px 20px 92px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "28px",
          }}
        >
          <div style={controlPanelStyle}>
            <div style={ambientTopGlowStyle} />
            <div style={ambientBottomGlowStyle} />

            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              {modeMeta.badge && (
                <div style={badgeStyle}>
                  <span style={badgeDotStyle} />
                  {modeMeta.badge}
                </div>
              )}

              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: darkMode
                      ? modeMeta.eyebrowColorDark
                      : modeMeta.eyebrowColorLight,
                  }}
                >
                  Demo Control Center
                </p>

                <h2
                  style={{
                    margin: "10px 0 8px",
                    fontSize: "clamp(28px, 4vw, 42px)",
                    lineHeight: 1.05,
                    color: darkMode ? "#f8fbff" : "#0f172a",
                  }}
                >
                  SmarterFit Interactive Demo
                </h2>

                <p
                  style={{
                    margin: 0,
                    maxWidth: "760px",
                    fontSize: "16px",
                    lineHeight: 1.6,
                    color: darkMode
                      ? "rgba(226,232,240,0.78)"
                      : "rgba(15,23,42,0.7)",
                  }}
                >
                  Explore the full Fit Passport journey — from identity creation
                  to recommendation, checkout confidence, learning, and retailer
                  value.
                </p>
              </div>

              <div style={pillContainerStyle}>
                <button
                  onClick={() => setDemoMode("master")}
                  style={getToggleButtonStyle("master")}
                >
                  Master Demo
                </button>

                <button
                  onClick={() => setDemoMode("pilot")}
                  style={getToggleButtonStyle("pilot")}
                >
                  Culture Kings Pilot
                </button>

                <button
                  onClick={() => setDemoMode("lorna")}
                  style={getToggleButtonStyle("lorna")}
                >
                  Lorna Jane Pilot
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "12px",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                }}
              >
                <div style={metaCardStyle}>
                  <p style={metaLabelStyle}>Current Mode</p>
                  <p style={metaValueStyle}>{modeMeta.current}</p>
                </div>

                <div style={metaCardStyle}>
                  <p style={metaLabelStyle}>Audience</p>
                  <p style={metaValueStyle}>{modeMeta.audience}</p>
                </div>

                <div style={metaCardStyle}>
                  <p style={metaLabelStyle}>Focus</p>
                  <p style={metaValueStyle}>{modeMeta.focus}</p>
                </div>
              </div>
            </div>
          </div>

          <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: "14px",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      width: "100%",
    }}
  >
    <ActiveDemoComponent />
  </div>

  <p
    style={{
      margin: 0,
      fontSize: "12px",
      lineHeight: 1.5,
      textAlign: "center",
      color: darkMode ? "rgba(226,232,240,0.55)" : "rgba(15,23,42,0.55)",
      letterSpacing: "0.02em",
    }}
  >
    Demo brands shown for illustrative purposes only. No affiliation.
  </p>
</div>
        </section>

        <section className="fit-graph-section">
          <div className="fit-graph-shell">
            <p className="fit-graph-eyebrow">Fit Graph™</p>

            <h2 className="fit-graph-heading">
              The system behind every fit decision.
            </h2>

            <p className="fit-graph-copy">
              A system that captures, learns, and compounds. SmarterFit is not
              just recommending a size — it is building a reusable fit graph that
              connects body profiles, garment behaviour, brand sizing systems, and
              real purchase outcomes over time.
            </p>

            <div className="fit-graph-grid">
              <div className="fit-graph-card">
                <h3>Capture</h3>
                <p>
                  Phone-based inputs create a privacy-first Fit Passport owned by
                  the shopper.
                </p>
              </div>

              <div className="fit-graph-card">
                <h3>Predict</h3>
                <p>
                  The Fit Engine maps body profile, fit preference, and garment
                  behaviour into a brand-specific recommendation.
                </p>
              </div>

              <div className="fit-graph-card">
                <h3>Learn</h3>
                <p>
                  Kept, returned, exchanged, or corrected outcomes strengthen the
                  model and improve future accuracy.
                </p>
              </div>

              <div className="fit-graph-card">
                <h3>Compound</h3>
                <p>
                  Intelligence is no longer trapped inside one retailer. It
                  compounds across the ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="features features-bottom">
          <div className="feature-grid">
            <div className="feature-card">
              <Smartphone className="feature-icon" />
              <h3>Capture with just your phone</h3>
              <p>No booths. No hardware. Just phone-based capture at scale.</p>
              <span className="feature-tag">ACCESSIBLE</span>
            </div>

            <div className="feature-card">
              <Ruler className="feature-icon" />
              <h3>High-fidelity body mapping</h3>
              <p>
                Advanced body mapping powered by computer vision and depth
                estimation.
              </p>
              <span className="feature-tag">ACCURATE</span>
            </div>

            <div className="feature-card">
              <Sparkles className="feature-icon" />
              <h3>Future-proof Fit Graph</h3>
              <p>
                Built to scale into virtual try-on, fit memory, and shared
                intelligence across commerce.
              </p>
              <span className="feature-tag">NEXT-GEN</span>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-divider" />
          <h3 className="footer-brand">SMARTERFIT TECHNOLOGIES</h3>
          <p className="footer-tagline">Scan. Fit. Done.</p>
          <p className="footer-copy">© 2025 SmarterFit Technologies</p>
        </footer>
      </div>

      {showPilotModal && (
        <div className="pilot-modal-overlay" onClick={closePilotModal}>
          <div
            className={`pilot-modal-shell ${darkMode ? "dark" : "light"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="pilot-modal-close" onClick={closePilotModal}>
              <X size={18} />
            </button>

            {!pilotSubmitted ? (
              <>
                <div className="pilot-modal-header">
                  <p className="pilot-modal-eyebrow">Request a Pilot</p>
                  <h2>Start a pilot conversation</h2>
                  <p className="pilot-modal-copy">
                    Tell us a little about your brand and ecommerce volume. We’ll
                    use this to understand pilot fit and reach out directly.
                  </p>
                </div>

                <form className="pilot-modal-form" onSubmit={handlePilotSubmit}>
                  <div className="pilot-form-grid">
                    <div className="pilot-field">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={pilotForm.name}
                        onChange={handlePilotInputChange}
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div className="pilot-field">
                      <label>Work email</label>
                      <input
                        type="email"
                        name="email"
                        value={pilotForm.email}
                        onChange={handlePilotInputChange}
                        placeholder="you@brand.com"
                        required
                      />
                    </div>

                    <div className="pilot-field">
                      <label>Company / brand</label>
                      <input
                        type="text"
                        name="company"
                        value={pilotForm.company}
                        onChange={handlePilotInputChange}
                        placeholder="Brand name"
                        required
                      />
                    </div>

                    <div className="pilot-field">
                      <label>Website</label>
                      <input
                        type="text"
                        name="website"
                        value={pilotForm.website}
                        onChange={handlePilotInputChange}
                        placeholder="brand.com"
                      />
                    </div>

                    <div className="pilot-field pilot-field-full">
                      <label>Monthly online orders</label>
                      <select
                        name="monthlyOrders"
                        value={pilotForm.monthlyOrders}
                        onChange={handlePilotInputChange}
                        required
                      >
                        <option value="">Select order volume</option>
                        <option value="< 1,000">&lt; 1,000</option>
                        <option value="1,000 - 10,000">1,000 - 10,000</option>
                        <option value="10,000 - 50,000">10,000 - 50,000</option>
                        <option value="50,000+">50,000+</option>
                      </select>
                    </div>

                    <div className="pilot-field pilot-field-full">
                      <label>Message</label>
                      <textarea
                        name="message"
                        value={pilotForm.message}
                        onChange={handlePilotInputChange}
                        placeholder="Tell us about your current fit challenges, return profile, or pilot goals."
                        rows="5"
                      />
                    </div>
                  </div>

                  <div className="pilot-modal-actions">
                    <button
                      type="button"
                      className="pilot-secondary-btn"
                      onClick={closePilotModal}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="pilot-primary-btn"
                      disabled={pilotLoading}
                    >
                      {pilotLoading ? "Sending..." : "Submit Pilot Request"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="pilot-success-state">
                <p className="pilot-modal-eyebrow">Pilot request received ✨</p>
                <h2>We’ll be in touch shortly.</h2>
                <p className="pilot-modal-copy">
                  Thanks for reaching out. We’ll review your submission and come
                  back to you directly about pilot fit, timing, and next steps.
                </p>

                <button className="pilot-primary-btn" onClick={closePilotModal}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;