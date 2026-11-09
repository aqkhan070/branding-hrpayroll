import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  BadgeCheck, Bell, Check, CheckCircle2, CreditCard, FileText, Flag, Hash, Mail, Receipt, Send, ShoppingCart, Smartphone, Trophy, X,
} from "lucide-react";
import { Eyebrow, Pill, Reveal } from "./primitives";
import { cn } from "@/lib/utils";

function useTick(n: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(t);
  }, [inView, n, ms, reduce]);
  return [ref, i] as const;
}

function Head({ eyebrow, title, sub, dark }: { eyebrow: string; title: React.ReactNode; sub: string; dark?: boolean }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2 className={cn("mt-4 text-3xl font-extrabold leading-[1.08] sm:text-5xl", dark && "text-ink-foreground")}>{title}</h2>
      <p className={cn("mt-3 sm:text-lg", dark ? "text-ink-foreground/65" : "text-muted-foreground")}>{sub}</p>
    </Reveal>
  );
}

/* ---------- Notifications ---------- */
const events = [
  { icon: Check, color: "text-mod-3 bg-mod-3/15", what: "EAZ-148 moved to QA", by: "Ayesha Khan · CPA platform", client: false },
  { icon: Flag, color: "text-mod-1 bg-mod-1/15", what: "Milestone 2 completed", by: "Mobile app · Dawlia Express", client: true },
  { icon: FileText, color: "text-mod-4 bg-mod-4/15", what: "Deadline moved to 18 Dec", by: "Bilal Siddiqui · DMV portal", client: false },
  { icon: Trophy, color: "text-mod-5 bg-mod-5/15", what: "Project delivered", by: "Eazisols website · v1.0", client: true },
];

export function Notifications() {
  const [ref, i] = useTick(events.length, 3200);
  const e = events[i] ?? events[0]!;
  const channels = [
    { k: "slack", icon: Hash, label: "Slack", sub: "#proj-updates", tone: "text-mod-4 bg-mod-4/15", show: true },
    { k: "email", icon: Mail, label: "Team email", sub: "lead@eazisols.com", tone: "text-mod-6 bg-mod-6/15", show: true },
    { k: "app", icon: Bell, label: "In-app", sub: "Bell + mobile push", tone: "text-mod-1 bg-mod-1/15", show: true },
    { k: "client", icon: Send, label: "Client email + portal", sub: "client@dawlia.com", tone: "text-mod-3 bg-mod-3/15", show: e.client },
  ];
  return (
    <section id="notifications" className="relative scroll-mt-16 overflow-hidden bg-ink py-24">
      <div aria-hidden className="absolute inset-0 bg-grid" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6" ref={ref}>
        <Head dark eyebrow="Notifications" title={<>Something changes. <span className="serif-em text-accent">Everyone knows.</span></>} sub="Every project update goes to Slack, email and the app. When a milestone or project is done, the client is told too." />
        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} className="rounded-[24px] border border-ink-foreground/10 bg-ink-foreground/5 p-6 text-ink-foreground">
              <p className="font-mono text-[11px] uppercase text-ink-foreground/50">Update in project</p>
              <div className="mt-4 flex items-center gap-3">
                <span className={cn("grid h-11 w-11 place-items-center rounded-xl", e.color)}><e.icon className="h-5 w-5" /></span>
                <div><p className="font-bold">{e.what}</p><p className="text-xs text-ink-foreground/55">{e.by}</p></div>
              </div>
              {e.client && <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent"><BadgeCheck className="h-3.5 w-3.5" />Client will be notified</p>}
            </motion.div>
          </AnimatePresence>
          <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/20 ring-1 ring-primary-glow/40">
            <motion.span key={i} initial={{ scale: 0.6, opacity: 0.8 }} animate={{ scale: 2.2, opacity: 0 }} transition={{ duration: 1.2 }} className="absolute inset-0 rounded-full border border-primary-glow" />
            <Send className="h-7 w-7 text-primary-glow" />
          </div>
          <div className="space-y-3">
            {channels.map((c, k) => (
              <motion.div key={c.k + i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: c.show ? 1 : 0.25, x: 0 }} transition={{ delay: 0.3 + k * 0.15 }} className="flex items-center gap-3 rounded-2xl border border-ink-foreground/10 bg-ink-foreground/5 p-3 text-ink-foreground">
                <span className={cn("grid h-9 w-9 place-items-center rounded-lg", c.tone)}><c.icon className="h-4 w-4" /></span>
                <div className="min-w-0 flex-1"><p className="text-sm font-bold">{c.label}</p><p className="truncate font-mono text-[11px] text-ink-foreground/50">{c.show ? e.what : "Only for milestones and delivery"}</p></div>
                {c.show ? <CheckCircle2 className="h-4 w-4 text-success" /> : <span className="text-[10px] text-ink-foreground/40">skipped</span>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Invoicing ---------- */
const invoices = [
  ["INV-2026-0005", "Dawlia Express", "USD 2,000.00", "Paid"],
  ["INV-2026-0006", "CPA Platform", "USD 2,000.00", "Sent"],
  ["INV-2026-0007", "Earthco", "USD 1,450.00", "Overdue"],
] as const;

export function Invoicing() {
  const [ref, tick] = useTick(4, 2600);
  const [paid, setPaid] = useState(false);
  const i = paid ? 3 : tick;
  return (
    <section id="billing" className="scroll-mt-16 bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6" ref={ref}>
        <Head eyebrow="Invoicing" title={<>Invoice it. <span className="serif-em text-primary">Get paid online.</span></>} sub="Monthly invoices are made from project billing, reminders go out on their own, and clients pay with one link. Overseas clients are billed in USD while payroll runs in PKR." />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="rounded-[24px] border border-border bg-card p-6 shadow-soft">
            <div className="grid grid-cols-4 gap-3">
              {[["Invoiced", "USD 5,450", "border-mod-6"], ["Received", "USD 2,000", "border-mod-3"], ["Pending", "USD 2,000", "border-mod-1"], ["Overdue", "USD 1,450", "border-mod-5"]].map(([l, v, b]) => (
                <div key={l} className={cn("rounded-xl border-l-4 bg-muted p-3", b)}>
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">{l}</p><p className="mt-1 text-sm font-extrabold sm:text-base">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 divide-y divide-border">
              {invoices.map(([n, c, a, s], k) => {
                const status = k === 1 && i >= 3 ? "Paid" : s;
                return (
                  <div key={n} className="flex items-center gap-3 py-3 text-sm">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-mod-6/15 text-mod-6"><Receipt className="h-4 w-4" /></span>
                    <div className="min-w-0 flex-1"><p className="font-bold">{n}</p><p className="text-xs text-muted-foreground">{c} · Net 14 days</p></div>
                    <span className="font-semibold tabular-nums">{a}</span>
                    <Pill tone={status === "Paid" ? "green" : status === "Overdue" ? "red" : "amber"}>{status}</Pill>
                  </div>
                );
              })}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative rounded-[24px] bg-ink p-6 text-ink-foreground">
            <p className="font-mono text-[11px] uppercase text-ink-foreground/50">Client view · CPA Platform</p>
            <div className="mt-4 space-y-3">
              {[
                { icon: Mail, t: "Invoice INV-2026-0006 sent", s: "USD 2,000 due 15 Dec", tone: "bg-mod-6/15 text-mod-6" },
                { icon: Bell, t: "Reminder: due in 3 days", s: "Email + client portal", tone: "bg-mod-1/15 text-mod-1" },
                { icon: CreditCard, t: "Paying online", s: "Card ending 4242", tone: "bg-mod-4/15 text-mod-4" },
                { icon: CheckCircle2, t: "Payment received", s: "Receipt emailed · marked Paid", tone: "bg-mod-3/15 text-mod-3" },
              ].map((x, k) => (
                <motion.div key={x.t} animate={{ opacity: k <= i ? 1 : 0.2, x: k <= i ? 0 : 12 }} className={cn("flex items-center gap-3 rounded-2xl border p-3", k === i ? "border-primary-glow/50 bg-primary/15" : "border-ink-foreground/10 bg-ink-foreground/5")}>
                  <span className={cn("grid h-9 w-9 place-items-center rounded-lg", x.tone)}><x.icon className="h-4 w-4" /></span>
                  <div><p className="text-sm font-bold">{x.t}</p><p className="text-xs text-ink-foreground/55">{x.s}</p></div>
                </motion.div>
              ))}
            </div>
            <button type="button" onClick={() => setPaid((p) => !p)} className={cn("mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3 font-bold transition", paid ? "bg-success text-primary-foreground" : "bg-accent text-accent-foreground hover:opacity-90")}>{paid ? <><CheckCircle2 className="h-4 w-4" />Paid · receipt sent to Slack and email</> : <><CreditCard className="h-4 w-4" />Try it: pay USD 2,000 online</>}</button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Sales & commissions ---------- */
const orders = [
  ["00121", "Dawlia Express", "New order", 4200, "Muhammad Abdullah Babar", 10],
  ["00122", "Earthco", "Repeat order", 1800, "Hira Malik", 5],
  ["00124", "CPA Platform", "New order", 2600, "Muhammad Abdullah Babar", 10],
] as const;

export function SalesCommissions() {
  const [ref, i] = useTick(orders.length, 2400);
  const months = [3.1, 4.2, 2.8, 5.4, 4.9, 6.2, 8.6];
  return (
    <section id="sales" className="scroll-mt-16 bg-muted py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6" ref={ref}>
        <Head eyebrow="Sales orders & commissions" title={<>Every order, <span className="serif-em text-primary">every commission.</span></>} sub="Record client orders once. Commission is worked out every month and added to payroll." />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="rounded-[24px] border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between"><p className="font-bold">Sales orders · November</p><Pill tone="indigo">USD 8,600 net</Pill></div>
            <div className="mt-4 space-y-2">
              {orders.map(([id, c, t, amt, who, pct], k) => (
                <motion.div key={id} animate={{ scale: k === i ? 1.02 : 1 }} className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border p-3 text-sm", k === i ? "border-primary/40 bg-primary-soft" : "border-border")}>
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-mod-1/15 text-mod-1"><ShoppingCart className="h-4 w-4" /></span>
                  <div className="min-w-0"><p className="font-bold">{id} · {c}</p><p className="truncate text-xs text-muted-foreground">{t} · {who} · {pct}%</p></div>
                  <div className="text-right"><p className="font-bold tabular-nums">USD {amt.toLocaleString()}</p><p className="text-xs text-success">+USD {(amt * pct / 100).toLocaleString()}</p></div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 flex h-28 items-end gap-2">
              {months.map((m, k) => (
                <div key={k} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                  <div className="flex w-full flex-1 items-end"><motion.div initial={{ height: 0 }} animate={{ height: `${(m / 9) * 100}%` }} transition={{ delay: k * 0.06 }} className={cn("w-full rounded-t-md", k === months.length - 1 ? "bg-accent" : "bg-primary/70")} /></div>
                  <span className="text-[10px] text-muted-foreground">{["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"][k]}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[24px] bg-ink p-6 text-ink-foreground">
            <p className="font-bold">Commission this month</p>
            {[["Muhammad Abdullah Babar", "Business developer", 680, "bg-mod-4/20 text-mod-4"], ["Hira Malik", "Account manager", 90, "bg-mod-3/20 text-mod-3"]].map(([n, r, v, tone]) => (
              <div key={n as string} className="mt-4 flex items-center gap-3 rounded-2xl border border-ink-foreground/10 bg-ink-foreground/5 p-3">
                <span className={cn("grid h-10 w-10 place-items-center rounded-full text-sm font-bold", tone as string)}>{(n as string).split(" ").map((x) => x[0]).slice(0, 2).join("")}</span>
                <div className="flex-1"><p className="text-sm font-bold">{n}</p><p className="text-xs text-ink-foreground/55">{r}</p></div>
                <p className="font-extrabold text-accent tabular-nums">USD {v}</p>
              </div>
            ))}
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-success/15 px-3 py-2 text-xs text-success"><CheckCircle2 className="h-4 w-4" />Added to November payroll after approval</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Approvals ---------- */
const reqs = [
  ["Hamza Younas", "Casual leave · 13 Nov", "Marriage ceremony", "bg-mod-3/15 text-mod-3"],
  ["Muhammad Qasim", "Late check-in · 0.25 day", "Checked in 10:56 AM", "bg-mod-1/15 text-mod-1"],
  ["Rida Ayesha", "Loan advance · PKR 50,000", "6 instalments", "bg-mod-6/15 text-mod-6"],
  ["Muhammad Abdullah Babar", "Commission · USD 680", "November orders", "bg-mod-4/15 text-mod-4"],
  ["Hafiz Abdul Rehman", "Overtime · 6 hours", "Release night, DMV portal", "bg-mod-5/15 text-mod-5"],
] as const;
const tabs = ["Leave", "Attendance", "Overtime", "Loans", "Commissions", "Bonuses", "Timesheets", "Profile changes"];

export function Approvals() {
  const [ref, i] = useTick(reqs.length + 1, 1800);
  return (
    <section id="approvals" className="scroll-mt-16 bg-background py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6" ref={ref}>
        <Head eyebrow="Approvals" title={<>One inbox for <span className="serif-em text-primary">every yes or no.</span></>} sub="Leave, deductions, overtime, loans, bonuses and commissions. Two-step approval, from the web or your phone." />
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {tabs.map((t) => <span key={t} className="rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">{t}</span>)}
        </div>
        <Reveal className="mt-8 rounded-[24px] border border-border bg-card p-4 shadow-soft sm:p-6">
          <div className="mb-3 flex items-center justify-between"><p className="font-bold">Waiting for you</p><Pill tone="amber">{Math.max(0, reqs.length - i)} pending</Pill></div>
          <div className="space-y-2">
            {reqs.map(([n, t, r, tone], k) => {
              const done = k < i;
              const rejected = k === 1;
              return (
                <div key={n} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold", tone)}>{n.split(" ").map((x) => x[0]).slice(0, 2).join("")}</span>
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{n}</p><p className="truncate text-xs text-muted-foreground">{t} · {r}</p></div>
                  <span className="hidden text-[11px] text-muted-foreground sm:block">Step {done ? "2" : "1"} of 2</span>
                  <AnimatePresence mode="wait">
                    {done ? (
                      <motion.span key="d" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        {rejected ? <Pill tone="amber"><X className="h-3 w-3" />Waived</Pill> : <Pill tone="green"><Check className="h-3 w-3" />Approved</Pill>}
                      </motion.span>
                    ) : (
                      <motion.div key="p" className="flex gap-1.5" exit={{ opacity: 0 }}>
                        <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", k === i ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary")}>Approve</span>
                        <span className="hidden rounded-full bg-warning-soft px-3 py-1 text-xs font-semibold text-warning sm:inline">Waive</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground"><Smartphone className="h-3.5 w-3.5" />Each decision notifies the employee on Slack and in the app.</p>
        </Reveal>
      </div>
    </section>
  );
}
