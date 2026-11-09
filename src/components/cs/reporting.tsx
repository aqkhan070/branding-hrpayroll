import { motion } from "framer-motion";
import { useState } from "react";
import { Activity, AlertTriangle, CheckCircle2, Clock, Gauge, Receipt, TrendingDown, TrendingUp, Users, Wallet } from "lucide-react";
import { Eyebrow, Reveal } from "./primitives";
import { cn } from "@/lib/utils";

const tabs = [
  { k: "today", l: "Company today" },
  { k: "team", l: "Team performance" },
  { k: "exp", l: "Expenses" },
] as const;
type K = (typeof tabs)[number]["k"];

function Kpi({ icon: I, l, v, sub, pct }: { icon: typeof Users; l: string; v: string; sub: string; pct?: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{l}</p>
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary"><I className="h-3.5 w-3.5" /></span>
      </div>
      <p className="mt-1 text-2xl font-extrabold">{v}</p>
      {pct !== undefined && <div className="mt-2 h-1.5 rounded-full bg-muted"><motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.9 }} className="h-full rounded-full bg-primary" /></div>}
      <p className="mt-1.5 text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function Bars({ data, max }: { data: { l: string; a: number; b?: number }[]; max: number }) {
  return (
    <div className="flex h-40 items-end gap-3">
      {data.map((d, i) => (
        <div key={d.l} className="flex flex-1 flex-col items-center gap-1.5">
          <div className="flex h-32 w-full items-end justify-center gap-1">
            <motion.div initial={{ height: 0 }} animate={{ height: `${(d.a / max) * 100}%` }} transition={{ delay: i * 0.05 }} className="w-3 rounded-t bg-primary sm:w-4" />
            {d.b !== undefined && <motion.div initial={{ height: 0 }} animate={{ height: `${(d.b / max) * 100}%` }} transition={{ delay: i * 0.05 + 0.1 }} className="w-3 rounded-t bg-accent sm:w-4" />}
          </div>
          <span className="truncate text-[10px] text-muted-foreground">{d.l}</span>
        </div>
      ))}
    </div>
  );
}

function Today() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Kpi icon={Users} l="Employees" v="42" sub="5 departments · 38 in today" />
        <Kpi icon={CheckCircle2} l="Completion" v="72%" pct={72} sub="+8% vs last period" />
        <Kpi icon={Clock} l="On-time delivery" v="81%" pct={81} sub="Due-date tasks only" />
        <Kpi icon={Activity} l="Attendance" v="94.6%" pct={95} sub="Punctuality 88%" />
        <Kpi icon={Gauge} l="Hours logged" v="1,284h" sub="Timers + timesheets" />
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="font-bold">Attendance by week</p>
          <p className="mb-4 text-xs text-muted-foreground">On time vs late check-ins from Slack</p>
          <Bars max={200} data={[{ l: "W1", a: 168, b: 24 }, { l: "W2", a: 174, b: 19 }, { l: "W3", a: 160, b: 31 }, { l: "W4", a: 181, b: 14 }, { l: "W5", a: 185, b: 11 }]} />
          <div className="mt-2 flex gap-4 text-[11px] text-muted-foreground"><span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" />On time</span><span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-accent" />Late</span></div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="font-bold">Project delivery</p>
          <p className="mb-4 text-xs text-muted-foreground">Tasks done per active project</p>
          {[["DMV portal", 75, "At risk"], ["CPA platform", 58, "On track"], ["Dawlia Express", 67, "On track"], ["Earthco", 41, "On track"], ["Eazisols website", 90, "On track"]].map(([n, p, s]) => (
            <div key={n as string} className="mb-3">
              <div className="flex justify-between text-xs"><span className="font-semibold">{n}</span><span className={cn("rounded-full px-2 text-[10px] font-semibold", s === "At risk" ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success")}>{s}</span></div>
              <div className="mt-1 h-1.5 rounded-full bg-muted"><motion.div initial={{ width: 0 }} animate={{ width: `${p}%` }} className={cn("h-full rounded-full", s === "At risk" ? "bg-destructive" : "bg-primary")} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const ranking = [
  ["Hafiz Abdul Rehman", "SQA Engineer", 88, "Above"], ["Abdul Qadeer", "Team Lead", 84, "Above"], ["Hamza Younas", "Python Developer", 76, "Average"],
  ["Ayesha Khan", "Frontend Developer", 71, "Average"], ["Bilal Siddiqui", "Software Engineer", 54, "Below"],
] as const;

function Team() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi icon={Gauge} l="Average score" v="78.4" pct={78} sub="Policy v1 · weighted" />
        <Kpi icon={CheckCircle2} l="Task completion" v="74%" pct={74} sub="312 of 421 tasks" />
        <Kpi icon={TrendingUp} l="Improving" v="9" sub="+5 pts vs last month" />
        <Kpi icon={AlertTriangle} l="Overdue work" v="7" sub="Open tasks past due" />
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="font-bold">Employee ranking</p>
        <p className="mb-3 text-xs text-muted-foreground">Score = task completion, on-time delivery, quality, attendance and goals</p>
        <div className="space-y-2.5">
          {ranking.map(([n, r, s, b], i) => (
            <div key={n} className="grid grid-cols-[1fr_auto] items-center gap-3 sm:grid-cols-[200px_1fr_auto]">
              <div className="min-w-0"><p className="truncate text-sm font-semibold">{n}</p><p className="text-[11px] text-muted-foreground">{r}</p></div>
              <div className="hidden h-2 rounded-full bg-muted sm:block"><motion.div initial={{ width: 0 }} animate={{ width: `${s}%` }} transition={{ delay: i * 0.08 }} className={cn("h-full rounded-full", b === "Below" ? "bg-accent" : "bg-primary")} /></div>
              <span className="flex items-center gap-2 text-sm font-bold">{s}<span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", b === "Above" ? "bg-success/10 text-success" : b === "Below" ? "bg-accent/15 text-accent-foreground" : "bg-primary/10 text-primary")}>{b}</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Expenses() {
  const heads = [["Meals & entertainment", "PKR 38,200", -12], ["Utilities", "PKR 41,500", 4], ["Pantry supplies", "PKR 9,300", -18], ["Travel", "PKR 6,000", 22]] as const;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {heads.map(([h, v, c]) => (
          <div key={h} className="rounded-xl border border-border bg-card p-4">
            <p className="truncate text-xs text-muted-foreground">{h}</p>
            <p className="mt-1 text-lg font-extrabold">{v}</p>
            <p className={cn("flex items-center gap-1 text-[11px]", c < 0 ? "text-success" : "text-destructive")}>{c < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}{c > 0 ? "+" : ""}{c}% vs last month</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="font-bold">Monthly spend by head</p>
          <p className="mb-4 text-xs text-muted-foreground">PKR thousands · Sep vs Oct</p>
          <Bars max={60} data={[{ l: "Meals", a: 43, b: 38 }, { l: "Utilities", a: 40, b: 42 }, { l: "Pantry", a: 11, b: 9 }, { l: "Travel", a: 5, b: 6 }, { l: "Repairs", a: 8, b: 2 }]} />
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="mb-3 flex items-center gap-2 font-bold"><Receipt className="h-4 w-4 text-primary" />Cash book</p>
          {[["21 Oct", "Milk & eggs for pantry", "Pantry", "1,050"], ["20 Oct", "Team lunch, sprint close", "Meals", "6,400"], ["19 Oct", "Internet bill", "Utilities", "12,500"], ["18 Oct", "Careem to client office", "Travel", "1,200"]].map(([d, desc, h, a]) => (
            <div key={desc} className="flex items-center justify-between border-b border-border py-2 text-xs last:border-0">
              <span className="w-12 font-mono text-muted-foreground">{d}</span>
              <span className="flex-1 truncate font-medium">{desc}</span>
              <span className="hidden w-20 text-muted-foreground sm:block">{h}</span>
              <span className="w-16 text-right font-semibold">{a}</span>
            </div>
          ))}
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground"><Wallet className="h-3.5 w-3.5" />Cash in hand: PKR 4,250</p>
        </div>
      </div>
    </div>
  );
}

export function ReportingShowcase() {
  const [t, setT] = useState<K>("today");
  return (
    <section id="dashboards" className="scroll-mt-20 bg-muted py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Dashboards</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] sm:text-5xl">Every number, <span className="serif-em text-primary">one click away.</span></h2>
          <p className="mt-3 text-muted-foreground sm:text-lg">Company overview, team performance and office expenses, live from the same data.</p>
        </Reveal>
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-card p-1">
            {tabs.map((x) => (
              <button key={x.k} type="button" onClick={() => setT(x.k)} className={cn("rounded-full px-4 py-2 text-sm font-semibold transition", t === x.k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>{x.l}</button>
            ))}
          </div>
        </div>
        <Reveal className="mt-8">
          <motion.div key={t} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-border bg-background p-4 shadow-2xl sm:p-6">
            {t === "today" ? <Today /> : t === "team" ? <Team /> : <Expenses />}
          </motion.div>
        </Reveal>
        <p className="mt-4 text-center text-xs text-muted-foreground">Figures shown are illustrative.</p>
      </div>
    </section>
  );
}
