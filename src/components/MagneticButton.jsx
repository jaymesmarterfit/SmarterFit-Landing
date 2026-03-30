import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function MagneticButton({
  children,
  className = "",
  onClick,
  as = "div",
  ...rest
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const dampen = 22; // lower = stronger pull
  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX / dampen);
    y.set(relY / dampen);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const Comp = as === "button" ? motion.button : motion.div;

  return (
    <Comp
      className={className}
      style={{ x, y }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Comp>
  );
}
