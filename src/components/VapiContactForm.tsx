import { useState } from "react";
import { Phone, User, Loader2, CheckCircle2 } from "lucide-react";

export function VapiContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      let formattedPhone = phone.trim();
      if (!formattedPhone.startsWith("+")) {
        // If it's a 10 digit Indian number, add +91
        if (formattedPhone.length === 10) {
          formattedPhone = "+91" + formattedPhone;
        } else if (formattedPhone.length === 11 && formattedPhone.startsWith("0")) {
          // If it starts with 0 and has 11 digits
          formattedPhone = "+91" + formattedPhone.substring(1);
        } else {
          // Fallback, just prepend + (might not be correct for all)
          formattedPhone = "+" + formattedPhone;
        }
      }

      const response = await fetch("https://api.vapi.ai/call/phone", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_VAPI_PRIVATE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assistantId: import.meta.env.VITE_VAPI_ASSISTANT_ID,
          phoneNumberId: import.meta.env.VITE_VAPI_PHONE_NUMBER_ID,
          customer: {
            number: formattedPhone,
            name: name,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Vapi Error:", errorData);
        throw new Error(errorData || "Failed to trigger call");
      }

      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "An unknown error occurred");
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="text-center">
        <div className="text-xs uppercase tracking-[0.25em] text-primary">Get in touch</div>
        <h2 className="mt-2 font-display text-4xl md:text-5xl">
          Have any questions about your <span className="text-gradient-red">order</span>?
        </h2>
        <p className="mt-3 text-muted-foreground">Or feedback about our service? We'd love to hear from you.</p>
      </div>

      <div className="mx-auto mt-10 max-w-md overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card">
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="font-display text-2xl">You're on the list!</h3>
            <p className="text-muted-foreground mt-2">Our AI Agent is calling you right now. Please answer your phone.</p>
            <button
              onClick={() => {
                setStatus("idle");
                setName("");
                setPhone("");
              }}
              className="mt-6 text-sm text-primary hover:underline"
            >
              Submit another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-lg border border-border bg-background p-2.5 pl-10 text-foreground focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full rounded-lg border border-border bg-background p-2.5 pl-10 text-foreground focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Include your country code (e.g. +91)</p>
            </div>

            {status === "error" && (
              <div className="text-sm text-red-500 mt-2 p-3 bg-red-50 rounded-lg border border-red-100">
                <p className="font-semibold mb-1">There was an error triggering the call:</p>
                <p className="font-mono text-xs break-words">{errorMessage}</p>
                <p className="mt-2 text-xs text-red-400">Please make sure the phone number is valid and your account has enough credits.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Call Me Now"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
