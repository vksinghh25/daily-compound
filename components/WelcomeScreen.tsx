"use client";

interface WelcomeScreenProps {
  totalTopics: number;
  completedCount: number;
  onStart: () => void;
}

export default function WelcomeScreen({ totalTopics, completedCount, onStart }: WelcomeScreenProps) {
  const foundationProgress = Math.round((completedCount / 30) * 100);
  const hasStarted = completedCount > 0;

  return (
    <div className="max-w-3xl mx-auto px-6 py-14">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">🗓️</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Welcome to <span style={{ color: "#1D9E75" }}>Daily Compounding</span>
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Choose your learning path. 10–15 minutes a day is all it takes.
        </p>
      </div>

      {/* Course cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">

        {/* Foundation */}
        <div className="rounded-2xl border-2 flex flex-col overflow-hidden" style={{ borderColor: "#1D9E75" }}>
          <div className="px-5 py-4 flex-1" style={{ backgroundColor: "#f0faf6" }}>
            <span className="text-3xl mb-3 block">🧱</span>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Foundation</h2>
            <p className="text-gray-500 text-sm leading-snug mb-4">
              Start here. Compounding, savings, mutual funds, stocks, and tax — everything a confident investor needs to know.
            </p>
            <div className="text-xs text-gray-400 mb-1 flex justify-between">
              <span>{completedCount} / 30 days completed</span>
              <span>{foundationProgress}%</span>
            </div>
            <div className="w-full bg-white rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${foundationProgress}%`, backgroundColor: "#1D9E75" }}
              />
            </div>
          </div>
          <button
            onClick={onStart}
            className="w-full py-3 text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "#1D9E75" }}
          >
            {hasStarted ? "Continue →" : "Start Learning →"}
          </button>
        </div>

        {/* Intermediate */}
        <div className="rounded-2xl border-2 border-gray-200 flex flex-col overflow-hidden opacity-60">
          <div className="px-5 py-4 flex-1 bg-gray-50">
            <span className="text-3xl mb-3 block">📈</span>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Intermediate</h2>
            <p className="text-gray-500 text-sm leading-snug mb-4">
              Go deeper — stocks, bonds, portfolio construction, tax optimisation, and smarter investing strategies.
            </p>
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-200 text-gray-500">
              Coming Soon
            </span>
          </div>
          <div className="w-full py-3 bg-gray-200 text-gray-400 font-semibold text-sm text-center">
            Coming Soon
          </div>
        </div>

        {/* Advanced */}
        <div className="rounded-2xl border-2 border-gray-200 flex flex-col overflow-hidden opacity-60">
          <div className="px-5 py-4 flex-1 bg-gray-50">
            <span className="text-3xl mb-3 block">🧠</span>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Advanced</h2>
            <p className="text-gray-500 text-sm leading-snug mb-4">
              Master alternative investments, REITs, PMS, behavioral finance, and building a philosophy for life.
            </p>
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-200 text-gray-500">
              Coming Soon
            </span>
          </div>
          <div className="w-full py-3 bg-gray-200 text-gray-400 font-semibold text-sm text-center">
            Coming Soon
          </div>
        </div>

      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 leading-relaxed text-center max-w-xl mx-auto">
        <span className="font-semibold text-gray-500">Disclaimer:</span> Daily Compounding is for educational purposes only. Nothing on this site constitutes financial advice. Please consult a SEBI-registered investment advisor before making any investment decisions.
      </p>
    </div>
  );
}
