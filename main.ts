// The Meeting That Should Have Been One Line
// make.fun competition: u-boothlord-the-meeting-that-should-have-been-one-line-a4af6d1c
//
// Writes a single sentence to /output/entry.txt: the one line that could
// have replaced an entire pointless meeting. Deterministic, no network,
// no input, no dependencies. Node 22 runs this TypeScript file as-is.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Brainstormed candidates (judged against the brief: kill the meeting
// outright, relatable office life, a sting, stands alone, original):
//  1. "The only decision this meeting made was to hold another meeting
//     about the decision it didn't make." — recursive, but abstract.
//  2. "Nobody in this room can approve it, nobody can change it, and
//     nobody will remember it by lunch." — true, but more complaint
//     than joke; doesn't kill the meeting, just describes it.
//  3. "We spent an hour and twelve salaries discovering the answer was
//     in the email nobody read." — too close to the house cliché
//     ("this meeting could have been an email").
//  4. "This meeting's single outcome was a calendar invite for the
//     meeting about this meeting." — funny, but the meeting still
//     produced *something*.
//  5. "Twelve people just spent an hour agreeing on something the group
//     chat settled in four minutes yesterday." — CHOSEN. The decision
//     already existed before the meeting, so the meeting had no reason
//     to happen at all; the group chat is real office life everyone
//     recognises; the hour-vs-four-minutes contrast is the sting; and
//     it needs no context to land.
const LINE =
  "Twelve people just spent an hour agreeing on something the group chat settled in four minutes yesterday.";

const OUT = "/output/entry.txt";

function main(): void {
  // Gate, enforced here before writing anything:
  // UTF-8 text, 1-200 characters, not only whitespace, exactly one line.
  const chars = [...LINE].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, must be 1-200`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, LINE, "utf8");
  console.log(`wrote ${chars} characters to ${OUT}`);
}

main();
