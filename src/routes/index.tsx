import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import maxImg from "@/assets/max.jpg.asset.json";
import felixImg from "@/assets/felix.jpg.asset.json";
import anisImg from "@/assets/anis.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Altar de Max, Felix y Anís · Día de Muertos" },
      { name: "description", content: "Un altar digital de cempasúchil y veladoras para recordar a Max, Felix y Anís." },
      { property: "og:title", content: "Altar de Max, Felix y Anís" },
      { property: "og:description", content: "Altar digital de Día de Muertos para mis mascotas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PETS = [
  { name: "Max", kind: "Mi perrito", img: maxImg.url, note: "Ojos de cielo y patitas que siempre me buscaban." },
  { name: "Felix", kind: "Gato bicolor", img: felixImg.url, note: "Elegante de traje blanco y negro, rey de las hojas." },
  { name: "Anís", kind: "Gato gris", img: anisImg.url, note: "Suave como neblina, dulce como su nombre." },
];

const PAPEL = ["bg-rosa", "bg-marigold", "bg-plum", "bg-primary", "bg-rosa", "bg-marigold-deep"];

function Petals({ count = 40 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 37) % 100,
        delay: (i * 0.73) % 12,
        dur: 8 + ((i * 1.7) % 8),
        drift: ((i % 7) - 3) * 40,
        scale: 0.6 + ((i * 13) % 10) / 12,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            scale: `${p.scale}`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

function PapelPicado() {
  return (
    <div className="relative w-full">
      <div className="absolute left-0 right-0 top-2 h-0.5 bg-wax/60" />
      <div className="flex justify-center gap-1 overflow-hidden px-2 pt-2">
        {Array.from({ length: 14 }, (_, i) => (
          <svg
            key={i}
            viewBox="0 0 60 80"
            className={`papel pop-hover h-20 w-14 shrink-0 md:h-24 md:w-16`}
            style={{ animationDelay: `${(i % 5) * 0.3}s` }}
          >
            <defs>
              <mask id={`m${i}`}>
                <rect width="60" height="80" fill="white" />
                <path d="M0 70 L5 80 L10 70 L15 80 L20 70 L25 80 L30 70 L35 80 L40 70 L45 80 L50 70 L55 80 L60 70 V80 H0Z" fill="black" />
                <circle cx="30" cy="30" r="9" fill="black" />
                <circle cx="26" cy="28" r="2" fill="white" />
                <circle cx="34" cy="28" r="2" fill="white" />
                <path d="M12 12 l4 4 l-4 4 l-4 -4z M48 12 l4 4 l-4 4 l-4 -4z M12 50 l4 4 l-4 4 l-4 -4z M48 50 l4 4 l-4 4 l-4 -4z" fill="black" />
                <path d="M20 48 q10 8 20 0" stroke="black" strokeWidth="3" fill="none" />
              </mask>
            </defs>
            <foreignObject width="60" height="80" mask={`url(#m${i})`}>
              <div className={`h-full w-full ${PAPEL[i % PAPEL.length]}`} />
            </foreignObject>
          </svg>
        ))}
      </div>
    </div>
  );
}

function Arch() {
  const n = 26;
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto aspect-[2/1] w-[min(95vw,1000px)]">
      {Array.from({ length: n }, (_, i) => {
        const a = Math.PI - (i / (n - 1)) * Math.PI;
        const x = 50 + Math.cos(a) * 46;
        const y = 96 - Math.sin(a) * 88;
        const size = 34 + (i % 3) * 8;
        return (
          <span
            key={i}
            className="marigold pop-hover pointer-events-auto absolute"
            style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, translate: "-50% -50%" }}
          />
        );
      })}
    </div>
  );
}

function Candle({ pet, i }: { pet: (typeof PETS)[number]; i: number }) {
  return (
    <figure className="pop-hover rise-in flex flex-col items-center" style={{ animationDelay: `${0.3 + i * 0.25}s` }}>
      <div className="flame mb-1 h-14 w-8" style={{ animationDelay: `${i * 0.4}s` }} />
      <div className="h-3 w-1 bg-foreground/70" />
      <div className="relative flex h-64 w-44 flex-col items-center justify-end overflow-hidden rounded-t-[1.5rem] rounded-b-lg border-4 border-marigold bg-wax/90 p-3 shadow-[0_0_60px_-10px_var(--marigold)]">
        <div className="absolute inset-x-0 top-0 h-4 bg-rosa/80" />
        <img src={pet.img} alt={pet.name} className="mb-3 h-36 w-32 rounded-md border-2 border-plum object-cover" loading="lazy" />
        <figcaption className="text-center">
          <p className="font-display text-xl text-plum">{pet.name}</p>
          <p className="text-xs font-bold uppercase tracking-widest text-marigold-deep">{pet.kind}</p>
        </figcaption>
        <div className="absolute inset-x-0 bottom-0 h-3 bg-plum/80" />
      </div>
      <p className="mt-4 max-w-[13rem] text-center font-script text-lg text-muted-foreground">{pet.note}</p>
    </figure>
  );
}

function Intro({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="altar-bg fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 px-6 text-center">
      <h1 className="font-display text-3xl text-marigold md:text-5xl">Un altar para mis peludos</h1>
      <button
        onClick={onOpen}
        aria-label="Presiona la nariz para entrar"
        className="nose-pulse pop-hover rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-marigold"
      >
        <svg viewBox="0 0 240 200" className="w-60 md:w-80">
          <ellipse cx="120" cy="110" rx="115" ry="88" className="fill-wax" />
          <path d="M120 135 C70 135 45 105 52 75 C60 42 92 32 120 32 C148 32 180 42 188 75 C195 105 170 135 120 135Z" className="fill-plum-deep" />
          <ellipse cx="90" cy="92" rx="17" ry="12" className="fill-background" />
          <ellipse cx="150" cy="92" rx="17" ry="12" className="fill-background" />
          <path d="M120 135 V165 M120 165 Q95 185 75 168 M120 165 Q145 185 165 168" strokeWidth="5" fill="none" strokeLinecap="round" className="stroke-plum-deep" />
          <ellipse cx="100" cy="52" rx="24" ry="8" className="fill-wax" opacity="0.4" />
        </svg>
      </button>
      <p className="font-script text-2xl text-muted-foreground">Presiona la naricita de Max para entrar</p>
    </div>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  return (
    <div className="paw-cursor altar-bg min-h-screen overflow-x-hidden">
      <Petals count={open ? 45 : 20} />
      {!open && <Intro onOpen={() => setOpen(true)} />}
      {open && (
        <>
          <header className="relative z-10">
            <PapelPicado />
          </header>
          <main>
            <section className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center px-4 pt-10">
              <Arch />
              <div className="rise-in relative z-10 mt-[12vw] text-center md:mt-36">
                <p className="font-script text-2xl text-rosa">Día de Muertos · 2 de noviembre</p>
                <h1 className="pop-hover mt-2 font-display text-4xl leading-tight text-marigold md:text-7xl">
                  Max, Felix <br /> y Anís
                </h1>
                <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                  Que el camino de cempasúchil los guíe de vuelta a casa esta noche. Aquí siempre habrá luz para ustedes.
                </p>
              </div>
              <div className="relative z-10 mt-14 grid w-full grid-cols-1 justify-items-center gap-12 pb-10 sm:grid-cols-3">
                {PETS.map((p, i) => (
                  <Candle key={p.name} pet={p} i={i} />
                ))}
              </div>
            </section>
            <section className="relative z-10 mx-auto max-w-3xl px-6 py-16 text-center">
              <div className="mb-8 flex justify-center gap-3">
                {Array.from({ length: 7 }, (_, i) => (
                  <span key={i} className="marigold pop-hover h-10 w-10" />
                ))}
              </div>
              <p className="pop-hover font-script text-3xl text-foreground md:text-4xl">
                "No se van, solo se adelantan. Nos esperan con la cola moviéndose."
              </p>
            </section>
          </main>
          <footer className="relative z-10 border-t border-border py-6 text-center text-sm text-muted-foreground">
            Con amor eterno 🐾
          </footer>
        </>
      )}
    </div>
  );
}
