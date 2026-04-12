"use client";

interface ComparisonSide {
  name: string;
  approach: string;
  startAmount: string;
  endAmount: string;
  duration: string;
  outcome: string;
  positive: boolean;
}

interface TopicContentData {
  heroStat?: string;
  heroLabel?: string;
  intro: string;
  keyPoints: string[];
  example: string;
  comparison?: {
    left: ComparisonSide;
    right: ComparisonSide;
  };
  tip: string;
  funFact: string;
  action?: string;
}

interface Topic {
  id: string;
  title: string;
  content: TopicContentData;
}

interface TopicContentProps {
  topic: Topic;
  sectionTitle: string;
  sectionIcon: string;
  isCompleted: boolean;
  onMarkComplete: () => void;
  onMarkIncomplete: () => void;
  dayNumber?: number | null;
}

export default function TopicContent({
  topic,
  sectionTitle,
  sectionIcon,
  isCompleted,
  onMarkComplete,
  onMarkIncomplete,
  dayNumber,
}: TopicContentProps) {
  const { content } = topic;
  const isEmpty = !content.intro && content.keyPoints.length === 0;

  return (
    <article className="max-w-4xl mx-auto px-6 py-8">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
        {dayNumber != null ? (
          <>
            <span className="px-2 py-0.5 rounded-md text-xs font-bold text-white" style={{ backgroundColor: "#1D9E75" }}>
              Day {dayNumber}
            </span>
            <span className="text-gray-300">·</span>
          </>
        ) : (
          <>
            <span>{sectionIcon}</span>
            <span>{sectionTitle}</span>
            <span className="text-gray-300">›</span>
          </>
        )}
        <span className="text-gray-600 font-medium">{topic.title}</span>
      </div>

      {/* Coming soon */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">🚧</span>
          <p className="text-gray-400 text-lg font-medium">Content coming soon</p>
          <p className="text-gray-300 text-sm mt-1">This topic is being written. Check back shortly.</p>
        </div>
      ) : (
        <>
          {/* Hero stat — only when present */}
          {content.heroStat && (
            <div
              className="rounded-2xl px-8 py-6 mb-8 flex items-center gap-6"
              style={{ background: "linear-gradient(135deg, #0d4a2a 0%, #1D9E75 100%)" }}
            >
              <div className="flex-shrink-0">
                <div className="text-6xl font-black text-white leading-none">{content.heroStat}</div>
              </div>
              <div className="w-px self-stretch bg-white/20" />
              <p className="text-blue-100 text-base leading-snug">{content.heroLabel}</p>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{topic.title}</h1>

          {/* Intro */}
          {content.intro && (
            <p className="text-gray-600 text-lg leading-relaxed mb-8 border-l-4 pl-4" style={{ borderColor: "#1D9E75" }}>
              {content.intro}
            </p>
          )}

          {/* The Essentials — 2-col card grid */}
          {content.keyPoints.length > 0 && (
            <section className="mb-8">
              <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wider mb-4">
                The Essentials
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {content.keyPoints.map((point, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50"
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-white font-bold mt-0.5"
                      style={{ backgroundColor: "#1D9E75" }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-gray-700 text-sm leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Comparison panels — replaces plain example box when present */}
          {content.comparison ? (
            <section className="mb-8">
              <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wider mb-4">
                See It In Action
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {/* Left — the "wrong" path */}
                <div className="rounded-2xl overflow-hidden border border-red-100">
                  <div className="bg-red-50 px-5 py-3 border-b border-red-100">
                    <p className="font-bold text-red-700 text-sm">{content.comparison.left.name}</p>
                    <p className="text-red-500 text-xs mt-0.5">{content.comparison.left.approach}</p>
                  </div>
                  <div className="px-5 py-4 bg-white">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs text-gray-400">Started with</span>
                      <span className="font-semibold text-gray-700 text-sm">{content.comparison.left.startAmount}</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-xs text-gray-400">After {content.comparison.left.duration}</span>
                      <span className="text-2xl font-black text-red-500">{content.comparison.left.endAmount}</span>
                    </div>
                    <div className="flex items-start gap-2 bg-red-50 rounded-lg px-3 py-2">
                      <span className="text-red-400 mt-0.5">✗</span>
                      <p className="text-xs text-red-600 leading-snug">{content.comparison.left.outcome}</p>
                    </div>
                  </div>
                </div>

                {/* Right — the "right" path */}
                <div className="rounded-2xl overflow-hidden border border-emerald-100">
                  <div className="px-5 py-3 border-b border-blue-100" style={{ backgroundColor: "#f0faf6" }}>
                    <p className="font-bold text-sm" style={{ color: "#1D9E75" }}>{content.comparison.right.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#3da876" }}>{content.comparison.right.approach}</p>
                  </div>
                  <div className="px-5 py-4 bg-white">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs text-gray-400">Started with</span>
                      <span className="font-semibold text-gray-700 text-sm">{content.comparison.right.startAmount}</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-xs text-gray-400">After {content.comparison.right.duration}</span>
                      <span className="text-2xl font-black" style={{ color: "#1D9E75" }}>{content.comparison.right.endAmount}</span>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: "#f0faf6" }}>
                      <span className="mt-0.5" style={{ color: "#1D9E75" }}>✓</span>
                      <p className="text-xs leading-snug" style={{ color: "#1a5c42" }}>{content.comparison.right.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : content.example ? (
            <section className="mb-8">
              <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Real-World Example
              </h2>
              <div className="rounded-xl p-5 bg-gray-50 border border-gray-200">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">{content.example}</p>
              </div>
            </section>
          ) : null}

          {/* Tip + Fun Fact side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {content.tip && (
              <div className="rounded-xl p-5 flex gap-3" style={{ backgroundColor: "#f0faf6", border: "1px solid #b2e5d2" }}>
                <span className="text-xl flex-shrink-0">💡</span>
                <div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: "#0f5c35" }}>Pro Tip</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#1a5c40" }}>{content.tip}</p>
                </div>
              </div>
            )}
            {content.funFact && (
              <div className="rounded-xl p-5 flex gap-3 bg-amber-50 border border-amber-200">
                <span className="text-xl flex-shrink-0">🇮🇳</span>
                <div>
                  <h3 className="font-semibold text-amber-800 text-sm mb-1">Did You Know?</h3>
                  <p className="text-xs text-amber-700 leading-relaxed">{content.funFact}</p>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Your Move */}
      {!isEmpty && content.action && (
        <div className="mb-8 rounded-2xl overflow-hidden border-2" style={{ borderColor: "#1D9E75" }}>
          <div className="px-5 py-3 flex items-center gap-2" style={{ backgroundColor: "#1D9E75" }}>
            <span className="text-white text-lg">✏️</span>
            <h2 className="text-white font-bold text-sm uppercase tracking-wider">Your Move</h2>
          </div>
          <div className="px-5 py-4 bg-white">
            <p className="text-gray-700 text-sm leading-relaxed">{content.action}</p>
          </div>
        </div>
      )}

      {/* Mark Complete */}
      {!isEmpty && (
        <div className="flex items-center gap-4">
          {!isCompleted ? (
            <button
              onClick={onMarkComplete}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "#1D9E75" }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Mark as Complete
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold" style={{ backgroundColor: "#e8f8f2", color: "#1D9E75" }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Completed!
              </div>
              <button onClick={onMarkIncomplete} className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2">
                Mark incomplete
              </button>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
