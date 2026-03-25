import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center text-center pt-[140px] pb-[80px] px-4">
      {/* Conic aurora glow — wider and more dramatic */}
      <div
        className="pointer-events-none absolute top-[60px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-60"
        style={{
          background:
            "conic-gradient(from 210deg at 50% 60%, oklch(0.6 0.2 260 / 0.25), oklch(0.5 0.15 280 / 0.15) 20%, transparent 35%, transparent 65%, oklch(0.55 0.12 240 / 0.1) 80%, oklch(0.6 0.2 260 / 0.25))",
          filter: "blur(70px)",
        }}
      />
      {/* Inner radial glow */}
      <div
        className="pointer-events-none absolute top-[100px] left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.67 0.16 260 / 0.15) 0%, transparent 60%)",
        }}
      />

      {/* Badge */}
      <div className="relative z-10 inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm border border-border rounded-full px-3.5 py-1.5 text-xs text-muted-foreground mb-6">
        <span className="inline-block size-2 rounded-full bg-success animate-pulse" />
        <span>
          <Translate id="hero.badge">
            Open Source · macOS · Linux · Windows
          </Translate>
        </span>
      </div>

      {/* Headline */}
      <h1 className="relative z-10 text-4xl sm:text-5xl md:text-[56px] font-extrabold tracking-tight leading-[1.1] mb-5 max-w-3xl">
        <span className="text-foreground">OpsKat —</span>
        <br />
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, oklch(0.67 0.16 250), oklch(0.72 0.18 270), oklch(0.65 0.15 290))",
          }}
        >
          <Translate id="hero.headline.line2">Infrastructure Ops, Reimagined with AI</Translate>
        </span>
      </h1>

      {/* Description */}
      <p className="relative z-10 text-base sm:text-[17px] text-muted-foreground max-w-[560px] mx-auto leading-relaxed mb-8">
        <Translate id="hero.description">
          Describe what you need — the AI agent executes commands, queries, and
          file transfers on your behalf, with policy enforcement and full audit
          logging.
        </Translate>
      </p>

      {/* CTAs */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 mb-5">
        <Button size="lg" className="shadow-lg shadow-primary/25" asChild>
          <a href="#">
            <Translate id="hero.cta.download">Download for macOS</Translate>
          </a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/docs/getting-started/installation" className="no-underline">
            <Translate id="hero.cta.docs">Read the Docs</Translate>
          </Link>
        </Button>
      </div>
    </section>
  );
}
