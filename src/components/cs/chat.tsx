import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CheckCheck, Hash, Paperclip, Plus, Search, Send, Settings, Users } from "lucide-react";
import { Eyebrow, Reveal } from "./primitives";
import { cn } from "@/lib/utils";

type Person = { n: string; role: string; s: "online" | "away" | "offline"; seen?: string };
const people: Person[] = [
  { n: "Abdul Qadeer", role: "Team Lead · Development", s: "online" },
  { n: "Hafiz Abdul Rehman", role: "SQA Engineer · Development", s: "away" },
  { n: "Ahmad Akram", role: "Flutter Developer · Development", s: "online" },
  { n: "Hamza Younas", role: "Python Developer · Development", s: "offline", seen: "5 min ago" },
  { n: "Danish Hussain", role: "BD Executive · Business Dev", s: "offline", seen: "Sat, 07 Nov" },
  { n: "Muhammad Asad", role: "Chief Executive Officer", s: "offline", seen: "Fri, 06 Nov" },
];

const convos = [
  { n: "#dev-dmv", group: true, last: "Hafiz: QA build is green", t: "11:42", unread: 3 },
  { n: "Abdul Qadeer", last: "Can you pick EAZ-152?", t: "11:20", unread: 1 },
  { n: "#hr-announcements", group: true, last: "Payroll closes on 28 Nov", t: "10:05" },
  { n: "Ahmad Akram", last: "Pushed the login fix", t: "Yesterday" },
];

const thread = [
  { me: false, who: "Abdul Qadeer", t: "11:31", m: "DMV milestone 1 is due 30 Nov. Where are we on EAZ-148?" },
  { me: true, who: "You", t: "11:33", m: "API auth is merged. Moving it to QA now." },
  { me: false, who: "Hafiz Abdul Rehman", t: "11:38", m: "Picked it up. Running the regression suite on staging." },
  { me: false, who: "Hafiz Abdul Rehman", t: "11:42", m: "QA build is green. 42 of 42 checks passed.", file: "dmv-regression-report.pdf" },
  { me: true, who: "You", t: "11:43", m: "Great. Closing EAZ-148 and updating the client thread." },
];

type Msg = { me: boolean; who: string; t: string; m: string; file?: string };
const others: Record<string, Msg[]> = {
  "Abdul Qadeer": [
    { me: false, who: "Abdul Qadeer", t: "11:18", m: "Hira is on leave tomorrow. Can you pick EAZ-152?" },
    { me: true, who: "You", t: "11:20", m: "Sure, assigning it to myself now." },
  ],
  "#hr-announcements": [
    { me: false, who: "Muhammad Asad", t: "10:05", m: "Payroll closes on 28 Nov. Please submit pending leave and overtime by 26 Nov." },
    { me: false, who: "Muhammad Asad", t: "10:06", m: "Payslips will be on the portal on 1 Dec.", file: "payroll-calendar-nov.pdf" },
  ],
  "Ahmad Akram": [
    { me: false, who: "Ahmad Akram", t: "Yesterday", m: "Pushed the login fix to staging." },
    { me: true, who: "You", t: "Yesterday", m: "Thanks, moving EAZ-150 to QA." },
  ],
};

const dot = { online: "bg-success", away: "bg-accent", offline: "bg-muted-foreground/50" };
const initials = (n: string) => n.replace("#", "").split(/[\s-]/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

function Avatar({ n, s, group }: { n: string; s?: Person["s"] | undefined; group?: boolean | undefined }) {
  return (
    <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
      {group ? <Hash className="h-4 w-4" /> : initials(n)}
      {s && <span className={cn("absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card", dot[s])} />}
    </span>
  );
}

export function InternalChat() {
  const [tab, setTab] = useState<"c" | "p">("c");
  const [active, setActive] = useState("#dev-dmv");
  const live = active === "#dev-dmv";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? thread.length : 1);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView || reduce) return;
    if (shown >= thread.length) {
      const r = setTimeout(() => setShown(1), 4500);
      return () => clearTimeout(r);
    }
    setTyping(true);
    const t = setTimeout(() => { setTyping(false); setShown((s) => s + 1); }, 1500);
    return () => clearTimeout(t);
  }, [inView, shown, reduce]);

  return (
    <section id="chat" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Internal chat</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] sm:text-5xl">
            Talk where the <span className="serif-em text-primary">work lives.</span>
          </h2>
          <p className="mt-3 text-muted-foreground sm:text-lg">Direct messages, team channels and live presence, built in. Every ticket, file and decision stays next to the people who made it.</p>
        </Reveal>

        <Reveal className="mt-12">
          <div ref={ref} className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-2xl md:grid-cols-[300px_1fr]">
            {/* Sidebar */}
            <aside className="border-b border-border md:border-b-0 md:border-r">
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-bold">Messages</p>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="h-2 w-2 rounded-full bg-success" />Online</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-border"><Search className="h-3.5 w-3.5" /></span>
                  <span className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"><Plus className="h-3.5 w-3.5" />New</span>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="mx-4 grid grid-cols-2 rounded-lg bg-muted p-1 text-xs font-semibold">
                {(["c", "p"] as const).map((k) => (
                  <button key={k} type="button" onClick={() => setTab(k)} className={cn("rounded-md py-1.5 transition", tab === k ? "bg-card shadow-sm" : "text-muted-foreground")}>
                    {k === "c" ? "Conversations" : "People"}
                  </button>
                ))}
              </div>
              <ul className="mt-3 max-h-[420px] overflow-hidden pb-3">
                {tab === "c"
                  ? convos.map((c) => (
                      <li key={c.n} onClick={() => setActive(c.n)} className={cn("flex cursor-pointer items-center gap-3 px-4 py-2.5 transition hover:bg-muted", active === c.n && "bg-primary/10")}>
                        <Avatar n={c.n} group={c.group} {...(c.group ? {} : { s: "online" as const })} />
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between text-sm"><span className="truncate font-semibold">{c.n}</span><span className="font-mono text-[10px] text-muted-foreground">{c.t}</span></div>
                          <p className="truncate text-xs text-muted-foreground">{c.last}</p>
                        </div>
                        {c.unread && active !== c.n && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">{c.unread}</span>}
                      </li>
                    ))
                  : people.map((p) => (
                      <li key={p.n} className="flex items-center gap-3 px-4 py-2.5">
                        <Avatar n={p.n} s={p.s} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{p.n}</p>
                          <p className="truncate text-xs text-muted-foreground">{p.role}</p>
                          <p className="text-[11px] text-muted-foreground">{p.s === "offline" ? `Last seen ${p.seen}` : p.s === "away" ? "Away" : "Online"}</p>
                        </div>
                      </li>
                    ))}
              </ul>
            </aside>

            {/* Thread */}
            <div className="flex min-h-[520px] flex-col bg-muted/40">
              <header className="flex items-center justify-between border-b border-border bg-card px-5 py-3">
                <div className="flex items-center gap-3">
                  <Avatar n={active} group={active.startsWith("#")} />
                  <div>
                    <p className="text-sm font-bold">{active}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground"><Users className="h-3 w-3" />{live ? "6 members · linked to project DMV" : active.startsWith("#") ? "42 members" : "Direct message"}</p>
                  </div>
                </div>
                <span className="hidden rounded-full border border-border bg-muted px-3 py-1 font-mono text-[10px] text-muted-foreground sm:inline">EAZ-148 · QA</span>
              </header>

              <div className="flex-1 space-y-3 overflow-hidden p-5">
                <AnimatePresence initial={false}>
                  {(live ? thread.slice(0, shown) : (others[active] ?? [])).map((m, i) => (
                    <motion.div key={active + i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={cn("flex gap-2.5", m.me && "flex-row-reverse")}>
                      {!m.me && <Avatar n={m.who} />}
                      <div className={cn("max-w-[78%]", m.me && "text-right")}>
                        <p className="mb-1 text-[11px] text-muted-foreground">{m.who} · {m.t}</p>
                        <div className={cn("inline-block rounded-2xl px-4 py-2.5 text-left text-sm", m.me ? "rounded-tr-sm bg-primary text-primary-foreground" : "rounded-tl-sm border border-border bg-card")}>
                          {m.m}
                          {m.file && (
                            <span className="mt-2 flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs text-foreground"><Paperclip className="h-3.5 w-3.5" />{m.file}<span className="text-muted-foreground">186 KB</span></span>
                          )}
                        </div>
                        {m.me && <p className="mt-1 flex items-center justify-end gap-1 text-[10px] text-primary"><CheckCheck className="h-3 w-3" />Seen</p>}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {live && typing && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex gap-1">{[0, 1, 2].map((d) => <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-primary" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }} />)}</span>
                    {thread[shown]?.who === "You" ? "You are" : `${thread[shown]?.who} is`} typing
                  </motion.p>
                )}
              </div>

              <div className="flex items-center gap-2 border-t border-border bg-card p-3">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">Message {active}</span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"><Send className="h-4 w-4" /></span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
