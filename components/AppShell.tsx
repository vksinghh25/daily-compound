"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopicContent from "./TopicContent";
import WelcomeScreen from "./WelcomeScreen";

interface TopicContentData {
  intro: string;
  keyPoints: string[];
  example: string;
  tip: string;
  funFact: string;
}

interface Topic {
  id: string;
  title: string;
  content: TopicContentData;
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

interface AppShellProps {
  sections: Section[];
  days: Day[];
  daysIntermediate: Day[];
  daysAdvanced: Day[];
}

const STORAGE_KEY = "paisa-padho-completed";

export default function AppShell({ sections, days, daysIntermediate, daysAdvanced }: AppShellProps) {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [activeTrack, setActiveTrack] = useState<"foundation" | "intermediate" | "advanced" | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCompletedTopics(new Set(JSON.parse(stored) as string[]));
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedTopics]));
    } catch { /* ignore */ }
  }, [completedTopics, hydrated]);

  const allTopics = sections.flatMap((s) => s.topics);

  // The active days array depends on which track is selected
  const activeDays = activeTrack === "intermediate" ? daysIntermediate : activeTrack === "advanced" ? daysAdvanced : days;

  const handleSelectTrack = (track: "foundation" | "intermediate" | "advanced") => {
    setActiveTrack(track);
    const trackDays = track === "intermediate" ? daysIntermediate : track === "advanced" ? daysAdvanced : days;
    const firstId = trackDays[0]?.topicId;
    if (firstId) setActiveTopic(firstId);
  };

  const handleMarkComplete = () => {
    if (!activeTopic) return;
    setCompletedTopics((prev) => new Set([...prev, activeTopic]));
  };

  const handleMarkIncomplete = () => {
    if (!activeTopic) return;
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      next.delete(activeTopic);
      return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeTopic) return;
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      const currentIdx = activeDays.findIndex((d) => d.topicId === activeTopic);
      if (currentIdx === -1) return;
      const nextIdx = e.key === "ArrowDown" ? currentIdx + 1 : currentIdx - 1;
      const next = activeDays[nextIdx];
      if (next) setActiveTopic(next.topicId);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTopic, activeDays]);

  // Resolve active topic data
  let activeTopicData: Topic | null = null;
  let activeSectionTitle = "";
  let activeSectionIcon = "";

  for (const section of sections) {
    const found = section.topics.find((t) => t.id === activeTopic);
    if (found) {
      activeTopicData = found;
      activeSectionTitle = section.title;
      activeSectionIcon = section.icon;
      break;
    }
  }

  const activeDay = activeDays.find((d) => d.topicId === activeTopic)?.day ?? null;
  const progressFoundation = days.filter((d) => completedTopics.has(d.topicId)).length;
  const progressIntermediate = daysIntermediate.filter((d) => completedTopics.has(d.topicId)).length;
  const progressAdvanced = daysAdvanced.filter((d) => completedTopics.has(d.topicId)).length;
  const progressCompleted = activeTrack === "intermediate" ? progressIntermediate : activeTrack === "advanced" ? progressAdvanced : progressFoundation;

  return (
    <>
      {/* Mobile banner */}
      <div className="md:hidden fixed inset-0 z-50 flex flex-col items-center justify-center px-8 text-center"
        style={{ background: "linear-gradient(160deg, #0d3a1e 0%, #1a6b3a 50%, #0d4a2a 100%)" }}>
        <span className="text-5xl mb-5">🗓️</span>
        <h1 className="text-white text-2xl font-bold mb-3">Daily Compounding</h1>
        <p className="text-emerald-200 text-base leading-relaxed mb-6">
          This is a desktop-only experience for now. For the best experience, please open this on your laptop or computer.
        </p>
        <p className="text-emerald-400/60 text-sm">Mobile version coming soon.</p>
      </div>

    <div className="flex h-screen bg-white">
      {activeTrack && (
        <Sidebar
          sections={sections}
          days={activeDays}
          activeTrack={activeTrack}
          activeTopic={activeTopic}
          completedTopics={completedTopics}
          onSelectTopic={setActiveTopic}
          onHome={() => { setActiveTopic(null); setActiveTrack(null); }}
        />
      )}

      <div className="flex flex-col flex-1 overflow-hidden" style={{ marginLeft: activeTrack ? "280px" : "0px" }}>
<main className="flex-1 overflow-y-auto">
          {!activeTopic || !activeTopicData ? (
            <WelcomeScreen
              totalTopics={allTopics.length}
              completedFoundation={progressFoundation}
              completedIntermediate={progressIntermediate}
              completedAdvanced={progressAdvanced}
              onSelectTrack={handleSelectTrack}
            />
          ) : (
            <TopicContent
              topic={activeTopicData}
              sectionTitle={activeSectionTitle}
              sectionIcon={activeSectionIcon}
              isCompleted={completedTopics.has(activeTopic)}
              onMarkComplete={handleMarkComplete}
              onMarkIncomplete={handleMarkIncomplete}
              dayNumber={activeDay}
            />
          )}
        </main>
      </div>
    </div>
    </>
  );
}
