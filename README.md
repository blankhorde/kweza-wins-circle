# Kweza Wins Circle

Lovable brief — Kweza's round results screen, v2: one template, fourteen games

Supersedes the earlier results-screen brief. The last exploration produced designs shaped around one game's round. That's the trap this brief removes: Kweza has fourteen games and growing, and this is the ONE screen they all end on. You are not designing a results screen for a game — you are designing the template every game's round pours into.

Kweza is a Nigerian competition app. People play quick puzzle games all week; every game earns points on ONE weekly leaderboard; top positions win real cash paid to their bank, winners crowned Sunday 8 PM. This screen is the beat where a few minutes of effort turns into points on that board. It should feel like a game with money on the line — not a SaaS product.

Build at 390px mobile width. Give us 2–3 genuinely different directions — different structures, not recolors of one idea.

The contract — what every game's round fills in

These are the slots. Every value is server-composed; display verbatim, never recompute.

Always present:

Points earned this round — the hero (e.g. +1,840). These points are already on this week's board.

The game's name. (Each game will later bring a light accent of its own; design on neutral Kweza chrome with one obvious place a game's accent could live — a name, a tint — nothing more.)

The round's shape: N boards, each ending exactly one of solved / stuck / skipped. N varies by game — some rounds are 5 boards, some are 12. The shape is a supporting glance, never a ledger: compress it (a strip, dots, a spark — your call), never a card per board.

Perfect count: how many boards were solved at best-possible. This is the flex worth celebrating when it's high — and worth silence when it's 0. Design both.

The bridge to the week: points are live on this week's board; positions settle Sunday 8 PM WAT, cash paid to the bank.

Varies by game — design ONE flexible slot, not fourteen layouts:

The board noun. Each game has its own word for its boards ("6 words", "5 codes"); "boards" is the default. Anywhere the count appears must read naturally with any short noun.

One line in the game's own voice. Some games talk in moves against a par, some in a guess budget, some have nothing extra to say. The template gets one compact optional slot for this — and must look complete when it's empty.

Absence rule: a missing value renders as absence (omit it, or "—"), never as a fake zero.

Fixed footer, both actions always: Play again (primary) and Back to Home (secondary). Styling is yours.

The proof — this is how a direction passes

Show every direction three times, as the same template filled with these three rounds:

Word Weld — 6 words, all 6 solved, 4 perfect, +2,310. The triumphant round. Extra line: "Perfect on 4 of 6".

Gravity Gems — 12 boards, 7 solved · 3 stuck · 2 skipped, 0 perfect, +680. The ordinary messy round — most rounds look like this. No extra line.

Keycode — 5 codes, all 5 solved, 1 perfect, +1,140. Extra line: "9 guesses to spare".

The same structure must hold all three with nothing moving around and nothing looking broken or empty. If a direction sings on round 1 and falls apart on round 2, it fails — round 2 is the one most players will see most often, so the messy round has to feel good too: honest about the stuck boards, warm about the points that still landed.

The rules of the world

Real copy, never lorem ipsum. Confident, Nigerian-market aware, never scammy. No invented winner counts or prize figures — the weekly board and the cash are real; point at them honestly without quoting amounts.

The vocabulary: the play session is a round; a board the player couldn't finish is stuck (never "jammed", never "failed"); the actions say Play again, never "run".

Weekly voice only: open-ended and inviting — play as many rounds as you like, points stack all week. No countdowns, no "tonight", no back-to-back framing (that energy belongs to a separate Blitz mode which has its own surfaces — not this screen).

What's free

Everything else: structure, how the total lands (count-up, stamp, ticket, something better), how the perfect count gets its glory, how stuck boards are acknowledged without shame, how the bridge line to the weekly board reads, whether the screen feels like a receipt, a celebration, or something we haven't thought of.

The app's existing feel (context, not constraint)

Warm cream world (#fff7ee ground, white cards, burnt-orange #e8590c brand), dark mode exists; prizes and tickets render on a near-black warm brown with cream and gold; the Blitz event's identity is indigo + lime. Rounded, friendly, Plus Jakarta Sans. Buttons are 12px-radius. A torn-ticket motif (stub · perforation · notches) is the product's signature for anything prize-shaped. Borrow what helps; break what doesn't — this screen is allowed to be louder than the rest of the app.

Deliver each direction as its own set of three screens (the three rounds above). No lorem ipsum — write real copy; we'll keep what's good.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8835714a-6afc-4712-8c80-abe4c303cf63).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
