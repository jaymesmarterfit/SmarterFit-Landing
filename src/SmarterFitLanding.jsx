import React, { useState } from "react";
import CreateFitPassport from "./CreateFitPassport";
import CreateFitPassportPilot from "./CreateFitPassport_PILOT";

export default function SmarterFitLanding() {
  const [email, setEmail] = useState("");
  const [demoMode, setDemoMode] = useState("master");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for joining the waitlist, ${email}!`);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white px-4 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <img
          src="/SmarterFit_Logo_Final.png"
          alt="SmarterFit Logo"
          className="mx-auto mb-6 w-48"
        />

        <h1 className="text-center text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
          Never Return Clothes Again
        </h1>

        <p className="mt-4 max-w-3xl text-center text-lg text-gray-600 md:text-xl">
          SmarterFit scans your body with your phone and predicts the right size
          across every brand — improving confidence at checkout and reducing
          returns.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-72 rounded-2xl border border-gray-200 px-4 py-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white shadow transition duration-200 hover:bg-blue-700"
          >
            Join the Waitlist
          </button>
        </form>

        <div className="mt-16 w-full max-w-6xl">
          <div className="mx-auto mb-8 max-w-4xl rounded-[32px] border border-gray-200 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
                  Demo Control Center
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
                  SmarterFit Interactive Demo
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-gray-600 md:text-base">
                  Switch between the core product demo and the retailer-tailored
                  pilot version without changing the underlying experience.
                </p>
              </div>

              <div className="inline-flex rounded-full border border-gray-200 bg-gray-50 p-1.5 shadow-inner">
                <button
                  onClick={() => setDemoMode("master")}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    demoMode === "master"
                      ? "bg-white text-gray-900 shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Master Demo
                </button>

                <button
                  onClick={() => setDemoMode("pilot")}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    demoMode === "pilot"
                      ? "bg-white text-gray-900 shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Culture Kings Pilot
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Current Mode
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {demoMode === "master"
                    ? "Master Demo Active"
                    : "Culture Kings Pilot Active"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Audience
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {demoMode === "master"
                    ? "General / Investor / Product"
                    : "Retail Pilot / Buyer / Ecommerce Team"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Focus
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {demoMode === "master"
                    ? "Platform story + product vision"
                    : "Conversion + returns + pilot value"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            {demoMode === "master" ? (
              <CreateFitPassport />
            ) : (
              <CreateFitPassportPilot />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}