export type Outcome = "solved" | "stuck" | "skipped";

export type RoundResult = {
  game: string;
  accentClass: string;
  points: string;
  noun: string;
  outcomes: Outcome[];
  perfect?: number;
  extra?: string;
  rank: number;
  rankBefore: number;
  weekTotal: string;
};

export const rounds: RoundResult[] = [
  {
    game: "Word Weld",
    accentClass: "bg-primary",
    points: "+2,310",
    noun: "words",
    outcomes: Array<Outcome>(6).fill("solved"),
    perfect: 4,
    extra: "Perfect on 4 of 6",
    rank: 18,
    rankBefore: 63,
    weekTotal: "14,820",
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
    rank: 240,
    rankBefore: 256,
    weekTotal: "3,410",
  },
  {
    game: "Keycode",
    accentClass: "bg-perfect",
    points: "+1,140",
    noun: "codes",
    outcomes: Array<Outcome>(5).fill("solved"),
    perfect: 1,
    extra: "9 guesses to spare",
    rank: 71,
    rankBefore: 94,
    weekTotal: "8,255",
  },
];

export const outcomeClasses: Record<Outcome, string> = {
  solved: "bg-solved",
  stuck: "bg-stuck",
  skipped: "bg-skipped",
};

export function tally(outcomes: Outcome[]) {
  const solved = outcomes.filter((o) => o === "solved").length;
  const stuck = outcomes.filter((o) => o === "stuck").length;
  const skipped = outcomes.filter((o) => o === "skipped").length;
  const summary = [
    `${solved} solved`,
    stuck > 0 ? `${stuck} stuck` : null,
    skipped > 0 ? `${skipped} skipped` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  return { solved, stuck, skipped, total: outcomes.length, summary };
}
