"use client";

interface WelcomeScreenProps {
  totalTopics: number;
  onStart: () => void;
}

export default function WelcomeScreen({ totalTopics, onStart }: WelcomeScreenProps) {
  const features = [
    { icon: "📅", label: "30-Day Plan", desc: "One topic a day, 10–15 mins, done in a month" },
    { icon: "🧱", label: "Foundations", desc: "Compounding, risk, goals & net worth" },
    { icon: "🏦", label: "Safe Savings", desc: "FD, PPF, EPF, NPS & more" },
    { icon: "📈", label: "Stock Market", desc: "Stocks, IPOs & fundamental analysis" },
    { icon: "💼", label: "Mutual Funds", desc: "SIP, index funds, ELSS & asset allocation" },
    { icon: "🧠", label: "Advanced", desc: "Tax, REITs, behavioral biases & philosophy" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <div className="text-6xl mb-4">💰</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        Welcome to <span style={{ color: "#1D9E75" }}>Daily Compounding</span>
      </h1>
      <p className="text-gray-500 text-lg mb-10 leading-relaxed">
        10–15 minutes a day. 30 days. Go from financial beginner to confident investor —
        with no jargon, no noise, and no cost.
      </p>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-left">
        {features.map((f) => (
          <div
            key={f.label}
            className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
          >
            <span className="text-2xl">{f.icon}</span>
            <div>
              <div className="font-semibold text-gray-800 text-sm">{f.label}</div>
              <div className="text-gray-500 text-xs mt-0.5">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={onStart}
          className="px-8 py-3.5 rounded-xl text-white font-semibold text-base transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "#1D9E75" }}
        >
          Start Day 1 →
        </button>
        <p className="text-gray-400 text-xs">
          30-day plan · {totalTopics} total topics · Progress saved · Free forever
        </p>
      </div>

      {/* Disclaimer */}
      <p className="mt-10 text-xs text-gray-400 leading-relaxed max-w-md mx-auto">
        <span className="font-semibold text-gray-500">Disclaimer:</span> Daily Compounding is for educational purposes only. Nothing on this site constitutes financial advice. Please consult a SEBI-registered investment advisor before making any investment decisions.
      </p>
    </div>
  );
}
