import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  BarChart3, Bell, Briefcase, CalendarCheck, Check, CheckCircle2, Clock, Flag, FolderPlus, Hash, ListTodo,
  MessageSquare, PieChart, Target, TrendingUp, UserPlus, Users, Wallet,
} from "lucide-react";
import { card, CountUp, Eyebrow, Pill, Reveal } from "./primitives";
import { cn } from "@/lib/utils";
import mascotPhone from "@/assets/mascot-teal-cut.png";

const wrap = "mx-auto max-w-7xl px-4 sm:px-6";

function Head({ eyebrow, title, sub, dark }: { eyebrow: string; title: ReactNode; sub?: string; dark?: boolean }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2 className={cn("mt-4 text-3xl font-extrabold leading-[1.08] sm:text-5xl", dark && "text-ink-foreground")}>{title}</h2>
      {sub && <p className={cn("mt-3 sm:text-lg", dark ? "text-ink-foreground/65" : "text-muted-foreground")}>{sub}</p>}
    </Reveal>
  );
}

/* Loops a step index while in view */
function useLoop(n: number, ms = 1400) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduce = useReducedMotion();
  const [i, setI] = useState(reduce ? n - 1 : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(t);
  }, [inView, n, ms, reduce]);
  return [ref, i] as const;
}
const modTone = ["bg-mod-1/20 text-mod-1 ring-1 ring-mod-1/40", "bg-mod-2/20 text-mod-2 ring-1 ring-mod-2/40", "bg-mod-3/20 text-mod-3 ring-1 ring-mod-3/40", "bg-mod-4/20 text-mod-4 ring-1 ring-mod-4/40", "bg-mod-5/20 text-mod-5 ring-1 ring-mod-5/40", "bg-mod-6/20 text-mod-6 ring-1 ring-mod-6/40"];

/* ---------- 1. All tools in one (orbit) ---------- */
const orbit = [
  [Wallet, "Payroll"], [Clock, "Attendance"], [CalendarCheck, "Leave"], [Users, "Employees"], [Hash, "Slack"], [Briefcase, "Projects"],
  [Flag, "Milestones"], [ListTodo, "Tasks"], [TrendingUp, "Progress"], [Target, "Performance"], [MessageSquare, "Internal chat"], [BarChart3, "Reports"],
] as const;

const replaced = [["Salary sheet.xlsx", "Excel"], ["#attendance tally", "Slack"], ["Sprint board", "Jira"], ["Offer letter.docx", "Word"], ["Leave register", "Paper"]] as const;
const feed = [
  [Clock, "Ahmed Raza checked in", "09:02 · Attendance"], [CalendarCheck, "Leave auto-approved", "2 days · Leave"], [ListTodo, "Task moved to QA", "Client Portal · Tasks"],
  [Wallet, "Payslips drafted", "November · Payroll"], [Flag, "Milestone 2 at 64%", "Mobile app · Milestones"], [Bell, "Client replied", "#client-acme · Chat"],
] as const;

const glass = "rounded-2xl border border-ink-foreground/10 bg-ink-foreground/5 p-5 backdrop-blur";

function LiveFeed() {
  const [ref, i] = useLoop(feed.length, 1600);
  const items = [0, 1, 2, 3].map((o) => feed[(i + o) % feed.length]!);
  return (
    <div ref={ref} className={glass}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-ink-foreground">Live activity</p>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-primary-glow"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-glow" />LIVE</span>
      </div>
      <div className="mt-4 space-y-2">
        {items.map(([I, t, d], k) => (
          <motion.div key={`${i}-${k}`} layout initial={k === 0 ? { opacity: 0, y: -16, scale: 0.95 } : false} animate={{ opacity: 1 - k * 0.18, y: 0, scale: 1 }} transition={{ duration: 0.4 }}
            className={cn("flex items-center gap-3 rounded-xl border p-2.5", k === 0 ? "border-primary/45 bg-primary/10" : "border-ink-foreground/5 bg-ink-foreground/5")}>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary-glow"><I className="h-4 w-4" /></span>
            <div className="min-w-0"><p className="truncate text-xs font-semibold text-ink-foreground">{t}</p><p className="truncate font-mono text-[10px] text-ink-foreground/45">{d}</p></div>
          </motion.div>
        ))}
      </div>
      <p className="mt-3 font-mono text-[10px] text-ink-foreground/55">events stream in as the day happens</p>
    </div>
  );
}

function Replaced() {
  return (
    <div className={glass}>
      <p className="text-sm font-bold text-ink-foreground">Tools you can retire</p>
      <div className="mt-4 space-y-2">
        {replaced.map(([f, app], k) => (
          <motion.div key={f} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.12 }}
            className="relative flex items-center justify-between rounded-xl border border-ink-foreground/5 bg-ink-foreground/5 p-2.5 text-xs">
            <span className="font-mono text-ink-foreground/50">{f}</span><Pill tone="red">{app}</Pill>
            <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 + k * 0.15, duration: 0.4 }}
              className="absolute left-2 right-2 top-1/2 h-px origin-left bg-destructive/70" />
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1.5 }}
        className="mt-4 flex items-center gap-2 rounded-xl bg-grad-primary p-3 text-xs font-semibold text-primary-foreground">
        <Check className="h-4 w-4" />All replaced by one Workspace
      </motion.div>
    </div>
  );
}

export function AllInOne() {
  const reduce = useReducedMotion();
  const [ref, scan] = useLoop(orbit.length, 650);
  return (
    <section id="platform" className="relative scroll-mt-20 overflow-hidden bg-ink py-24">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-25" />
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[620px] w-[620px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[140px]" />
      <div ref={ref} className={cn(wrap, "relative")}>
        <Head dark eyebrow="One platform" title={<>HR + Slack + Jira, <span className="serif-em text-accent">finally</span> one tool</>} sub="Twelve modules. One login. Shared data." />
        <div className="mt-16 grid items-center gap-8 lg:grid-cols-[1fr_minmax(0,520px)_1fr]">
          <Reveal className="order-2 lg:order-1"><Replaced /></Reveal>
          <div className="relative order-1 mx-auto aspect-square w-full max-w-[520px] lg:order-2">
            <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              {orbit.map((_, k) => {
                const a = (k / orbit.length) * Math.PI * 2;
                return <line key={k} x1="50" y1="50" x2={50 + 38 * Math.cos(a)} y2={50 + 38 * Math.sin(a)}
                  className={cn("transition-all duration-500", k === scan ? "stroke-primary-glow" : "stroke-primary/20")}
                  strokeWidth={k === scan ? "0.55" : "0.25"} strokeDasharray="1 1.5" />;
              })}
            </svg>
            <motion.div aria-hidden className="absolute inset-[7%] rounded-full border border-dashed border-primary/25" animate={reduce ? {} : { rotate: 360 }} transition={{ repeat: Infinity, duration: 90, ease: "linear" }} />
            <div aria-hidden className="absolute inset-[12%] rounded-full border border-ink-foreground/10" />
            {[0, 1].map((r) => (
              <motion.div key={r} aria-hidden className="absolute inset-[30%] rounded-full border border-primary/40"
                animate={reduce ? {} : { scale: [1, 2.2], opacity: [0.7, 0] }} transition={{ repeat: Infinity, duration: 4, delay: r * 2, ease: "easeOut" }} />
            ))}
            <motion.div animate={reduce ? {} : { scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 3 }}
              className="absolute inset-[30%] grid place-items-center overflow-hidden rounded-full bg-ink shadow-float ring-4 ring-primary/50">
              <div aria-hidden className="absolute inset-0 rounded-full bg-grad-primary opacity-25" />
              <motion.div aria-hidden className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg, transparent 0deg, color-mix(in oklab, var(--primary) 45%, transparent) 55deg, transparent 110deg)" }}
                animate={reduce ? {} : { rotate: 360 }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }} />
              <img src={mascotPhone} alt="Workspace AI assistant" loading="lazy" width={1024} height={1024} className="relative h-[115%] w-[115%] translate-y-[8%] object-contain" />
            </motion.div>
            <motion.div className="absolute inset-0" animate={reduce ? {} : { rotate: 360 }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }}>
              {orbit.map(([I, l], k) => {
                const a = (k / orbit.length) * Math.PI * 2;
                return (
                  <div key={l} className="absolute" style={{ left: `${50 + 38 * Math.cos(a)}%`, top: `${50 + 38 * Math.sin(a)}%`, transform: "translate(-50%,-50%)" }}>
                    <motion.div animate={reduce ? {} : { rotate: -360 }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }}>
                      <div className={cn("flex flex-col items-center gap-1 rounded-2xl border px-2 py-2 backdrop-blur transition-all duration-300 sm:px-3",
                        k === scan ? "border-primary-glow/60 bg-primary/15 shadow-[0_0_30px_-6px] shadow-primary" : "border-ink-foreground/10 bg-ink-foreground/5")}>
                        <span className={cn("grid h-7 w-7 place-items-center rounded-lg sm:h-9 sm:w-9", modTone[k % modTone.length])}><I className="h-4 w-4 sm:h-5 sm:w-5" /></span>
                        <span className={cn("whitespace-nowrap text-[9px] font-semibold sm:text-[11px]", k === scan ? "text-ink-foreground" : "text-ink-foreground/65")}>{l}</span>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
          <Reveal delay={0.1} className="order-3"><LiveFeed /></Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. Slack data flow ---------- */
const slackEvents = [
  { ch: "#attendance", who: "Ayesha Khan", ini: "AK", time: "09:02", msg: "Morning all, starting my day 👋", I: Clock,
    parse: [["Intent", "Check-in"], ["Employee", "EMP-0142"], ["Shift", "09:00 to 18:00"]],
    out: { title: "Attendance marked", detail: "Ayesha Khan · 09:02 · within 5 min grace", tag: "On time", tone: "green" as const, I: CalendarCheck } },
  { ch: "#proj-portal", who: "Bilal Siddiqui", ini: "BS", time: "11:40", msg: "EAZ-214 payment API done, moving to QA", I: Briefcase,
    parse: [["Intent", "Task update"], ["Ticket", "EAZ-214"], ["Status", "In progress → QA"]],
    out: { title: "Board updated", detail: "EAZ-214 moved to QA · Hira Malik notified", tag: "In QA", tone: "indigo" as const, I: ListTodo } },
  { ch: "#client-nexgen", who: "Client · NexGen", ini: "NG", time: "14:15", msg: "Can we add JazzCash to checkout?", I: MessageSquare,
    parse: [["Intent", "Change request"], ["Project", "NexGen Portal"], ["Priority", "Medium"]],
    out: { title: "Client request logged", detail: "New ticket EAZ-231 · PM Ahmed Raza assigned", tag: "1 new", tone: "amber" as const, I: Flag } },
  { ch: "#team-dev", who: "Hira Malik", ini: "HM", time: "17:55", msg: "Leaving early tomorrow, half day", I: Users,
    parse: [["Intent", "Leave request"], ["Type", "Half day"], ["Balance", "9.25 → 8.75"]],
    out: { title: "Leave sent for approval", detail: "Half day · 10 Nov · awaiting Ahmed Raza", tag: "Pending", tone: "gray" as const, I: Bell } },
];

export function SlackFlow() {
  const [ref, i] = useLoop(slackEvents.length, 3200);
  const e = slackEvents[i] ?? slackEvents[0]!;
  return (
    <section id="slack" className="scroll-mt-20 px-4 py-12 sm:px-6">
      <div ref={ref} className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ink px-4 py-20 sm:px-10">
        <div aria-hidden className="absolute -top-40 left-1/2 h-96 w-[600px] max-w-full -translate-x-1/2 rounded-full bg-primary/50 blur-[120px]" />
        <div aria-hidden className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:22px_22px] text-ink-foreground" />
        <div className="relative">
          <Head dark eyebrow="Slack integration" title={<>Slack talks, <span className="serif-em text-accent">the system listens</span></>} sub="Your team keeps chatting. Every message becomes a record." />
          <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-[1.1fr_0.9fr_1.1fr]">
            {/* Slack side */}
            <div className="rounded-3xl border border-ink-foreground/10 bg-ink-foreground/[0.04] p-4 text-ink-foreground backdrop-blur">
              <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-ink-foreground/50">
                <span className="flex items-center gap-2"><Hash className="h-3.5 w-3.5" />Slack · Eazisols</span><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-glow" />live</span>
              </div>
              <div className="space-y-2">
                {slackEvents.map((s, k) => (
                  <motion.div key={s.ch} animate={{ opacity: k === i ? 1 : 0.35, x: k === i ? 6 : 0 }} transition={{ duration: 0.4 }}
                    className={cn("rounded-2xl border p-3", k === i ? "border-primary-glow/50 bg-primary/15 shadow-[0_0_30px_-10px] shadow-primary-glow" : "border-ink-foreground/5 bg-ink-foreground/[0.03]")}>
                    <div className="flex items-center gap-2">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary-glow/20 text-[10px] font-bold text-primary-glow">{s.ini}</span>
                      <span className="text-xs font-semibold">{s.who}</span>
                      <span className="font-mono text-[10px] text-accent">{s.ch}</span>
                      <span className="ml-auto font-mono text-[10px] text-ink-foreground/40">{s.time}</span>
                    </div>
                    <p className="mt-1.5 pl-9 text-sm text-ink-foreground/85">{s.msg}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AI parse */}
            <div className="relative flex flex-col items-center justify-center rounded-3xl border border-accent/20 bg-gradient-to-b from-accent/10 to-transparent p-5 text-ink-foreground">
              <div className="relative grid h-28 w-28 place-items-center">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="absolute inset-0 rounded-full border-2 border-dashed border-accent/50" />
                <motion.div key={i} initial={{ scale: 0.6, opacity: 0.8 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 1.2 }} className="absolute inset-0 rounded-full border border-primary-glow" />
                <img src={mascotPhone} alt="AI assistant reading Slack" loading="lazy" width={1024} height={1024} className="relative h-24 w-24 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" />
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-accent">AI understanding</p>
              <motion.div key={`p${i}`} initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.25 } } }} className="mt-3 w-full space-y-1.5">
                {e.parse.map(([k, v]) => (
                  <motion.div key={k} variants={{ h: { opacity: 0, y: 6 }, s: { opacity: 1, y: 0 } }} className="flex items-center justify-between rounded-xl bg-ink-foreground/5 px-3 py-2 text-xs">
                    <span className="text-ink-foreground/50">{k}</span><span className="font-mono font-semibold text-ink-foreground">{v}</span>
                  </motion.div>
                ))}
              </motion.div>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-ink-foreground/10">
                <motion.div key={`b${i}`} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3, ease: "linear" }} className="h-full bg-gradient-to-r from-primary-glow to-accent" />
              </div>
            </div>

            {/* Outputs */}
            <div className="space-y-2.5">
              {slackEvents.map((s, k) => {
                const on = k === i, done = k < i;
                const O = s.out.I;
                return (
                  <motion.div key={s.out.title} animate={{ opacity: on ? 1 : done ? 0.7 : 0.35, scale: on ? 1.02 : 1 }}
                    className={cn("flex items-start gap-3 rounded-2xl p-3.5", on ? "bg-card" : "border border-ink-foreground/10 bg-ink-foreground/[0.04] text-ink-foreground")}>
                    <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", on ? "bg-primary text-primary-foreground" : "bg-ink-foreground/10")}><O className="h-4 w-4" /></span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold">{s.out.title}</span>
                        <Pill tone={s.out.tone}>{(on || done) && <Check className="h-3 w-3" />}{s.out.tag}</Pill>
                      </div>
                      <p className={cn("mt-0.5 truncate text-xs", on ? "text-muted-foreground" : "text-ink-foreground/50")}>{s.out.detail}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. Project management flow ---------- */
const pmSteps = [[FolderPlus, "Create project"], [Flag, "Add milestones"], [ListTodo, "Create tasks"], [UserPlus, "Assign team"], [TrendingUp, "Track progress"], [Target, "View performance"]] as const;

export function ProjectFlow() {
  const [ref, i] = useLoop(pmSteps.length, 1300);
  return (
    <section id="project-flow" className="scroll-mt-20 py-24">
      <div ref={ref} className={wrap}>
        <Head eyebrow="Project management" title={<>From idea to <span className="serif-em text-primary">delivered</span></>} sub="Six steps. Fully connected." />
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-8 hidden h-1 rounded-full bg-muted lg:block" />
          <motion.div className="absolute left-0 top-8 hidden h-1 rounded-full bg-grad-chip lg:block" animate={{ width: `${(i / (pmSteps.length - 1)) * 100}%` }} transition={{ duration: 0.6 }} />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {pmSteps.map(([I, l], k) => (
              <div key={l} className="relative flex flex-col items-center text-center">
                <motion.span animate={{ scale: k === i ? 1.15 : 1 }} className={cn("grid h-16 w-16 place-items-center rounded-2xl transition-colors duration-300", k <= i ? "bg-grad-primary text-primary-foreground shadow-float" : "bg-card text-muted-foreground shadow-soft")}>
                  <I className="h-6 w-6" />
                </motion.span>
                <span className="mt-3 font-mono text-[10px] text-muted-foreground">0{k + 1}</span>
                <p className={cn("text-sm font-bold transition-colors", k <= i ? "text-foreground" : "text-muted-foreground")}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. Milestones + tasks ---------- */
type Ticket = {
  readonly id: string; readonly title: string; readonly tag: string; readonly pri: string;
  readonly tone: "green" | "amber" | "red" | "indigo" | "gray";
  readonly who: string; readonly ini: string; readonly av: string;
  readonly sub: readonly [number, number]; readonly msg: number; readonly due: string;
};

const board = [
  {
    name: "To do",
    tickets: [
      { id: "EAZ-142", title: "Payment gateway retry", tag: "Backend", pri: "High", tone: "amber", who: "Bilal Siddiqui", ini: "BS", av: "bg-primary", sub: [1, 5], msg: 3, due: "12 Nov" },
      { id: "EAZ-147", title: "Invoice PDF header", tag: "Frontend", pri: "Medium", tone: "indigo", who: "Hira Malik", ini: "HM", av: "bg-accent", sub: [2, 4], msg: 1, due: "14 Nov" },
    ],
  },
  {
    name: "In progress",
    tickets: [
      { id: "EAZ-144", title: "Refresh-token rotation", tag: "Security", pri: "Urgent", tone: "red", who: "Ahmed Raza", ini: "AR", av: "bg-destructive", sub: [4, 6], msg: 7, due: "Today" },
      { id: "EAZ-151", title: "Attendance export CSV", tag: "Backend", pri: "Medium", tone: "indigo", who: "Usman Tariq", ini: "UT", av: "bg-success", sub: [1, 3], msg: 2, due: "15 Nov" },
    ],
  },
  {
    name: "QA",
    tickets: [
      { id: "EAZ-139", title: "Client Portal QA pass", tag: "QA", pri: "High", tone: "amber", who: "Ayesha Khan", ini: "AK", av: "bg-warning", sub: [5, 5], msg: 4, due: "Today" },
      { id: "EAZ-136", title: "Payroll transfer letter", tag: "Payroll", pri: "Medium", tone: "indigo", who: "Sana Iqbal", ini: "SI", av: "bg-primary", sub: [6, 6], msg: 1, due: "13 Nov" },
    ],
  },
  {
    name: "Done",
    tickets: [
      { id: "EAZ-128", title: "Login UI", tag: "Frontend", pri: "Shipped", tone: "green", who: "Hira Malik", ini: "HM", av: "bg-accent", sub: [8, 8], msg: 2, due: "Closed" },
      { id: "EAZ-131", title: "Milestone Gantt view", tag: "Delivery", pri: "Shipped", tone: "green", who: "Ahmed Raza", ini: "AR", av: "bg-primary", sub: [6, 6], msg: 5, due: "Closed" },
    ],
  },
] as const;

const moving: Ticket = { id: "EAZ-148", title: "Slack check-in webhook", tag: "Integrations", pri: "High", tone: "amber", who: "Ahmed Raza", ini: "AR", av: "bg-accent", sub: [3, 6], msg: 5, due: "Today" };

const milestones = [
  { id: "M1", name: "Design", v: 100, span: "1–18 Oct", owner: "Hira Malik", ini: "HM", tasks: "12/12", tone: "green" },
  { id: "M2", name: "Build", v: 64, span: "19 Oct–8 Nov", owner: "Ahmed Raza", ini: "AR", tasks: "19/30", tone: "amber" },
  { id: "M3", name: "Launch", v: 18, span: "9–27 Nov", owner: "Bilal Siddiqui", ini: "BS", tasks: "4/22", tone: "indigo" },
] as const;

function Avatar({ ini, av, size = "h-4 w-4 text-[8px]" }: { ini: string; av: string; size?: string }) {
  return <span className={cn("grid shrink-0 place-items-center rounded-full font-bold text-primary-foreground", av, size)}>{ini}</span>;
}

function TicketCard({ t, done }: { t: Ticket; done?: boolean }) {
  return (
    <div className="rounded-lg border border-border/70 bg-card p-2 shadow-soft">
      <div className="flex items-center justify-between gap-1">
        <span className="font-mono text-[9px] tracking-tight text-muted-foreground">{t.id}</span>
        <Pill tone={t.tone} className="px-1.5 py-0 text-[9px]">{t.pri}</Pill>
      </div>
      <p className="mt-1 text-[11px] font-semibold leading-tight text-foreground">{t.title}</p>
      <div className="mt-1.5 flex items-center justify-between gap-1">
        <span className="rounded bg-muted px-1 py-px font-mono text-[9px] text-muted-foreground">{t.tag}</span>
        <span title={t.who}><Avatar ini={t.ini} av={t.av} /></span>
      </div>
      <div className="mt-1.5 flex items-center gap-2 border-t border-border/60 pt-1.5 font-mono text-[9px] text-muted-foreground">
        <span className="flex items-center gap-0.5"><ListTodo className="h-2.5 w-2.5" />{t.sub[0]}/{t.sub[1]}</span>
        <span className="flex items-center gap-0.5"><MessageSquare className="h-2.5 w-2.5" />{t.msg}</span>
        <span className={cn("ml-auto", t.due === "Today" && "text-warning")}>{t.due}</span>
        {done && <CheckCircle2 className="h-3 w-3 text-success" />}
      </div>
    </div>
  );
}

export function MilestonesTasks() {
  const [ref, i] = useLoop(4, 1500);
  return (
    <section id="projects" className="scroll-mt-20 bg-muted py-24">
      <div ref={ref} className={wrap}>
        <Head eyebrow="Milestones & tasks" title={<>Plan it. Assign it. <span className="serif-em text-primary">Move it.</span></>} sub="Every ticket carries its owner, priority, checklist and deadline, so nobody has to ask where things stand." />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <Reveal className={cn(card, "p-6")}>
            <div className="flex items-center justify-between">
              <p className="font-bold">Milestones</p>
              <Pill tone="indigo">Client Portal</Pill>
            </div>
            <div className="mt-4 space-y-3">
              {milestones.map((m, k) => (
                <div key={m.id} className="rounded-xl border border-border/70 bg-secondary/60 p-3">
                  <div className="flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded bg-primary/10 font-mono text-[9px] font-bold text-primary">{m.id}</span>
                    <p className="text-sm font-semibold">{m.name}</p>
                    <span className="ml-auto font-mono text-[10px] text-muted-foreground">{m.span}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${m.v}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: k * 0.2 }} className="h-full rounded-full bg-grad-primary" />
                    </div>
                    <span className="w-9 text-right font-mono text-[11px] tabular-nums text-muted-foreground">{m.v}%</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <Avatar ini={m.ini} av={k === 1 ? "bg-accent" : "bg-primary"} size="h-4 w-4 text-[8px]" />
                    <span className="text-[10px] text-muted-foreground">{m.owner}</span>
                    <span className="ml-auto font-mono text-[10px] text-muted-foreground">{m.tasks} tasks</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className={cn(card, "p-6 lg:col-span-2")}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold">M2 · Build board</p>
              <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                <span>9 tickets</span>
                <Pill tone="amber">2 in QA</Pill>
                <Pill tone="green">2 shipped</Pill>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {board.map((col, ci) => (
                <div key={col.name} className="min-h-64 rounded-xl bg-secondary p-2">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{col.name}</p>
                    <span className="font-mono text-[9px] text-muted-foreground/70">{col.tickets.length + (i === ci ? 1 : 0)}</span>
                  </div>
                  {col.tickets.map((t) => (
                    <div key={t.id} className="mb-2">
                      <TicketCard t={t} done={ci === 3} />
                    </div>
                  ))}
                  {i === ci && (
                    <motion.div layoutId="eaz-148" transition={{ type: "spring", bounce: 0.25, duration: 0.7 }}>
                      <TicketCard t={moving} done={ci === 3} />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-[10px] text-muted-foreground">EAZ-148 moves To do → In progress → QA → Done as the team works it.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. Live progress ---------- */
export function LiveProgress() {
  const projects = [["Client Portal", 78, "green", "On track"], ["Mobile app", 52, "amber", "At risk"], ["Billing API", 91, "green", "On track"], ["Analytics", 34, "indigo", "Started"]] as const;
  const [ref, tick] = useLoop(100, 900);
  return (
    <section id="progress" className="scroll-mt-20 py-24">
      <div ref={ref} className={wrap}>
        <Head eyebrow="Live progress" title={<>Every project, <span className="serif-em text-primary">right now</span></>} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map(([n, v, t, s], k) => {
            const live = Math.min(100, v + ((tick + k) % 4));
            return (
              <Reveal key={n} delay={k * 0.08} className={cn(card, "p-6")}>
                <div className="flex items-center justify-between"><p className="font-bold">{n}</p><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" /><span className="relative h-2 w-2 rounded-full bg-success" /></span></div>
                <div className="relative mx-auto mt-5 h-28 w-28">
                  <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" className="stroke-muted" strokeWidth="3" />
                    <motion.circle cx="18" cy="18" r="15.9" fill="none" className="stroke-primary" strokeWidth="3" strokeLinecap="round" pathLength={100} strokeDasharray="100" animate={{ strokeDashoffset: 100 - live }} transition={{ duration: 0.8 }} />
                  </svg>
                  <span className="absolute inset-0 grid place-items-center text-2xl font-extrabold tabular-nums">{live}%</span>
                </div>
                <div className="mt-4 text-center"><Pill tone={t}>{s}</Pill></div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. Individual performance ---------- */
const team = [
  { n: "Ahmed Raza", r: "Senior MERN Developer", i: "AR", ot: 94, tasks: 38, att: 98, hrs: 162, late: 1, wk: [31, 36, 34, 40, 38, 42, 39], proj: "Eazisols CRM v2" },
  { n: "Ayesha Khan", r: "QA Engineer", i: "AK", ot: 89, tasks: 52, att: 96, hrs: 158, late: 3, wk: [44, 48, 51, 46, 55, 50, 52], proj: "Client Portal" },
  { n: "Bilal Siddiqui", r: "UI/UX Designer", i: "BS", ot: 91, tasks: 27, att: 93, hrs: 151, late: 2, wk: [22, 25, 24, 28, 26, 30, 27], proj: "Workspace Mobile" },
  { n: "Hira Malik", r: "Business Developer", i: "HM", ot: 86, tasks: 19, att: 97, hrs: 160, late: 0, wk: [14, 17, 15, 20, 18, 21, 19], proj: "Upwork Pipeline" },
] as const;
const weeks = ["W40", "W41", "W42", "W43", "W44", "W45", "W46"];

export function Performance() {
  const [ref, sel] = useLoop(team.length, 3200);
  const p = team[sel]!;
  const max = Math.max(...p.wk);
  return (
    <section id="performance" className="scroll-mt-20 bg-muted py-24">
      <div ref={ref} className={wrap}>
        <Head eyebrow="Individual performance" title={<>See who's <span className="serif-em text-primary">shining</span></>} />
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">Delivery, attendance and output for every teammate, pulled live from tasks, Slack check-ins and timesheets.</p>
        <div className="mt-14 grid gap-5 lg:grid-cols-[320px_1fr]">
          <div className="space-y-3">
            {team.map((t, k) => (
              <motion.div key={t.n} animate={{ scale: k === sel ? 1.02 : 1 }} className={cn(card, "relative flex items-center gap-3 overflow-hidden p-4", k === sel && "ring-2 ring-primary")}>
                <span className={cn("grid h-11 w-11 place-items-center rounded-full font-mono text-sm font-bold", k === sel ? "bg-grad-primary text-primary-foreground" : "bg-primary-soft text-primary")}>{t.i}</span>
                <div className="min-w-0 flex-1"><p className="font-semibold leading-tight">{t.n}</p><p className="truncate text-xs text-muted-foreground">{t.r}</p></div>
                <span className="font-mono text-xs font-bold text-primary">{t.ot}%</span>
                {k === sel && <motion.span layoutId="perfbar" className="absolute bottom-0 left-0 h-0.5 bg-primary" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3.2, ease: "linear" }} />}
              </motion.div>
            ))}
          </div>
          <motion.div key={sel} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={cn(card, "p-6")}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4">
              <div><p className="text-lg font-bold">{p.n}</p><p className="text-sm text-muted-foreground">{p.r} · {p.proj}</p></div>
              <span className="rounded-full bg-primary-soft px-3 py-1 font-mono text-[11px] text-primary">Oct 2026 · 22 working days</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
              <div><p className="text-xs text-muted-foreground">On-time delivery</p><p className="text-3xl font-extrabold text-primary"><CountUp to={p.ot} suffix="%" /></p></div>
              <div><p className="text-xs text-muted-foreground">Tasks closed</p><p className="text-3xl font-extrabold"><CountUp to={p.tasks} /></p></div>
              <div><p className="text-xs text-muted-foreground">Attendance</p><p className="text-3xl font-extrabold text-success"><CountUp to={p.att} suffix="%" /></p></div>
              <div><p className="text-xs text-muted-foreground">Logged hours</p><p className="text-3xl font-extrabold"><CountUp to={p.hrs} suffix="h" /></p></div>
            </div>
            <p className="mb-3 mt-6 text-sm font-bold">Tasks closed per week</p>
            <div className="flex h-36 items-end gap-2">
              {p.wk.map((h, k) => (
                <div key={k} className="flex flex-1 flex-col items-center gap-1">
                  <span className="font-mono text-[10px] text-muted-foreground">{h}</span>
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(h / max) * 100}px` }} transition={{ delay: k * 0.06, duration: 0.5 }} className={cn("w-full rounded-t-md", k === 6 ? "bg-accent" : "bg-primary/70")} />
                  <span className="font-mono text-[10px] text-muted-foreground">{weeks[k]}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{p.late === 0 ? "No late arrivals this month." : `${p.late} late arrival${p.late > 1 ? "s" : ""} this month${p.late >= 3 ? ". 0.75 day auto-deducted under policy." : "."}`}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. Reports ---------- */
export function Reports() {
  const hrs = [3120, 3280, 3190, 3410, 3520, 3480, 3660, 3740, 3810, 3790, 3920, 4050];
  const mon = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  const lo = 3000, hi = 4100;
  const pts = hrs.map((v, k) => [(k / 11) * 200, 90 - ((v - lo) / (hi - lo)) * 80] as const);
  const line = pts.map(([x, y], k) => `${k ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const split = [["Base salaries", 72, "stroke-primary", "text-primary", "PKR 6.84M"], ["Bonuses & overtime", 9, "stroke-accent", "text-accent", "PKR 0.86M"], ["Income tax", 12, "stroke-success", "text-success", "PKR 1.14M"], ["EOBI & allowances", 7, "stroke-primary-glow", "text-primary-glow", "PKR 0.66M"]] as const;
  let off = 0;
  return (
    <section id="reports" className="scroll-mt-20 py-24">
      <div className={wrap}>
        <Head eyebrow="Reports & analytics" title={<>Answers, <span className="serif-em text-primary">not spreadsheets</span></>} />
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">October 2026 close for a 42-person software house, generated in seconds, not a week of Excel.</p>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <Reveal className={cn(card, "p-6 lg:col-span-2")}>
            <div className="flex items-start justify-between">
              <div><p className="font-bold">Billable hours</p><p className="text-sm text-muted-foreground">Last 12 months · all projects</p></div>
              <div className="text-right"><p className="text-2xl font-extrabold">4,050h</p><p className="font-mono text-xs text-success">▲ 29.8% YoY</p></div>
            </div>
            <svg viewBox="0 0 200 90" className="mt-4 h-48 w-full" preserveAspectRatio="none">
              {[10, 37, 63, 90].map((y) => <line key={y} x1="0" x2="200" y1={y} y2={y} className="stroke-border" strokeWidth="0.3" />)}
              <motion.path d={`${line} L200,90 L0,90 Z`} className="fill-primary/10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.2 }} />
              <motion.path d={line} fill="none" className="stroke-primary" strokeWidth="2" strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} />
            </svg>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground">{mon.map((m) => <span key={m}>{m}</span>)}</div>
          </Reveal>
          <Reveal delay={0.1} className={cn(card, "p-6")}>
            <div className="flex items-start justify-between"><div><p className="font-bold">Payroll split</p><p className="text-sm text-muted-foreground">October 2026</p></div><PieChart className="h-5 w-5 text-primary" /></div>
            <div className="relative mx-auto mt-4 h-40 w-40">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                {split.map(([, v, c], k) => { const o = off; off += v; return (
                  <motion.circle key={k} cx="18" cy="18" r="15.9" fill="none" className={c} strokeWidth="4" pathLength={100} strokeDasharray={`${v - 0.8} ${100 - v + 0.8}`} strokeDashoffset={-o}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: k * 0.25 }} />); })}
              </svg>
              <div className="absolute inset-0 grid place-content-center text-center"><p className="text-xl font-extrabold">PKR 9.5M</p><p className="text-[10px] text-muted-foreground">gross payroll</p></div>
            </div>
            <div className="mt-4 space-y-1.5 text-xs">
              {split.map(([l, v, , t, a]) => <div key={l} className="flex justify-between"><span><span className={t}>●</span> {l}</span><span className="font-mono text-muted-foreground">{a} · {v}%</span></div>)}
            </div>
          </Reveal>
          {([["Headcount", 42, "", "+3 joined in Oct · 1 exit"], ["Avg. attendance", 96, "%", "11 late arrivals across team"], ["Active projects", 18, "", "6 local · 12 Upwork / overseas"]] as const).map(([l, n, s, d], k) => (
            <Reveal key={l} delay={k * 0.08} className={cn(card, "p-6")}>
              <p className="text-sm text-muted-foreground">{l}</p>
              <p className="mt-1 text-4xl font-extrabold"><CountUp to={n} suffix={s} /></p>
              <p className="mt-2 text-xs text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Bell };
