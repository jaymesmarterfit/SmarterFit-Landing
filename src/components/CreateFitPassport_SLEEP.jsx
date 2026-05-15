import React, { useMemo, useState } from "react";
import "./CreateFitPassport.css";

export default function CreateFitPassportSleep() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    sleepPosition: "",
    firmnessPreference: "",
    temperaturePreference: "",
    supportNeed: "",
  });

  const [passport, setPassport] = useState(null);
  const [selectedSleepSystem, setSelectedSleepSystem] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [learningUpdated, setLearningUpdated] = useState(false);

  const flowSteps = [
    { number: "01", label: "Create" },
    { number: "02", label: "Profile" },
    { number: "03", label: "Match" },
    { number: "04", label: "Learn" },
  ];

  const sleepMatches = useMemo(
    () => [
      {
        brand: "Eight Sleep",
        model: "Pod 4",
        confidence: 95,
        note: "High compatibility for pressure relief, thermal regulation, and recovery-led sleep adaptation.",
        fitProfile: "Adaptive recovery sleep",
        recommendationType: "Primary sleep system",
        lastSync: "Synced 2s ago",
        fitReason: "Thermal control + pressure zoning + recovery mode",
        category: "Adaptive sleep leader",
        mattressZone: "Dynamic pressure zones",
        pillowHeight: "Medium profile",
        temperature: "Cool-balanced",
        supportMode: "Recovery tuning",
      },
      {
        brand: "Tempur",
        model: "Smart Elite",
        confidence: 91,
        note: "Strong compatibility across shoulder pressure relief and spinal alignment for side and mixed-position sleepers.",
        fitProfile: "Pressure-relief alignment",
        recommendationType: "Secondary sleep system",
        lastSync: "Synced 4s ago",
        fitReason: "Shoulder relief + spine alignment",
        category: "Premium support benchmark",
        mattressZone: "Contour support zones",
        pillowHeight: "Mid-high profile",
        temperature: "Neutral",
        supportMode: "Alignment tuning",
      },
      {
        brand: "Sleep Number",
        model: "i8",
        confidence: 89,
        note: "Flexible comfort match with adjustable firmness behaviour and strong long-term preference learning potential.",
        fitProfile: "Adjustable firmness comfort",
        recommendationType: "Long-term adaptive match",
        lastSync: "Synced 5s ago",
        fitReason: "Firmness adaptation + preference learning",
        category: "Personalisation signal",
        mattressZone: "Dual firmness zones",
        pillowHeight: "Medium profile",
        temperature: "Cool-neutral",
        supportMode: "Preference tuning",
      },
    ],
    []
  );

  const feedbackOptions = [
    { label: "Excellent sleep", value: "excellent" },
    { label: "Good with minor adjustment", value: "good-adjustment" },
    { label: "Too firm", value: "too-firm" },
    { label: "Too soft", value: "too-soft" },
    { label: "Too hot", value: "too-hot" },
    { label: "Pressure discomfort", value: "pressure-discomfort" },
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
      profileName: "Jayme Sleep Passport",
      sleepCluster: "Balanced Recovery Profile",
      postureSignal: formData.sleepPosition || "Side sleeper",
      supportBand: formData.supportNeed || "Pressure relief",
      firmnessBand: formData.firmnessPreference || "Medium",
      temperatureBand: formData.temperaturePreference || "Cool-balanced",
      confidenceBand: "High",
      sleepScore: 93,
      modelStatus: "Live",
      lastUpdated: "Updated just now",
      spineScore: 91,
      pressureScore: 89,
      recoveryScore: 95,
      sleepGraph: [
        { label: "Spinal Alignment", value: 90 },
        { label: "Shoulder Pressure Relief", value: 88 },
        { label: "Hip Support Balance", value: 87 },
        { label: "Thermal Comfort", value: 92 },
        { label: "Recovery Sleep Signal", value: 95 },
      ],
      sleepTags: [
        "Balanced recovery profile",
        "Pressure-aware comfort",
        "Adaptive sleep environment",
      ],
      contour: {
        position: formData.sleepPosition || "Side sleeper",
        spine: "Aligned",
        shoulders: "Pressure-managed",
        temperature: formData.temperaturePreference || "Cool-balanced",
      },
    };

    setPassport(generatedPassport);
    setStep(2);
  };

  const handleOpenLearningScreen = (system) => {
    setSelectedSleepSystem(system);
    setSelectedFeedback("");
    setLearningUpdated(false);
    setStep(4);
  };

  const handleSubmitFeedback = () => {
    if (!selectedFeedback) return;
    setLearningUpdated(true);
  };

  const getUpdatedConfidence = () => {
    if (!selectedSleepSystem) return 0;

    switch (selectedFeedback) {
      case "excellent":
        return selectedSleepSystem.confidence + 3;
      case "good-adjustment":
        return selectedSleepSystem.confidence + 1;
      case "too-firm":
      case "too-soft":
      case "too-hot":
      case "pressure-discomfort":
        return Math.max(selectedSleepSystem.confidence - 1, 70);
      default:
        return selectedSleepSystem.confidence;
    }
  };

  const getLearningMessage = () => {
    if (!selectedSleepSystem) return "";

    switch (selectedFeedback) {
      case "excellent":
        return `Validated outcome. ${selectedSleepSystem.brand} ${selectedSleepSystem.model} sleep confidence increased, reinforcing this recovery profile for similar pressure, alignment, and thermal conditions.`;
      case "good-adjustment":
        return `${selectedSleepSystem.brand} ${selectedSleepSystem.model} feedback captured. The sleep layer will now apply lighter firmness and thermal adjustments for similar profiles.`;
      case "too-firm":
        return `${selectedSleepSystem.brand} ${selectedSleepSystem.model} feedback captured. Future sleep matches will bias toward softer surface response and improved pressure relief.`;
      case "too-soft":
        return `${selectedSleepSystem.brand} ${selectedSleepSystem.model} feedback captured. Future matches will bias toward stronger support structure and more stable spinal alignment.`;
      case "too-hot":
        return `${selectedSleepSystem.brand} ${selectedSleepSystem.model} feedback captured. Future environments will prioritise stronger cooling behaviour and temperature-balancing logic.`;
      case "pressure-discomfort":
        return `${selectedSleepSystem.brand} ${selectedSleepSystem.model} feedback captured. Future matches will prioritise pressure redistribution across shoulders and hips.`;
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
    <div className="demo-shell demo-lorna flagship-demo sleep-demo">
      <div className="phone-frame">
        <div className="phone-notch" />

        <div className="phone-screen">
          {step === 1 && (
            <div className="screen">
              {renderStepRail()}

              <div className="premium-ribbon">
                <span className="premium-ribbon-dot" />
                Future surface · sleep intelligence
              </div>

              <div className="hero-block">
                <p className="eyebrow">SMARTERFIT × SLEEP</p>
                <h1 className="hero-title">Create Your Sleep Passport</h1>
                <p className="hero-subtitle">
                  Build a sleep-body profile that helps future sleep environments
                  adapt around pressure relief, support needs, and recovery comfort.
                </p>
              </div>

              <div className="lj-hero-stats">
                <div className="lj-stat-card">
                  <span>Use Case</span>
                  <strong>Adaptive sleep systems</strong>
                </div>
                <div className="lj-stat-card">
                  <span>Decision Layer</span>
                  <strong>Sleep intelligence</strong>
                </div>
                <div className="lj-stat-card">
                  <span>Platform Signal</span>
                  <strong>Environment learns your rest</strong>
                </div>
              </div>

              <div className="glass-panel">
                <p className="section-label">SLEEP PROFILE INPUTS</p>

                <div className="form-grid">
                  <input
                    type="text"
                    name="height"
                    placeholder="Height"
                    value={formData.height}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="weight"
                    placeholder="Weight"
                    value={formData.weight}
                    onChange={handleChange}
                  />

                  <select
                    name="sleepPosition"
                    value={formData.sleepPosition}
                    onChange={handleChange}
                  >
                    <option value="">Sleep Position</option>
                    <option value="Side sleeper">Side sleeper</option>
                    <option value="Back sleeper">Back sleeper</option>
                    <option value="Stomach sleeper">Stomach sleeper</option>
                    <option value="Mixed sleeper">Mixed sleeper</option>
                  </select>

                  <select
                    name="firmnessPreference"
                    value={formData.firmnessPreference}
                    onChange={handleChange}
                  >
                    <option value="">Firmness Preference</option>
                    <option value="Soft">Soft</option>
                    <option value="Medium">Medium</option>
                    <option value="Firm">Firm</option>
                    <option value="Adaptive">Adaptive</option>
                  </select>

                  <select
                    name="temperaturePreference"
                    value={formData.temperaturePreference}
                    onChange={handleChange}
                  >
                    <option value="">Temperature Preference</option>
                    <option value="Cool-balanced">Cool-balanced</option>
                    <option value="Neutral">Neutral</option>
                    <option value="Warm">Warm</option>
                  </select>

                  <select
                    name="supportNeed"
                    value={formData.supportNeed}
                    onChange={handleChange}
                  >
                    <option value="">Support Need</option>
                    <option value="Pressure relief">Pressure relief</option>
                    <option value="Spinal alignment">Spinal alignment</option>
                    <option value="Hip support">Hip support</option>
                    <option value="Recovery comfort">Recovery comfort</option>
                  </select>
                </div>

                <button className="primary-button" onClick={generatePassport}>
                  Generate Sleep Passport
                </button>
              </div>
            </div>
          )}

          {step === 2 && passport && (
            <div className="screen">
              {renderStepRail()}

              <div className="premium-ribbon">
                <span className="premium-ribbon-dot" />
                Sleep profile generated · recovery layer live
              </div>

              <div className="hero-block">
                <p className="eyebrow">SMARTERFIT × SLEEP</p>
                <h1 className="hero-title">Your Sleep Profile</h1>
                <p className="hero-subtitle">
                  Your sleep-body profile is now active as a portable sleep
                  intelligence layer — enabling future sleep environments to adapt
                  around your body over time.
                </p>
              </div>

              <div className="lj-hero-stats">
                <div className="lj-stat-card">
                  <span>Spine Score</span>
                  <strong>{passport.spineScore}</strong>
                </div>
                <div className="lj-stat-card">
                  <span>Pressure Score</span>
                  <strong>{passport.pressureScore}</strong>
                </div>
                <div className="lj-stat-card">
                  <span>Recovery Score</span>
                  <strong>{passport.recoveryScore}</strong>
                </div>
              </div>

              <div className="glass-panel">
                <p className="section-label">SLEEP PROFILE</p>

                <div className="passport-card premium-passport-card">
                  <div className="passport-row">
                    <span>Profile</span>
                    <strong>{passport.profileName}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Sleep Cluster</span>
                    <strong>{passport.sleepCluster}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Posture Signal</span>
                    <strong>{passport.postureSignal}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Support Band</span>
                    <strong>{passport.supportBand}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Firmness Band</span>
                    <strong>{passport.firmnessBand}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Temperature Band</span>
                    <strong>{passport.temperatureBand}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Confidence</span>
                    <strong>{passport.confidenceBand}</strong>
                  </div>
                </div>

                <div className="silhouette-panel premium-silhouette-panel">
                  <div className="silhouette-header">
                    <div>
                      <p className="section-label silhouette-label">
                        REST BODY MODEL
                      </p>
                      <h2 className="panel-title silhouette-title">
                        Recovery Contour Map
                      </h2>
                    </div>
                    <div className="scan-pill">{passport.modelStatus}</div>
                  </div>

                  <p className="panel-copy silhouette-copy">
                    A rest-body model used to interpret pressure relief, spinal
                    alignment, and thermal comfort across adaptive sleep systems.
                  </p>

                  <div className="premium-insight-strip">
                    <span>Pressure-aware mapping</span>
                    <span>Alignment-led support</span>
                    <span>Recovery comfort prediction</span>
                  </div>

                  <div className="passport-card" style={{ marginTop: "14px" }}>
                    <div className="passport-row">
                      <span>Sleep Position</span>
                      <strong>{passport.contour.position}</strong>
                    </div>
                    <div className="passport-row">
                      <span>Spine Alignment</span>
                      <strong>{passport.contour.spine}</strong>
                    </div>
                    <div className="passport-row">
                      <span>Shoulder Pressure</span>
                      <strong>{passport.contour.shoulders}</strong>
                    </div>
                    <div className="passport-row">
                      <span>Thermal Signal</span>
                      <strong>{passport.contour.temperature}</strong>
                    </div>
                  </div>
                </div>

                <div className="fit-graph-panel premium-fit-graph-panel">
                  <div className="fit-graph-header">
                    <div>
                      <p className="section-label fit-graph-label">
                        SLEEP SIGNATURE MAP
                      </p>
                      <h2 className="panel-title fit-graph-title">
                        Signature Sleep Map
                      </h2>
                    </div>
                    <div className="fit-score-pill">{passport.sleepScore}</div>
                  </div>

                  <p className="panel-copy fit-graph-copy">
                    Your Sleep Signature Map predicts compatibility across support,
                    pressure relief, and overnight recovery conditions.
                  </p>

                  <div className="fit-graph-list">
                    {passport.sleepGraph.map((item) => (
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
                    {passport.sleepTags.map((tag) => (
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
                  View Sleep Intelligence
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="screen">
              {renderStepRail()}

              <div className="premium-ribbon">
                <span className="premium-ribbon-dot" />
                Sleep intelligence · adaptive recovery decision layer
              </div>

              <div className="hero-block hero-block-tight">
                <p className="eyebrow">SMARTERFIT × SLEEP</p>
                <h1 className="hero-title">Sleep System Matches</h1>
                <p className="hero-subtitle">
                  One Sleep Passport helping future sleep systems adapt around
                  support, pressure relief, temperature, and overnight recovery.
                </p>
              </div>

              <div className="glass-panel">
                <p className="section-label">SLEEP ENGINE</p>
                <h2 className="panel-title">Adaptive Sleep Matches</h2>
                <p className="panel-copy" style={{ marginTop: "6px" }}>
                  Not just what you sleep on — how it adapts to you.
                </p>
                <p className="panel-copy">
                  Generated by the sleep intelligence layer, these environments
                  are configured to adapt around pressure relief, support needs,
                  and recovery comfort over time.
                </p>

                <div className="premium-insight-strip premium-insight-strip-matches">
                  <span>Pressure relief fit</span>
                  <span>Thermal adaptation</span>
                  <span>Recovery comfort logic</span>
                </div>

                <div className="match-list">
                  {sleepMatches.map((match, index) => (
                    <div
                      className={`match-card premium-match-card ${
                        index === 0 ? "hero-match-card" : ""
                      }`}
                      key={`${match.brand}-${match.model}`}
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
                            fontSize: "0.78rem",
                          }}
                        >
                          {match.brand.slice(0, 2).toUpperCase()}
                        </div>

                        <div className="match-copy" style={{ flex: 1 }}>
                          <div className="match-meta-row">
                            <span className="match-meta-badge">{match.category}</span>
                          </div>
                          <h3>
                            {match.brand} {match.model}
                          </h3>
                          <p>{match.note}</p>
                        </div>

                        <div className="size-pill">{match.confidence}%</div>
                      </div>

                      <div className="passport-card" style={{ marginTop: "12px" }}>
                        <div className="passport-row">
                          <span>Environment Mode</span>
                          <strong>{match.recommendationType}</strong>
                        </div>
                        <div className="passport-row">
                          <span>Sleep Profile</span>
                          <strong>{match.fitProfile}</strong>
                        </div>
                        <div className="passport-row">
                          <span>Sleep Signal</span>
                          <strong>{match.fitReason}</strong>
                        </div>
                        <div className="passport-row">
                          <span>System Sync</span>
                          <strong>{match.lastSync}</strong>
                        </div>
                      </div>

                      <div className="passport-card" style={{ marginTop: "12px" }}>
                        <div className="passport-row">
                          <span>Mattress Zones</span>
                          <strong>{match.mattressZone}</strong>
                        </div>
                        <div className="passport-row">
                          <span>Pillow Height</span>
                          <strong>{match.pillowHeight}</strong>
                        </div>
                        <div className="passport-row">
                          <span>Temperature</span>
                          <strong>{match.temperature}</strong>
                        </div>
                        <div className="passport-row">
                          <span>Support Mode</span>
                          <strong>{match.supportMode}</strong>
                        </div>
                      </div>

                      <div className="premium-insight-strip" style={{ marginTop: "10px" }}>
                        <span>Adaptive support zones</span>
                        <span>Recovery-aware tuning</span>
                      </div>

                      <div className="confidence-header" style={{ marginTop: "14px" }}>
                        <span>Sleep Confidence</span>
                        <strong>{match.confidence}%</strong>
                      </div>

                      {renderProgressBar(match.confidence)}

                      <button
                        className="ghost-button"
                        onClick={() => handleOpenLearningScreen(match)}
                      >
                        Record Sleep Outcome
                      </button>
                    </div>
                  ))}
                </div>

                <button className="primary-button" onClick={() => setStep(2)}>
                  Back to Sleep Profile
                </button>
              </div>
            </div>
          )}

          {step === 4 && selectedSleepSystem && (
            <div className="screen">
              {renderStepRail()}

              <div className="premium-ribbon">
                <span className="premium-ribbon-dot" />
                Learning loop · compounding sleep intelligence
              </div>

              <div className="hero-block hero-block-learning">
                <p className="eyebrow">SMARTERFIT × SLEEP</p>
                <h1 className="hero-title hero-title-learning">Learning Loop</h1>
                <p className="hero-subtitle hero-subtitle-learning">
                  Every sleep outcome strengthens the system, improving how future
                  sleep environments adapt to support needs, pressure relief, and
                  recovery conditions.
                </p>
              </div>

              <div className="glass-panel">
                <p className="section-label">SLEEP LEARNING SYSTEM</p>

                <div className="learning-card">
                  <div className="learning-row">
                    <span>Sleep System</span>
                    <strong>
                      {selectedSleepSystem.brand} {selectedSleepSystem.model}
                    </strong>
                  </div>
                  <div className="learning-row">
                    <span>Starting Confidence</span>
                    <strong>{selectedSleepSystem.confidence}%</strong>
                  </div>
                  <div className="learning-row">
                    <span>Sleep Profile</span>
                    <strong>{selectedSleepSystem.fitProfile}</strong>
                  </div>
                  <div className="learning-row">
                    <span>Adjustment Path</span>
                    <strong>{selectedSleepSystem.fitReason}</strong>
                  </div>
                </div>

                <div className="feedback-section">
                  <h2 className="panel-title smaller">How did you sleep?</h2>

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

                  <button className="primary-button" onClick={handleSubmitFeedback}>
                    Update Sleep Layer
                  </button>
                </div>

                {learningUpdated && (
                  <div className="update-panel">
                    <div className="update-badge">SYSTEM UPDATED</div>

                    <div className="update-stats">
                      <div className="update-stat-card">
                        <span>Previous</span>
                        <strong>{selectedSleepSystem.confidence}%</strong>
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
                        <strong>Integrated into sleep layer</strong>
                      </div>
                    </div>

                    <div className="learning-message">{getLearningMessage()}</div>

                    <div className="system-note">
                      The system continuously refines how sleep environments adapt
                      around the human body — compounding intelligence across
                      support, pressure relief, thermal comfort, and real recovery
                      outcomes.
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
                      onClick={() => {
                        setStep(1);
                        setSelectedSleepSystem(null);
                        setSelectedFeedback("");
                        setLearningUpdated(false);
                      }}
                    >
                      Restart Experience
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}