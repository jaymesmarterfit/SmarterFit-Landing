import React, { useMemo, useState } from "react";
import "./CreateFitPassport.css";

export default function CreateFitPassportAutomotive() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    height: "",
    torso: "",
    legLength: "",
    shoulders: "",
    posture: "",
    comfortMode: "",
  });

  const [passport, setPassport] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [learningUpdated, setLearningUpdated] = useState(false);

  const flowSteps = [
    { number: "01", label: "Create" },
    { number: "02", label: "Profile" },
    { number: "03", label: "Match" },
    { number: "04", label: "Learn" },
  ];

  const vehicleMatches = useMemo(
    () => [
      {
        brand: "Tesla",
        model: "Model Y",
        confidence: 94,
        note: "Strong lumbar alignment and legroom optimisation for long-duration seated comfort.",
        fitProfile: "Balanced upright comfort",
        recommendationType: "Primary comfort match",
        lastSync: "Synced 2s ago",
        fitReason: "Lumbar + legroom + torso balance",
        category: "Future mobility leader",
        seatDepth: "+3 cm",
        lumbar: "+2",
        recline: "-4°",
        headrest: "+1 cm",
      },
      {
        brand: "BMW",
        model: "iX",
        confidence: 91,
        note: "Balanced posture support with premium contour alignment across torso and shoulders.",
        fitProfile: "Premium posture support",
        recommendationType: "Secondary comfort match",
        lastSync: "Synced 4s ago",
        fitReason: "Shoulder line + torso contour",
        category: "Premium interior benchmark",
        seatDepth: "+2 cm",
        lumbar: "+1",
        recline: "-3°",
        headrest: "+1 cm",
      },
      {
        brand: "Mercedes",
        model: "EQS SUV",
        confidence: 89,
        note: "High comfort compatibility for relaxed long-journey seating and refined pressure distribution.",
        fitProfile: "Luxury recline comfort",
        recommendationType: "Long-distance comfort match",
        lastSync: "Synced 5s ago",
        fitReason: "Pressure distribution + recline mode",
        category: "Luxury comfort signal",
        seatDepth: "+2.5 cm",
        lumbar: "+2",
        recline: "-5°",
        headrest: "+1.5 cm",
      },
    ],
    []
  );

  const feedbackOptions = [
    { label: "Excellent comfort", value: "excellent" },
    { label: "Good with minor adjustment", value: "good-adjustment" },
    { label: "Too upright", value: "too-upright" },
    { label: "Too reclined", value: "too-reclined" },
    { label: "Needs more legroom", value: "more-legroom" },
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
      profileName: "Jayme Comfort Passport",
      comfortCluster: "Balanced Comfort Profile",
      seatedAlignment: "Adaptive seated posture",
      shoulderIndex: "1.08",
      torsoRatio: "0.84",
      legroomBand: "Optimised",
      comfortMode: formData.comfortMode || "Daily commute",
      confidenceBand: "High",
      comfortScore: 92,
      modelStatus: "Live",
      lastUpdated: "Updated just now",
      lumbarScore: 91,
      postureScore: 89,
      journeyScore: 94,
      comfortGraph: [
        { label: "Shoulder Support Alignment", value: 88 },
        { label: "Torso Balance", value: 84 },
        { label: "Lumbar Mapping", value: 90 },
        { label: "Legroom Match", value: 93 },
        { label: "Long-Journey Comfort", value: 95 },
      ],
      comfortTags: [
        "Balanced seated posture",
        "Long-journey comfort signal",
        "Adaptive environment fit",
      ],
      contour: {
        shoulders: "Aligned",
        torso: "Balanced",
        lumbar: "Supported",
        posture: formData.posture || "Balanced",
      },
    };

    setPassport(generatedPassport);
    setStep(2);
  };

  const handleOpenLearningScreen = (vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedFeedback("");
    setLearningUpdated(false);
    setStep(4);
  };

  const handleSubmitFeedback = () => {
    if (!selectedFeedback) return;
    setLearningUpdated(true);
  };

  const getUpdatedConfidence = () => {
    if (!selectedVehicle) return 0;

    switch (selectedFeedback) {
      case "excellent":
        return selectedVehicle.confidence + 3;
      case "good-adjustment":
        return selectedVehicle.confidence + 1;
      case "too-upright":
      case "too-reclined":
      case "more-legroom":
        return Math.max(selectedVehicle.confidence - 1, 70);
      default:
        return selectedVehicle.confidence;
    }
  };

  const getLearningMessage = () => {
    if (!selectedVehicle) return "";

    switch (selectedFeedback) {
      case "excellent":
        return `Validated outcome. ${selectedVehicle.brand} ${selectedVehicle.model} comfort confidence increased, reinforcing this seated posture profile for similar interior geometries and journey modes.`;
      case "good-adjustment":
        return `${selectedVehicle.brand} ${selectedVehicle.model} feedback captured. The comfort layer will now make lighter seat and lumbar adjustments for similar seated profiles.`;
      case "too-upright":
        return `${selectedVehicle.brand} ${selectedVehicle.model} feedback captured. The system will now bias toward a more relaxed recline path for similar body profiles.`;
      case "too-reclined":
        return `${selectedVehicle.brand} ${selectedVehicle.model} feedback captured. The system will now bias slightly more upright across comparable comfort configurations.`;
      case "more-legroom":
        return `${selectedVehicle.brand} ${selectedVehicle.model} feedback captured. Future matches will prioritise stronger legroom geometry and extended seat-position logic.`;
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
    <div className="demo-shell demo-lorna flagship-demo">
      <div className="phone-frame">
        <div className="phone-notch" />

        <div className="phone-screen">
          {step === 1 && (
            <div className="screen">
              {renderStepRail()}

              <div className="premium-ribbon">
                <span className="premium-ribbon-dot" />
                Future surface · automotive comfort intelligence
              </div>

              <div className="hero-block">
                <p className="eyebrow">SMARTERFIT × AUTOMOTIVE</p>
                <h1 className="hero-title">Create Your Comfort Passport</h1>
                <p className="hero-subtitle">
                  Build a seated-body profile that helps future vehicle interiors adapt around posture, support needs, and journey comfort.
                </p>
              </div>

              <div className="lj-hero-stats">
                <div className="lj-stat-card">
                  <span>Use Case</span>
                  <strong>Adaptive interiors</strong>
                </div>
                <div className="lj-stat-card">
                  <span>Decision Layer</span>
                  <strong>Comfort intelligence</strong>
                </div>
                <div className="lj-stat-card">
                  <span>Platform Signal</span>
                  <strong>Human-environment fit</strong>
                </div>
              </div>

              <div className="glass-panel">
                <p className="section-label">SEATED PROFILE INPUTS</p>

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
                    name="torso"
                    placeholder="Torso Length"
                    value={formData.torso}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="legLength"
                    placeholder="Leg Length"
                    value={formData.legLength}
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
                    name="posture"
                    value={formData.posture}
                    onChange={handleChange}
                  >
                    <option value="">Posture Preference</option>
                    <option value="Upright">Upright</option>
                    <option value="Balanced">Balanced</option>
                    <option value="Relaxed">Relaxed</option>
                  </select>

                  <select
                    name="comfortMode"
                    value={formData.comfortMode}
                    onChange={handleChange}
                  >
                    <option value="">Comfort Mode</option>
                    <option value="Daily commute">Daily commute</option>
                    <option value="Long journey">Long journey</option>
                    <option value="Relax mode">Relax mode</option>
                    <option value="Work mode">Work mode</option>
                  </select>
                </div>

                <button className="primary-button" onClick={generatePassport}>
                  Generate Comfort Passport
                </button>
              </div>
            </div>
          )}

          {step === 2 && passport && (
            <div className="screen">
              {renderStepRail()}

              <div className="premium-ribbon">
                <span className="premium-ribbon-dot" />
                Comfort profile generated · environment fit layer live
              </div>

              <div className="hero-block">
                <p className="eyebrow">SMARTERFIT × AUTOMOTIVE</p>
                <h1 className="hero-title">Your Comfort Profile</h1>
                <p className="hero-subtitle">
                  Your seated-body profile is now active as a portable comfort intelligence layer — enabling future environments to adapt around your body in real time.
                </p>
              </div>

              <div className="lj-hero-stats">
                <div className="lj-stat-card">
                  <span>Lumbar Score</span>
                  <strong>{passport.lumbarScore}</strong>
                </div>
                <div className="lj-stat-card">
                  <span>Posture Score</span>
                  <strong>{passport.postureScore}</strong>
                </div>
                <div className="lj-stat-card">
                  <span>Journey Score</span>
                  <strong>{passport.journeyScore}</strong>
                </div>
              </div>

              <div className="glass-panel">
                <p className="section-label">COMFORT PROFILE</p>

                <div className="passport-card premium-passport-card">
                  <div className="passport-row">
                    <span>Profile</span>
                    <strong>{passport.profileName}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Comfort Cluster</span>
                    <strong>{passport.comfortCluster}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Seated Alignment</span>
                    <strong>{passport.seatedAlignment}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Shoulder Index</span>
                    <strong>{passport.shoulderIndex}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Torso Ratio</span>
                    <strong>{passport.torsoRatio}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Legroom Band</span>
                    <strong>{passport.legroomBand}</strong>
                  </div>
                  <div className="passport-row">
                    <span>Comfort Mode</span>
                    <strong>{passport.comfortMode}</strong>
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
                        SEATED BODY MODEL
                      </p>
                      <h2 className="panel-title silhouette-title">
                        Comfort Contour Map
                      </h2>
                    </div>
                    <div className="scan-pill">{passport.modelStatus}</div>
                  </div>

                  <p className="panel-copy silhouette-copy">
                    A seated-body model used to interpret posture alignment,
                    lumbar positioning, and long-journey comfort compatibility
                    across future vehicle interiors.
                  </p>

                  <div className="premium-insight-strip">
                    <span>Posture-aware mapping</span>
                    <span>Lumbar-led adjustment</span>
                    <span>Journey comfort prediction</span>
                  </div>

                  <div className="passport-card" style={{ marginTop: "14px" }}>
                    <div className="passport-row">
                      <span>Shoulder Support</span>
                      <strong>{passport.contour.shoulders}</strong>
                    </div>
                    <div className="passport-row">
                      <span>Torso Balance</span>
                      <strong>{passport.contour.torso}</strong>
                    </div>
                    <div className="passport-row">
                      <span>Lumbar Mapping</span>
                      <strong>{passport.contour.lumbar}</strong>
                    </div>
                    <div className="passport-row">
                      <span>Posture Signal</span>
                      <strong>{passport.contour.posture}</strong>
                    </div>
                  </div>
                </div>

                <div className="fit-graph-panel premium-fit-graph-panel">
                  <div className="fit-graph-header">
                    <div>
                      <p className="section-label fit-graph-label">
                        COMFORT SIGNATURE MAP
                      </p>
                      <h2 className="panel-title fit-graph-title">
                        Signature Comfort Map
                      </h2>
                    </div>
                    <div className="fit-score-pill">{passport.comfortScore}</div>
                  </div>

                  <p className="panel-copy fit-graph-copy">
                    Your Comfort Signature Map predicts seated compatibility
                    across posture, support, and journey-mode preferences.
                  </p>

                  <div className="fit-graph-list">
                    {passport.comfortGraph.map((item) => (
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
                    {passport.comfortTags.map((tag) => (
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
                  View Vehicle Intelligence
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="screen">
              {renderStepRail()}

              <div className="premium-ribbon">
                <span className="premium-ribbon-dot" />
                Vehicle intelligence · adaptive interior decision layer
              </div>

              <div className="hero-block hero-block-tight">
                <p className="eyebrow">SMARTERFIT × AUTOMOTIVE</p>
                <h1 className="hero-title">Vehicle Comfort Matches</h1>
                <p className="hero-subtitle">
                  One Comfort Passport helping future interiors adapt around posture, support, recline, and long-journey comfort.
                </p>
              </div>

              <div className="glass-panel">
                <p className="section-label">COMFORT ENGINE</p>
                <h2 className="panel-title">Adaptive Interior Matches</h2>
                <p className="panel-copy" style={{ marginTop: "6px" }}>
  Not choosing a vehicle — configuring how it adapts around you.
</p>
                <p className="panel-copy">
                  Generated by the comfort intelligence layer, these environments are configured to adapt around posture, support needs, and long-journey comfort in real time.
                </p>

                <div className="premium-insight-strip premium-insight-strip-matches">
                  <span>Seated posture fit</span>
                  <span>Interior adaptation</span>
                  <span>Long-journey comfort logic</span>
                </div>

                <div className="match-list">
                  {vehicleMatches.map((match, index) => (
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
                          <span>Comfort Profile</span>
                          <strong>{match.fitProfile}</strong>
                        </div>
                        <div className="passport-row">
                          <span>Comfort Signal</span>
                          <strong>{match.fitReason}</strong>
                        </div>
                        <div className="passport-row">
                          <span>System Sync</span>
                          <strong>{match.lastSync}</strong>
                        </div>
                      </div>

                      <div className="passport-card" style={{ marginTop: "12px" }}>
                        <div className="passport-row">
                          <span>Seat Depth</span>
                          <strong>{match.seatDepth}</strong>
                        </div>
                        <div className="passport-row">
                          <span>Lumbar</span>
                          <strong>{match.lumbar}</strong>
                        </div>
                        <div className="passport-row">
                          <span>Recline</span>
                          <strong>{match.recline}</strong>
                        </div>
                        <div className="passport-row">
                          <span>Headrest</span>
                          <strong>{match.headrest}</strong>
                        </div>
                      </div>

                      <div className="confidence-header" style={{ marginTop: "14px" }}>
                        <span>Comfort Confidence</span>
                        <strong>{match.confidence}%</strong>
                      </div>

                      {renderProgressBar(match.confidence)}

                      <button
                        className="ghost-button"
                        onClick={() => handleOpenLearningScreen(match)}
                      >
                        Record Comfort Outcome
                      </button>
                    </div>
                  ))}
                </div>

                <button className="primary-button" onClick={() => setStep(2)}>
                  Back to Comfort Profile
                </button>
              </div>
            </div>
          )}

          {step === 4 && selectedVehicle && (
            <div className="screen">
              {renderStepRail()}

              <div className="premium-ribbon">
                <span className="premium-ribbon-dot" />
                Learning loop · compounding comfort intelligence
              </div>

              <div className="hero-block hero-block-learning">
                <p className="eyebrow">SMARTERFIT × AUTOMOTIVE</p>
                <h1 className="hero-title hero-title-learning">Learning Loop</h1>
                <p className="hero-subtitle hero-subtitle-learning">
                  Every comfort outcome strengthens the system, improving how future environments adapt to posture, support needs, and journey preferences.
                </p>
              </div>

              <div className="glass-panel">
                <p className="section-label">COMFORT LEARNING SYSTEM</p>

                <div className="learning-card">
                  <div className="learning-row">
                    <span>Vehicle</span>
                    <strong>
                      {selectedVehicle.brand} {selectedVehicle.model}
                    </strong>
                  </div>
                  <div className="learning-row">
                    <span>Starting Confidence</span>
                    <strong>{selectedVehicle.confidence}%</strong>
                  </div>
                  <div className="learning-row">
                    <span>Comfort Profile</span>
                    <strong>{selectedVehicle.fitProfile}</strong>
                  </div>
                  <div className="learning-row">
                    <span>Adjustment Path</span>
                    <strong>{selectedVehicle.fitReason}</strong>
                  </div>
                </div>
                <div className="premium-insight-strip" style={{ marginTop: "10px" }}>
  <span>Adaptive seat geometry</span>
  <span>Posture-aligned support</span>
</div>

                <div className="feedback-section">
                  <h2 className="panel-title smaller">How did it feel?</h2>

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
                    Update Comfort Layer
                  </button>
                </div>

                {learningUpdated && (
                  <div className="update-panel">
                    <div className="update-badge">SYSTEM UPDATED</div>

                    <div className="update-stats">
                      <div className="update-stat-card">
                        <span>Previous</span>
                        <strong>{selectedVehicle.confidence}%</strong>
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
                        <strong>Integrated into comfort layer</strong>
                      </div>
                    </div>

                    <div className="learning-message">{getLearningMessage()}</div>

                    <div className="system-note">
                      The system continuously refines how environments adapt around the human body — compounding intelligence across posture, support, and real-world comfort outcomes.
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
                        setSelectedVehicle(null);
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