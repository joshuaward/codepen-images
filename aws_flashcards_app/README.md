# AWS AI Practitioner Flashcards
### AIF-C01 Study App

A self-contained React flashcard app — **no build step, no dependencies to install**.
Just open `index.html` in any modern browser.

---

## How to run

### Option 1 — Direct open (simplest)
Double-click `index.html`. It will open in your default browser.

> Note: Some browsers block external font/script loading from `file://` URLs.  
> If cards don't appear, use Option 2.

### Option 2 — Local server (recommended)
Any one of these works:

```bash
# Python (built into macOS/Linux)
python3 -m http.server 3000
# then open http://localhost:3000

# Node.js (npx, no install needed)
npx serve .
# then open the URL it prints

# VS Code
# Install the "Live Server" extension → right-click index.html → Open with Live Server
```

---

## Features

| Feature | Detail |
|---|---|
| 63 flashcards | All 5 exam domains + Exam Tips |
| Domain filter | Study one domain at a time |
| Flip animation | Click card or press Space |
| Got it / Missed | Track your progress each session |
| Review missed | Re-drill only the cards you missed |
| Shuffle | Every session is randomized |
| Keyboard shortcuts | Space · ← → · 1 · 2 |
| Score breakdown | Per-domain results on the done screen |

## Keyboard shortcuts

| Key | Action |
|---|---|
| `Space` or `Enter` | Flip card |
| `→` | Next card |
| `←` | Previous card |
| `1` | Mark "Got it" (after flipping) |
| `2` | Mark "Missed" (after flipping) |

## Exam domain weights

| Domain | Weight | Cards |
|---|---|---|
| Domain 1: AI & ML Fundamentals | 20% | 16 |
| Domain 2: GenAI Fundamentals | 24% | 13 |
| Domain 3: Foundation Model Applications | 28% | 10 |
| Domain 4: Responsible AI | 14% | 8 |
| Domain 5: Security & Governance | 14% | 11 |
| Exam Tips | — | 5 |

**Passing score: 700 / 1000**

---

## Customizing cards

To add or edit cards, open `index.html` in a text editor and find the `RAW_CARDS` array (~line 120).
Each entry is: `["Domain label", "Front (question)", "Back (answer)"]`

```js
["Domain 1: AI & ML Fundamentals", "Your question?", "Your answer."],
```

Save the file and refresh your browser.

---

Good luck on the exam! 🎯
