import { createFileRoute } from "@tanstack/react-router";
import { Hero, Nav } from "@/components/cs/hero";
import { Workflow } from "@/components/cs/workflow";
import { InternalChat } from "@/components/cs/chat";
import { ReportingShowcase } from "@/components/cs/reporting";
import { AiWidget } from "@/components/cs/ai-widget";
import { Approvals, Invoicing, Notifications, SalesCommissions } from "@/components/cs/business";
import { Closing } from "@/components/cs/sections";
import { AllInOne, MilestonesTasks, Performance, SlackFlow } from "@/components/cs/landing";

const title = "Eazisols Workspace | HR, Slack & Projects in One Platform";
const description = "Payroll, attendance, leave, Slack and project management connected in one visual HR platform for tech companies.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Nav />
      <Hero />
      <AllInOne />
      <Workflow />
      <SlackFlow />
      <div className="dark bg-background text-foreground"><MilestonesTasks /></div>
      <InternalChat />
      <Notifications />
      <Performance />
      <div className="dark bg-background text-foreground"><ReportingShowcase /></div>
      <Invoicing />
      <div className="dark bg-background text-foreground"><SalesCommissions /></div>
      <Approvals />
      <Closing />
      <AiWidget />
    </main>
  );
}
