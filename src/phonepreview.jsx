import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const PhonePreview = ({ triggerScan }) => {
  const [complete, setComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (triggerScan) {
      setComplete(false);
      setShowConfetti(false);

      const timer = setTimeout(() => {
        setComplete(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [triggerScan]);

  return (
    <motion.div
      className="relative mt-8 w-52 h-[280px] rounded-[40px] bg-black shadow-2xl flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {showConfetti && <Confetti width={250} height={300} recycle={false} numberOfPieces={150} />}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-500 to-teal-400 text-white p-6">
        <h2 className="text-xl font-semibold mb-2">SmarterFit</h2>
        <p className="text-sm mb-4">Digital Fit Passport</p>

        {complete ? (
          <>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse mb-2">
              <span className="text-lg">✅</span>
            </div>
            <p className="text-xs opacity-90">
              Body ID: <strong>SF-1028</strong>
            </p>
            <p className="text-xs opacity-80 mt-1">Scan completed successfully</p>
          </>
        ) : (
          <>
            <div className="w-10 h-10 border-4 border-white/50 border-t-white rounded-full animate-spin mb-3" />
            <p className="text-xs opacity-80">Scanning...</p>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default PhonePreview;



