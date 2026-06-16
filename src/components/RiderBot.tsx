import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { products, formatPrice } from "@/data/products";

type Msg = { role: "bot" | "user"; text: string };

const greet: Msg = {
  role: "bot",
  text: "Hi! I'm RiderBot AI 🏍️ — your personal bike advisor. Tell me your budget or ask about mileage, EMI, or a test ride!",
};

function reply(input: string): string {
  const q = input.toLowerCase();
  const budget = q.match(/\d[\d,]{3,}/)?.[0]?.replace(/,/g, "");
  if (budget) {
    const b = parseInt(budget);
    const matches = products.filter((p) => p.price <= b);
    if (matches.length) {
      return `Within ${formatPrice(b)}, I'd recommend: ${matches
        .map((p) => `${p.name} (${formatPrice(p.price)})`)
        .join(", ")}. Want to book a test ride?`;
    }
    return `Our entry models start at ${formatPrice(78000)}. Try increasing your budget a bit!`;
  }
  if (q.includes("mileage")) return "Our scooters offer up to 50 kmpl, and the TVS Apache RTR 160 delivers around 45 kmpl. 🚀";
  if (q.includes("emi") || q.includes("finance")) return "We offer EMIs from ₹2,500/month with 0% down payment options. Check our EMI calculator page!";
  if (q.includes("test")) return "Awesome! Head to the 'Book Test Ride' page and pick your favorite model. We'll confirm in under 2 hours.";
  if (q.includes("electric")) return "Electric scooters arriving soon at RideZone! Stay tuned. ⚡";
  if (q.includes("price") || q.includes("cost")) return `Our range starts at ${formatPrice(78000)} (TVS Jupiter) and goes up to ${formatPrice(193000)} (Royal Enfield Classic 350).`;
  if (q.includes("hi") || q.includes("hello")) return "Hey rider! 👋 What are you looking for — a daily commuter, a sports bike, or a cruiser?";
  return "Great question! For details, you can browse our Bikes & Scooters pages, or visit the showroom. Anything else I can help with?";
}

export function RiderBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([greet]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: reply(text) }]);
    }, 500);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-red shadow-glow transition-transform hover:scale-110"
        aria-label="Open RiderBot AI"
      >
        {open ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[480px] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-xl border border-border bg-card shadow-glow">
          <div className="flex items-center gap-3 border-b border-border bg-gradient-red px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background/20">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-semibold text-primary-foreground">RiderBot AI</div>
              <div className="text-[10px] text-primary-foreground/80">Online • Replies instantly</div>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="flex gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about bikes, EMI..."
              className="flex-1 rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              onClick={send}
              className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-red text-primary-foreground"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
