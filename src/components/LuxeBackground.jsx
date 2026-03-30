import React from "react";
import stars from "../assets/stars.png";

const LuxeBackground = () => {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: `radial-gradient(circle at 50% 40%, rgba(35, 10, 60, 0.95) 0%, rgba(10, 5, 20, 1) 80%), url(${stars})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(10px) brightness(1.1) saturate(1.2)",
        transform: "scale(1.05)",
        opacity: 0.85,
      }}
    />
  );
};

export default LuxeBackground;

