import { AnimatedNumber } from "@/components/common/AnimatedNumber";
import { Button } from "@/components/ui/button";

const TEAM_IMAGE =
  "https://images.unsplash.com/photo-1583911860205-72ee04a00b66?auto=format&fit=crop&w=1100&q=80";

export const TeamSection = () => {
  return (
    <section className="bg-background pb-24 pt-10">
      <div className="container grid gap-16 xl:grid-cols-[minmax(0,1fr)_480px] xl:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-primary/70">
            Our team
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Our team is a powerhouse of talent, creativity, and collaboration
          </h2>
          <p className="max-w-2xl text-lg text-foreground/70">
            Powered by multidisciplinary specialists, Medi-Link connects physicians, care
            coordinators, and researchers so patients receive cohesive, compassionate care.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-border/60 bg-white p-6 shadow-soft-xl">
              <p className="text-4xl font-semibold text-foreground">
                <AnimatedNumber value={200} suffix="+" />
              </p>
              <p className="mt-2 text-sm text-foreground/70">Care for humans every day</p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-white p-6 shadow-soft-xl">
              <p className="text-4xl font-semibold text-foreground">
                <AnimatedNumber value={1000} suffix="+" />
              </p>
              <p className="mt-2 text-sm text-foreground/70">Medical specialists recruited</p>
            </div>
          </div>
          <Button size="lg" className="mt-6 w-full sm:w-auto">
            Join Now
          </Button>
        </div>
        <div className="relative mx-auto w-full max-w-[480px]">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-hero-wave-alt bg-cover bg-no-repeat opacity-80 blur-[56px]" />
          <img
            src={TEAM_IMAGE}
            alt="Medical professionals collaborating"
            className="relative z-10 w-full rounded-[2.5rem] border border-white/40 object-cover shadow-floating"
          />
          <div className="absolute -bottom-10 left-8 right-8 rounded-3xl border border-border/60 bg-white p-6 shadow-soft-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
              Unified care platform
            </p>
            <p className="mt-2 text-base text-foreground/80">
              Teams across locations coordinate treatment plans in one secure workspace.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
