import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  CalendarClock,
  CheckCircle2,
  FileDigit,
  HeartPulse,
  Lock,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Upload,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AnimatedNumber } from "@/components/common/AnimatedNumber";

const howItWorks = [
  {
    title: "Upload Records",
    description:
      "Store all your medical reports, prescriptions, and test results in one fortified vault accessible anywhere.",
    icon: Upload,
    actionLabel: "Get Started",
    href: "/patient-portal",
  },
  {
    title: "Guardian Bridge",
    description:
      "Emergency contacts verify doctor access in seconds with full oversight and audit-ready transparency.",
    icon: ShieldCheck,
    actionLabel: "Learn More",
    href: "/patient-portal",
  },
  {
    title: "Instant Access",
    description:
      "Verified physicians review complete patient history within 60 seconds—no faxes, no delays, just care.",
    icon: Stethoscope,
    actionLabel: "Doctor Login",
    href: "/doctor-access",
  },
];

const securityFeatures = [
  {
    title: "Two-Factor Authentication",
    description: "Bank-level MFA on every login and access request.",
    icon: Lock,
  },
  {
    title: "Emergency Override Protocol",
    description:
      "Guardrails for life-threatening moments with automatic expiry and guardian alerts.",
    icon: ShieldAlert,
  },
  {
    title: "Complete Audit Trail",
    description: "Every touch logged, timestamped, and reviewable in real time.",
    icon: FileDigit,
  },
  {
    title: "Patient Control",
    description: "You decide who sees what, when, and for how long.",
    icon: Users,
  },
];

export default function About() {
  return (
    <div className="flex flex-col gap-24 bg-gradient-to-b from-background via-background/90 to-secondary/30 pb-24">
      <section className="relative overflow-hidden px-4 pt-12 sm:pt-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.18)_0,_transparent_55%)]" />
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary shadow-sm">
              Universal Health ID Platform
            </Badge>
            <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Medi-Link connects your entire medical history to the people who need it—securely, instantly, everywhere.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Patients control the keys. Doctors receive a complete picture in under a minute. Guardians authorize lifesaving access when every second counts.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl">
                <Link to="/patient-portal">
                  Patient Login
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-primary/40 px-8 text-primary hover:bg-primary/10"
              >
                <Link to="/doctor-access">
                  Doctor Access
                  <ShieldCheck className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="rounded-3xl border border-info/30 bg-info/10 px-6 py-4 text-sm text-info shadow-sm">
              <span className="font-semibold text-info/90">
                Your Health ID: One Number. Complete History. Anywhere. Anytime.
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-wide text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
                HIPAA &amp; SOC 2 Type II compliant
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                Guardian Bridge emergency protection
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-warning" aria-hidden="true" />
                AI insights across every record
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -z-10 blur-3xl" aria-hidden="true">
              <div className="mx-auto h-full w-3/4 rounded-full bg-primary/30" />
            </div>
            <Card className="relative overflow-hidden rounded-[28px] border border-primary/20 bg-background/95 shadow-2xl backdrop-blur">
              <CardHeader className="space-y-3">
                <CardTitle className="text-xl font-semibold text-foreground">
                  Unified Care Snapshot
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Real-time vitals, AI summaries, and emergency readiness in one secure console.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-sm">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-primary">
                    <p className="text-xs uppercase tracking-wide text-primary/70">
                      Status
                    </p>
                    <p className="mt-1 text-lg font-semibold">Guardian Bridge Ready</p>
                  </div>
                  <div className="rounded-2xl border border-success/30 bg-success/10 p-4 text-success">
                    <p className="text-xs uppercase tracking-wide text-success/70">
                      Health Score
                    </p>
                    <p className="mt-1 text-lg font-semibold">82%</p>
                  </div>
                </div>
                <Separator className="bg-border/50" />
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Key Metrics
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-success/20 bg-success/10 p-3 text-success">
                      <HeartPulse className="mb-2 h-4 w-4" aria-hidden="true" />
                      <p className="text-xs text-success/70">Heart Rate</p>
                      <p className="text-lg font-semibold">72 BPM</p>
                    </div>
                    <div className="rounded-2xl border border-warning/20 bg-warning/10 p-3 text-warning">
                      <CalendarClock className="mb-2 h-4 w-4" aria-hidden="true" />
                      <p className="text-xs text-warning/70">Blood Pressure</p>
                      <p className="text-lg font-semibold">128/84</p>
                    </div>
                    <div className="rounded-2xl border border-info/20 bg-info/10 p-3 text-info">
                      <Brain className="mb-2 h-4 w-4" aria-hidden="true" />
                      <p className="text-xs text-info/70">Glucose</p>
                      <p className="text-lg font-semibold">108 mg/dL</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-border/60 bg-muted/40 p-4 text-muted-foreground">
                  "Medi-Link helped me grant ER doctors access in under a minute. They saw my allergies before prescribing anything." — Priya, San Francisco
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-4">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <div className="flex flex-col gap-4 text-center">
            <Badge className="mx-auto w-fit rounded-full bg-secondary/70 text-primary">
              How Medi-Link Works
            </Badge>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              One secure ID, three powerful experiences
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
              Patients stay in control, guardians accelerate emergency approvals, and doctors receive a complete history the moment care begins.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map((item) => (
              <Card
                key={item.title}
                className="group relative h-full overflow-hidden rounded-3xl border border-border/60 bg-background/90 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <CardHeader className="space-y-4">
                  <div className="w-fit rounded-full bg-primary/10 p-3 text-primary">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <div className="absolute inset-0 -z-10 bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardContent>
                  <Button
                    asChild
                    variant="ghost"
                    className="rounded-full px-0 text-primary hover:bg-primary/10"
                  >
                    <Link to={item.href}>
                      {item.actionLabel}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="px-4">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div className="space-y-5">
              <Badge className="w-fit rounded-full bg-primary/10 text-primary">
                Security First
              </Badge>
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
                Bank-Level Security Meets Life-Saving Access
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Medi-Link combines zero-trust permissions, guardian-controlled overrides, and live auditing so every record stays under your command—even in a crisis.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-success">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  AES-256 encrypted at rest &amp; in transit
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-warning/10 px-3 py-1 text-warning">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Guardian hotline escalation
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-info/10 px-3 py-1 text-info">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  AI anomaly detection
                </span>
              </div>
            </div>
            <div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-xl backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground/80">
                    Emergency override countdown
                  </p>
                  <span className="rounded-full bg-danger/10 px-3 py-1 text-xs font-semibold text-danger">
                    Inactive
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-0 rounded-full bg-danger" aria-hidden="true" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  When override activates, guardians, patients, and administrators receive alerts every 60 seconds until the session expires.
                </p>
                <Separator className="bg-border/40" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-primary">
                    <p className="text-xs uppercase tracking-wide text-primary/70">
                      Access Monitoring
                    </p>
                    <p className="mt-1 text-base font-semibold">24/7 SOC</p>
                  </div>
                  <div className="rounded-2xl border border-success/30 bg-success/10 p-4 text-success">
                    <p className="text-xs uppercase tracking-wide text-success/70">
                      Response Time
                    </p>
                    <p className="mt-1 text-base font-semibold">&lt; 15 sec</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {securityFeatures.map((feature) => (
              <Card
                key={feature.title}
                className="group relative h-full overflow-hidden rounded-3xl border border-border/60 bg-background/90 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <CardHeader className="space-y-4">
                  <div className="w-fit rounded-full bg-primary/10 p-3 text-primary">
                    <feature.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <div className="absolute inset-0 -z-10 bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4">
        <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-[28px] border border-border/60 bg-background/90 p-10 shadow-2xl backdrop-blur lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">
              Trusted by Modern Care Teams
            </Badge>
            <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">
              24 hospitals, 180+ physicians, and 40,000 guardians rely on Medi-Link every day.
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-success/30 bg-success/10 p-4">
                <p className="text-4xl font-semibold text-success">
                  <AnimatedNumber value={97} suffix="%" />
                </p>
                <p className="text-sm text-success/80">records accessed in under 60 seconds</p>
              </div>
              <div className="rounded-3xl border border-info/30 bg-info/10 p-4">
                <p className="text-4xl font-semibold text-info">
                  <AnimatedNumber value={15} suffix="s" />
                </p>
                <p className="text-sm text-info/80">average guardian response time</p>
              </div>
              <div className="rounded-3xl border border-warning/30 bg-warning/10 p-4">
                <p className="text-4xl font-semibold text-warning">
                  <AnimatedNumber value={5} suffix="x" />
                </p>
                <p className="text-sm text-warning/80">faster ER admissions for Medi-Link patients</p>
              </div>
              <div className="rounded-3xl border border-primary/30 bg-primary/10 p-4">
                <p className="text-4xl font-semibold text-primary">
                  <AnimatedNumber value={0} />
                </p>
                <p className="text-sm text-primary/80">security incidents in the last 24 months</p>
              </div>
            </div>
          </div>
          <div className="space-y-6 rounded-3xl border border-border/60 bg-muted/40 p-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              "We launched Medi-Link to replace the chaos of paper folders, email chains, and midnight guardian calls. Now, every clinician receives context-rich histories, AI insights, and emergency protocols before a single treatment begins."
            </p>
            <Separator className="bg-border/40" />
            <div className="space-y-2 text-sm">
              <p className="text-base font-semibold text-foreground">Dr. Maya Khatri</p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Chief Medical Information Officer, BayHealth Network
              </p>
              <p className="text-xs text-muted-foreground">
                "Medi-Link turns guardian anxiety into confident collaboration. We couldn&apos;t operate without it."
              </p>
            </div>
            <Button
              asChild
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/patient-portal">
                Explore the Patient Portal
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
