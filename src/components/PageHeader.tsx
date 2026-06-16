export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="border-b border-border bg-gradient-hero py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h1 className="font-display text-5xl tracking-wide md:text-6xl">
          {title.split(" ").map((w, i, arr) =>
            i === arr.length - 1 ? (
              <span key={i} className="text-gradient-red">{w}</span>
            ) : (
              <span key={i}>{w} </span>
            )
          )}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
