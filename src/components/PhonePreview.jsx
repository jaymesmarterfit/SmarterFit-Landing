/* eslint-disable */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";

import ChromeBezel from "./ChromeBezel";
import animationData from "../assets/Hscan.json";
import UnicornSilhouette from "../assets/unicorn.png";

const PhonePreview = ({ triggerScan }) => {
  const [scanning, setScanning] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (triggerScan) startScan();
  }, [triggerScan]);

  const startScan = () => {
    setScanning(true);
    setComplete(false);

    // duration now matches the smoother beam + FX cycle
    setTimeout(() => {
      setScanning(false);
      setComplete(true);

      // hide checkmark after 1.5s
      setTimeout(() => setComplete(false), 1500);
    }, 3800); // slower + more cinematic
  };

  return (
    <div className="phone-preview-wrapper">
      <ChromeBezel>
        <div className={`scan-screen ${scanning ? "scanning" : ""}`}>

          {/* BACKDROP */}
          <div className="scan-bg" />

          {/* UNICORN SILHOUETTE */}
          <img
            src={UnicornSilhouette}
            alt="unicorn"
            className={`unicorn-silhouette ${scanning ? "active" : ""}`}
          />

          {/* SCAN BEAM */}
          <div className={`scan-beam ${scanning ? "active" : ""}`} />

          {/* LOTTIE ANIMATION */}
          <AnimatePresence>
            {scanning && (
              <motion.div
                className="scan-lottie"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Lottie animationData={animationData} loop={false} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* HALO */}
          <div className={`scan-halo ${scanning ? "active" : ""}`} />

          {/* COMPLETE CHECKMARK */}
          {complete && <div className="scan-complete">✓</div>}
        </div>
      </ChromeBezel>
    </div>
  );
};

export default PhonePreview;
































