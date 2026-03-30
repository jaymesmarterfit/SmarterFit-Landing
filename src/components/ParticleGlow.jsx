import React, { useEffect, useRef } from "react";

const ParticleGlow = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const createParticles = () => {
      const count = Math.floor(window.innerWidth / 50);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 80 + 40,
          color: Math.random() > 0.5 ? "#9333ea" : "#14b8a6",
          alpha: Math.random() * 0.3 + 0.25,
          driftX: (Math.random() - 0.5) * 0.3,
          driftY: (Math.random() - 0.5) * 0.3,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };
    createParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.driftX;
        p.y += p.driftY;
        p.pulse += 0.01;

        // Bounce off edges
        if (p.x < -100) p.x = canvas.width + 50;
        if (p.x > canvas.width + 100) p.x = -50;
        if (p.y < -100) p.y = canvas.height + 50;
        if (p.y > canvas.height + 100) p.y = -50;

        const pulseAlpha = p.alpha * (0.8 + Math.sin(p.pulse) * 0.2);

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `${p.color}${Math.floor(pulseAlpha * 255).toString(16)}`);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{
        filter: "blur(80px)",
        opacity: 0.9,
        mixBlendMode: "screen",
      }}
    />
  );
};

export default ParticleGlow;





