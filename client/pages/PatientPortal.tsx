import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Award,
  Brain,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Edit,
  Copy,
  Download,
  FileDigit,
  FileText,
  Filter,
  FolderSync,
  HeartPulse,
  History,
  Hospital,
  LineChart,
  MapPin,
  Mail,
  Phone,
  Plus,
  Search,
  Share2,
  ShieldCheck,
  Stethoscope,
  Trash2,
  Upload,
  User,
  UserCheck,
  UserCircle,
  Users,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ReportMetric {
  label: string;
  value: string;
  unit?: string;
  status: "normal" | "borderline" | "abnormal";
}

interface ReportSummary {
  id: string;
  title: string;
  type: string;
  typeColor: string;
  date: string;
  hospital: string;
  doctor: string;
  doctorContact: string;
  aiSummary: string;
  riskLevel: "LOW" | "MODERATE" | "HIGH";
  riskColor: string;
  metrics: ReportMetric[];
  insights: string[];
  content: string;
}

const sampleReports: ReportSummary[] = [
  {
    id: "med-0021",
    title: "Comprehensive Blood Panel",
    type: "Blood Test",
    typeColor: "bg-red-500/10 text-red-600",
    date: "Jan 12, 2025",
    hospital: "City Medical Diagnostics",
    doctor: "Dr. Anita Rao",
    doctorContact: "+1 (415) 444-9871",
    aiSummary:
      "Blood glucose improved since Oct 2024. LDL cholesterol remains borderline high; recommend lifestyle adjustments and re-check in 6 weeks.",
    riskLevel: "MODERATE",
    riskColor: "bg-warning/10 text-warning",
    metrics: [
      { label: "Heart Rate", value: "72", unit: "BPM", status: "normal" },
      {
        label: "Blood Pressure",
        value: "128/84",
        unit: "mmHg",
        status: "borderline",
      },
      {
        label: "Glucose",
        value: "108",
        unit: "mg/dL",
        status: "normal",
      },
    ],
    insights: [
      "Triglycerides decreased by 12% since last visit",
      "LDL remains at 134 mg/dL; target < 100 mg/dL",
      "Vitamin D improved after supplementation",
    ],
    content:
      "Patient fasting blood panel collected at 08:30. Glucose 108 mg/dL, HbA1c 5.8%. Total cholesterol 204 mg/dL, LDL 134 mg/dL, HDL 48 mg/dL, Triglycerides 150 mg/dL. CBC within normal range. Continue current medication and dietary plan. Reassess lipids in 6 weeks.",
  },
  {
    id: "med-0019",
    title: "Cardiac Stress Test",
    type: "ECG",
    typeColor: "bg-teal-500/10 text-teal-600",
    date: "Dec 3, 2024",
    hospital: "Metro Heart Institute",
    doctor: "Dr. Vikram Singh",
    doctorContact: "+1 (415) 223-7611",
    aiSummary:
      "Exercise tolerance improved. No ischemic changes observed. Continue monitoring and encourage moderate cardio routines 4x weekly.",
    riskLevel: "LOW",
    riskColor: "bg-success/10 text-success",
    metrics: [
      { label: "Resting HR", value: "68", unit: "BPM", status: "normal" },
      {
        label: "Peak HR",
        value: "148",
        unit: "BPM",
        status: "normal",
      },
      {
        label: "Recovery",
        value: "89",
        unit: "BPM",
        status: "normal",
      },
    ],
    insights: [
      "Baseline blood pressure improved compared to Aug 2024",
      "Recommend continuing beta-blocker dosage",
      "Schedule follow-up in 4 months unless symptoms present",
    ],
    content:
      "Bruce protocol completed to Stage III. No ST depression observed. Blood pressure response normal. Patient experienced mild fatigue with rapid recovery. Advise continuation of prescribed exercise regimen and monitor for palpitations.",
  },
  {
    id: "med-0016",
    title: "MRI Lumbar Spine",
    type: "MRI/CT Scan",
    typeColor: "bg-purple-500/10 text-purple-600",
    date: "Nov 10, 2024",
    hospital: "Bay Area Imaging Center",
    doctor: "Dr. Elaine Carter",
    doctorContact: "+1 (628) 555-4470",
    aiSummary:
      "Mild disc bulge persists at L4-L5 with no nerve compression progression. Physical therapy effective. Continue current management plan.",
    riskLevel: "LOW",
    riskColor: "bg-success/10 text-success",
    metrics: [
      {
        label: "Pain Score",
        value: "3/10",
        status: "normal",
      },
      {
        label: "Mobility",
        value: "Improved",
        status: "normal",
      },
      {
        label: "Inflammation",
        value: "Stable",
        status: "normal",
      },
    ],
    insights: [
      "Disc hydration improved from prior scan",
      "No indication for surgical intervention",
      "Continue PT and weekly Pilates sessions",
    ],
    content:
      "MRI performed with contrast. L4-L5 disc exhibits mild posterior bulging without impingement. L5-S1 unchanged. No spinal canal stenosis. Clinical correlation recommended. Maintain physical therapy routine.",
  },
];

const reportTypeOptions = [
  "Blood Test",
  "X-ray",
  "MRI/CT Scan",
  "ECG",
  "Prescription",
  "Discharge Summary",
  "Vaccination",
  "Other",
];

const allergies = [
  {
    name: "Penicillin",
    type: "Drug",
    reaction: "Hives & shortness of breath",
    severity: "Severe",
  },
  {
    name: "Peanuts",
    type: "Food",
    reaction: "Anaphylaxis",
    severity: "Severe",
  },
  {
    name: "Dust mites",
    type: "Environmental",
    reaction: "Sinus congestion",
    severity: "Moderate",
  },
];

const conditions = [
  {
    name: "Hypertension",
    diagnosed: "2018",
    status: "Managed",
  },
  {
    name: "Type 2 Diabetes",
    diagnosed: "2021",
    status: "Active",
  },
  {
    name: "Lumbar Disc Herniation",
    diagnosed: "2023",
    status: "Managed",
  },
];

const medications = [
  {
    name: "Metformin",
    dosage: "500 mg",
    frequency: "Twice daily",
    doctor: "Dr. Anita Rao",
    startDate: "Mar 2024",
    critical: false,
  },
  {
    name: "Atorvastatin",
    dosage: "20 mg",
    frequency: "Nightly",
    doctor: "Dr. Vikram Singh",
    startDate: "Aug 2023",
    critical: true,
  },
  {
    name: "Losartan",
    dosage: "50 mg",
    frequency: "Daily",
    doctor: "Dr. Vikram Singh",
    startDate: "Jan 2022",
    critical: true,
  },
];

const emergencyContacts = [
  {
    name: "Priya Desai",
    relationship: "Spouse",
    phone: "+1 (415) 232-9987",
    email: "priya.desai@email.com",
    primary: true,
  },
  {
    name: "Arjun Patel",
    relationship: "Brother",
    phone: "+1 (408) 667-3411",
    email: "arjun.patel@email.com",
    primary: false,
  },
];

const quickStats = [
  {
    label: "Total Reports",
    value: "24",
    icon: FolderSync,
    tone: "bg-primary/10 text-primary",
    description: "Across 8 provider systems",
  },
  {
    label: "Last Upload",
    value: "Jan 12, 2025",
    icon: CalendarClock,
    tone: "bg-info/10 text-info",
    description: "Comprehensive blood panel",
  },
  {
    label: "Emergency Contacts",
    value: "02",
    icon: Users,
    tone: "bg-success/10 text-success",
    description: "Guardian Bridge ready",
  },
  {
    label: "Health Score",
    value: "82%",
    icon: LineChart,
    tone: "bg-warning/10 text-warning",
    description: "AI trend: improving",
  },
];

const sidebarNav = [
  { label: "My Dashboard", icon: ShieldCheck },
  { label: "Upload Records", icon: Upload },
  { label: "My Reports", icon: FileText },
  { label: "Emergency Contacts", icon: Phone },
  { label: "Health Profile", icon: User },
  { label: "Health Trends", icon: LineChart },
  { label: "Settings", icon: History },
];

function PatientPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportSummary | null>(
    null,
  );
  const { toast } = useToast();

  const healthId = "MED-2A7K9";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(healthId);
      toast({
        title: "Health ID copied",
        description: "Share this ID with a doctor to initiate Guardian Bridge.",
      });
    } catch (error) {
      toast({
        title: "Unable to copy",
        description: "Select and copy the Health ID manually.",
        variant: "destructive",
      });
    }
  };

  const riskBadgeStyles: Record<ReportSummary["riskLevel"], string> = {
    LOW: "bg-success/15 text-success border border-success/20",
    MODERATE: "bg-warning/15 text-warning border border-warning/20",
    HIGH: "bg-danger/15 text-danger border border-danger/20",
  };

  const metricStatusStyles: Record<ReportMetric["status"], string> = {
    normal: "bg-success/10 text-success border border-success/10",
    borderline: "bg-warning/10 text-warning border border-warning/20",
    abnormal: "bg-danger/10 text-danger border border-danger/20",
  };

  const sortedReports = useMemo(
    () => [...sampleReports].sort((a, b) => a.date.localeCompare(b.date)).reverse(),
    [],
  );

  if (!isAuthenticated) {
    return (
      <section className="relative flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary px-4 py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.15)_0,_transparent_55%)]" />
        <Card className="w-full max-w-lg rounded-3xl border border-border/80 bg-background/90 shadow-2xl backdrop-blur">
          <CardHeader className="space-y-3">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">
              Secure Patient Portal
            </Badge>
            <CardTitle className="text-3xl font-semibold text-foreground">
              Welcome to Medi-Link
            </CardTitle>
            <CardDescription className="text-base leading-relaxed text-muted-foreground">
              Access your complete medical history, AI-guided insights, and Guardian Bridge emergency controls in one encrypted hub.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-3 rounded-2xl border border-info/30 bg-info/10 px-4 py-3 text-sm text-info">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              <span>E2EE Security • HIPAA & SOC2 • Emergency Override Audit Trail</span>
            </div>
            <Button
              size="lg"
              className="w-full rounded-full text-base shadow-lg transition-transform duration-200 hover:scale-[1.02]"
              onClick={() => setIsAuthenticated(true)}
            >
              Sign In Securely
            </Button>
            <p className="text-sm text-muted-foreground">
              Your unique Health ID will be displayed after sign-in. Share it only with verified medical professionals.
            </p>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2 text-success">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              MFA Enabled
            </span>
            <span className="inline-flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" aria-hidden="true" />
              Emergency Override Not Active
            </span>
          </CardFooter>
        </Card>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col gap-8 bg-gradient-to-br from-secondary/40 via-background to-accent px-4 py-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.2)_0,_transparent_60%)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="overflow-hidden rounded-3xl border border-primary/20 bg-primary px-6 py-7 text-primary-foreground shadow-2xl sm:px-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70">
                Secure Session Active
              </p>
              <h1 className="text-3xl font-semibold sm:text-4xl">
                Welcome back, Aanya Desai
              </h1>
              <p className="text-primary-foreground/80">
                Share this Health ID with any accredited physician for instant, audited access.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 rounded-2xl bg-primary-foreground/15 px-6 py-4 text-primary-foreground">
              <span className="text-sm font-medium uppercase tracking-wide text-primary-foreground/70">
                Your Health ID
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-primary-foreground px-4 py-2 text-lg font-semibold text-primary">
                  {healthId}
                </span>
                <Button
                  variant="secondary"
                  className="rounded-full bg-primary-foreground/80 text-primary shadow-md hover:bg-primary-foreground"
                  onClick={handleCopy}
                >
                  <Copy className="mr-2 h-4 w-4" aria-hidden="true" /> Copy
                </Button>
              </div>
              <span className="flex items-center gap-2 text-xs text-primary-foreground/80">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Guardian Bridge ready in 12 seconds
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
          <aside className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-xl backdrop-blur">
            <div className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success/10 px-4 py-3 text-success">
              <UserCheck className="h-5 w-5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">Patient Controlled</p>
                <p className="text-xs text-success/80">
                  Every access requires your approval unless emergency override is validated.
                </p>
              </div>
            </div>
            <nav className="space-y-2">
              {sidebarNav.map((item) => (
                <Button
                  key={item.label}
                  variant={item.label === "My Dashboard" ? "default" : "ghost"}
                  className="w-full justify-start gap-3 rounded-full px-4 py-2.5 text-sm font-medium"
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Button>
              ))}
            </nav>
            <Separator className="my-4" />
            <div className="space-y-3 rounded-2xl border border-warning/40 bg-warning/10 p-4 text-sm">
              <p className="font-semibold text-warning">Emergency Override</p>
              <p className="text-warning/80">
                Currently inactive. Overrides auto-expire in 15 minutes and notify guardians instantly.
              </p>
              <Button variant="outline" className="w-full rounded-full border-warning/50 text-warning">
                View Audit Trail
              </Button>
            </div>
            <div className="rounded-2xl border border-info/30 bg-info/10 p-4 text-sm text-info">
              <p className="font-semibold">Clinical Note Sync</p>
              <p className="mt-2 text-info/80">
                3 new collaborative notes from treating physicians. Review and add your perspective.
              </p>
            </div>
          </aside>

          <div className="flex flex-col gap-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {quickStats.map((stat) => (
                <Card
                  key={stat.label}
                  className="rounded-2xl border border-border/50 bg-background/80 shadow-lg backdrop-blur transition-transform duration-200 hover:-translate-y-1"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardDescription className="text-sm text-muted-foreground">
                      {stat.label}
                    </CardDescription>
                    <span className={`rounded-full p-2 ${stat.tone}`}>
                      <stat.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-semibold">{stat.value}</div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="rounded-3xl border border-border/60 bg-background/80 shadow-xl backdrop-blur">
              <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    Add New Medical Record
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Upload documents, paste text, or let Medi-Link AI structure your reports instantly.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Brain className="h-4 w-4 text-primary" aria-hidden="true" />
                  AI insights ready in under 30 seconds
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Report Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Comprehensive Blood Panel"
                        className="rounded-xl border-input/70"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Report Type</Label>
                      <Select defaultValue="Blood Test">
                        <SelectTrigger id="type" className="rounded-xl border-input/70">
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border border-border/60">
                          {reportTypeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date of Checkup</Label>
                        <Input id="date" type="date" className="rounded-xl border-input/70" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="doctor">Referring Doctor&apos;s Name</Label>
                        <Input id="doctor" placeholder="Dr. Anita Rao" className="rounded-xl border-input/70" />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="clinic">Hospital / Clinic Name</Label>
                        <Input id="clinic" placeholder="City Medical Diagnostics" className="rounded-xl border-input/70" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact">Doctor Contact Number (optional)</Label>
                        <Input id="contact" placeholder="+1 (415) 444-9871" className="rounded-xl border-input/70" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="content">Raw Report Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Paste your report text or add optional context for AI analysis"
                        className="min-h-[140px] rounded-2xl border-input/70"
                      />
                    </div>
                    <label
                      htmlFor="file-upload"
                      className="flex flex-1 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-6 text-center transition-colors hover:border-primary/60"
                    >
                      <Upload className="h-8 w-8 text-primary" aria-hidden="true" />
                      <p className="mt-3 text-sm font-medium text-primary">
                        Drag & drop files or click to upload
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, JPG, DICOM, DOCX up to 50MB per file
                      </p>
                      <input id="file-upload" type="file" className="sr-only" multiple />
                    </label>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button className="rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90">
                    <Brain className="mr-2 h-4 w-4" aria-hidden="true" /> Upload & Analyze with AI
                  </Button>
                  <Button variant="outline" className="rounded-full border-primary/40 text-primary">
                    Save Draft
                  </Button>
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-primary" aria-hidden="true" /> Guardian approval requested post-upload
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-secondary/40 shadow-xl backdrop-blur">
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    AI-Generated Summary
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Medi-Link AI extracted critical vitals and treatment signals for your latest upload.
                  </CardDescription>
                </div>
                <Badge className="rounded-full bg-success/15 text-success">
                  Status: Ready
                </Badge>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-[2fr,1fr]">
                <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Glucose levels show a 9% improvement since Oct 2024, aligning with increased medication adherence and lifestyle changes. Blood pressure remains moderately elevated in morning readings; AI recommends checking for nocturnal hypertension.
                  </p>
                  <p>
                    MRI lumbar scan indicates reduced inflammation and stable disc condition. Monitoring physical therapy cadence and core strength metrics is advised to maintain recovery trajectory.
                  </p>
                  <div>
                    <h4 className="mb-3 text-sm font-semibold text-foreground">AI Insights</h4>
                    <ul className="grid gap-2 text-sm">
                      <li className="flex items-start gap-2 rounded-2xl bg-background/70 p-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" aria-hidden="true" />
                        Improved medication adherence corresponds with stabilized fasting glucose trends.
                      </li>
                      <li className="flex items-start gap-2 rounded-2xl bg-background/70 p-3">
                        <AlertTriangle className="mt-0.5 h-4 w-4 text-warning" aria-hidden="true" />
                        Consider wearable BP monitoring for nocturnal spikes; Guardian Bridge ready to notify cardiology team.
                      </li>
                      <li className="flex items-start gap-2 rounded-2xl bg-background/70 p-3">
                        <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                        No concerning anomalies detected in latest MRI imagery compared to prior scan.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-background/80 p-4 shadow-lg">
                  <h4 className="text-sm font-semibold text-foreground">Key Metrics Extracted</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between rounded-2xl border border-success/20 bg-success/10 px-3 py-2 text-success">
                      <div className="flex items-center gap-2">
                        <HeartPulse className="h-4 w-4" aria-hidden="true" />
                        Heart Rate
                      </div>
                      <span className="font-semibold text-success">72 BPM</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-warning/30 bg-warning/10 px-3 py-2 text-warning">
                      <div className="flex items-center gap-2">
                        <ClipboardList className="h-4 w-4" aria-hidden="true" />
                        Blood Pressure
                      </div>
                      <span className="font-semibold text-warning">128/84 mmHg</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-info/30 bg-info/10 px-3 py-2 text-info">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4" aria-hidden="true" />
                        Glucose
                      </div>
                      <span className="font-semibold text-info">108 mg/dL</span>
                    </div>
                  </div>
                  <div className="space-y-2 rounded-2xl border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
                    <span className="font-semibold uppercase tracking-wide">Risk Level</span>
                    <span className="text-lg font-semibold">Moderate</span>
                    <p className="text-xs text-primary/80">
                      AI suggests weekly vitals logging and cardiology follow-up in 45 days.
                    </p>
                  </div>
                  <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Save to Records
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-border/60 bg-background/85 shadow-xl backdrop-blur">
              <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    Your Emergency Guardians
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    These trusted contacts can authorize physician access in seconds via Guardian Bridge.
                  </CardDescription>
                </div>
                <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" aria-hidden="true" /> Add Emergency Contact
                </Button>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {emergencyContacts.map((contact) => (
                  <div
                    key={contact.name}
                    className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/80 p-4 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-base font-semibold text-foreground">
                          {contact.name}
                        </p>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          {contact.relationship}
                        </p>
                      </div>
                      {contact.primary ? (
                        <Badge className="rounded-full bg-success/10 text-success">
                          Primary
                        </Badge>
                      ) : null}
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                        {contact.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                        {contact.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Button variant="outline" className="flex-1 rounded-full border-primary/40 text-primary">
                        Edit
                      </Button>
                      <Button variant="ghost" className="rounded-full text-danger hover:text-danger">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-border/60 bg-background/90 shadow-xl backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">
                  Critical Health Information
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Maintain an up-to-date clinical snapshot for faster emergency decisions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="space-y-4">
                  <AccordionItem value="allergies" className="rounded-2xl border border-border/40 px-4">
                    <AccordionTrigger className="text-base font-semibold text-danger">
                      Allergies
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pb-4">
                      <div className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
                        Severe anaphylaxis risk detected. Inform caregivers immediately if symptoms arise.
                      </div>
                      <div className="space-y-3">
                        {allergies.map((item) => (
                          <div
                            key={item.name}
                            className="flex flex-col gap-1.5 rounded-2xl border border-border/60 bg-background/80 px-4 py-3"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-sm font-semibold text-foreground">
                                {item.name}
                              </span>
                              <Badge className="rounded-full bg-danger/10 text-danger">
                                {item.severity}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                              <span className="inline-flex items-center gap-1 rounded-full bg-muted/50 px-2 py-1">
                                <FileDigit className="h-3 w-3" aria-hidden="true" />
                                {item.type}
                              </span>
                              <span>{item.reaction}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="rounded-full border-primary/40 text-primary">
                        Add Allergy
                      </Button>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="conditions" className="rounded-2xl border border-border/40 px-4">
                    <AccordionTrigger className="text-base font-semibold text-primary">
                      Chronic Conditions
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pb-4">
                      {conditions.map((condition) => (
                        <div
                          key={condition.name}
                          className="flex flex-col gap-1.5 rounded-2xl border border-border/60 bg-background/80 px-4 py-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-foreground">
                              {condition.name}
                            </span>
                            <Badge className="rounded-full bg-info/10 text-info">
                              {condition.status}
                            </Badge>
                          </div>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Diagnosed {condition.diagnosed}
                          </p>
                        </div>
                      ))}
                      <Button variant="outline" className="rounded-full border-primary/40 text-primary">
                        Add Condition
                      </Button>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="medications" className="rounded-2xl border border-border/40 px-4">
                    <AccordionTrigger className="text-base font-semibold text-success">
                      Current Medications
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pb-4">
                      <div className="overflow-hidden rounded-2xl border border-border/60">
                        <div className="grid grid-cols-[1.6fr,1fr,1fr,1.2fr,1fr] items-center bg-muted px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          <span>Medication</span>
                          <span>Dosage</span>
                          <span>Frequency</span>
                          <span>Prescribing Doctor</span>
                          <span>Start Date</span>
                        </div>
                        <div className="divide-y divide-border/40">
                          {medications.map((med) => (
                            <div
                              key={med.name}
                              className="grid grid-cols-[1.6fr,1fr,1fr,1.2fr,1fr] items-center px-4 py-3 text-sm text-muted-foreground"
                            >
                              <div className="flex items-center gap-2">
                                {med.critical ? (
                                  <Badge className="rounded-full bg-danger/15 text-danger">
                                    Critical
                                  </Badge>
                                ) : null}
                                <span className="text-foreground">{med.name}</span>
                              </div>
                              <span>{med.dosage}</span>
                              <span>{med.frequency}</span>
                              <span>{med.doctor}</span>
                              <span>{med.startDate}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" className="rounded-full border-primary/40 text-primary">
                        Add Medication
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-border/60 bg-background/95 shadow-2xl backdrop-blur">
              <CardHeader className="gap-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      Your Medical History
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Filter, search, and share records instantly with care teams.
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-success" aria-hidden="true" />
                    Every access logged & guardian notified
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-[1fr,1fr,1fr,auto]">
                  <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2">
                    <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <Input
                      placeholder="Search reports, doctors, hospitals"
                      className="h-8 border-none bg-transparent p-0 text-sm focus-visible:ring-0"
                    />
                  </div>
                  <Select defaultValue="All Types">
                    <SelectTrigger className="rounded-full border border-border/60 bg-background px-4 py-2 text-sm">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border border-border/60">
                      <SelectItem value="All Types">All Types</SelectItem>
                      {reportTypeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="rounded-full border-border/60 text-muted-foreground">
                    <CalendarClock className="mr-2 h-4 w-4" aria-hidden="true" /> Date Range
                  </Button>
                  <Button variant="ghost" className="rounded-full text-sm text-muted-foreground">
                    <Filter className="mr-2 h-4 w-4" aria-hidden="true" /> Sort by: Most Recent
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid gap-5 xl:grid-cols-2">
                {sortedReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex h-full flex-col gap-4 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-xl transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${report.typeColor}`}>
                      {report.type}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {report.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-2">
                          <CalendarClock className="h-4 w-4 text-primary" aria-hidden="true" />
                          {report.date}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Hospital className="h-4 w-4 text-primary" aria-hidden="true" />
                          {report.hospital}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-primary" aria-hidden="true" />
                          {report.doctor}
                        </span>
                      </div>
                    </div>
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {report.aiSummary}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {report.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className={`rounded-2xl px-3 py-2 text-xs font-semibold ${metricStatusStyles[metric.status]}`}
                        >
                          <p className="uppercase tracking-wide text-muted-foreground/70">
                            {metric.label}
                          </p>
                          <p className="text-base text-foreground">
                            {metric.value}
                            {metric.unit ? <span className="text-xs text-muted-foreground"> {metric.unit}</span> : null}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge className={`rounded-full px-4 py-1 text-xs font-semibold ${riskBadgeStyles[report.riskLevel]}`}>
                        Risk: {report.riskLevel}
                      </Badge>
                      <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                        {report.doctorContact}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => setSelectedReport(report)}
                      >
                        View Details
                      </Button>
                      <Button variant="outline" className="rounded-full border-border/60 text-muted-foreground">
                        <Download className="mr-2 h-4 w-4" aria-hidden="true" /> Download PDF
                      </Button>
                      <Button variant="ghost" className="rounded-full text-muted-foreground">
                        <Share2 className="mr-2 h-4 w-4" aria-hidden="true" /> Share with Doctor
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <History className="h-4 w-4 text-primary" aria-hidden="true" />
                  10 access events logged in the last 90 days
                </span>
                <Button variant="ghost" className="rounded-full text-primary">
                  View Full Audit Trail
                  <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={Boolean(selectedReport)} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto rounded-3xl border border-border/60 bg-background/95 p-8 shadow-2xl">
          {selectedReport ? (
            <div className="space-y-6">
              <DialogHeader className="space-y-4 text-left">
                <DialogTitle className="text-2xl font-semibold text-foreground">
                  {selectedReport.title}
                </DialogTitle>
                <DialogDescription className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${selectedReport.typeColor}`}>
                    {selectedReport.type}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-primary" aria-hidden="true" />
                    {selectedReport.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Hospital className="h-4 w-4 text-primary" aria-hidden="true" />
                    {selectedReport.hospital}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-primary" aria-hidden="true" />
                    {selectedReport.doctor}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
                <div className="space-y-4">
                  <div className="rounded-3xl border border-border/60 bg-muted/40 p-5 text-sm text-muted-foreground">
                    {selectedReport.aiSummary}
                  </div>
                  <div className="rounded-3xl border border-border/60 bg-background/80 p-5 shadow-lg">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Full Report Content
                    </h4>
                    <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                      {selectedReport.content}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-border/60 bg-background/80 p-5 shadow-lg">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      AI Insights
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {selectedReport.insights.map((insight) => (
                        <li key={insight} className="flex items-start gap-2 rounded-2xl bg-muted/40 px-3 py-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" aria-hidden="true" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-3xl border border-border/60 bg-background/80 p-5 shadow-lg">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Key Metrics
                    </h4>
                    <div className="mt-3 space-y-3">
                      {selectedReport.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className={`rounded-2xl px-3 py-2 text-sm font-semibold ${metricStatusStyles[metric.status]}`}
                        >
                          <p className="uppercase tracking-wide text-muted-foreground/70">
                            {metric.label}
                          </p>
                          <p className="text-lg text-foreground">
                            {metric.value}
                            {metric.unit ? <span className="text-xs text-muted-foreground"> {metric.unit}</span> : null}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-border/60 bg-background/80 p-5 shadow-lg">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Doctor Information
                    </h4>
                    <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2 text-foreground">
                        <UserCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                        {selectedReport.doctor}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                        {selectedReport.hospital}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                        {selectedReport.doctorContact}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-3xl border border-border/60 bg-background/80 p-5 shadow-lg">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Actions
                    </h4>
                    <div className="mt-3 grid gap-3">
                      <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                        <Download className="mr-2 h-4 w-4" aria-hidden="true" /> Download PDF
                      </Button>
                      <Button variant="outline" className="w-full rounded-full border-border/60 text-muted-foreground">
                        <Share2 className="mr-2 h-4 w-4" aria-hidden="true" /> Share with Specialist
                      </Button>
                      <Button variant="ghost" className="w-full rounded-full text-muted-foreground">
                        <Edit className="mr-2 h-4 w-4" aria-hidden="true" /> Edit Report
                      </Button>
                      <Button variant="ghost" className="w-full rounded-full text-danger hover:text-danger">
                        <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" /> Delete Report
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default PatientPortal;
