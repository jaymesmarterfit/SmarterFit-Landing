import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import humanScan from "../assets/Hscan.json";
import scanSound from "../assets/scan.mp3";

const ScanAnimation = () => {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    const sound = new Audio(scanSound);
    sound.play().catch(() => {
      console.warn("Autoplay blocked. User interaction required.");
    });
    setStarted(true);
  };

  useEffect(() => {
    // Optionally auto-trigger for debugging
    // handleStart();
  }, []);

  return (
    <motion.div
      onClick={!started ? handleStart : undefined}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(180deg, #0b0014 0%, #19002a 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: !started ? "pointer" : "default",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: started ? [0, 1, 1, 0] : 0 }}
        transition={{
          times: [0, 0.2, 0.8, 1],
          duration: 4.5,
          ease: "easeInOut",
        }}
        style={{
          width: "100%",
          maxWidth: "420px",
          filter: "drop-shadow(0 0 20px #00ffff88)",
        }}
      >
        <Lottie
          animationData={humanScan}
          loop={false}
          autoplay={started}
          style={{ width: "100%", height: "auto" }}
        />
      </motion.div>

      {!started && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            position: "absolute",
            bottom: "15%",
            color: "#00ffffaa",
            fontSize: "1.1rem",
            letterSpacing: "1px",
          }}
        >
          Tap to start scan
        </motion.div>
      )}
    </motion.div>
  );
};

export default ScanAnimation;

