import React, { useState, useEffect } from "react";
import PhonePreview from "./phonepreview.jsx";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [triggerScan, setTriggerScan] = useState(false);

  // Detect system color scheme (for future dark mode toggle)
  useEffect(() => {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(darkMode);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setTriggerScan(true);

    setTimeout(() => {
      setTriggerScan(false);
    }, 4000);
  };

  const handleLearnMore = () => {
    const features = document.getElementById("features");
    if (features) {
      features.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-teal-50 text-gray-800 relative overflow-x-hidden">
      {/* Main Card */}
      <div className="flex flex-col items-center p-8 bg-white/70 backdrop-blur-md shadow-xl rounded-3xl w-[90%] max-w-md mt-10">
        <img
          src="/SmarterFit_Logo_Full.png"
          alt="SmarterFit Logo"
          className="w-40 mb-6 drop-shadow-md"
        />

        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent mb-2">
          SmarterFit
        </h1>
        <p className="text-gray-500 mb-6">Smarter online sizing</p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-teal-400 text-white font-semibold py-3 rounded-lg hover:scale-[1.02] active:scale-95 transition-transform shadow-md"
          >
            {submitted ? "You're on the List!" : "Join the Waitlist"}
          </button>
        </form>

        {/* Only show phone preview when triggered */}
        {triggerScan && <PhonePreview triggerScan={triggerScan} />}

        <button
          onClick={handleLearnMore}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-teal-400 text-white rounded-lg shadow-md hover:scale-[1.03] transition-all"
        >
          Learn More ↓
        </button>
      </div>

      {/* Features Section */}
      <section id="features" className="mt-24 mb-20 w-[90%] max-w-5xl text-center">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-400 mb-10">
          Why SmarterFit?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Smart Sizing",
              desc: "Your body scan creates a personal ‘Fit Passport’ for perfect sizing across brands.",
            },
            {
              title: "Shop Confidently",
              desc: "No more guessing — know exactly what size to buy, every time.",
            },
            {
              title: "Fewer Returns",
              desc: "Cut returns in half with precision sizing that actually works.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-teal-400 animate-pulse" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;


