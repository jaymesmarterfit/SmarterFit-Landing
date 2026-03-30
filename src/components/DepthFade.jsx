import React from "react";

const DepthFade = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        background: `
          radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.1) 0%, transparent 70%),
          linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.7) 100%)
        `,
        mixBlendMode: "soft-light",
      }}
    />
  );
};

export default DepthFade;
