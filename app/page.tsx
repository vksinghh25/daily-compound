import topicsData from "@/data/topics.json";
import AppShell from "@/components/AppShell";

export default function Home() {
  return (
    <AppShell
      sections={topicsData.sections}
      days={topicsData.days}
      daysIntermediate={topicsData.daysIntermediate}
      daysAdvanced={topicsData.daysAdvanced}
    />
  );
}
