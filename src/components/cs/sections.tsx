import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowDown, ArrowRight, Bell, Bot, Building2, CalendarDays, Check, ClipboardCheck, Clock, Code2, Database, FileSpreadsheet,
  FileText, Fingerprint, Globe, KeyRound, Layers, Lock, MessageSquare, Receipt, RotateCcw, ScrollText, Server, Shield, Timer, Trash2, Users, Wallet, X, Zap,
} from "lucide-react";
import { card, Clouds, CountUp, Eyebrow, Pill, Reveal, SectionHead } from "./primitives";
import { cn } from "@/lib/utils";
import mascot from "@/assets/mascot-teal-cut.png";

const wrap = "mx-auto max-w-7xl px-4 sm:px-6";

/* ---------- Overview ---------- */
export function Overview() {
  const stats = [[729, "", "API endpoints"], [308, "", "permissions"], [438, "", "automated tests"], [24, "", "feature modules"], [49, "", "database migrations"], [106, "k", "lines of code"]] as const;
  return (
    <section className="py-24">
      <div className={cn(wrap, "grid gap-12 lg:grid-cols-2")}>
        <Reveal>
          <Eyebrow>Project overview</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] sm:text-5xl">All your operations in one <span className="serif-em text-primary">powerful</span> workspace</h2>
          <p className="mt-5 text-muted-foreground sm:text-lg">Eazisols is a software house that delivers projects for clients around the world. As the team grew, its work was spread across Excel, Slack, Word and memory. Eazisols Workspace brings delivery, HR, payroll and finance into one permission-aware system, built to follow the company's real policies.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[["Client", "Eazisols (internal)"], ["Timeline", "Oct – Nov 2026"], ["Platform", "Web app + REST API"], ["Scope", "Design, build, data migration"]].map(([k, v]) => (
              <div key={k} className={cn(card, "p-4")}>
                <p className="font-mono text-[11px] uppercase text-muted-foreground">{k}</p>
                <p className="mt-1 font-semibold">{v}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="rounded-[28px] bg-muted p-6 sm:p-8">
          <p className="font-bold">The build, by the numbers</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {stats.map(([n, s, l], i) => (
              <Reveal key={l} delay={i * 0.06} className={cn(card, "p-5")}>
                <p className="text-3xl font-extrabold text-primary"><CountUp to={n} suffix={s} /></p>
                <p className="mt-1 text-sm text-muted-foreground">{l}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">Started from an empty repository on 8 Oct 2026. Now runs on real company data: salary sheets, Slack attendance history and HR records.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Challenge ---------- */
const chaos = [
  ["XLS", "bg-success", "Payroll in spreadsheets", "Salaries, tax slabs, loans and deductions were worked out by hand every month.", "Salary Sheet 2025.xlsx"],
  ["#", "bg-primary-glow", "Attendance in Slack", "People checked in by posting in a channel, and late arrivals and absences were counted manually.", "#attendance"],
  ["XLS", "bg-success", "Leave tracked from memory", "Balances, probation rules and sandwich leave lived in HR's head.", "Daily Attendance 2025-2026.xlsx"],
  ["DOC", "bg-sky-1", "Letters written one by one", "Offer, experience and salary-transfer letters were edited in Word for each employee and bank.", "Salary transfer letter.docx"],
  ["XLS", "bg-success", "Commissions and expenses", "BD commissions and petty cash sat in separate sheets with no link to orders or banks.", "BD Commission Sheet.xlsx"],
  ["?", "bg-destructive", "No view of delivery", "Tasks, QA hand-offs and deadlines were spread across chats.", "\"Who has this task?\""],
] as const;

export function Challenge() {
  return (
    <section id="challenge" className="scroll-mt-20 bg-muted py-24">
      <div className={wrap}>
        <SectionHead eyebrow="The challenge" title={<>Every manual process cost the team <span className="serif-em text-accent">hours</span></>} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {chaos.map(([ic, c, t, d, tag], i) => (
            <Reveal key={t} delay={(i % 3) * 0.08}>
              <motion.div whileHover={{ y: -6, rotate: i % 2 ? 0.6 : -0.6 }} className={cn(card, "h-full p-6")}>
                <span className={cn("grid h-11 w-11 place-items-center rounded-xl font-mono text-xs font-bold text-primary-foreground", c)}>{ic}</span>
                <h3 className="mt-5 text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                <span className="mt-4 inline-block rounded-md border border-border bg-muted px-2 py-1 font-mono text-[11px] text-foreground/70">{tag}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Bento ---------- */
function Tile({ className, title, desc, children, dark, delay = 0 }: { className?: string; title: string; desc?: string; children?: React.ReactNode; dark?: boolean; delay?: number }) {
  return (
    <Reveal delay={delay} className={cn("min-w-0", className)}>
      <div className={cn("h-full overflow-hidden rounded-[24px] p-6", dark ? "bg-grad-primary text-primary-foreground shadow-float" : card)}>
        <h3 className="text-lg font-bold">{title}</h3>
        {desc && <p className={cn("mt-1 text-sm", dark ? "opacity-85" : "text-muted-foreground")}>{desc}</p>}
        <div className="mt-5">{children}</div>
      </div>
    </Reveal>
  );
}

export function Solution() {
  const stages = [["To do", "4"], ["In progress", "⏱ 3h 12m"], ["Ready for QA", "Claim for QA"], ["In QA", "2"], ["Revision", "1"], ["Completed", "✓"]];
  return (
    <section id="solution" className="scroll-mt-20 py-24">
      <div className={wrap}>
        <SectionHead eyebrow="The solution" title={<>Everything your team needs in one <span className="serif-em text-primary">smart</span> platform</>} sub="Twenty-four modules share one data model, one permission system and one audit trail, so a check-in, a leave request and a payslip always agree." />
        <div className="mt-14 grid gap-5 lg:grid-cols-6">
          <Tile className="lg:col-span-4" title="Universal delivery board" desc="Six stages, stage timers and clean hand-offs between developers and QA.">
            <div className="relative flex flex-wrap gap-2">
              {stages.map(([s, v], i) => (
                <motion.div key={s} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold">
                  {s}<span className={cn("rounded-full px-1.5 py-0.5 text-[10px]", i === 2 ? "bg-accent text-accent-foreground" : i === 5 ? "bg-success-soft text-success" : "bg-card text-muted-foreground")}>{v}</span>
                </motion.div>
              ))}
              <span className="serif-em mt-3 block w-full -rotate-2 text-2xl text-destructive">no more “who has this?”</span>
            </div>
          </Tile>
          <Tile dark className="lg:col-span-2" title="Role-based access" desc="308 permissions with record scopes: own, direct reports, hierarchy, department, all" delay={0.1}>
            <div className="relative mx-auto h-32 w-32">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" className="stroke-primary-foreground/20" strokeWidth="3.5" />
                <motion.circle cx="18" cy="18" r="15.9" fill="none" className="stroke-accent" strokeWidth="3.5" strokeLinecap="round"
                  strokeDasharray="100" initial={{ strokeDashoffset: 100 }} whileInView={{ strokeDashoffset: 22 }} viewport={{ once: true }} transition={{ duration: 1.4 }} pathLength={100} />
              </svg>
              <div className="absolute inset-0 grid place-items-center text-center"><div><p className="text-2xl font-extrabold"><CountUp to={308} /></p><p className="text-[10px] opacity-80">permissions</p></div></div>
            </div>
          </Tile>
          <Tile className="lg:col-span-2" title="Attendance from Slack" desc="Check-ins are classified automatically.">
            <div className="space-y-2">
              {([["Ahmed Raza", "09:02", "green", "On time"], ["Ayesha Khan", "09:51", "amber", "Late"], ["Hira Malik", "-", "red", "Absent"]] as const).map(([n, t, tone, l]) => (
                <div key={n} className="flex items-center justify-between rounded-xl bg-muted px-3 py-2 text-xs">
                  <span className="font-medium">{n}</span><span className="font-mono text-muted-foreground">{t}</span><Pill tone={tone}>{l}</Pill>
                </div>
              ))}
            </div>
          </Tile>
          <Tile className="lg:col-span-4" title="Payroll that reads the attendance" desc="Late penalties, leave and loans flow straight into the salary sheet." delay={0.1}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-xs">
                <thead><tr className="text-left font-mono text-[10px] uppercase text-muted-foreground">{["Employee", "Basic", "Allowances", "Deductions", "Tax", "Net pay", "Status"].map((h, i) => <th key={h} className={cn("pb-2 font-medium", i > 0 && i < 6 && "text-right", i === 6 && "pl-3")}>{h}</th>)}</tr></thead>
                <tbody className="tabular-nums">
                  {([["Ahmed Raza", "96,000", "24,000", "2,769", "3,150", "114,081", "green", "Paid"], ["Ayesha Khan", "72,000", "18,000", "1,200", "1,800", "87,000", "amber", "Review"], ["Hira Malik", "64,000", "16,000", "0", "1,250", "78,750", "gray", "Pending"]] as const).map(([n, ...r]) => (
                    <tr key={n} className="border-t border-border">
                      <td className="py-2.5 font-medium">{n}</td>
                      {r.slice(0, 5).map((v, i) => <td key={i} className={cn("text-right", i === 4 && "font-bold")}>{v}</td>)}
                      <td className="pl-3"><Pill tone={r[5]}>{r[6]}</Pill></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tile>
          <Tile className="lg:col-span-2" title="Leave & approvals" desc="Category balances, sandwich rule and hierarchy auto-approval.">
            <div className="space-y-2 text-xs">
              {[["Permanent", 80], ["Probation", 45], ["Intern", 25]].map(([c, w]) => (
                <div key={c}><div className="flex justify-between"><span>{c}</span><span className="text-muted-foreground">balance</span></div>
                  <div className="mt-1 h-1.5 rounded-full bg-muted"><motion.div initial={{ width: 0 }} whileInView={{ width: `${w}%` }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-full rounded-full bg-primary" /></div></div>
              ))}
              <div className="flex flex-wrap gap-1 pt-2"><Pill tone="amber">Sandwich rule</Pill><Pill tone="green">Auto-approved</Pill></div>
            </div>
          </Tile>
          <Tile className="lg:col-span-2" title="Accounts & invoicing" desc="Milestone, contract and recurring invoices, reminders, a secure payment page and a client billing overview." delay={0.1}>
            <div className="flex flex-wrap gap-1"><Pill tone="indigo">Milestone</Pill><Pill tone="indigo">Contract</Pill><Pill tone="indigo">Recurring</Pill><Pill tone="red">Reminder sent</Pill></div>
          </Tile>
          <Tile className="lg:col-span-2" title="Sales & commissions" desc="Sales orders linked to milestones, Upwork role shares, account fees and a commission sheet import." delay={0.2}>
            <div className="flex flex-wrap gap-1"><Pill tone="green">Order linked</Pill><Pill>Upwork share</Pill><Pill tone="amber">Sheet imported</Pill></div>
          </Tile>
          <Tile className="lg:col-span-3" title="Performance 360°" desc="BD activity targets and HR evaluation forms.">
            <div className="space-y-3 text-xs">
              {([["Delivery on time", 92], ["QA first-pass rate", 81]] as const).map(([l, v]) => (
                <div key={l}><div className="flex justify-between font-medium"><span>{l}</span><span className="tabular-nums">{v}%</span></div>
                  <div className="mt-1 h-2 rounded-full bg-muted"><motion.div initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="h-full rounded-full bg-grad-chip" /></div></div>
              ))}
            </div>
          </Tile>
          <Tile className="lg:col-span-3" title="Team chat & AI receipt reading" desc="Drop a receipt in chat, the expense fills itself in." delay={0.1}>
            <div className="space-y-2 text-xs">
              <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground">
                Fuel for client visit
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-primary-foreground/15 p-2"><Receipt className="h-5 w-5" /><span className="font-mono text-[10px]">receipt_0311.jpg</span></div>
              </div>
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2">
                ✳ Read: PKR 6,500 · Fuel · Shell, 3 Nov
              </motion.div>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}

/* ---------- Modules ---------- */
const mods: Record<string, [string, string][]> = {
  Delivery: [["Projects & milestones", "Members, client visibility, requirements, discussions, timeline"], ["Tasks & subtasks", "Dependencies, recurrence, checklists, task templates"], ["Universal board", "Six stages, stage timers, hand-offs"], ["Shared QA queue", "Claim for QA, submit to QA, milestone review"], ["Deadlines", "Original date, extension requests with approval, \"Complete by\" scheduling"], ["Timers & timesheets", "One active timer, manual entries, billable hours"], ["Daily reports", "Daily reports & BD daily activities"], ["Deliveries", "Encrypted client credentials"], ["Quick Add", "Create anything from anywhere"]],
  People: [["Employees", "ID-card profile, stepper add/edit form, active/former directory, create login"], ["Org structure", "Departments, designations, CEO/CTO reporting hierarchy"], ["Onboarding", "New-hire onboarding checklist"], ["Documents & HR letters", "Word templates with placeholders"], ["Offers", "Offer letters and tracking"], ["Assets", "Company assets per employee"], ["Evaluation forms", "HR → manager → HR → HOD"]],
  Time: [["Schedules & shifts", "Including temporary/Ramadan"], ["Holidays", "Company holiday calendar"], ["Slack check-in/out", "Attendance straight from Slack"], ["Attendance policy engine", "Late rules, cutoffs, monthly occurrences, early departure, overtime grace, regularization"], ["Attendance report", "With Excel export"], ["Leave", "Types, categories, balances ledger, sandwich leave, waive/refund"], ["Overtime", "Tracked and paid through payroll"]],
  Money: [["Payroll runs & salary sheet", "Monthly runs with review"], ["Salary structure", "Basic/fuel/medical/mobile"], ["Tax tables & tax treatment", "FY slabs applied automatically"], ["Loans & advances", "Installments deducted from payroll"], ["Bonuses & commissions", "With payroll or paid separately"], ["Payslips", "Generated from templates"], ["Banks & transfers", "Bank master, split payments, transfer letters, cash receipts"], ["Expenses & cash book", "Per-bank balances, AI receipt reading, expense dashboard"], ["Accounts & invoicing", "Milestone, contract and recurring invoices"]],
  Growth: [["Sales orders & stats", "Orders linked to milestones"], ["Commissions", "Sales/PM commissions"], ["Performance 360", "Individual & team performance"], ["Employee comparison", "Completed ÷ assigned work"], ["Activity targets", "BD activity goals"], ["Role dashboards", "Today, Team overview, analytics"]],
  Platform: [["Roles & permissions matrix", "Module | Feature | View | Add | Edit | Delete"], ["Approvals inbox", "Hierarchy auto-approval"], ["Internal chat", "DMs, groups, channels, presence"], ["Notifications", "Preferences, birthday/anniversary/probation reminders"], ["Email & Slack outbox", "Reliable delivery with retry"], ["Audit log", "Every change recorded"], ["Recycle bin", "Cascading remove & restore"], ["Multi-tenancy", "Organizations, platform console, custom domains, branding, module toggles, sign in as"], ["Settings hub", "All configuration in one place"]],
};
const catIcon = { Delivery: ClipboardCheck, People: Users, Time: Clock, Money: Wallet, Growth: Zap, Platform: Layers } as const;

export function Modules() {
  const [tab, setTab] = useState("All");
  const list = Object.entries(mods).flatMap(([c, xs]) => xs.map(([n, d]) => ({ c, n, d }))).filter((m) => tab === "All" || m.c === tab);
  return (
    <section id="modules" className="scroll-mt-20 bg-muted py-24">
      <div className={wrap}>
        <SectionHead eyebrow="Complete coverage" title={<>Every module, <span className="serif-em text-primary">connected</span></>} sub="Filter by area to see what each part of the platform does." />
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {["All", ...Object.keys(mods)].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={cn("relative rounded-full px-4 py-2 text-sm font-semibold transition", tab === t ? "text-ink-foreground" : "bg-card text-foreground/70 hover:text-foreground")}>
              {tab === t && <motion.span layoutId="tab" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
        <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((m) => {
              const I = catIcon[m.c as keyof typeof catIcon];
              return (
                <motion.div key={m.n} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }} className={cn(card, "flex gap-4 p-5")}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary"><I className="h-5 w-5" /></span>
                  <div className="min-w-0"><p className="font-bold">{m.n}</p><p className="mt-0.5 text-sm text-muted-foreground">{m.d}</p></div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Deep dives ---------- */
function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((b) => (
        <li key={b} className="flex gap-3 text-muted-foreground"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-soft text-primary"><Check className="h-3 w-3" strokeWidth={3} /></span>{b}</li>
      ))}
    </ul>
  );
}

function Flow() {
  const steps = [[MessageSquare, "Slack check-in received", "09:51"], [Shield, "Policy classifier", "3rd consecutive late → 0.75 day"], [CalendarDays, "Leave ledger", "Charged to casual, or waived"], [FileSpreadsheet, "Salary sheet & payslip", "Updated automatically"]] as const;
  return (
    <div className="space-y-0">
      {steps.map(([I, t, d], i) => (
        <div key={t}>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.25, duration: 0.5 }} className={cn(card, "flex items-center gap-4 p-4")}>
            <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl", i === 3 ? "bg-grad-primary text-primary-foreground" : "bg-primary-soft text-primary")}><I className="h-5 w-5" /></span>
            <div><p className="font-bold">{t}</p><p className="font-mono text-xs text-muted-foreground">{d}</p></div>
            <span className="ml-auto font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
          </motion.div>
          {i < 3 && (
            <div className="relative ml-9 h-8 w-0.5 overflow-hidden bg-border">
              <motion.div className="absolute inset-x-0 h-3 bg-accent" animate={{ y: [-12, 32] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3, ease: "linear" }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Payslip() {
  const rows = [["Basic", "96,000"], ["Allowances", "24,000"], ["Overtime", "+4,875"], ["Attendance penalty", "−2,769"], ["Income tax", "−3,150"]] as const;
  return (
    <div className={cn(card, "p-6 shadow-float")}>
      <div className="flex items-center justify-between"><p className="font-bold">Payslip · November</p><span className="font-mono text-xs text-muted-foreground">Ahmed Raza</span></div>
      <div className="mt-5 space-y-2.5 text-sm tabular-nums">
        {rows.map(([k, v], i) => (
          <motion.div key={k} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="flex justify-between">
            <span className="text-muted-foreground">{k}</span><span className={cn("font-medium", v.startsWith("−") && "text-destructive", v.startsWith("+") && "text-success")}>{v}</span>
          </motion.div>
        ))}
        <div className="flex justify-between border-t border-border pt-3 text-lg font-extrabold"><span>Net pay</span><span className="text-primary"><CountUp to={118956} /></span></div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2"><Pill tone="indigo">Bank · 80%</Pill><Pill tone="amber">Cash · 20%</Pill><Pill tone="green"><FileText className="h-3 w-3" />Transfer letter generated</Pill></div>
    </div>
  );
}

function Security() {
  const items = [[Fingerprint, "Opaque ids"], [KeyRound, "308 permissions"], [ScrollText, "Audit trail"], [Trash2, "Recycle bin"]] as const;
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {items.map(([I, t], i) => (
          <Reveal key={t} delay={i * 0.08} className={cn(card, "p-5")}><I className="h-6 w-6 text-primary" /><p className="mt-3 font-bold">{t}</p></Reveal>
        ))}
      </div>
      <div className="mt-3 overflow-x-auto rounded-2xl bg-ink p-4 font-mono text-xs text-ink-foreground">
        <span className="text-success">GET</span> /api/employees/<span className="text-accent">q3Xk9vT2mLw8RZpA0cHn_eY7</span>/payslips
      </div>
    </div>
  );
}

export function DeepDives() {
  const rows = [
    { e: "Attendance → payroll", t: "From a Slack check-in to a correct payslip, without spreadsheets.", b: ["Consecutive-late and monthly-occurrence rules with 0.75 and 1.0 day penalty bands", "Under-45-minute offsets, overtime grace and early-departure penalties", "Policies apply from a chosen month and past months recalculate", "HR approves, rejects or waives leave from the payslip review"], v: <Flow /> },
    { e: "Payroll & banks", t: "Payroll, banks and letters that match how the company really pays.", b: ["Allowance split with FY tax table", "Bank master with split payments, transfer letters and cash receipts", "Bonuses and commissions with payroll or separately", "Onboarding stays open until letters, documents and assets are done"], v: <Payslip /> },
    { e: "Security", t: "Sensitive data, protected by design.", b: ["Every public id is an AES-256-GCM encrypted token, so raw ids never leave the server", "Permissions are checked per request with record scopes, never role names", "Soft delete, recycle bin and full audit log", "Multi-tenant ready"], v: <Security /> },
  ];
  return (
    <section className="py-24">
      <div className={cn(wrap, "space-y-24")}>
        {rows.map((r, i) => (
          <div key={r.t} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className={cn(i % 2 && "lg:order-2")}>
              <Eyebrow>{r.e}</Eyebrow>
              <h3 className="mt-4 text-2xl font-extrabold leading-tight sm:text-4xl">{r.t}</h3>
              <Bullets items={r.b} />
            </Reveal>
            <div className="min-w-0">{r.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Architecture ---------- */
export function Architecture() {
  const layers = [
    [Globe, "React SPA", "web/", "React + TypeScript (Vite), Mantine UI, TanStack Query, zod forms, role-based navigation."],
    [Server, "ASP.NET Core API", "src/Eazisols.Api", "27 controllers, 68 services, JWT + permission policies, FluentValidation, background jobs and outbox."],
    [Database, "SQL Server", "EF Core", "tbl_ tables, audit fields on every row, soft-delete filters, 49 migrations."],
  ] as const;
  const integ = [[MessageSquare, "Slack", "attendance webhook & outbox"], [Zap, "SignalR", "chat & presence"], [Bell, "SMTP", "email outbox with retry"], [FileText, "Word templates", "letters & slips"], [Bot, "Claude", "receipt reading"]] as const;
  return (
    <section id="architecture" className="scroll-mt-20 px-4 py-12 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ink px-4 py-20 sm:px-12">
        <div aria-hidden className="absolute -top-40 left-1/2 h-96 w-[600px] max-w-full -translate-x-1/2 rounded-full bg-primary/50 blur-[120px]" />
        <div className="relative">
          <SectionHead dark eyebrow="Architecture" title={<>A modular monolith, kept <span className="serif-em text-accent">deliberately simple</span></>} />
          <div className="mt-14 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
            {layers.map(([I, t, p, d], i) => (
              <div key={t} className="contents">
                <Reveal delay={i * 0.15} className="flex-1 rounded-[24px] border border-ink-foreground/10 bg-ink-foreground/5 p-6 text-ink-foreground backdrop-blur">
                  <I className="h-6 w-6 text-accent" />
                  <p className="mt-4 text-lg font-bold">{t}</p>
                  <p className="font-mono text-xs text-ink-foreground/50">{p}</p>
                  <p className="mt-3 text-sm text-ink-foreground/70">{d}</p>
                </Reveal>
                {i < 2 && (
                  <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="self-center text-ink-foreground/40">
                    <ArrowRight className="hidden h-6 w-6 lg:block" /><ArrowDown className="h-6 w-6 lg:hidden" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {integ.map(([I, n, d]) => (
              <span key={n} className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/10 bg-ink-foreground/5 px-4 py-2 text-sm text-ink-foreground/80">
                <I className="h-4 w-4 text-accent" /><b className="text-ink-foreground">{n}</b><span className="text-ink-foreground/50">{d}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Journey ---------- */
export function Journey() {
  const steps = [
    ["08 Oct", "Inspect & plan", "Architecture, data model, permission catalog, policy questions"],
    ["10 Oct", "Foundation", "Auth, roles, employees, hierarchy, clients, settings, audit, app shell"],
    ["12 Oct", "Projects, attendance, leave, payroll", "Tasks, timers, schedules, leave ledger, payroll, tax, loans, payslips"],
    ["13–19 Oct", "Real data & collaboration", "Data import, internal chat, work planning, Slack attendance, universal board"],
    ["20–23 Oct", "Dashboards & policy engine", "Role dashboards, portal redesign, final attendance policy, Performance 360, hierarchy approvals"],
    ["26 Oct–2 Nov", "Sales, multi-tenancy, payments", "Commissions, sales orders, organizations & branding, bank master, tax treatment"],
    ["3–9 Nov", "Accounts & polish", "Invoicing, expense dashboard, onboarding, evaluation forms, AI receipt reading, indigo UI refresh"],
  ];
  return (
    <section id="journey" className="scroll-mt-20 py-24">
      <div className={cn(wrap, "max-w-3xl")}>
        <SectionHead eyebrow="The journey" title={<>From empty repo to <span className="serif-em text-primary">company-wide</span> platform</>} />
        <div className="relative mt-14 pl-10">
          <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.8, ease: "easeOut" }} className="absolute left-[11px] top-2 bottom-2 w-0.5 origin-top bg-gradient-to-b from-primary via-primary-glow to-accent" />
          <div className="space-y-6">
            {steps.map(([d, t, x], i) => (
              <Reveal key={t} delay={i * 0.05} className="relative">
                <span className="absolute -left-10 top-5 grid h-6 w-6 place-items-center rounded-full border-4 border-background bg-primary" />
                <div className={cn(card, "p-5")}>
                  <span className="font-mono text-xs text-accent">{d}</span>
                  <p className="mt-1 font-bold">{t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{x}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Results ---------- */
export function Results() {
  const stats = [[1, "", "system replaces 6+ spreadsheets, Slack tallies and Word files"], [7, " wks", "of Slack attendance history imported and classified"], [24, "", "connected modules, from tasks to invoices"], [438, "", "automated tests guarding payroll and policy rules"]] as const;
  const before = ["Salary sheet rebuilt by hand every month", "Late arrivals counted from Slack", "Leave balances held in memory", "Letters edited one at a time", "No view of who works on what"];
  const after = ["Payroll generated from attendance, leave and loans", "The policy engine classifies every day", "Balances kept in a ledger with an audit trail", "Letters and payslips from templates in one click", "Live board, QA queue and role dashboards"];
  return (
    <section id="results" className="scroll-mt-20 bg-muted py-24">
      <div className={wrap}>
        <SectionHead eyebrow="Results" title={<>Less copying, more <span className="serif-em text-primary">running the business</span></>} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([n, s, l], i) => (
            <Reveal key={l} delay={i * 0.08} className={cn("rounded-[24px] p-6", i === 0 ? "bg-grad-primary text-primary-foreground shadow-float" : card)}>
              <p className={cn("text-5xl font-extrabold", i ? "text-foreground" : "")}><CountUp to={n} suffix={s} /></p>
              <p className={cn("mt-3 text-sm", i ? "text-muted-foreground" : "opacity-85")}>{l}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Reveal className={cn(card, "p-7")}>
            <Pill tone="red">Before</Pill>
            <ul className="mt-5 space-y-3">{before.map((b) => <li key={b} className="flex gap-3 text-muted-foreground"><X className="h-5 w-5 shrink-0 text-destructive" />{b}</li>)}</ul>
          </Reveal>
          <Reveal delay={0.1} className={cn(card, "border-primary/30 p-7")}>
            <Pill tone="indigo">After</Pill>
            <ul className="mt-5 space-y-3">{after.map((b) => <li key={b} className="flex gap-3"><Check className="h-5 w-5 shrink-0 text-primary" />{b}</li>)}</ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA + footer ---------- */
export function Closing() {
  return (
    <>
      <section id="cta" className="scroll-mt-20 px-4 py-16 sm:px-6">
        <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-sky px-6 py-16 sm:px-14">
          <Clouds />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="text-3xl font-extrabold leading-[1.08] text-ink-foreground sm:text-5xl">Run your whole team from <span className="serif-em text-accent text-glow">one</span> place</h2>
              <p className="mt-4 max-w-lg text-ink-foreground/70">Let AI handle the busywork. Your team focuses on the real work.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://eazisols.com/contact-us" target="_blank" rel="noopener noreferrer" className="rounded-full bg-card px-6 py-3 font-semibold text-foreground transition hover:-translate-y-0.5">Book a demo →</a>
                <a href="#platform" className="rounded-full border border-ink-foreground/20 px-6 py-3 font-semibold text-ink-foreground transition hover:bg-ink-foreground/10">Explore modules</a>
              </div>
              <p className="mt-4 font-mono text-[11px] text-ink-foreground/50">Setup in minutes · Cancel anytime</p>
            </div>
            <motion.img src={mascot} alt="Workspace AI assistant pointing" loading="lazy" width={1024} height={1024}
              animate={{ y: [0, -14, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto w-56 drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)] sm:w-72" />
          </div>
        </Reveal>
      </section>
      <footer className="border-t border-border">
        <div className={cn(wrap, "flex flex-col justify-between gap-2 py-8 text-sm text-muted-foreground sm:flex-row")}>
          <p>© 2026 Eazisols · Eazisols Workspace</p>
          
        </div>
      </footer>
    </>
  );
}

export { Building2, Code2, Lock, RotateCcw, Timer };
