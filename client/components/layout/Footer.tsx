import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = [
  {
    title: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Services", to: "/services" },
      { label: "Doctors", to: "/doctors" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Contact", to: "/contact" },
      { label: "FAQ", to: "/faq" },
      { label: "Patient Portal", to: "/patient-portal" },
    ],
  },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com" },
];

export const Footer = () => {
  return (
    <footer className="mt-24 bg-foreground/5">
      <div className="container">
        <div className="relative isolate -mt-24 rounded-3xl bg-primary-gradient px-6 py-14 text-primary-foreground shadow-soft-xl lg:px-16 lg:py-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/60">
                Newsletter
              </p>
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                Subscribe to our newsletter
              </h2>
              <p className="text-primary-foreground/80">
                Stay up to date with Medi-Link insights, medical breakthroughs, and
                exclusive patient resources every month.
              </p>
            </div>
            <form className="w-full max-w-md space-y-4 rounded-3xl bg-white/10 p-4 backdrop-blur-lg">
              <label className="text-sm font-medium text-primary-foreground/90" htmlFor="newsletter-email">
                Email address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 rounded-full border-white/20 bg-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-white"
                  required
                />
                <Button type="submit" className="h-12 rounded-full px-8">
                  Submit
                </Button>
              </div>
              <p className="text-xs text-primary-foreground/60">
                By subscribing you agree to receive updates from Medi-Link. You can
                unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-border/50 bg-transparent">
        <div className="container flex flex-col gap-10 py-12 lg:flex-row lg:justify-between">
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-semibold text-primary">
              medi-Link®
            </Link>
            <p className="max-w-sm text-sm text-foreground/70">
              Empowering healthcare providers and patients with secure, unified medical
              records for smarter, faster care decisions.
            </p>
            <div className="flex items-center gap-4">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <Icon className="h-5 w-5 text-primary" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-widest text-foreground/60">
                  {section.title}
                </p>
                <ul className="space-y-3 text-sm text-foreground/70">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        className="transition hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border/40 py-6">
        <div className="container flex flex-col items-center justify-between gap-4 text-sm text-foreground/60 md:flex-row">
          <p>© {new Date().getFullYear()} Medi-Link. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
