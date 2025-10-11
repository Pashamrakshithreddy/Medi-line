const partners = [
  "Legalzoom",
  "NAACP",
  "Logindestic",
  "LOGOIPSLM",
  "Legalinsight",
  "LOGO-IPSUM",
];

export const PartnerSection = () => {
  return (
    <section className="border-y border-border/60 bg-white/80 py-12">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-10 text-sm uppercase tracking-[0.4em] text-foreground/40">
          {partners.map((partner) => (
            <span key={partner} className="whitespace-nowrap">
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
