"use client";

import { useEffect, useRef } from "react";

interface Topic {
  id: string;
  title: string;
}

interface Section {
  id: string;
  title: string;
  icon: string;
  topics: Topic[];
}

interface Day {
  day: number;
  topicId: string;
}

interface SidebarProps {
  sections: Section[];
  days: Day[];
  activeTopic: string | null;
  completedTopics: Set<string>;
  onSelectTopic: (topicId: string) => void;
  onHome: () => void;
}

export default function Sidebar({
  sections,
  days,
  activeTopic,
  completedTopics,
  onSelectTopic,
  onHome,
}: SidebarProps) {
  const topicMap: Record<string, string> = {};
  for (const section of sections) {
    for (const topic of section.topics) {
      topicMap[topic.id] = topic.title;
    }
  }

  const daysCompleted = days.filter((d) => completedTopics.has(d.topicId)).length;

  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (activeTopic && itemRefs.current[activeTopic]) {
      itemRefs.current[activeTopic]!.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeTopic]);

  return (
    <aside
      className="fixed top-0 left-0 h-full overflow-y-auto flex flex-col"
      style={{
        width: "280px",
        background: "linear-gradient(160deg, #0d3a1e 0%, #1a6b3a 50%, #0d4a2a 100%)",
      }}
    >
      {/* Brand */}
      <button
        onClick={onHome}
        className="px-5 py-4 border-b border-white/10 text-left w-full transition-opacity hover:opacity-80"
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">Daily Compounding</h1>
            <p className="text-emerald-300 text-xs">Learn investing — 30 days at a time</p>
          </div>
        </div>
      </button>

      {/* Day list */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="flex items-center justify-between px-1 mb-3">
          <span className="text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            Your Journey
          </span>
          <span className="text-emerald-400 text-xs font-medium">
            {daysCompleted}/30 days
          </span>
        </div>

        <div className="space-y-0.5">
          {days.map(({ day, topicId }) => {
            const isActive = activeTopic === topicId;
            const isDone = completedTopics.has(topicId);
            const fullTitle = topicMap[topicId] ?? topicId;
            const colonIdx = fullTitle.indexOf(":");

            // Manual splits for titles without a colon
            const manualSplits: Record<string, [string, string]> = {
              "Time value of money and the magic of compounding": ["Time value of money", "and the magic of compounding"],
              "Life stages and how your investment strategy should evolve": ["Life stages", "how your strategy should evolve"],
              "Savings account optimization and auto-sweep facilities": ["Savings account optimisation", "and auto-sweep facilities"],
              "Common mistakes Indian retail investors make": ["Common mistakes", "Indian retail investors make"],
              "How to build and stick to an investment policy statement (IPS)": ["Investment policy statement", "how to build and stick to it"],
            };

            let headline: string;
            let subtitle: string | null;

            if (colonIdx !== -1) {
              headline = fullTitle.slice(0, colonIdx).trim();
              subtitle = fullTitle.slice(colonIdx + 1).trim();
            } else if (manualSplits[fullTitle]) {
              [headline, subtitle] = manualSplits[fullTitle];
            } else {
              headline = fullTitle;
              subtitle = null;
            }

            return (
              <button
                key={day}
                ref={(el) => { itemRefs.current[topicId] = el; }}
                onClick={() => onSelectTopic(topicId)}
                className="w-full text-left px-2 py-2.5 rounded-lg flex items-center gap-3 transition-all duration-150 group"
                style={{
                  backgroundColor: isActive ? "rgba(29,158,117,0.35)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all"
                  style={{
                    backgroundColor: isDone
                      ? "#1D9E75"
                      : isActive
                      ? "rgba(255,255,255,0.18)"
                      : "rgba(255,255,255,0.08)",
                    color: isDone || isActive ? "#fff" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {isDone ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    day
                  )}
                </span>

                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-sm font-semibold leading-snug transition-colors ${
                      isActive
                        ? "text-white"
                        : isDone
                        ? "text-emerald-300"
                        : "text-white/80 group-hover:text-white"
                    }`}
                  >
                    {headline}
                  </span>
                  {subtitle && (
                    <span
                      className={`text-xs leading-snug transition-colors ${
                        isActive
                          ? "text-white/70"
                          : isDone
                          ? "text-emerald-400/70"
                          : "text-white/40 group-hover:text-white/60"
                      }`}
                    >
                      {subtitle}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-emerald-400/60 text-xs text-center mb-2">
          Daily Compounding · Built for India
        </p>
        <p className="text-white/25 text-xs text-center leading-snug">
          For educational purposes only. Not financial advice. Consult a SEBI-registered advisor before investing.
        </p>
      </div>
    </aside>
  );
}
