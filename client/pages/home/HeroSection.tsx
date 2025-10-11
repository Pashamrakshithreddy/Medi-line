import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WavePattern } from "@/components/graphics/WavePattern";

const HERO_DOCTOR_IMAGE =
  "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=800";
const CONSULT_IMAGE =
  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background pb-20 pt-28">
      <div className="absolute -left-20 top-0 hidden w-72 opacity-70 blur-[2px] lg:block">
        <WavePattern orientation="left" variant="soft" />
      </div>
      <div className="absolute -right-24 top-24 hidden w-64 rotate-12 opacity-70 lg:block">
        <WavePattern orientation="right" />
      </div>
      <div className="container relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-primary/70">
                Healthcare reimagined
              </p>
              <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Get high-quality service with quality medicine
              </h1>
              <p className="max-w-xl text-lg text-foreground/70">
                Take control of your health and experience the benefits of healthcare with
                our platform.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="shadow-floating">
                About Us
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary bg-white/80 text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Book An Appointment
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-hero-wave-alt bg-cover bg-no-repeat blur-3xl" />
            <img
              src={HERO_DOCTOR_IMAGE}
              alt="Compassionate female doctor smiling with stethoscope"
              className="relative z-10 w-full rounded-[2.5rem] border border-white/40 object-cover shadow-soft-xl"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
          <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 shadow-floating">
            <span className="text-sm uppercase tracking-[0.4em] text-primary-foreground/80">
              New client
            </span>
            <p className="mt-6 text-5xl font-semibold">
              <span>320</span>
            </p>
            <p className="mt-3 text-sm text-primary-foreground/80">Care with</p>
            <Button
              variant="outline"
              className="mt-8 w-full border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary"
            >
              Services
              <ArrowRight className="h-4 w-4" />
            </Button>
            <div className="absolute -right-10 -top-16 hidden w-40 opacity-70 lg:block">
              <WavePattern orientation="right" variant="soft" />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <figure className="group overflow-hidden rounded-3xl border border-border/60 bg-white shadow-soft-xl">
              <img
                src={CONSULT_IMAGE}
                alt="Doctor and patient collaborating in a consultation"
                className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                  Collaboration
                </p>
                <p className="mt-3 text-lg font-semibold text-foreground">
                  Keep your care teams aligned at every touchpoint
                </p>
              </figcaption>
            </figure>
            <div className="flex flex-col justify-between rounded-3xl border border-border/60 bg-white p-8 shadow-soft-xl">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                  Virtual consultation
                </p>
                <h3 className="text-2xl font-semibold text-foreground">
                  Easily care with virtual consultation during your schedule
                </h3>
                <p className="text-foreground/70">
                  Access board-certified doctors with secure, real-time video visits from
                  anywhere.
                </p>
              </div>
              <Button
                variant="outline"
                className="mt-8 border-2 border-primary/50 bg-white hover:bg-primary hover:text-primary-foreground"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
