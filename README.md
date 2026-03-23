# MathRoot

A fast, mobile-friendly math trainer for kids. Practice arithmetic, unit conversions, and times tables — then print worksheets to take offline.

**Live:** https://danielhosbond.github.io/mathroot/

## Features

- **Math** — addition, subtraction, multiplication, division across 10 grade levels (numbers up to 20 through six-digit numbers)
- **Conversions** — length, weight, volume, time, and area unit conversions with an in-session reference sheet
- **Times Tables** — focused practice on any table from 1–12
- **Two input modes** — multiple choice (quiz) or typed answer (numpad)
- **Scoring & personal bests** — points system with per-session history stored locally
- **Print worksheets** — generate a PDF-ready worksheet (with optional answer key) for any operation, grade, or times table
- **Dark/light theme** — respects system preference, toggleable
- **English & Danish** — full UI translation for both languages

## Stack

Vanilla HTML, CSS, and JavaScript — no build step, no dependencies. Deployed via GitHub Pages.

## Development

Just open `index.html` in a browser. Changes to `app.js` or `style.css` are reflected on refresh.

Pushes to `main` auto-deploy to GitHub Pages via the workflow in `.github/workflows/static.yml`.
