import { useEffect } from "react";

export function FilloutEmbed() {
  useEffect(() => {
    const id = "fillout-embed-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://server.fillout.com/embed/v1/";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="text-center">
        <div className="text-xs uppercase tracking-[0.25em] text-primary">Reserve Your Slot</div>
        <h2 className="mt-2 font-display text-4xl md:text-5xl">
          Book a <span className="text-gradient-red">Test Ride</span>
        </h2>
        <p className="mt-3 text-muted-foreground">Fill out the form — we'll confirm in under 2 hours.</p>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-card sm:p-4">
        <div
          style={{ width: "100%", height: "500px" }}
          data-fillout-id="rLu4rCj1w3us"
          data-fillout-embed-type="standard"
          data-fillout-inherit-parameters
          data-fillout-dynamic-resize
        />
      </div>
    </section>
  );
}
