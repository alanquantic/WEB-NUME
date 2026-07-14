import type { Metadata } from "next";
import Link from "next/link";

import anoPersonalData from "@/components/jsons/anopersonal.json";
import { ToolPage } from "@/components/content/tool-page";
import { sanitizeHtml } from "@/lib/html/sanitize";

type AnoPersonalEntry = {
  anio: number;
  titulo: string;
  sobreQuoteHTML: string[];
  Quote: string;
  bajoQuote: string[];
  claves: string[];
};

const entries = anoPersonalData as AnoPersonalEntry[];

export function getAnoPersonalEntry(numero: number | string) {
  const parsed = typeof numero === "string" ? Number(numero) : numero;
  if (!Number.isFinite(parsed)) return null;
  return entries.find((item) => item.anio === parsed) ?? null;
}

export function getAnoPersonalNumbers() {
  return entries.map((item) => String(item.anio));
}

function HtmlBlock({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />;
}

export function AnoPersonalNumberView({ entry }: { entry: AnoPersonalEntry }) {
  return (
    <ToolPage
      toolKey="anopersonal"
      wide
      title={`Año Personal ${entry.anio}`}
      description=""
    >
      <div className="space-y-8">
        <section className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-panel">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="flex min-h-[220px] items-center justify-center bg-[linear-gradient(135deg,hsl(var(--secondary)/0.86),hsl(var(--primary-soft)))] p-8 sm:min-h-[280px]">
              <span className="font-display text-7xl font-semibold leading-none text-primary sm:text-8xl md:text-9xl">
                {entry.anio}
              </span>
            </div>
            <div className="min-h-[220px] bg-[linear-gradient(135deg,hsl(var(--card)),hsl(var(--background)))] p-8 sm:min-h-[280px] flex flex-col justify-center space-y-8">
              <h1>AÑO PERSONAL</h1>
              <p className="text-base leading-8 text-foreground/72">
                {entry.titulo}
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4 p-6 sm:p-8">
          <div className="space-y-4 text-base leading-8 text-foreground/72">
            {entry.sobreQuoteHTML.map((paragraph, index) => (
              <HtmlBlock
                key={`${entry.anio}-intro-${index}`}
                html={paragraph}
              />
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-[2rem]  p-6 sm:p-8 text-center meaning">
          <h3>{entry.Quote}</h3>
        </section>

        <section className="">
          <div className="space-y-4 p-6 sm:p-8">
            <div
              id="dividido-80-20"
              className="grid gap-0 overflow-hidden rounded-[2rem] border border-[hsl(var(--accent)/0.16)] bg-[linear-gradient(180deg,hsl(var(--accent)/0.18),hsl(var(--background)/0.95))] shadow-[0_24px_60px_hsl(var(--primary)/0.08)] lg:grid-cols-[0.85fr_1.15fr]"
            >
              <section className="relative flex min-w-0 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_40%_30%,hsl(var(--primary)/0.2),transparent_32%),linear-gradient(180deg,hsl(var(--secondary)/0.55),hsl(var(--accent)/0.08))] px-6 py-10 lg:px-10">
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--fuchsia)/0.16),hsl(var(--primary)/0.2))] blur-[2px]" />
                <img
                  src="/images/mini-laura.png"
                  alt="Ilustración de apoyo sobre vibraciones de tiempo"
                  className="relative z-10 max-h-[360px] w-auto object-contain"
                />
              </section>
              <section className="min-w-0 bg-[linear-gradient(180deg,hsl(var(--accent)/0.12),hsl(var(--card))_18%,hsl(var(--card)))] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--primary))]">
                  Pero...
                </p>
                <p className="mt-5 max-w-xl text-sm font-semibold leading-tight text-foreground sm:text-sm">
                  ¿Qué lección me toca vivir este año?
                </p>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-[hsl(var(--primary))] sm:text-2xl">
                  Año Personal
                </h3>
                <p className="text-base leading-8 text-foreground/72">
                  El<strong> Año Personal</strong> nos habla del proceso o
                  lección de vida que tendremos que enfrentar o aprender de
                  forma individual, comenzando el <strong>1ero de enero</strong>{" "}
                  y terminando el <strong>31 de diciembre.</strong> <br />
                  <br />
                  Cada uno de los <strong>Años Personales</strong> tiene sus
                  propios poderes vibratorios, donde nos será más fácil realizar
                  aquello que esté en concordancia con la energía del mismo.
                </p>
              </section>
            </div>
          </div>
        </section>

        <section className="space-y-4 p-6 sm:p-8">
          <div className="space-y-4 text-base leading-8 text-foreground/72">
            {entry.bajoQuote.map((paragraph, index) => (
              <HtmlBlock key={`${entry.anio}-body-${index}`} html={paragraph} />
            ))}
          </div>
        </section>

        <section className="space-y-5 rounded-[2rem] border border-[hsl(var(--primary)/0.14)] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.82),hsl(var(--background)))] p-6 shadow-panel sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-primary">
            Claves del Año {entry.anio}
          </h2>
          <div className="space-y-3 text-base leading-8 text-foreground/72">
            {entry.claves.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>
        <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <p className="text-base leading-8 text-foreground/72 text-center">
          Éxito y abundantes bendiciones en el camino
          <br />
          a tu nueva receta para alcanzar tu éxito personal.
          </p>
          <p className="text-base leading-8 text-foreground/72 text-center">
          Laura L. Rodriguez.
          </p>
        </section>
      </div>
    </ToolPage>
  );
}

export const metadata: Metadata = {
  title: "Año personal",
};

export default function Page() {
  const entry = entries[0];

  return <AnoPersonalNumberView entry={entry} />;
}
