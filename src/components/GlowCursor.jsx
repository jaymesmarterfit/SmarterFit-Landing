import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const GlowCursor = () => {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMove = (e) => {
      const { clientX, clientY } = e;
      setTrail((prev) => [
        ...prev.slice(-12),
        { x: clientX, y: clientY, id: Math.random() },
      ]);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="glow-cursor">
      {trail.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.8, 0], scale: [1, 2] }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: p.y - 10,
            left: p.x - 10,
            width: 25,
            height: 25,
            borderRadius: "50%",
            background:
              i % 2 === 0
                ? "rgba(168, 85, 247, 0.6)" // purple
                : "rgba(45, 212, 191, 0.5)", // teal
            pointerEvents: "none",
            filter: "blur(10px)",
            zIndex: 999,
          }}
        />
      ))}
    </div>
  );
};

export default GlowCursor;
