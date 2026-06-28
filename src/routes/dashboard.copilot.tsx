import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, User, Wand2 } from "lucide-react";

export const Route = createFileRoute("/dashboard/copilot")({
  head: () => ({
    meta: [
      { title: "Copilot — SBI OneAI" },
      { name: "description", content: "Ask the OneAI Copilot anything about your money." },
    ],
  }),
  component: CopilotPage,
});

type Msg = { id: string; role: "user" | "assistant"; content: string };

const seed: Msg[] = [
  {
    id: "m1",
    role: "assistant",
    content:
      "Hi Arjun. I'm OneAI — your Financial Copilot. I've reviewed your Twin: health 824, 5 active goals, ₹38.4k saved this month. What would you like to plan?",
  },
];

const suggestions = [
  "Can I afford a ₹12L car?",
  "When will I reach my home down payment?",
  "How is my emergency fund doing?",
  "Should I increase my monthly SIP?",
];

// Lightweight rule-based reply generator for demo (no backend dependency)
function generateReply(q: string): string {
  const t = q.toLowerCase();
  if (t.includes("car") || t.includes("vehicle")) {
    return "On your current cashflow, a ₹12L car (₹2L down + ₹22.4k EMI for 5 yr at 9.1%) would push your Home Down Payment goal out by 11 months. A pre-owned ₹6L option or 3-yr lease keeps you on track. Want me to simulate both?";
  }
  if (t.includes("home") || t.includes("down payment")) {
    return "At ₹35k/month, you reach the ₹25L Home Down Payment by Jun 2029 — 4 months ahead of your deadline. Bumping the SIP by ₹3k or routing your annual bonus would pull this to Feb 2029.";
  }
  if (t.includes("emergency")) {
    return "Your emergency fund sits at ₹4.2L — about 4.2 months of expenses. Target is 6 months (₹6L). Holding the current ₹12k/month pace gets you there by Dec 2026. I'd prioritise this before any discretionary purchase above ₹50k.";
  }
  if (t.includes("sip") || t.includes("invest")) {
    return "Yes — a ₹2,500 increase to your Bluechip SIP would not affect monthly liquidity (your buffer is ₹18k) and can bring the Down Payment goal 8 months closer. Shall I schedule it from next debit?";
  }
  if (t.includes("phone") || t.includes("iphone")) {
    return "A ₹1.2L phone today delays your Goa Trip by 3 months and your Down Payment timeline shifts by ~3 months. Splitting into 6 EMIs at 0% (your card supports it) keeps every goal intact.";
  }
  if (t.includes("tax") || t.includes("80c")) {
    return "Your 80C bucket has ₹62,400 of headroom this FY. A 5-yr Tax Saver FD or ELSS top-up before March would save up to ₹19.4k in tax at your slab.";
  }
  return "I'll project that against your Twin. Based on current cashflow and goals, the safest path is to keep your top-priority goal (Emergency Fund) on schedule and route ~30% of any surplus to it. Want me to model a specific scenario in the What-If engine?";
}

function CopilotPage() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scroll = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scroll.current?.scrollTo({ top: scroll.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || thinking) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);
    setTimeout(
      () => {
        setMessages((m) => [
          ...m,
          { id: crypto.randomUUID(), role: "assistant", content: generateReply(content) },
        ]);
        setThinking(false);
        setTimeout(() => inputRef.current?.focus(), 0);
      },
      700 + Math.random() * 500,
    );
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-primary-glow">
            <Sparkles className="h-3 w-3" /> OneAI Copilot
          </div>
          <h1 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
            Plan out loud. Your Twin listens.
          </h1>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-success sm:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> Twin active
        </span>
      </div>

      <div className="card-elevated flex flex-1 min-h-0 flex-col rounded-2xl p-2">
        <div ref={scroll} className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((m) => (
            <Bubble key={m.id} msg={m} />
          ))}
          {thinking && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-primary-glow" />
              OneAI is reviewing your Twin…
            </div>
          )}
        </div>

        {messages.length <= 1 && (
          <div className="border-t border-border px-4 pt-3">
            <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Try asking
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-surface hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="m-2 flex items-end gap-2 rounded-xl border border-border bg-background/60 p-2"
        >
          <textarea
            ref={inputRef}
            value={input}
            rows={1}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask about goals, spending, products, or what-if scenarios…"
            className="max-h-32 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-opacity disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
          isUser
            ? "bg-surface text-foreground"
            : "bg-gradient-to-br from-primary to-accent text-primary-foreground"
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Wand2 className="h-4 w-4" />}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-primary/15 text-foreground"
            : "border border-border bg-background/60 text-foreground/90"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}
