"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ProgressBar from "./ProgressBar";
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
}

const STORAGE_KEY = "paisa-padho-completed";

export default function AppShell({ sections, days }: AppShellProps) {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
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

  const handleStart = () => {
    const firstId = days[0]?.topicId;
    if (firstId) setActiveTopic(firstId);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeTopic) return;
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      // Don't hijack arrow keys when user is typing
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      const currentIdx = days.findIndex((d) => d.topicId === activeTopic);
      if (currentIdx === -1) return;
      const nextIdx = e.key === "ArrowDown" ? currentIdx + 1 : currentIdx - 1;
      const next = days[nextIdx];
      if (next) setActiveTopic(next.topicId);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTopic, days]);

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

  const activeDay = days.find((d) => d.topicId === activeTopic)?.day ?? null;
  const progressCompleted = days.filter((d) => completedTopics.has(d.topicId)).length;

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        sections={sections}
        days={days}
        activeTopic={activeTopic}
        completedTopics={completedTopics}
        onSelectTopic={setActiveTopic}
      />

      <div className="flex flex-col flex-1 overflow-hidden" style={{ marginLeft: "280px" }}>
        <ProgressBar completed={progressCompleted} total={30} label="days" />

        <main className="flex-1 overflow-y-auto">
          {!activeTopic || !activeTopicData ? (
            <WelcomeScreen totalTopics={allTopics.length} onStart={handleStart} />
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
  );
}
