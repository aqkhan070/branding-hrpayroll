import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight, BarChart3, Briefcase, CalendarCheck, Check, Clock, FileText, KanbanSquare, LayoutGrid,
  Menu, Search, ShoppingBag, X, Sun, Users, Wallet,
} from "lucide-react";
import { Clouds, Eyebrow, Pill } from "./primitives";
import { cn } from "@/lib/utils";
import mascot from "@/assets/mascot-teal-cut.png";

const links = [["Platform","platform"],["Workflow","workflow"],["Slack","slack"],["Projects","projects"],["Finance","billing"],["Intelligence","dashboards"]] as const;

export function Logo() {
  return (
    <a href="#top" className="logo flex items-center gap-2 font-bold tracking-tight text-foreground">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground font-extrabold">E</span>
      Eazisols Workspace
    </a>
  );
}

export function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 24));
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", solid ? "border-b border-border bg-card/80 backdrop-blur-xl" : "bg-transparent [&_.navtxt]:text-ink-foreground/80 [&_.logo]:text-ink-foreground")}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-5 md:flex">
          {links.map(([l, id]) => (
            <a key={l} href={`#${id}`} className="navtxt text-sm font-medium text-foreground/75 transition hover:text-foreground">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
        <a href="#cta" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
          Get started
        </a>
        <button type="button" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="navtxt grid h-9 w-9 place-items-center rounded-lg border border-border/40 text-foreground md:hidden">
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-card/95 px-4 py-3 backdrop-blur-xl md:hidden">
          {links.map(([l, id]) => (
            <a key={l} href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted">{l}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 25%"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-4, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <section id="top" className="relative overflow-hidden bg-sky pt-28 pb-24">
      <Clouds />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Eyebrow dark>AI-powered HR for tech teams</Eyebrow>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.9, delay: 0.1 }}
              className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.02] text-ink-foreground sm:text-6xl lg:text-7xl"
            >
              Your Whole Company,{" "}
              <span className="inline-grid h-10 w-10 -rotate-12 place-items-center rounded-xl bg-grad-chip align-middle shadow-float sm:h-14 sm:w-14">
                <Check className="h-6 w-6 text-accent-foreground sm:h-8 sm:w-8" strokeWidth={3} />
              </span>{" "}
              <span className="serif-em text-accent text-glow">run by one</span> Workspace
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
              className="mx-auto mt-6 max-w-xl text-base text-ink-foreground/70 sm:text-lg lg:mx-0">
              Payroll, attendance, Slack and projects, connected, automated and explained by AI.
            </motion.p>
            <motion.form initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full border border-ink-foreground/15 bg-ink-foreground/5 p-1.5 backdrop-blur lg:mx-0">
              <input aria-label="Work email" placeholder="you@company.com" className="min-w-0 flex-1 bg-transparent px-4 text-sm text-ink-foreground outline-none placeholder:text-ink-foreground/40" />
              <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-glow hover:text-accent-foreground">Start free trial</button>
            </motion.form>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 font-mono text-[11px] text-ink-foreground/55 lg:justify-start">
              {["14 day free trial", "Setup in minutes", "Slack-native", "Cancel anytime"].map((t) => (
                <span key={t} className="flex items-center gap-1"><Check className="h-3 w-3 text-accent" />{t}</span>
              ))}
            </motion.div>
          </div>
          <motion.img src={mascot} alt="Workspace AI assistant waving" width={1024} height={1024}
            initial={{ opacity: 0, scale: 0.8, y: 40 }} animate={{ opacity: 1, scale: 1, y: [0, -16, 0] }}
            transition={{ opacity: { duration: 0.8 }, scale: { duration: 0.8 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
            className="mx-auto hidden w-80 drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)] lg:block xl:w-[26rem]" />
        </div>

        <div ref={ref} className="mt-16" style={{ perspective: 1600 }}>
          <motion.div
            style={reduce ? {} : { rotateX, rotateZ, scale, transformOrigin: "center top" }}
            className="relative mx-auto max-w-6xl rounded-[28px] border border-ink-foreground/10 bg-ink-foreground/5 p-2 shadow-float backdrop-blur sm:p-3"
          >
            <div aria-hidden className="absolute -inset-px -z-10 rounded-[28px] bg-grad-chip opacity-40 blur-2xl" />
            <Dashboard />
          </motion.div>
          <p className="mt-3 text-center font-mono text-[11px] text-ink-foreground/60">Figures shown are illustrative</p>
        </div>
      </div>
    </section>
  );
}

const side = [
  { i: Sun, l: "Today", active: true }, { i: Briefcase, l: "Projects & tasks" }, { i: KanbanSquare, l: "Board" },
  { g: "HR & Finance" }, { i: Users, l: "Employees" }, { i: Clock, l: "Attendance" }, { i: CalendarCheck, l: "Leave" },
  { i: Wallet, l: "Payroll" }, { i: FileText, l: "Accounts" },
  { g: "Growth" }, { i: ShoppingBag, l: "Sales orders" }, { i: BarChart3, l: "Performance" },
] as const;

const bars = [["May", 62, 8], ["Jun", 70, 12], ["Jul", 66, 9], ["Aug", 78, 15], ["Sep", 74, 10], ["Oct", 88, 18], ["Nov", 82, 11]] as const;

function Dashboard() {
  return (
    <div className="flex overflow-hidden rounded-[22px] bg-card text-left">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-muted/50 p-4 md:flex">
        <div className="mb-4 flex items-center gap-2 text-sm font-bold"><span className="grid h-6 w-6 place-items-center rounded-md bg-accent text-xs text-accent-foreground">E</span>Workspace</div>
        <div className="space-y-0.5">
          {side.map((s, k) =>
            "g" in s ? (
              <p key={k} className="px-3 pt-4 pb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{s.g}</p>
            ) : (
              <div key={k} className={cn("flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px]", "active" in s ? "bg-ink text-ink-foreground" : "text-foreground/75")}>
                <s.i className="h-3.5 w-3.5" />{s.l}
              </div>
            ),
          )}
        </div>
        <div className="mt-auto rounded-2xl bg-grad-primary p-3 text-primary-foreground">
          <p className="text-xs font-bold">Payroll ready</p>
          <p className="mt-1 text-[11px] opacity-85">November salary sheet is waiting for review</p>
          <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-card px-2 py-0.5 text-[10px] font-semibold text-primary">Review <ArrowRight className="h-3 w-3" /></div>
        </div>
      </aside>
      <div className="min-w-0 flex-1 p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-2 text-xs text-muted-foreground sm:max-w-sm">
            <Search className="h-3.5 w-3.5 shrink-0" /><span className="truncate">Search people, tasks, invoices…</span>
            <kbd className="ml-auto hidden rounded border border-border bg-card px-1.5 font-mono text-[10px] sm:inline">Ctrl K</kbd>
          </div>
          <div className="flex -space-x-2">
            {["bg-primary", "bg-accent", "bg-success", "bg-warning"].map((c, i) => (
              <span key={i} className={cn("h-7 w-7 rounded-full border-2 border-card", c)} />
            ))}
          </div>
        </div>
        <h3 className="mt-5 text-xl font-bold">Good morning 👋</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {([["Present today", 31, "green", "on time 27"], ["Open tasks", 148, "indigo", "12 in QA"], ["Leave requests", 6, "amber", "3 pending"], ["Invoices due", 9, "red", "2 overdue"]] as const).map(([l, n, t, s]) => (
            <div key={l} className="rounded-2xl border border-border p-3">
              <p className="text-[11px] text-muted-foreground">{l}</p>
              <p className="mt-1 text-2xl font-extrabold tabular-nums">{n}</p>
              <Pill tone={t} className="mt-1">{s}</Pill>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          <div className="rounded-2xl border border-border p-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">Hours logged vs overtime</p>
              <div className="flex gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-sm bg-primary" />Hours</span>
                <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-sm bg-accent" />Overtime</span>
              </div>
            </div>
            <div className="mt-4 flex h-36 items-end justify-between gap-2">
              {bars.map(([m, h, o], i) => (
                <div key={m} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex h-28 w-full items-end justify-center gap-1">
                    <motion.div initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.06, duration: 0.6 }} className="w-2.5 rounded-t bg-primary sm:w-3.5" />
                    <motion.div initial={{ height: 0 }} whileInView={{ height: `${o * 2}%` }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.06, duration: 0.6 }} className="w-2.5 rounded-t bg-accent sm:w-3.5" />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{m}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border p-4">
            <p className="text-sm font-bold">November 2026</p>
            <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[10px]">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i} className="text-muted-foreground">{d}</span>)}
              {Array.from({ length: 30 }, (_, i) => (
                <span key={i} className={cn("rounded-md py-0.5 tabular-nums", i + 1 === 9 ? "bg-primary font-bold text-primary-foreground" : "text-foreground/70")}>{i + 1}</span>
              ))}
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between gap-2 text-[11px]"><span className="truncate">Client Portal QA</span><Pill tone="indigo">In QA</Pill></div>
              <div className="flex items-center justify-between gap-2 text-[11px]"><span className="truncate">Invoice reminders</span><Pill tone="amber">Revision</Pill></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const stack = [
  ["React", "bg-sky-1"], ["TypeScript", "bg-primary"], ["ASP.NET Core", "bg-primary-glow"], ["SQL Server", "bg-destructive"],
  ["Entity Framework Core", "bg-success"], ["Mantine", "bg-sky-1"], ["TanStack Query", "bg-accent"], ["SignalR", "bg-warning"],
  ["Slack", "bg-primary-glow"], ["Claude AI", "bg-accent"],
] as const;

export function Marquee() {
  return (
    <section className="border-y border-border py-10">
      <p className="text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">Built on a modern, dependable stack</p>
      <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee flex w-max gap-10">
          {[...stack, ...stack].map(([n, c], i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap text-lg font-bold text-foreground/80">
              <span className={cn("grid h-8 w-8 place-items-center rounded-lg text-xs font-extrabold text-primary-foreground", c)}>{n[0]}</span>{n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { LayoutGrid };
