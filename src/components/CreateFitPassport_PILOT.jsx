import React, { useMemo, useState } from "react";
import "./CreateFitPassport.css";

export default function CreateFitPassportPilot() {
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

  const flowSteps = [
    { number: "01", label: "Create" },
    { number: "02", label: "Identity" },
    { number: "03", label: "Match" },
    { number: "04", label: "Learn" },
    { number: "05", label: "Deploy" },
  ];

  const brandMatches = useMemo(
    () => [
      {
        brand: "Culture Kings",
        logo: "CK",
        size: "M",
        confidence: 94,
        note: "High compatibility across shoulder width, torso balance, and relaxed streetwear tolerance — supporting stronger purchase confidence across tees, hoodies, and outerwear.",
        fitProfile: "Relaxed streetwear fit",
        recommendationType: "Primary recommended size",
        lastSync: "Synced 2s ago",
        fitReason: "Shoulder + torso + fit preference",
      },
      {
        brand: "Nike",
        logo: "N",
        size: "M",
        confidence: 92,
        note: "Stable performance fit alignment across upper-body structure and movement allowance, supporting lower mismatch risk.",
        fitProfile: "Athletic performance cut",
        recommendationType: "Secondary recommended size",
        lastSync: "Synced 4s ago",
        fitReason: "Shoulder + torso alignment",
      },
      {
        brand: "Carhartt WIP",
        logo: "CW",
        size: "M",
        confidence: 89,
        note: "Strong compatibility for utility and streetwear silhouettes where relaxed structure and layering tolerance matter at checkout.",
        fitProfile: "Relaxed utility street fit",
        recommendationType: "Streetwear category size",
        lastSync: "Synced 5s ago",
        fitReason: "Torso balance + silhouette tolerance",
      },
      {
        brand: "Levi's",
        logo: "L",
        size: "32",
        confidence: 88,
        note: "Reliable denim prediction across waist and hip zones, helping reduce hesitation in lower-body fit selection.",
        fitProfile: "Waist-to-hip denim alignment",
        recommendationType: "Primary denim size",
        lastSync: "Synced 6s ago",
        fitReason: "Waist + hip denim match",
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
    setSelectedBrand(brand);
    setSelectedFeedback("");
    setLearningUpdated(false);
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
        return `Validated outcome. ${selectedBrand.brand} Fit Confidence Index™ increased, reinforcing this Fit Signature™ for similar profiles and supporting stronger sizing confidence across adjacent categories.`;
      case "slightly-tight":
        return `${selectedBrand.brand} feedback captured. The Fit Engine™ will now bias slightly more relaxed when this profile appears against comparable streetwear cuts, helping reduce future mismatch risk.`;
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
    <div className="demo-shell demo-pilot">
      <div className="phone-frame">
        <div className="phone-notch" />

        <div className="phone-screen">
          {step === 1 && (
            <div className="screen">
              {renderStepRail()}

              <div className="hero-block">
                <p className="eyebrow">SMARTERFIT x CULTURE KINGS</p>
                <h1 className="hero-title">Create Your Fit Passport™</h1>
                <p className="hero-subtitle">
                  Build your Fit Identity™ to support more confident streetwear sizing, higher conversion, and fewer fit-related returns.
                </p>
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

              <div className="hero-block">
                <p className="eyebrow">SMARTERFIT x CULTURE KINGS</p>
                <h1 className="hero-title">Your Fit Passport™</h1>
                <p className="hero-subtitle">
                  Your body profile has been converted into a portable Fit Identity™ that helps reduce guesswork across oversized, relaxed, and standard-fit streetwear categories.
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
                    A scan-derived body model used by the Fit Engine™ to interpret garment compatibility across streetwear, denim, and layered fits.
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
                    Your Fit Signature Map™ predicts sizing accuracy across streetwear silhouettes and helps reduce mismatch risk at checkout.
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

              <div className="hero-block hero-block-tight">
                <p className="eyebrow">SMARTERFIT x CULTURE KINGS</p>
                <h1 className="hero-title">Brand Fit Intelligence</h1>
                <p className="hero-subtitle">
                  One Fit Passport™ helping simplify streetwear sizing across categories and brands.
                </p>
              </div>

              <div className="glass-panel">
                <p className="section-label">FIT ENGINE™</p>
                <h2 className="panel-title">Highest-Confidence Matches</h2>
                <p className="panel-copy">
                  Generated by the Fit Engine™, these predictions are designed to improve purchase confidence across streetwear, denim, and layered fits while reducing size-related returns.
                </p>

                <div className="match-list">
                  {brandMatches.map((match) => (
                    <div className="match-card" key={match.brand}>
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
                        Record Outcome
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

          {step === 4 && selectedBrand && (
            <div className="screen">
              {renderStepRail()}

              <div className="hero-block hero-block-learning">
                <p className="eyebrow">SMARTERFIT x CULTURE KINGS</p>
                <h1 className="hero-title hero-title-learning">
                  Learning Loop
                </h1>
                <p className="hero-subtitle hero-subtitle-learning">
                  Every interaction strengthens the Fit Engine™, improving sizing accuracy across evolving streetwear silhouettes while reducing return risk over time.
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
                      The Fit Engine™ continuously refines its prediction model across body clusters, fit preferences, and brand sizing systems — improving accuracy, conversion, and return performance over time.
                    </div>
                  </div>
                )}

                <div className="bottom-actions">
                  <button
                    className="ghost-outline-button"
                    onClick={() => setStep(3)}
                  >
                    Back to Matches
                  </button>

                  {learningUpdated && (
                    <button
                      className="primary-button"
                      onClick={() => setStep(5)}
                    >
                      View Retailer Value
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="screen">
              {renderStepRail()}

              <div className="hero-block hero-block-learning">
                <p className="eyebrow">SMARTERFIT x CULTURE KINGS</p>
                <h1 className="hero-title hero-title-learning">
                  Better Streetwear Fit. Better Commerce.
                </h1>
                <p className="hero-subtitle hero-subtitle-learning">
                  SmarterFit helps reduce sizing confusion across oversized, relaxed, and standard fits — improving confidence at checkout and lowering fit-related returns.
                </p>
              </div>

              <div className="glass-panel">
                <p className="section-label">CULTURE KINGS PILOT VALUE</p>

                <div className="learning-card">
                  <div className="learning-row">
                    <span>Checkout Confidence</span>
                    <strong>Stronger sizing certainty</strong>
                  </div>
                  <div className="learning-row">
                    <span>Return Reduction</span>
                    <strong>Lower fit-related returns</strong>
                  </div>
                  <div className="learning-row">
                    <span>Streetwear Complexity</span>
                    <strong>Oversized to standard fit coverage</strong>
                  </div>
                  <div className="learning-row">
                    <span>Data Advantage</span>
                    <strong>Smarter fit signals over time</strong>
                  </div>
                </div>

                <div className="fit-graph-panel">
                  <div className="fit-graph-header">
                    <div>
                      <p className="section-label fit-graph-label">
                        PILOT OUTCOME SIGNAL
                      </p>
                      <h2 className="panel-title fit-graph-title">
                        SmarterFit turns complex streetwear sizing into a measurable retail advantage.
                      </h2>
                    </div>
                    <div className="fit-score-pill">CK</div>
                  </div>

                  <p className="panel-copy fit-graph-copy">
                    By connecting body data, fit preference, brand sizing logic, and live feedback loops, SmarterFit helps Culture Kings improve sizing confidence across fast-moving apparel categories while reducing avoidable return risk.
                  </p>

                  <div className="fit-tag-list">
                    <span className="fit-tag">Streetwear Fit Clarity</span>
                    <span className="fit-tag">Lower Return Risk</span>
                    <span className="fit-tag">Higher Checkout Confidence</span>
                  </div>
                </div>

                <div className="update-panel">
                  <div className="update-badge">PILOT READY</div>

                  <div className="learning-message">
                    A Culture Kings pilot can start within a focused product set — for example tees, hoodies, denim, or outerwear — to validate checkout confidence uplift, fit accuracy improvements, and return reduction potential in a measurable way.
                  </div>

                  <div className="system-note">
                    Start narrow, capture real fit outcomes, and let the Fit Engine™ compound value across categories, customers, and brand-specific sizing behaviour over time.
                  </div>
                </div>

                <div className="bottom-actions">
                  <button
                    className="ghost-outline-button"
                    onClick={() => setStep(4)}
                  >
                    Back to Learning
                  </button>

                  <button
                    className="primary-button"
                    onClick={() => {
                      setStep(1);
                      setSelectedBrand(null);
                      setSelectedFeedback("");
                      setLearningUpdated(false);
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