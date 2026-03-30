import React, { useMemo, useState } from "react";
import "./CreateFitPassport.css";

export default function CreateFitPassport() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    waist: "",
    hips: "",
    shoulders: "",
    bodyShape: "",
    fitPreference: "",
  });

  const [passport, setPassport] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [learningUpdated, setLearningUpdated] = useState(false);
  const [checkoutBrand, setCheckoutBrand] = useState(null);
  const [addedToBag, setAddedToBag] = useState(false);

  const flowSteps = [
    { number: "01", label: "Create" },
    { number: "02", label: "Identity" },
    { number: "03", label: "Match" },
    { number: "04", label: "Checkout" },
    { number: "05", label: "Learn" },
    { number: "06", label: "Deploy" },
  ];

  const brandMatches = useMemo(
    () => [
      {
        brand: "Nike",
        logo: "N",
        size: "M",
        confidence: 93,
        note: "High compatibility across key fit zones, supporting confident purchase decisions and lower return risk.",
        fitProfile: "Athletic performance cut",
        recommendationType: "Primary recommended size",
        lastSync: "Synced 2s ago",
        fitReason: "Shoulder + torso alignment",
        category: "Performance benchmark",
      },
      {
        brand: "Zara",
        logo: "Z",
        size: "M",
        confidence: 88,
        note: "Tailored silhouette mapping that supports stronger purchase confidence while reducing mismatch risk.",
        fitProfile: "Fashion-forward tailored fit",
        recommendationType: "Style-led recommended size",
        lastSync: "Synced 4s ago",
        fitReason: "Silhouette + waist profile",
        category: "Style benchmark",
      },
      {
        brand: "Uniqlo",
        logo: "U",
        size: "M",
        confidence: 91,
        note: "Stable compatibility across core measurement zones, supporting reliable everyday sizing with fewer fit-related returns.",
        fitProfile: "Clean everyday essentials fit",
        recommendationType: "Core everyday size",
        lastSync: "Synced 3s ago",
        fitReason: "Balanced body mapping",
        category: "Everyday benchmark",
      },
      {
        brand: "Levi's",
        logo: "L",
        size: "32",
        confidence: 89,
        note: "Reliable denim prediction across waist and hip fit zones, improving purchase confidence and lowering return exposure.",
        fitProfile: "Waist-to-hip denim alignment",
        recommendationType: "Primary denim size",
        lastSync: "Synced 5s ago",
        fitReason: "Waist + hip denim match",
        category: "Denim benchmark",
      },
    ],
    []
  );

  const feedbackOptions = [
    { label: "Perfect fit", value: "perfect" },
    { label: "Slightly tight", value: "slightly-tight" },
    { label: "Slightly loose", value: "slightly-loose" },
    { label: "Too tight", value: "too-tight" },
    { label: "Too loose", value: "too-loose" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generatePassport = () => {
    const generatedPassport = {
      profileName: "Jayme Fit Passport",
      fitCluster: "Athletic Balanced",
      torsoRatio: "0.82",
      hipRatio: "0.91",
      shoulderIndex: "1.12",
      fitPreference: formData.fitPreference || "Regular",
      confidenceBand: "High",
      fitScore: 92,
      modelStatus: "Live",
      lastUpdated: "Updated just now",
      fitGraph: [
        { label: "Shoulder Alignment", value: 86 },
        { label: "Torso Balance", value: 79 },
        { label: "Waist Position", value: 74 },
        { label: "Hip Match", value: 83 },
        { label: "Silhouette Stability", value: 90 },
      ],
      fitTags: [
        "Balanced Core Structure",
        "Defined Shoulder Line",
        "Portable Fit Identity",
      ],
      contour: {
        shoulders: "39 cm",
        waist: "30 in",
        hips: "40 in",
        posture: "Balanced",
      },
    };

    setPassport(generatedPassport);
    setStep(2);
  };

  const handleOpenLearningScreen = (brand) => {
    setCheckoutBrand(brand);
    setSelectedBrand(brand);
    setSelectedFeedback("");
    setLearningUpdated(false);
    setAddedToBag(false);
    setStep(4);
  };

  const handleSubmitFeedback = () => {
    if (!selectedFeedback) return;
    setLearningUpdated(true);
  };

  const getUpdatedConfidence = () => {
    if (!selectedBrand) return 0;

    switch (selectedFeedback) {
      case "perfect":
        return selectedBrand.confidence + 3;
      case "slightly-tight":
      case "slightly-loose":
        return selectedBrand.confidence + 1;
      case "too-tight":
      case "too-loose":
        return Math.max(selectedBrand.confidence - 2, 70);
      default:
        return selectedBrand.confidence;
    }
  };

  const getLearningMessage = () => {
    if (!selectedBrand) return "";

    switch (selectedFeedback) {
      case "perfect":
        return `Validated outcome. ${selectedBrand.brand} Fit Confidence Index™ increased, reinforcing this Fit Signature™ for similar profiles and supporting more accurate future recommendations.`;
      case "slightly-tight":
        return `${selectedBrand.brand} feedback captured. The Fit Engine™ will now bias slightly more relaxed when this profile appears against comparable cuts, reducing future mismatch risk.`;
      case "slightly-loose":
        return `${selectedBrand.brand} feedback captured. The Fit Engine™ will now bias slightly more fitted across similar silhouettes and recommendation paths.`;
      case "too-tight":
        return `${selectedBrand.brand} mismatch detected. Confidence has been reduced and this cut will be deprioritised for similar body profiles in future recommendations.`;
      case "too-loose":
        return `${selectedBrand.brand} mismatch detected. The Fit Engine™ has recalibrated toward a more structured size path for this profile and adjacent garment types.`;
      default:
        return "";
    }
  };

  const getFeedbackLabel = () => {
    const option = feedbackOptions.find((item) => item.value === selectedFeedback);
    return option ? option.label : "No outcome selected";
  };

  const getReturnRiskLabel = (confidence) => {
    if (confidence >= 91) return "Low";
    if (confidence >= 86) return "Moderate-Low";
    return "Moderate";
  };

  const renderProgressBar = (value) => (
    <div className="confidence-track">
      <div className="confidence-fill" style={{ width: `${value}%` }} />
    </div>
  );

  const renderStepRail = () => (
    <div className="flow-rail" aria-label="Demo progress">
      {flowSteps.map((item, index) => {
        const currentStep = index + 1;
        const isActive = step === currentStep;
        const isComplete = step > currentStep;

        return (
          <div
            key={item.number}
            className={`flow-step ${isActive ? "active" : ""} ${
              isComplete ? "complete" : ""
            }`}
          >
            <div className="flow-step-top">
              <span className="flow-step-number">{item.number}</span>
              {index < flowSteps.length - 1 && <span className="flow-step-line" />}
            </div>
            <span className="flow-step-label">{item.label}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="demo-shell demo-master flagship-demo">
      <div className="phone-frame">
        <div className="phone-notch" />

        <div className="phone-screen">
          {step === 1 && (
            <div className="screen">
              {renderStepRail()}

              <div className="premium-ribbon">
                <span className="premium-ribbon-dot" />
                Master platform mode · universal fit intelligence
              </div>

              <div className="hero-block">
                <p className="eyebrow">SMARTERFIT SYSTEM</p>
                <h1 className="hero-title">Create Your Fit Passport™</h1>
                <p className="hero-subtitle">
                  Build your Fit Identity™ to power accurate sizing, higher
                  conversion, and fewer returns across brands.
                </p>
              </div>

              <div className="lj-hero-stats">
                <div className="lj-stat-card">
                  <span>System Role</span>
                  <strong>Universal fit layer</strong>
                </div>
                <div className="lj-stat-card">
                  <span>Core Output</span>
                  <strong>Portable Fit Passport</strong>
                </div>
                <div className="lj-stat-card">
                  <span>Model Type</span>
                  <strong>Compounding fit graph</strong>
                </div>
              </div>

              <div className="glass-panel">
                <p className="section-label">THE UNICORN LAYER</p>
                <h2 className="panel-title">Universal Fit Graph™</h2>
                <p className="panel-copy">
                  This is the system layer beneath every brand-specific
                  experience — the intelligence engine that captures, predicts,
                  learns, and compounds across commerce.
                </p>

                <div className="premium-insight-strip">
                  <span>Consumer-owned identity</span>
                  <span>Cross-brand memory</span>
                  <span>Compounding fit intelligence</span>
                </div>

                <div
                  className="passport-card"
                  style={{
                    marginTop: "14px",
                    textAlign: "center",
                    paddingTop: "22px",
                    paddingBottom: "22px",
                  }}
                >
                  <div className="unicorn-orb">
                    <div className="unicorn-energy-field" />
                    <div className="unicorn-orb-ring unicorn-orb-ring-a" />
                    <div className="unicorn-orb-ring unicorn-orb-ring-b" />
                    <div className="unicorn-orb-ring unicorn-orb-ring-c" />

                    <div className="unicorn-particle unicorn-particle-1" />
                    <div className="unicorn-particle unicorn-particle-2" />
                    <div className="unicorn-particle unicorn-particle-3" />
                    <div className="unicorn-particle unicorn-particle-4" />

                    <img
                      src="/unicorn-glow.png"
                      alt="Unicorn Layer"
                      className="unicorn-image"
                    />

                    <div className="unicorn-core-pulse" />
                  </div>

                  <div style={{ fontWeight: 800, marginBottom: "8px" }}>
                    The Unicorn Layer
                  </div>

                  <p
                    style={{
                      margin: "0 auto",
                      maxWidth: "420px",
                      opacity: 0.82,
                      lineHeight: 1.6,
                      fontSize: "14px",
                    }}
                  >
                    Not just a sizing widget — a reusable intelligence layer
                    that lets fit learn beyond one retailer, one product, or one
                    checkout.
                  </p>
                </div>
              </div>

              <div className="glass-panel">
                <p className="section-label">FIT IDENTITY INPUTS</p>

                <div className="form-grid">
                  <input
                    type="text"
                    name="height"
                    placeholder="Height (cm)"
                    value={formData.height}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="weight"
                    placeholder="Weight (kg)"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="waist"
                    placeholder="Waist Circumference"
                    value={formData.waist}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="hips"
                    placeholder="Hip Circumference"
                    value={formData.hips}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="shoulders"
                    placeholder="Shoulder Width"
                    value={formData.shoulders}
                    onChange={handleChange}
                  />

                  <select
                    name="bodyShape"
                    value={formData.bodyShape}
                    onChange={handleChange}
                  >
                    <option value="">Body Structure Type</option>
                    <option value="Athletic">Athletic</option>
                    <option value="Rectangle">Rectangle</option>
                    <option value="Triangle">Triangle</option>
                    <option value="Inverted Triangle">Inverted Triangle</option>
                  </select>

                  <select
                    name="fitPreference"
                    value={formData.fitPreference}
                    onChange={handleChange}
                  >
                    <option value="">Preferred Fit Profile</option>
                    <option value="Regular">Regular</option>
                    <option value="Relaxed">Relaxed</option>
                    <option value="Fitted">Fitted</option>
                  </select>
                </div>

                <button className="primary-button" onClick={generatePassport}>
                  Generate Fit Identity™
                </button>
              </div>
            </div>
          )}

          {step === 2 && passport && (
            <div className="screen">
              {renderStepRail()}

              <div className="premium-ribbon">
                <span className="premium-ribbon-dot" />
                Fit Passport created · system layer live
              </div>

              <div className="hero-block">
                <p className="eyebrow">SMARTERFIT SYSTEM</p>
                <h1 className="hero-title">Your Fit Passport™</h1>
                <p className="hero-subtitle">
                  Your body profile has been converted into a portable Fit
                  Identity™ that powers consistent sizing across brands and
                  reduces guesswork at purchase.
                </p>
              </div>

              <div className="glass-panel">
                <p className="section-label">FIT IDENTITY PROFILE</p>

                <div className="passport-card">
                  <div className="passport-row">
                    <span>Profile</span>
                    <strong>{passport.profileName}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Fit Cluster™</span>
                    <strong>{passport.fitCluster}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Torso Ratio</span>
                    <strong>{passport.torsoRatio}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Hip Ratio</span>
                    <strong>{passport.hipRatio}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Shoulder Index</span>
                    <strong>{passport.shoulderIndex}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Preferred Fit Profile</span>
                    <strong>{passport.fitPreference}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Fit Confidence Index™</span>
                    <strong>{passport.confidenceBand}</strong>
                  </div>
                </div>

                <div className="silhouette-panel">
                  <div className="silhouette-header">
                    <div>
                      <p className="section-label silhouette-label">
                        BODY CONTOUR MODEL
                      </p>
                      <h2 className="panel-title silhouette-title">
                        Scan-Derived Silhouette
                      </h2>
                    </div>
                    <div className="scan-pill">{passport.modelStatus}</div>
                  </div>

                  <p className="panel-copy silhouette-copy">
                    A scan-derived body model used by the Fit Engine™ to map
                    garment compatibility across brands.
                  </p>

                  <div className="silhouette-stage">
                    <div className="guide-line guide-shoulders">
                      <span className="guide-label left">
                        Shoulders {passport.contour.shoulders}
                      </span>
                    </div>

                    <div className="guide-line guide-waist">
                      <span className="guide-label right">
                        Waist {passport.contour.waist}
                      </span>
                    </div>

                    <div className="guide-line guide-hips">
                      <span className="guide-label left">
                        Hips {passport.contour.hips}
                      </span>
                    </div>

                    <div className="silhouette-figure">
                      <div className="silhouette-head" />
                      <div className="silhouette-neck" />
                      <div className="silhouette-torso" />
                      <div className="silhouette-arm left-arm" />
                      <div className="silhouette-arm right-arm" />
                      <div className="silhouette-leg left-leg" />
                      <div className="silhouette-leg right-leg" />
                      <div className="silhouette-core-glow" />

                      <div className="hotspot hotspot-shoulders">
                        <span className="hotspot-ping" />
                      </div>

                      <div className="hotspot hotspot-core">
                        <span className="hotspot-ping" />
                      </div>

                      <div className="hotspot hotspot-waist">
                        <span className="hotspot-ping" />
                      </div>

                      <div className="hotspot hotspot-hips">
                        <span className="hotspot-ping" />
                      </div>

                      <div className="floating-label floating-label-shoulder">
                        <span className="floating-label-dot" />
                        Shoulder match
                      </div>

                      <div className="floating-label floating-label-waist">
                        <span className="floating-label-dot" />
                        Waist fit signal
                      </div>

                      <div className="floating-label floating-label-hips">
                        <span className="floating-label-dot" />
                        Hip alignment
                      </div>
                    </div>
                  </div>

                  <div className="silhouette-meta">
                    <div className="silhouette-stat">
                      <span>Posture Signal</span>
                      <strong>{passport.contour.posture}</strong>
                    </div>
                    <div className="silhouette-stat">
                      <span>Fit Cluster™</span>
                      <strong>{passport.fitCluster}</strong>
                    </div>
                  </div>
                </div>

                <div className="fit-graph-panel">
                  <div className="fit-graph-header">
                    <div>
                      <p className="section-label fit-graph-label">
                        FIT SIGNATURE MAP™
                      </p>
                      <h2 className="panel-title fit-graph-title">
                        Signature Fit Map™
                      </h2>
                    </div>
                    <div className="fit-score-pill">{passport.fitScore}</div>
                  </div>

                  <p className="panel-copy fit-graph-copy">
                    Your Fit Signature Map™ — a proprietary model used to
                    predict sizing accuracy and reduce mismatch risk across
                    garments.
                  </p>

                  <div className="fit-graph-list">
                    {passport.fitGraph.map((item) => (
                      <div key={item.label} className="fit-graph-row">
                        <div className="fit-graph-row-top">
                          <span>{item.label}</span>
                          <strong>{item.value}</strong>
                        </div>
                        <div className="fit-graph-track">
                          <div
                            className="fit-graph-fill"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="fit-tag-list">
                    {passport.fitTags.map((tag) => (
                      <span key={tag} className="fit-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="learning-card">
                  <div className="learning-row">
                    <span>Model Status</span>
                    <strong>{passport.modelStatus}</strong>
                  </div>
                  <div className="learning-row">
                    <span>Last Updated</span>
                    <strong>{passport.lastUpdated}</strong>
                  </div>
                </div>

                <button className="primary-button" onClick={() => setStep(3)}>
                  View Brand Intelligence
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="screen">
              {renderStepRail()}

              <div className="premium-ribbon">
                <span className="premium-ribbon-dot" />
                Platform intelligence · universal brand layer
              </div>

              <div className="hero-block hero-block-tight">
                <p className="eyebrow">SMARTERFIT SYSTEM</p>
                <h1 className="hero-title">Brand Fit Intelligence</h1>
                <p className="hero-subtitle">
                  One Fit Passport™ powering predictive sizing across multiple
                  brands.
                </p>
              </div>

              <div className="glass-panel">
                <p className="section-label">FIT ENGINE™</p>
                <h2 className="panel-title">Highest-Confidence Matches</h2>
                <p className="panel-copy">
                  Generated by the Fit Engine™, these predictions are designed
                  to improve purchase confidence and reduce size-related
                  returns.
                </p>

                <div className="premium-insight-strip premium-insight-strip-matches">
                  <span>Cross-brand sizing memory</span>
                  <span>Reusable fit identity</span>
                  <span>Return-risk reduction</span>
                </div>

                <div className="match-list">
                  {brandMatches.map((match, index) => (
                    <div
                      className={`match-card premium-match-card ${
                        index === 0 ? "hero-match-card" : ""
                      }`}
                      key={match.brand}
                    >
                      <div className="match-top">
                        <div
                          className="size-pill"
                          style={{
                            minWidth: "42px",
                            height: "42px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.95rem",
                          }}
                        >
                          {match.logo}
                        </div>

                        <div className="match-copy" style={{ flex: 1 }}>
                          <div className="match-meta-row">
                            <span className="match-meta-badge">{match.category}</span>
                          </div>
                          <h3>{match.brand}</h3>
                          <p>{match.note}</p>
                        </div>

                        <div className="size-pill">{match.size}</div>
                      </div>

                      <div className="passport-card" style={{ marginTop: "12px" }}>
                        <div className="passport-row">
                          <span>Recommendation</span>
                          <strong>{match.recommendationType}</strong>
                        </div>
                        <div className="passport-row">
                          <span>Fit Profile</span>
                          <strong>{match.fitProfile}</strong>
                        </div>
                        <div className="passport-row">
                          <span>Fit Signal</span>
                          <strong>{match.fitReason}</strong>
                        </div>
                        <div className="passport-row">
                          <span>Status</span>
                          <strong>{match.lastSync}</strong>
                        </div>
                      </div>

                      <div className="confidence-header" style={{ marginTop: "14px" }}>
                        <span>Fit Confidence Index™ (Return Risk Signal)</span>
                        <strong>{match.confidence}%</strong>
                      </div>

                      {renderProgressBar(match.confidence)}

                      <button
                        className="ghost-button"
                        onClick={() => handleOpenLearningScreen(match)}
                      >
                        Continue to Checkout
                      </button>
                    </div>
                  ))}
                </div>

                <button className="primary-button" onClick={() => setStep(2)}>
                  Back to Fit Identity
                </button>
              </div>
            </div>
          )}

          {step === 4 && checkoutBrand && (
            <div className="screen">
              {renderStepRail()}

              <div className="premium-ribbon">
                <span className="premium-ribbon-dot" />
                Checkout layer · decision confidence in motion
              </div>

              <div className="hero-block hero-block-learning">
                <p className="eyebrow">SMARTERFIT CHECKOUT</p>
                <h1 className="hero-title hero-title-learning">
                  Confident at Checkout
                </h1>
                <p className="hero-subtitle hero-subtitle-learning">
                  SmarterFit turns prediction into purchase confidence right at
                  the decision point.
                </p>
              </div>

              <div className="glass-panel">
                <p className="section-label">PURCHASE DECISION LAYER</p>

                <div className="checkout-card">
                  <div className="checkout-product-shell">
                    <div className="checkout-product-visual">
                      <div className="checkout-product-glow" />
                      <div className="checkout-product-image">
                        <span>{checkoutBrand.logo}</span>
                      </div>
                    </div>

                    <div className="checkout-product-copy">
                      <div className="checkout-product-badge">
                        Smart recommendation live
                      </div>

                      <h3 className="checkout-product-title">
                        {checkoutBrand.brand} Signature Fit Piece
                      </h3>

                      <p className="checkout-product-sub">
                        {checkoutBrand.fitProfile}
                      </p>

                      <div className="checkout-product-meta">
                        <div className="checkout-meta-pill">
                          Selected size: {checkoutBrand.size}
                        </div>
                        <div className="checkout-meta-pill">
                          Confidence: {checkoutBrand.confidence}%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="checkout-confidence-panel">
                    <div className="confidence-header">
                      <span>Fit Confidence Index™</span>
                      <strong>{checkoutBrand.confidence}%</strong>
                    </div>
                    {renderProgressBar(checkoutBrand.confidence)}
                  </div>

                  <div className="checkout-decision-grid">
                    <div className="checkout-decision-card">
                      <span>Recommendation Type</span>
                      <strong>{checkoutBrand.recommendationType}</strong>
                    </div>

                    <div className="checkout-decision-card">
                      <span>Fit Signal</span>
                      <strong>{checkoutBrand.fitReason}</strong>
                    </div>

                    <div className="checkout-decision-card">
                      <span>Return Risk Signal</span>
                      <strong>{getReturnRiskLabel(checkoutBrand.confidence)}</strong>
                    </div>
                  </div>

                  <div className="checkout-message">
                    <div className="checkout-message-badge">SMARTERFIT SIGNAL</div>
                    <p>
                      Based on your Fit Passport™, body profile, and cross-brand
                      fit memory, this is your highest-confidence size
                      recommendation for {checkoutBrand.brand}. This reduces
                      guesswork and increases purchase certainty before checkout.
                    </p>
                  </div>

                  {!addedToBag ? (
                    <div className="checkout-actions">
                      <button
                        className="ghost-outline-button"
                        onClick={() => setStep(3)}
                      >
                        Back to Matches
                      </button>

                      <button
                        className="primary-button"
                        onClick={() => setAddedToBag(true)}
                      >
                        Add to Bag
                      </button>
                    </div>
                  ) : (
                    <div className="checkout-success-panel">
                      <div className="checkout-success-badge">
                        PURCHASE CONFIDENCE ACTIVATED
                      </div>

                      <div className="checkout-success-grid">
                        <div className="checkout-success-card">
                          <span>Status</span>
                          <strong>Added to bag</strong>
                        </div>
                        <div className="checkout-success-card">
                          <span>Chosen Size</span>
                          <strong>{checkoutBrand.size}</strong>
                        </div>
                        <div className="checkout-success-card">
                          <span>Fit Signal</span>
                          <strong>Stored for outcome loop</strong>
                        </div>
                      </div>

                      <p className="checkout-success-copy">
                        The recommendation has now influenced the purchase
                        decision. When the customer keeps, exchanges, or returns
                        the item, SmarterFit learns from the outcome and
                        strengthens the fit graph.
                      </p>

                      <div className="checkout-actions">
                        <button
                          className="ghost-outline-button"
                          onClick={() => setStep(3)}
                        >
                          Back to Matches
                        </button>

                        <button
                          className="primary-button"
                          onClick={() => setStep(5)}
                        >
                          Continue to Learning
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 5 && selectedBrand && (
            <div className="screen">
              {renderStepRail()}

              <div className="premium-ribbon">
                <span className="premium-ribbon-dot" />
                Learning loop · compounding fit graph
              </div>

              <div className="hero-block hero-block-learning">
                <p className="eyebrow">SMARTERFIT SYSTEM</p>
                <h1 className="hero-title hero-title-learning">
                  Learning Loop
                </h1>
                <p className="hero-subtitle hero-subtitle-learning">
                  Now that the purchase decision has been made, SmarterFit
                  captures the real-world outcome and feeds it back into the Fit
                  Engine™ to continuously improve future sizing accuracy.
                </p>
              </div>

              <div className="glass-panel">
                <p className="section-label">FIT LEARNING SYSTEM</p>

                <div className="learning-card">
                  <div className="learning-row">
                    <span>Brand</span>
                    <strong>{selectedBrand.brand}</strong>
                  </div>
                  <div className="learning-row">
                    <span>Predicted Size</span>
                    <strong>{selectedBrand.size}</strong>
                  </div>
                  <div className="learning-row">
                    <span>Starting Confidence</span>
                    <strong>{selectedBrand.confidence}%</strong>
                  </div>
                  <div className="learning-row">
                    <span>Fit Profile</span>
                    <strong>{selectedBrand.fitProfile}</strong>
                  </div>
                </div>

                <div className="feedback-section">
                  <h2 className="panel-title smaller">How did this fit?</h2>

                  <div className="feedback-grid">
                    {feedbackOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`feedback-chip ${
                          selectedFeedback === option.value ? "active" : ""
                        }`}
                        onClick={() => {
                          setSelectedFeedback(option.value);
                          setLearningUpdated(false);
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  <button
                    className="primary-button"
                    onClick={handleSubmitFeedback}
                  >
                    Update Fit Engine™
                  </button>
                </div>

                {learningUpdated && (
                  <div className="update-panel">
                    <div className="update-badge">SYSTEM UPDATED</div>

                    <div className="update-stats">
                      <div className="update-stat-card">
                        <span>Previous</span>
                        <strong>{selectedBrand.confidence}%</strong>
                      </div>
                      <div className="update-stat-card">
                        <span>Updated</span>
                        <strong>{getUpdatedConfidence()}%</strong>
                      </div>
                    </div>

                    <div className="learning-card" style={{ marginTop: "14px" }}>
                      <div className="learning-row">
                        <span>Recorded Outcome</span>
                        <strong>{getFeedbackLabel()}</strong>
                      </div>
                      <div className="learning-row">
                        <span>Signal Status</span>
                        <strong>Stored in learning layer</strong>
                      </div>
                    </div>

                    <div className="learning-message">
                      {getLearningMessage()}
                    </div>

                    <div className="system-note">
                      The Fit Engine™ continuously refines its prediction model
                      across body clusters and brand sizing systems — improving
                      accuracy, conversion, and return performance over time.
                    </div>
                  </div>
                )}

                <div className="bottom-actions">
                  <button
                    className="ghost-outline-button"
                    onClick={() => setStep(4)}
                  >
                    Back to Checkout
                  </button>

                  {learningUpdated && (
                    <button
                      className="primary-button"
                      onClick={() => setStep(6)}
                    >
                      View Retailer Value
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="screen">
              {renderStepRail()}

              <div className="premium-ribbon">
                <span className="premium-ribbon-dot" />
                Platform value layer · retailer outcome signal
              </div>

              <div className="hero-block hero-block-learning">
                <p className="eyebrow">SMARTERFIT FOR RETAILERS</p>
                <h1 className="hero-title hero-title-learning">
                  Better Fit. Better Commerce.
                </h1>
                <p className="hero-subtitle hero-subtitle-learning">
                  SmarterFit helps brands convert with more confidence and
                  return less inventory.
                </p>
              </div>

              <div className="glass-panel">
                <p className="section-label">RETAILER VALUE LAYER</p>

                <div className="retailer-kpi-grid">
                  <div className="retailer-kpi-card">
                    <span>Conversion Signal</span>
                    <strong>+12%</strong>
                    <p>Higher purchase confidence at the decision point.</p>
                  </div>

                  <div className="retailer-kpi-card">
                    <span>Return Risk</span>
                    <strong>-18%</strong>
                    <p>Reduced size-related mismatch across key categories.</p>
                  </div>

                  <div className="retailer-kpi-card">
                    <span>Fit Confidence</span>
                    <strong>High</strong>
                    <p>Recommendation quality captured before checkout.</p>
                  </div>

                  <div className="retailer-kpi-card">
                    <span>Learning Signal</span>
                    <strong>Compounding</strong>
                    <p>Every outcome strengthens the underlying fit graph.</p>
                  </div>
                </div>

                <div className="fit-graph-panel">
                  <div className="fit-graph-header">
                    <div>
                      <p className="section-label fit-graph-label">
                        PILOT OUTCOME SIGNAL
                      </p>
                      <h2 className="panel-title fit-graph-title">
                        SmarterFit turns fit accuracy into a measurable retail
                        advantage.
                      </h2>
                    </div>
                    <div className="fit-score-pill">B2B</div>
                  </div>

                  <p className="panel-copy fit-graph-copy">
                    By connecting body data, brand sizing logic, and live
                    feedback loops, SmarterFit helps retailers improve
                    conversion performance, reduce avoidable returns, and build
                    a defensible fit intelligence layer at checkout.
                  </p>

                  <div className="fit-tag-list">
                    <span className="fit-tag">Higher Conversion</span>
                    <span className="fit-tag">Lower Return Cost</span>
                    <span className="fit-tag">Checkout Confidence</span>
                    <span className="fit-tag">Compounding Intelligence</span>
                  </div>
                </div>

                <div className="deployment-panel">
                  <div className="deployment-badge">PILOT READY</div>

                  <div className="deployment-phase-grid">
                    <div className="deployment-phase-card">
                      <span>Phase 1</span>
                      <strong>Focused category launch</strong>
                      <p>Start with one category and capture early fit signals.</p>
                    </div>

                    <div className="deployment-phase-card">
                      <span>Phase 2</span>
                      <strong>Checkout optimization</strong>
                      <p>Improve confidence, reduce guesswork, and lift conversion.</p>
                    </div>

                    <div className="deployment-phase-card">
                      <span>Phase 3</span>
                      <strong>Compounding graph</strong>
                      <p>Turn outcomes into defensible fit intelligence over time.</p>
                    </div>
                  </div>

                  <div className="learning-message">
                    SmarterFit can be positioned as a lightweight pilot that
                    helps brands validate fit confidence uplift, return
                    reduction potential, and shopper behaviour improvements
                    without requiring a full platform overhaul on day one.
                  </div>

                  <div className="system-note">
                    Start with a focused category, capture real fit outcomes,
                    and let the Fit Engine™ compound value across products,
                    customers, and brand-specific sizing systems over time.
                  </div>
                </div>

                <div className="bottom-actions">
                  <button
                    className="ghost-outline-button"
                    onClick={() => setStep(5)}
                  >
                    Back to Learning
                  </button>

                  <button
                    className="primary-button"
                    onClick={() => {
                      setStep(1);
                      setPassport(null);
                      setSelectedBrand(null);
                      setCheckoutBrand(null);
                      setSelectedFeedback("");
                      setLearningUpdated(false);
                      setAddedToBag(false);
                    }}
                  >
                    Restart Experience
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}