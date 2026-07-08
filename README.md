# MathRoot

A fast, mobile-friendly math trainer for kids. Practice arithmetic, missing-number sentences, word problems, fractions, unit conversions, times tables, clock reading, and geometry — with per-kid profiles, streaks, badges, skill tracking, and mistake replay to keep practice going — then print worksheets or install it as an offline app.

**Live:** https://danielhosbond.github.io/mathroot/

## Features

- **Math** — addition, subtraction, multiplication, division, missing-number sentences (7 + ▢ = 15), a mixed session, or word problems (story problems in both languages), across 10 grade levels (numbers up to 20 through six-digit numbers)
- **Fractions & percentages** — compare fractions, fraction of a number, equivalent fractions, add & subtract, percentages, and rounding
- **Conversions** — length, weight, volume, time, and area unit conversions with an in-session reference sheet
- **Times Tables** — focused practice on any table from 1–20
- **Clock** — tell the time on an analogue clock face (24-hour with a ☀️/🌙 day-night cue): read the clock, find the clock, or mixed
- **Geometry** — recognize shapes and count sides/corners, or compute perimeter and area of labeled figures
- **Profiles** — multiple kids on one device, each with their own history, streaks, mistakes, badges, and grade
- **Installable & offline** — a PWA: add it to the home screen and practice without an internet connection
- **Practice your mistakes** — missed questions are saved and replayed with light spaced repetition (often-missed and longest-unseen first); two correct answers in a row masters a mistake
- **My skills** — per-skill accuracy bars across operations and practice types, plus a 1–20 times-table mastery grid (tap a table to practice it)
- **Streaks & daily goal** — answer 20 questions a day to build a practice streak
- **Badges** — 14 achievements to collect, from a first perfect session to a 30-day streak
- **Two input modes** — multiple choice (quiz) or typed answer (numpad)
- **Scoring & personal bests** — points system with per-session history stored locally
- **Remembers your setup** — history, language, grade, and input preferences persist across visits
- **Print worksheets** — generate a PDF-ready worksheet (with optional answer key) for any practice type: arithmetic, missing numbers, word problems, fractions, conversions, times tables, clock faces, or geometry figures
- **Dark/light theme** — respects system preference, toggleable
- **English & Danish** — full UI translation for both languages

## Stack

Vanilla HTML, CSS, and JavaScript — no build step, no dependencies. Deployed via GitHub Pages.

## Development

Just open `index.html` in a browser. Changes to `app.js` or `style.css` are reflected on refresh.

The service worker (offline support) is skipped on `file://`. To test it, serve over HTTP —
`python3 -m http.server` — and open `http://localhost:8000`. Deploys are picked up automatically
on the next online load (stale-while-revalidate), so no cache-version bump is needed per release.

Pushes to `main` auto-deploy to GitHub Pages via the workflow in `.github/workflows/static.yml`.
