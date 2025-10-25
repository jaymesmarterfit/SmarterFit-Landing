/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        heartbeat: {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 20px rgba(168,85,247,0.6)",
          },
          "50%": {
            transform: "scale(1.05)",
            boxShadow: "0 0 35px rgba(20,184,166,0.8)",
          },
        },
      },
      animation: {
        heartbeat: "heartbeat 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};




