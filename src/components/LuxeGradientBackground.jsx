import React from "react";

const LuxeGradientBackground = () => {
  return (
    <div
      className="fixed inset-0 -z-10 animate-gradientMove pointer-events-none"
      style={{
        background:
          "linear-gradient(135deg, rgba(93,63,211,0.4), rgba(58,249,214,0.3), rgba(147,51,234,0.5))",
        backgroundSize: "400% 400%",
        filter: "blur(120px) brightness(1.05)",
      }}
    />
  );
};

export default LuxeGradientBackground;
