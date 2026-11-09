import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle2, ClipboardList, FileSpreadsheet, KanbanSquare, MessageSquare, Shield, Timer, Wallet } from "lucide-react";
import { Eyebrow, Pill } from "./primitives";
import { cn } from "@/lib/utils";

const steps = [
  { i: MessageSquare, time: "09:51", t: "Ayesha checks in on Slack", d: "She types \"checking in\" in #attendance. Her arrival time is saved instantly. Nobody fills a register.", sys: ["Slack", "Attendance"], effect: ["Check-in", "09:51"] },
  { i: Shield, time: "09:51", t: "The system spots she is late", d: "Office starts at 09:15. She is 36 minutes late and it is her 3rd late this month, so company policy counts it as 0.75 day.", sys: ["Policy", "Attendance"], effect: ["Late mark", "0.75 day"] },
  { i: CalendarDays, time: "09:52", t: "Leave balance updates", d: "0.75 day is taken from her casual leave, 10.00 becomes 9.25. HR can waive it with one click, and the change is logged.", sys: ["Leave", "HR"], effect: ["Casual leave", "9.25 left"] },
  { i: KanbanSquare, time: "10:30", t: "She starts her ticket", d: "She moves EAZ-148 to In progress. A timer starts on its own, so her hours are tracked without a timesheet.", sys: ["Projects", "Tasks"], effect: ["Hours today", "6.5h"] },
  { i: ClipboardList, time: "17:45", t: "Her daily report writes itself", d: "Hours, finished work and blockers are collected into a daily report and shared with her lead and the client.", sys: ["Reports", "Internal chat"], effect: ["Report", "Sent"] },
  { i: FileSpreadsheet, time: "30 Nov", t: "Payroll uses all of it", d: "At month end, attendance, leave and loan instalments are already in payroll. No spreadsheet is rebuilt.", sys: ["Payroll"], effect: ["Salary", "Calculated"] },
  { i: Wallet, time: "30 Nov", t: "Payslip and bank letter", d: "Her payslip is ready: PKR 87,000 net, 80% to bank and 20% cash. The bank transfer letter is generated too.", sys: ["Payroll", "Bank"], effect: ["Net pay", "PKR 87,000"] },
];

function Visual({ step }: { step: number }) {
  const common = "rounded-[24px] border border-ink-foreground/10 bg-ink-foreground/5 p-6 text-ink-foreground backdrop-blur";
  const views = [
    <div className={common}>
      <p className="font-mono text-xs text-ink-foreground/50"># attendance</p>
      <div className="mt-4 flex gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-sm font-bold text-accent-foreground">AK</span>
        <div><p className="text-sm font-bold">Ayesha Khan <span className="font-mono text-xs font-normal text-ink-foreground/50">09:51</span></p><p className="mt-1">Checking in 👋</p></div>
      </div>
      <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.2 }} className="mt-6 h-1 rounded-full bg-accent" />
      <p className="mt-2 font-mono text-[11px] text-ink-foreground/60">Saved to Attendance · Ayesha Khan · 09:51</p>
      <div className="mt-3 flex gap-2"><Pill tone="green">Present</Pill><Pill tone="amber">After 09:15</Pill></div>
    </div>,
    <div className={common}>
      <p className="text-sm font-bold">Policy classifier · Ayesha Khan</p>
      {["Office start 09:15, arrived 09:51", "Late 36 minutes", "3rd late this month"].map((r, i) => (
        <motion.div key={r} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.2 }} className="mt-3 flex items-center justify-between rounded-xl bg-ink-foreground/5 px-3 py-2 text-sm">
          {r}<span className="text-accent">✓</span>
        </motion.div>
      ))}
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8, type: "spring" }} className="mt-5 inline-block rounded-full bg-accent px-4 py-2 font-bold text-accent-foreground">→ 0.75 day</motion.div>
    </div>,
    <div className={common}>
      <p className="text-sm font-bold">Leave ledger · Ayesha Khan</p>
      {[["Opening balance", "10.00"], ["Late penalty (casual)", "−0.75"], ["Closing balance", "9.25"]].map(([k, v], i) => (
        <motion.div key={k} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.2 }} className={cn("mt-3 flex justify-between border-b border-ink-foreground/10 pb-2 text-sm tabular-nums", i === 2 && "border-0 font-bold")}>
          <span>{k}</span><span className={i === 1 ? "text-accent" : ""}>{v}</span>
        </motion.div>
      ))}
      <div className="mt-4 flex gap-2"><Pill tone="amber">Deducted</Pill><Pill tone="gray">HR can waive</Pill></div>
    </div>,
    <div className={common}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">M2 · Build board</p>
        <span className="flex items-center gap-1 font-mono text-xs text-accent"><Timer className="h-3.5 w-3.5" />3h 12m</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[["To do", "EAZ-142"], ["In progress", "EAZ-148"], ["Done", "EAZ-128"]].map(([c, t], i) => (
          <div key={c} className="rounded-lg bg-ink-foreground/5 p-2">
            <p className="font-mono text-[9px] uppercase text-ink-foreground/50">{c}</p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.18 }} className={cn("mt-1.5 rounded-md bg-card p-1.5 text-[10px] font-semibold text-foreground shadow-soft", i === 1 && "ring-1 ring-accent")}>
              {t}
              <span className="mt-1 block font-mono text-[8px] font-normal text-muted-foreground">{i === 1 ? "Ayesha Khan · 3/6" : "2/4"}</span>
            </motion.div>
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono text-[11px] text-ink-foreground/60">Timer running since 10:30</p>
    </div>,
    <div className={common}>
      <p className="text-sm font-bold">Daily report · Ayesha Khan</p>
      {[["Logged", "7.0 hrs"], ["Billable", "6.5 hrs"], ["Blockers", "1"]].map(([k, v], i) => (
        <motion.div key={k} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.18 }} className="mt-3 flex items-center justify-between rounded-xl bg-ink-foreground/5 px-3 py-2 text-sm">
          <span className="text-ink-foreground/70">{k}</span><span className="font-bold tabular-nums">{v}</span>
        </motion.div>
      ))}
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-ink-foreground/10 bg-ink-foreground/5 px-3 py-2 text-xs">
        <MessageSquare className="h-3.5 w-3.5 text-accent" />
        <span className="text-ink-foreground/70">Shared with lead and client</span>
        <CheckCircle2 className="ml-auto h-4 w-4 text-success" />
      </div>
    </div>,
    <div className={common}>
      <p className="text-sm font-bold">November payroll run</p>
      {[["Attendance (21 days)", "added"], ["Late marks (0.75 day)", "added"], ["Loan instalment", "added"]].map(([n, s], i) => (
        <div key={n} className="mt-3">
          <div className="flex justify-between text-xs"><span>{n}</span><span className="text-ink-foreground/50">{s}</span></div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink-foreground/10">
            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: i * 0.25, duration: 0.9 }} className={cn("h-full rounded-full", i === 1 ? "bg-accent" : "bg-primary-glow")} />
          </div>
        </div>
      ))}
      <div className="mt-4 flex gap-2"><Pill tone="indigo">Ayesha Khan</Pill><Pill tone="green">Ready to pay</Pill></div>
    </div>,
    <div className="rounded-[24px] bg-card p-6 text-foreground shadow-float">
      <div className="flex justify-between"><p className="font-bold">Payslip · November</p><span className="font-mono text-xs text-muted-foreground">Ayesha Khan</span></div>
      <motion.p initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="mt-4 text-4xl font-extrabold text-primary tabular-nums">87,000</motion.p>
      <p className="text-xs text-muted-foreground">Net pay PKR · illustrative</p>
      <div className="mt-4 flex flex-wrap gap-2"><Pill tone="indigo">Bank · 80%</Pill><Pill tone="amber">Cash · 20%</Pill><Pill tone="green">Transfer letter generated</Pill></div>
    </div>,
  ];
  return (
    <AnimatePresence mode="wait">
      <motion.div key={step} initial={{ opacity: 0, y: 40, rotateX: 12, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -40, filter: "blur(8px)" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        {views[step]}
      </motion.div>
    </AnimatePresence>
  );
}

export function Workflow() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % steps.length), 4500);
    return () => clearTimeout(t);
  }, [step, paused]);
  const cur = steps[step] ?? steps[0]!;

  return (
    <section id="workflow" className="relative scroll-mt-16 overflow-hidden bg-ink px-4 py-24 sm:px-6">
      <div aria-hidden className="absolute left-1/2 top-0 h-80 w-[700px] max-w-full -translate-x-1/2 rounded-full bg-primary/40 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow dark>The workflow</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] text-ink-foreground sm:text-5xl">One check-in. <span className="serif-em text-accent">Her whole month</span> updates.</h2>
          <p className="mt-3 text-ink-foreground/65">Follow Ayesha Khan, a frontend developer, from a late Slack check-in to her payslip. Every step happens on its own.</p>
        </div>

        <div className="mt-12 grid grid-cols-7 gap-1.5 sm:gap-3" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {steps.map((s, i) => (
            <button key={s.t} type="button" onClick={() => setStep(i)} aria-label={s.t} className="group text-left">
              <div className="h-1 overflow-hidden rounded-full bg-ink-foreground/10">
                {i < step && <div className="h-full w-full bg-accent" />}
                {i === step && <motion.div key={`${step}-${paused}`} initial={{ width: paused ? "100%" : 0 }} animate={{ width: "100%" }} transition={{ duration: paused ? 0 : 4.5, ease: "linear" }} className="h-full bg-accent" />}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors", i <= step ? "border-accent bg-accent text-accent-foreground" : "border-ink-foreground/20 text-ink-foreground/50 group-hover:text-ink-foreground")}>
                  <s.i className="h-4 w-4" />
                </span>
                <span className={cn("hidden text-xs font-semibold leading-tight lg:block", i === step ? "text-ink-foreground" : "text-ink-foreground/50")}>{s.t}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr_0.8fr]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }} className="flex flex-col justify-center">
              <p className="font-mono text-xs text-accent">Step 0{step + 1} of 0{steps.length} · {cur.time}</p>
              <h3 className="mt-2 text-2xl font-extrabold text-ink-foreground sm:text-3xl">{cur.t}</h3>
              <p className="mt-3 text-ink-foreground/70">{cur.d}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">{cur.sys.map((x) => <Pill key={x} tone="indigo">{x}</Pill>)}</div>
            </motion.div>
          </AnimatePresence>
          <div style={{ perspective: 1200 }}><Visual step={step} /></div>
          <div className="rounded-[24px] border border-ink-foreground/10 bg-ink-foreground/5 p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent font-bold text-accent-foreground">AK</span>
              <div><p className="font-bold text-ink-foreground">Ayesha Khan</p><p className="text-xs text-ink-foreground/55">Updated automatically</p></div>
            </div>
            <div className="mt-4 space-y-2">
              {steps.map((s, i) => (
                <div key={s.t} className={cn("flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all", i <= step ? "bg-ink-foreground/5 text-ink-foreground" : "text-ink-foreground/25")}>
                  <span>{s.effect[0]}</span>
                  <span className="flex items-center gap-1.5 font-semibold tabular-nums">{i <= step ? s.effect[1] : "..."}{i === step && <CheckCircle2 className="h-3.5 w-3.5 text-success" />}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
