import { Award, ShieldCheck, Stethoscope } from "lucide-react";

import { AnimatedNumber } from "@/components/common/AnimatedNumber";

const CONSULT_OFFICE_IMAGE =
  "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1100&q=80";

const features = [
  {
    title: "25+ years experience",
    description:
      "Trusted practices shaped by decades of clinical expertise and patient-first innovation.",
    icon: Award,
  },
  {
    title: "Advanced medical safeguards",
    description:
      "Enterprise-grade security keeps health records protected while empowering rapid collaboration.",
    icon: ShieldCheck,
  },
  {
    title: "Our dedicated medical team",
    description:
      "Board-certified physicians, nurses, and specialists partnering with you across every care moment.",
    icon: Stethoscope,
  },
];

export const WhyChooseSection = () => {
  return (
    <section className="bg-background py-24">
      <div className="container grid gap-16 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center">
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-primary/70">
              Why choose Medi-Link
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              Here&apos;s what makes us different from conventional clinics
            </h2>
            <p className="max-w-2xl text-lg text-foreground/70">
              At Medi-Link we are passionate about improving lives through thoughtful technology,
              personalized care, and a connected network of experts.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-border/60 bg-white p-8 shadow-soft-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Years of trust
              </p>
              <p className="mt-4 text-4xl font-semibold text-foreground">
                <AnimatedNumber value={25} suffix="+" />
              </p>
              <p className="mt-2 text-sm text-foreground/70">
                Serving communities with compassionate, data-driven care.
              </p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-white p-8 shadow-soft-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Specialists network
              </p>
              <p className="mt-4 text-4xl font-semibold text-foreground">
                <AnimatedNumber value={180} suffix="+" />
              </p>
              <p className="mt-2 text-sm text-foreground/70">
                Certified specialists collaborating through our secure platform.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {features.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-border/60 bg-white p-6 shadow-soft-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/60 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm text-foreground/70">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[460px]">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-hero-wave bg-cover bg-no-repeat opacity-80 blur-3xl" />
          <img
            src={CONSULT_OFFICE_IMAGE}
            alt="Doctor discussing results with patient"
            className="relative z-10 w-full rounded-[2.5rem] border border-white/40 object-cover shadow-floating"
          />
        </div>
      </div>
    </section>
  );
};
