import React, { useState } from "react";

export default function SmarterFitLanding() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for joining the waitlist, ${email}!`);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <img
        src="/SmarterFit_Logo_Final.png"
        alt="SmarterFit Logo"
        className="mx-auto mb-6 w-48"
      />

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
        Never Return Clothes Again
      </h1>

      {/* Tagline */}
      <p className="mt-4 text-lg md:text-xl text-gray-600">
        SmarterFit scans your body with your phone + tells you the exact size to order across every brand.
      </p>

      {/* Waitlist Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className="px-4 py-3 rounded-2xl border w-72 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-2xl shadow hover:bg-blue-700 transition duration-200"
        >
          Join the Waitlist
        </button>
      </form>
    </div>
  );
}
