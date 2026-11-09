import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean | undefined }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider",
        dark ? "border-ink-foreground/15 bg-ink-foreground/5 text-ink-foreground/80" : "border-border bg-card text-muted-foreground shadow-soft",
      )}
    >
      <span className="h-2 w-2 rounded-full bg-accent" />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow, title, sub, center = true, dark,
}: { eyebrow: string; title: ReactNode; sub?: string; center?: boolean; dark?: boolean }) {
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2 className={cn("mt-4 text-3xl font-extrabold leading-[1.08] sm:text-5xl", dark ? "text-ink-foreground" : "text-foreground")}>{title}</h2>
      {sub && <p className={cn("mt-4 text-base sm:text-lg", dark ? "text-ink-foreground/70" : "text-muted-foreground")}>{sub}</p>}
    </Reveal>
  );
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setV(to); return; }
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref} className="tabular-nums">{v.toLocaleString()}{suffix}</span>;
}

type Tone = "green" | "amber" | "red" | "indigo" | "gray";
const tones: Record<Tone, string> = {
  green: "bg-success-soft text-success",
  amber: "bg-warning-soft text-warning",
  red: "bg-danger-soft text-destructive",
  indigo: "bg-primary-soft text-primary",
  gray: "bg-muted text-muted-foreground",
};
export function Pill({ tone = "gray", children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap", tones[tone], className)}>{children}</span>;
}

export function Clouds({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-grid" />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-[38%] aspect-square w-[60vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30"
          animate={reduce ? {} : { scale: [0.6, 1.4], opacity: [0.6, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: i * 2, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export const card = "rounded-[24px] border border-border bg-card shadow-soft";
