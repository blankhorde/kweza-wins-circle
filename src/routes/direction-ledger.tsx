import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { outcomeClasses, rounds, tally, type RoundResult } from "@/lib/round-data";

export const Route = createFileRoute("/direction-ledger")({
  head: () => ({
    meta: [
      { title: "Direction C: Ledger | Kweza" },
      {
        name: "description",
        content: "Kweza round results as a paid-out receipt: line-by-line scoring and the week's running total.",
      },
      { property: "og:title", content: "Direction C: Ledger | Kweza" },
      {
        property: "og:description",
        content: "Kweza round results as a paid-out receipt: line-by-line scoring and the week's running total.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LedgerDirection,
});

function LedgerRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline gap-2 py-[7px]">
      <span className={`text-[13px] ${strong ? "font-extrabold text-foreground" : "font-medium text-muted-foreground"}`}>
        {label}
      </span>
      <span className="min-w-4 flex-1 self-center border-b border-dashed border-border-strong" aria-hidden="true" />
      <span className={`tabular-nums ${strong ? "text-[15px] font-black" : "text-[13px] font-bold text-foreground"}`}>
        {value}
      </span>
    </div>
  );
}

function LedgerScreen({ round }: { round: RoundResult }) {
  const { solved, stuck, skipped, total, summary } = tally(round.outcomes);

  return (
    <article className="flex h-[720px] w-[390px] max-w-full shrink-0 flex-col overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-ticket">
      <div className="flex items-center justify-between bg-ticket px-6 py-4 text-ticket-foreground">
        <div className="flex min-w-0 items-center gap-2">
          <span className={`size-2.5 shrink-0 rounded-full ${round.accentClass}`} />
          <h2 className="truncate text-sm font-extrabold">{round.game}</h2>
        </div>
        <span className="text-[10px] font-semibold uppercase text-ticket-foreground/55">Receipt</span>
      </div>

      <div className="px-6 pt-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Points earned</p>
        <p className="animate-score-arrive mt-1 text-[58px] font-black leading-none tabular-nums text-foreground">
          {round.points}
        </p>
      </div>

      <div className="mt-5 px-6">
        <LedgerRow label={`${round.noun.charAt(0).toUpperCase()}${round.noun.slice(1)} played`} value={String(total)} />
        <LedgerRow label="Solved" value={String(solved)} />
        {stuck > 0 ? <LedgerRow label="Stuck" value={String(stuck)} /> : null}
        {skipped > 0 ? <LedgerRow label="Skipped" value={String(skipped)} /> : null}
        <LedgerRow label="At best-possible" value={round.perfect ? String(round.perfect) : "—"} />
      </div>

      <div className="mt-4 px-6">
        <div className="flex flex-wrap gap-1.5" aria-label={summary}>
          {round.outcomes.map((outcome, index) => (
            <span key={`${outcome}-${index}`} className={`size-2.5 rounded-[3px] ${outcomeClasses[outcome]}`} />
          ))}
        </div>
      </div>

      <div className="mt-4 h-[46px] px-6">
        {round.extra ? (
          <p className="animate-stamp-in flex h-full items-center rounded-button border-2 border-primary px-3 text-[13px] font-black uppercase text-primary">
            {round.extra}
          </p>
        ) : (
          <p className="flex h-full items-center rounded-button bg-muted px-3 text-[13px] font-semibold text-muted-foreground">
            No bonus lines this round.
          </p>
        )}
      </div>

      <div className="ticket-perforation mt-5 h-[1.1rem] shrink-0" aria-hidden="true" />

      <div className="px-6 pt-4">
        <LedgerRow label="Week total" value={`${round.weekTotal} pts`} strong />
        <LedgerRow label="Board position" value={`#${round.rank}`} strong />
        <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
          Points stack all week. Positions settle <strong className="text-foreground">Sunday 8 PM WAT</strong> — cash paid to your bank.
        </p>
      </div>

      <footer className="mt-auto flex gap-3 border-t border-border px-5 py-4">
        <Button size="result" className="flex-1">Play again</Button>
        <Button size="result" variant="secondary">Back to Home</Button>
      </footer>
    </article>
  );
}

function LedgerDirection() {
  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <header className="mx-auto mb-7 max-w-[1220px]">
        <p className="text-[11px] font-extrabold uppercase text-primary">Direction C</p>
        <h1 className="mt-1 text-2xl font-black">Ledger — every round, itemised.</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          A payout receipt: line items any of the fourteen games can fill, then the week's running total.
        </p>
        <nav className="mt-3 flex gap-4 text-sm font-bold text-primary">
          <Link to="/">A · Ticket</Link>
          <Link to="/direction-scoreboard">B · Scoreboard</Link>
        </nav>
      </header>
      <div className="mx-auto flex max-w-[1220px] flex-wrap justify-center gap-6">
        {rounds.map((round) => <LedgerScreen key={round.game} round={round} />)}
      </div>
    </main>
  );
}
