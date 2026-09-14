import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { outcomeClasses, rounds, tally, type RoundResult } from "@/lib/round-data";

type ClimbVariant = "combined" | "timeline" | "sentence" | "tag";

function PositionBlock({ round, variant }: { round: RoundResult; variant: ClimbVariant }) {
  const climb = round.rankBefore - round.rank;

  if (variant === "combined") {
    return (
      <div className="rounded-[1rem] bg-ticket-foreground/8 px-5 py-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-ticket-foreground/55">
          Board position
        </p>
        <p className="mt-1 text-[40px] font-black leading-none tabular-nums">#{round.rank}</p>
        <p className="mt-1 text-[12px] font-semibold text-solved">
          ▲ {climb} places from #{round.rankBefore}
        </p>
      </div>
    );
  }

  if (variant === "timeline") {
    return (
      <div className="rounded-[1rem] bg-ticket-foreground/8 px-5 py-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-ticket-foreground/55">
          Board position
        </p>
        <div className="mt-3 flex items-center gap-2">
          <p className="text-[12px] font-bold text-ticket-foreground/55">#{round.rankBefore}</p>
          <span className="text-[11px] font-black text-solved">▲ {climb}</span>
          <p className="text-[16px] font-black tabular-nums text-ticket-foreground">#{round.rank}</p>
        </div>
        <p className="mt-1 text-[11px] text-ticket-foreground/55">before this round → now</p>
      </div>
    );
  }

  if (variant === "sentence") {
    return (
      <div className="rounded-[1rem] bg-ticket-foreground/8 px-5 py-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-ticket-foreground/55">
          Board position
        </p>
        <p className="mt-2 text-[14px] font-semibold leading-snug text-ticket-foreground">
          Moved up <span className="font-black text-solved">{climb} places</span>{" "}
          from <span className="text-ticket-foreground/55">#{round.rankBefore}</span> to{" "}
          <span className="font-black">#{round.rank}</span>.
        </p>
      </div>
    );
  }

  // tag
  return (
    <div className="rounded-[1rem] bg-ticket-foreground/8 px-5 py-4">
      <div className="flex items-baseline justify-between">
        <p className="text-[11px] font-bold uppercase tracking-wide text-ticket-foreground/55">
          Board position
        </p>
        <span className="rounded-full bg-solved/15 px-2.5 py-1 text-[11px] font-black text-solved">
          ▲ {climb}
        </span>
      </div>
      <p className="mt-1 text-[40px] font-black leading-none tabular-nums">#{round.rank}</p>
      <p className="mt-1 text-[12px] text-ticket-foreground/55">was #{round.rankBefore} before this round</p>
    </div>
  );
}

function OptionCard({
  round,
  variant,
  label,
}: {
  round: RoundResult;
  variant: ClimbVariant;
  label: string;
}) {
  const { solved, total, summary } = tally(round.outcomes);

  return (
    <article className="flex h-[720px] w-[390px] max-w-full shrink-0 flex-col overflow-hidden rounded-[1.5rem] bg-ticket text-ticket-foreground shadow-ticket">
      <div className="flex items-center justify-between border-b border-ticket-foreground/10 px-6 py-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className={`size-2.5 shrink-0 rounded-full ${round.accentClass}`} />
          <h2 className="truncate text-sm font-extrabold">{round.game}</h2>
        </div>
        <span className="text-[10px] font-semibold uppercase text-ticket-foreground/55">Round complete</span>
      </div>

      <div className="flex flex-col items-center px-6 pt-9">
        <p className="text-[11px] font-bold uppercase tracking-widest text-ticket-foreground/55">You scored</p>
        <p className="mt-2 text-[76px] font-black leading-none tabular-nums">{round.points}</p>
        <p className="mt-2 text-[12px] font-semibold text-ticket-foreground/60">
          Week total {round.weekTotal} pts
        </p>
      </div>

      <div className="mx-6 mt-8">
        <PositionBlock round={round} variant={variant} />
      </div>

      <div className="px-6 pt-7">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-wide text-ticket-foreground/55">
            {total} {round.noun}
          </p>
          <p className="text-[11px] font-semibold text-ticket-foreground/75">{summary}</p>
        </div>
        <div className="mt-3 flex gap-1.5" aria-label={summary}>
          {round.outcomes.map((outcome, index) => (
            <span
              key={`${outcome}-${index}`}
              className={`h-2.5 flex-1 rounded-full ${outcomeClasses[outcome]}`}
            />
          ))}
        </div>
        <div className="mt-5 h-[54px]">
          {round.perfect ? (
            <div className="flex h-full items-center gap-3 rounded-button border-2 border-perfect px-4">
              <span className="text-[24px] font-black tabular-nums text-perfect">{round.perfect}</span>
              <p className="text-[12px] font-bold uppercase leading-[1.25] text-ticket-foreground/80">
                at best-possible
                {round.extra ? (
                  <span className="mt-0.5 block font-semibold normal-case leading-[1.25] text-ticket-foreground/55">
                    {round.extra}
                  </span>
                ) : null}
              </p>
            </div>
          ) : (
            <div className="flex h-full items-center rounded-button bg-ticket-foreground/8 px-4">
              <p className="text-[12px] font-semibold text-ticket-foreground/65">
                {solved} landed. Every point still counts — keep stacking.
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="mt-auto px-6 pb-4 text-center text-[12px] text-ticket-foreground/55">
        Positions settle <strong className="text-ticket-foreground">Sunday 8 PM WAT</strong> — cash paid to your bank.
      </p>

      <footer className="flex gap-3 border-t border-ticket-foreground/10 px-5 py-4">
        <Button size="result" className="flex-1">Play again</Button>
        <Button size="result" variant="secondary">Back to Home</Button>
      </footer>
    </article>
  );
}

export const Route = createFileRoute("/direction-scoreboard-options")({
  head: () => ({
    meta: [
      { title: "Direction B: Scoreboard Options | Kweza" },
      { name: "description", content: "Board position layout options for the Kweza scoreboard direction." },
      { property: "og:title", content: "Direction B: Scoreboard Options | Kweza" },
      { property: "og:description", content: "Board position layout options for the Kweza scoreboard direction." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ScoreboardOptions,
});

function ScoreboardOptions() {
  const round = rounds[0]; // Word Weld

  const options: { variant: ClimbVariant; label: string }[] = [
    { variant: "combined", label: "A. Combined subtitle" },
    { variant: "timeline", label: "B. Timeline strip" },
    { variant: "sentence", label: "C. Single sentence" },
    { variant: "tag", label: "D. Now / Was tag" },
  ];

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <header className="mx-auto mb-7 max-w-[1220px]">
        <p className="text-[11px] font-extrabold uppercase text-primary">Direction B options</p>
        <h1 className="mt-1 text-2xl font-black">Board position: four ways to show the climb.</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Same round (Word Weld), same data. Only the board-position block changes.
        </p>
        <nav className="mt-3 flex gap-4 text-sm font-bold text-primary">
          <Link to="/">A · Ticket</Link>
          <Link to="/direction-scoreboard">B · Scoreboard</Link>
          <Link to="/direction-ledger">C · Ledger</Link>
        </nav>
      </header>
      <div className="mx-auto flex max-w-[1600px] flex-wrap justify-center gap-8">
        {options.map((opt) => (
          <div key={opt.variant} className="flex flex-col items-center gap-3">
            <span className="text-sm font-bold text-foreground">{opt.label}</span>
            <OptionCard round={round} variant={opt.variant} label={opt.label} />
          </div>
        ))}
      </div>
    </main>
  );
}
