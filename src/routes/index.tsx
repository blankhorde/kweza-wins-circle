import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Round Results | Kweza" },
      { name: "description", content: "See how three Kweza rounds turn into points on the weekly board." },
      { property: "og:title", content: "Round Results | Kweza" },
      { property: "og:description", content: "See how three Kweza rounds turn into points on the weekly board." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Outcome = "solved" | "stuck" | "skipped";

type RoundResult = {
  game: string;
  accentClass: string;
  points: string;
  noun: string;
  outcomes: Outcome[];
  perfect?: number;
  extra?: string;
};

const rounds: RoundResult[] = [
  {
    game: "Word Weld",
    accentClass: "bg-primary",
    points: "+2,310",
    noun: "words",
    outcomes: Array<Outcome>(6).fill("solved"),
    perfect: 4,
    extra: "Perfect on 4 of 6",
  },
  {
    game: "Gravity Gems",
    accentClass: "bg-perfect",
    points: "+680",
    noun: "boards",
    outcomes: [
      ...Array<Outcome>(7).fill("solved"),
      ...Array<Outcome>(3).fill("stuck"),
      ...Array<Outcome>(2).fill("skipped"),
    ],
  },
  {
    game: "Keycode",
    accentClass: "bg-perfect",
    points: "+1,140",
    noun: "codes",
    outcomes: Array<Outcome>(5).fill("solved"),
    perfect: 1,
    extra: "9 guesses to spare",
  },
];

const outcomeClasses: Record<Outcome, string> = {
  solved: "bg-solved",
  stuck: "bg-stuck",
  skipped: "bg-skipped",
};

function ResultTicket({ round }: { round: RoundResult }) {
  const solved = round.outcomes.filter((outcome) => outcome === "solved").length;
  const stuck = round.outcomes.filter((outcome) => outcome === "stuck").length;
  const skipped = round.outcomes.filter((outcome) => outcome === "skipped").length;
  const total = round.outcomes.length;
  const allSolved = solved === total;
  const outcomeSummary = [
    `${solved} solved`,
    stuck > 0 ? `${stuck} stuck` : null,
    skipped > 0 ? `${skipped} skipped` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="flex h-[720px] w-[390px] max-w-full shrink-0 flex-col overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-ticket">
      <div className="ticket-notches bg-ticket px-6 pb-6 pt-6 text-ticket-foreground">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <span className={`size-2.5 shrink-0 rounded-full ${round.accentClass}`} />
            <h2 className="truncate text-sm font-extrabold">{round.game}</h2>
          </div>
          <span className="text-[10px] font-semibold uppercase text-ticket-foreground/55">Round result</span>
        </div>

        <div className="mt-7 text-right">
          <p className="text-[11px] font-semibold uppercase text-ticket-foreground/60">Points earned</p>
          <p className="animate-score-arrive mt-1 text-[64px] font-black leading-none tabular-nums text-ticket-foreground">
            {round.points}
          </p>
          <p className="mt-2 text-[11px] font-medium text-ticket-foreground/60">already on this week's board</p>
        </div>

        <div className="mt-7">
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-1.5" aria-label={outcomeSummary}>
              {round.outcomes.map((outcome, index) => (
                <span
                  key={`${outcome}-${index}`}
                  className={`size-2.5 rounded-full ring-2 ring-current/20 ${outcomeClasses[outcome]}`}
                />
              ))}
            </div>
            <span className="shrink-0 text-[11px] font-semibold text-ticket-foreground/75">
              {total} {round.noun}
            </span>
          </div>
          <p className="mt-3 text-right text-[11px] font-semibold text-ticket-foreground/65">
            {allSolved ? `All ${total} solved` : outcomeSummary}
          </p>
        </div>
      </div>

      <div className="ticket-perforation h-[1.1rem] shrink-0" aria-hidden="true" />

      <div className="flex flex-1 flex-col px-6 pb-5 pt-4">
        <div className="h-[82px]">
          {round.perfect ? (
            <div className="flex h-full items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase text-primary">Perfect</p>
                <p className="mt-1 text-[28px] font-black leading-none">
                  {round.perfect} <span className="text-[13px] font-semibold text-muted-foreground">at best-possible</span>
                </p>
              </div>
              {round.perfect > 1 ? (
                <span className="animate-stamp-in inline-block rotate-[-5deg] rounded-md border-2 border-primary px-2 py-1 text-[10px] font-black uppercase text-primary">
                  Big round
                </span>
              ) : null}
            </div>
          ) : (
            <div className="flex h-full items-center rounded-button bg-muted px-4">
              <p className="text-[13px] font-semibold text-muted-foreground">Every point still counts. Keep stacking.</p>
            </div>
          )}
        </div>

        <div className="mt-3 h-[42px]">
          {round.extra ? (
            <p className="flex h-full items-center rounded-button bg-accent px-3 text-[13px] font-bold text-accent-foreground">
              {round.extra}
            </p>
          ) : null}
        </div>

        <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground">
          Points stack all week. Positions settle <strong className="text-foreground">Sunday 8 PM WAT</strong> — cash paid to your bank.
        </p>
      </div>

      <footer className="mt-auto flex gap-3 border-t border-border bg-card px-5 py-4">
        <Button size="result" className="flex-1">Play again</Button>
        <Button size="result" variant="secondary">Back to Home</Button>
      </footer>
    </article>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <header className="mx-auto mb-7 max-w-[1220px]">
        <p className="text-[11px] font-extrabold uppercase text-primary">Kweza</p>
        <h1 className="mt-1 text-2xl font-black">One round result. Every game.</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Three rounds, poured into the same Kweza score ticket.
        </p>
      </header>
      <div className="mx-auto flex max-w-[1220px] flex-wrap justify-center gap-6">
        {rounds.map((round) => <ResultTicket key={round.game} round={round} />)}
      </div>
    </main>
  );
}
