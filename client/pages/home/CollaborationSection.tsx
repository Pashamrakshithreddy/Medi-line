import { Button } from "@/components/ui/button";
import { WavePattern } from "@/components/graphics/WavePattern";

export const CollaborationSection = () => {
  return (
    <section className="bg-background py-24">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl bg-accent/50 p-8 shadow-soft-xl">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            <WavePattern className="mx-auto w-full" orientation="left" variant="soft" />
          </div>
        </div>
        <div className="rounded-3xl border border-border/60 bg-white p-10 shadow-soft-xl">
          <span className="text-sm font-semibold uppercase tracking-[0.4em] text-primary/70">
            Enhanced Collaboration
          </span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Enhanced Collaboration
          </h2>
          <p className="mt-5 max-w-xl text-lg text-foreground/70">
            Our system enables healthcare professionals to effortlessly share insights,
            coordinate care plans, and keep every stakeholder aligned in real time.
          </p>
          <Button className="mt-8 w-full sm:w-auto">Try It Now</Button>
        </div>
      </div>
    </section>
  );
};
