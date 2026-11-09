import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Send, Sparkles, X } from "lucide-react";
import mascot from "@/assets/mascot-teal-cut.png";

const qa = [
  ["Who's late today?", "2 people checked in after 09:15. Ayesha Khan and Bilal Siddiqui."],
  ["Is November payroll ready?", "Yes. 42 payslips are drafted and waiting for your review."],
  ["Which project is at risk?", "Mobile app is at 52% with 6 days to its milestone."],
];

export function AiWidget() {
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [msgs, setMsgs] = useState<{ me: boolean; t: string }[]>([{ me: false, t: "Hi! Ask me anything about your team." }]);
  const [typing, setTyping] = useState(false);

  useEffect(() => { const t = setTimeout(() => setBubble(true), 2500); return () => clearTimeout(t); }, []);

  const ask = (q: string, a: string) => {
    setMsgs((m) => [...m, { me: true, t: q }]);
    setTyping(true);
    setTimeout(() => { setTyping(false); setMsgs((m) => [...m, { me: false, t: a }]); }, 1100);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[min(340px,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-border bg-card shadow-float">
            <div className="flex items-center gap-3 bg-ink p-4 text-ink-foreground">
              <img src={mascot} alt="" width={40} height={40} className="h-10 w-10 rounded-full bg-card object-cover object-top" />
              <div className="flex-1"><p className="text-sm font-bold">Workspace AI</p><p className="flex items-center gap-1 text-[11px] text-accent"><span className="h-1.5 w-1.5 rounded-full bg-accent" />Online · demo</p></div>
              <button aria-label="Close" onClick={() => setOpen(false)}><X className="h-4 w-4" /></button>
            </div>
            <div className="flex max-h-72 flex-col gap-2 overflow-y-auto p-4 text-sm">
              {msgs.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className={m.me ? "ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground" : "max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2"}>{m.t}</motion.div>
              ))}
              {typing && (
                <div className="flex w-fit gap-1 rounded-2xl bg-muted px-3 py-3">
                  {[0, 1, 2].map((d) => <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-muted-foreground" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }} />)}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 border-t border-border p-3">
              {qa.map(([q, a]) => (
                <button key={q} onClick={() => ask(q!, a!)} className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium transition hover:border-primary hover:text-primary">
                  <Sparkles className="h-3 w-3" />{q}
                </button>
              ))}
              <div className="mt-1 flex w-full items-center gap-2 rounded-full bg-muted px-3 py-2 text-xs text-muted-foreground">Ask anything…<Send className="ml-auto h-3.5 w-3.5" /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-end gap-2">
        <AnimatePresence>
          {bubble && !open && (
            <motion.button onClick={() => setOpen(true)} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="hidden max-w-56 rounded-2xl rounded-br-sm border border-border bg-card px-3 py-2 text-left text-xs shadow-float sm:block">
              Welcome back! Anything I can help with today?
            </motion.button>
          )}
        </AnimatePresence>
        <motion.button aria-label="Open AI assistant" onClick={() => setOpen((o) => !o)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
          className="relative grid h-14 w-14 place-items-center rounded-full bg-ink shadow-float ring-2 ring-primary">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
          <img src={mascot} alt="" width={48} height={48} className="relative h-12 w-12 rounded-full bg-card object-cover object-top" />
        </motion.button>
      </div>
    </div>
  );
}
