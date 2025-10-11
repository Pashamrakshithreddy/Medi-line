import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { WavePattern } from "@/components/graphics/WavePattern";

export type PagePlaceholderProps = {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export const PagePlaceholder = ({
  title,
  description,
  ctaLabel,
  ctaHref,
}: PagePlaceholderProps) => {
  return (
    <section className="relative isolate overflow-hidden bg-background py-24 sm:py-28">
      <div className="absolute -left-16 -top-20 opacity-60 blur-sm sm:w-72">
        <WavePattern orientation="left" variant="soft" />
      </div>
      <div className="absolute -right-12 top-1/3 hidden opacity-60 blur-sm lg:block">
        <WavePattern orientation="right" variant="soft" />
      </div>
      <div className="container relative z-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-primary/70">
            Coming Soon
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-lg text-foreground/70">
            {description}
          </p>
          {ctaLabel && ctaHref ? (
            <Button asChild size="default" className="w-full sm:w-auto">
              <Link to={ctaHref}>{ctaLabel}</Link>
            </Button>
          ) : null}
        </div>
        <div className="hidden lg:block">
          <div className="rounded-3xl bg-white/80 p-6 shadow-soft-xl backdrop-blur">
            <WavePattern className="w-[240px]" orientation="right" />
          </div>
        </div>
      </div>
    </section>
  );
};
