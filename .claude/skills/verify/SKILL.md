---
name: verify
description: Build/launch/drive recipe for verifying MathRoot changes end-to-end in a real browser.
---

# Verifying MathRoot

Static vanilla HTML/CSS/JS — no build step. The surface is the browser at
`file:///<repo>/index.html`.

## Handle

Use `playwright-core` with the system Chrome (no Playwright browser download needed):

```bash
mkdir -p "$SCRATCH" && cd "$SCRATCH"
npm init -y && npm i playwright-core
```

```js
const { chromium } = require('playwright-core');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
```

Quick sanity check before driving: `node --check app.js`.

## Driving the quiz

- Choice buttons use `pointerdown` listeners, not click. Dispatch
  `new PointerEvent('pointerdown', { bubbles: true })` on a `.choice-btn`.
- App state lives in top-level `let` globals (`currentAnswer`, `answered`, `totalQ`).
  They are NOT on `window`, but `page.evaluate` shares the global lexical scope, so
  bare identifiers work: `page.evaluate(() => currentAnswer)`.
- Between questions the old (answered) buttons linger ~200ms while the card animates.
  Wait for fresh buttons: `#choices-grid .choice-btn:not([data-answered])` and `!answered`.
- Answer cadence: next question appears 1.0s (correct) / 1.5s (wrong) after answering.
- Pick the correct choice: `btns.find(b => Math.abs(parseFloat(b.textContent) - currentAnswer) < 0.005)`.

## Print worksheets

Stub `window.print = () => {}` before clicking the print button, then inspect
`#print-section` DOM and screenshot with `page.emulateMedia({ media: 'print' })`.

## Gotchas

- Clicking Stop with zero answered questions goes straight home — no result section.
  Only wait for `#result-section.visible` after at least one answer.
- `.practice-btn[data-type=…]` matches both the home toggle and the (persisting, hidden)
  print-config markup — scope selectors to `#practice-toggle` or `#print-config-section`.
- Clock questions encode answers as minutes since midnight; `fmtClock(min)` formats,
  choice buttons carry the raw value in `dataset.value`.

- Home-screen cards re-run their `fadeUp` animation every time `#home-section`
  toggles display — screenshot immediately after navigating home and the cards are
  invisible mid-fade. Wait ~1.2s before screenshotting.
- Persistence lives in localStorage under `mathroot-*` keys (sessions, lang, grade,
  prefs, streak, mistakes, pb-*, theme). Seed/corrupt via `page.evaluate` + reload.
- Streak/date logic uses local dates via `toLocaleDateString('sv')`.

## Flows worth driving

Full session (pick op → start → answer all → results → back home), reload for
persistence, mistakes button (`.btn-mistakes`, appears only when bank non-empty),
both languages (header `#lang-btn`), mobile viewport (390px — op grid wraps 3+2).
