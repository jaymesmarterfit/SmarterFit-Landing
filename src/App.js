import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const BASE_ID = "appbx3tui8XAFhJNg";
    const API_KEY = "patc1ACSIw5rXFO9M.c0bef1924a2ec41354253fd2758f3fca439bdfb4d6df033afbf3d16da92208fb";

    const res = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/Waitlist`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Email: email,
          },
        }),
      }
    );

    if (res.ok) {
      setSubmitted(true);
  setEmail("");
} else {
  const errorText = await res.text();
  console.error(errorText);
  alert("Error: " + errorText);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">SmarterFit</h1>
        <p className="text-gray-600 mb-6">
          Join the waitlist and be the first to try smarter online sizing.
        </p>

        {submitted ? (
          <p className="text-green-600 font-medium">
            🎉 Thanks! You’re on the list.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Join Waitlist
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

