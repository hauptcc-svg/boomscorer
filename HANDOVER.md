# 🎯 BOOM SCORER — DEVELOPER HANDOVER

**Last updated**: 2026-04-21  
**Handed over by**: Cowork / Claude  
**Handed over to**: Claude Code  

---

## 📋 Project Overview

| Field | Value |
|---|---|
| **App name** | Boom Scorer |
| **Purpose** | Score tracker for South African Klawerjas & Dominoes games |
| **Primary URL** | https://boomscorer.vercel.app |
| **Legacy URL** | https://boomscorer.fastbusiness.co.za (old domain, may still resolve) |
| **Repository** | https://github.com/hauptcc-svg/boomscorer.git |
| **Branch** | `main` (auto-deploys to Vercel on push) |
| **Stack** | Vanilla HTML / CSS / JS — zero frameworks, single-file app |
| **Sponsor** | TradiQuote (tradiquote.co.za) — ads + branding throughout |

---

## 📁 File Structure

```
Boom Scorer/
├── index.html              ← ENTIRE app lives here (game logic + share card)
├── boom-winner-card.html   ← Standalone 1080x1080 card preview (reference/test only)
├── sw.js                   ← Service worker (PWA caching) — currently v4
├── vercel.json             ← Vercel headers config (Cache-Control, security)
├── manifest.json           ← PWA manifest
├── favicon.svg             ← Green "B" logo
├── icon-192.png            ← PWA icon
├── icon-512.png            ← PWA icon
├── pewnaosoba7-pig-125132.mp3  ← Pig oink sound (VARK detection)
├── ad.html                 ← TradiQuote ad creative (loaded in iframes)
├── sitemap.xml             ← SEO
├── robots.txt              ← SEO
├── .htaccess               ← Apache config (legacy, Vercel ignores it)
├── HANDOVER.md             ← This file
├── README.md               ← Basic deployment instructions
└── GITHUB_QUICKSTART.md    ← Git/Vercel setup guide
```

---

## 🎮 How the App Works

### Game Flow
1. **Setup screen** — choose Klawerjas or Dominoes, enter 4 player names (2 per team), optional photos
2. **Game screen** — score buttons per team, ticks display, edit button (pencil) per team
3. **Results screen** — winner announcement, scores, Download & Share button, Play Again

### Scoring Rules
**Klawerjas**: Win (+1), Double Win (+2), Af (+5, instant win)  
**Dominoes**: Win (+1), MILO (+2), TEL (+2)  
**First to 5 wins** — triggers BOOM and results screen

### VARK Detection
- **5-0**: Single VARK (pig emoji) — pig oink sound plays, pig animation on loser
- **6-0**: Double VARK (two pig emojis) — same but extra humiliation

### Data Storage
```javascript
localStorage['boomScorerPlayers'] = ["Craig", "Ewan", "Delicia", "Alistair"]
// Player names persist for autocomplete. No other data is stored.
```

### State Object
```javascript
state = {
    gameType: 'klawerjas' | 'dominoes',
    team1: {
        players: [{ name: 'Craig', photo: 'data:image/...' }, ...],
        score: 0,
        ticks: [{ type: 'Win', timestamp: 1234567890 }, ...]
    },
    team2: { /* same */ },
    history: [{ gameNumber, winner, type, team1Score, team2Score }]
}
```

---

## 🖼️ Share Card (THE MAIN THING WORKED ON TODAY)

### What it is
When a game ends, the player taps **Download & Share** to save a **1080x1080px PNG** to their phone for WhatsApp/Instagram sharing.

### Architecture
The share card is a **hidden `<div id="shareCard">`** inside `index.html`, positioned off-screen at `left: -9999px`. It is **always in the DOM** — html2canvas captures it directly without needing to show/hide it.

### Card Layout (top to bottom, fixed at 1080x1080)
```
+-----------------------------------------------------+  60px
|  HTTPS://BOOMSCORER.VERCEL.APP - TRACK YOUR GAMES  |  dark #1c1c1c
|                              Sponsored by | TradiQ  |
+-----------------------------------------------------+
|                                                     |
|            trophy  BOOM WINNER  trophy              |
|                   BOOM!                             |  green gradient
|                 KLAWERJAS                           |  flex:1
|  -------------------------------------------------- |
|  +--------------+    VS    +--------------+         |
|  |   TEAM 1     |          |   TEAM 2     |         |
|  |  [player 1]  |          |  [player 1]  |         |
|  |  [player 2]  |          |  [player 2]  |         |
|  |      5       |          |      1       |         |
|  +--------------+          +--------------+         |
|                                                     |
+-----------------------------------------------------+  108px
|  TradiQuote  |  Quote on site. Get signed.  | Start |  dark #0f1117
|              |  Collect deposit.            | for   |
|              |  tradiquote.co.za            | R10 > |
+-----------------------------------------------------+
```

### Dynamic values (injected by JS when game ends)
| Element ID | What it shows |
|---|---|
| `scGame` | Game type text (KLAWERJAS or DOMINOES) |
| `scScore1` | Team 1 final score (or pig emoji for VARK) |
| `scScore2` | Team 2 final score |
| `scPlayers1` | Team 1 player rows (avatar + name) |
| `scPlayers2` | Team 2 player rows (avatar + name) |
| `scTeam1` | Gets class `winner` added if team 1 won |
| `scTeam2` | Gets class `winner` added if team 2 won |

Winner class adds gold glow: `box-shadow: 0 0 0 4px rgba(255,215,0,0.22)`

### Fonts used in card
- **Syne** (700/800/900) — headings, wordmarks, scores
- **DM Sans** (400/500/700) — body, labels
- Both added to the existing Google Fonts import in `<head>` (alongside Roboto which the main app uses)

### downloadCard() function (current version)
```javascript
function downloadCard() {
    const card = document.getElementById('shareCard');
    // Card is off-screen at left:-9999px — no show/hide needed
    html2canvas(card, {
        width: 1080, height: 1080, scale: 1,
        useCORS: true, allowTaint: true,
        backgroundColor: null, logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'boom-winner-klawerjas-team-2.png'; // dynamic slug
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}
```

### Winner JS additions (lines added to existing winner-detection block)
```javascript
// Toggle winner gold glow on correct team card
document.getElementById('scTeam1').classList.toggle('winner', winner === 'team1');
document.getElementById('scTeam2').classList.toggle('winner', winner === 'team2');

// Player rows use sc-avatar class
div.innerHTML = `
    ${p.photo ? '<img class="sc-avatar" src="' + p.photo + '">' : '<div class="sc-avatar"></div>'}
    <div class="name">${p.name}</div>
`;
```

---

## 🚨 Outstanding Issue — WHY OLD CARD STILL DOWNLOADS

**Symptom**: After deploying today, clicking Download & Share still saves the OLD card (plain green, `VISIT: HTTPS://BOOMSCORER.FASTBUSINESS.CO.ZA` URL, no TradiQuote bottom strip).

**Root cause**: The **service worker** (`sw.js`) was on `boom-scorer-v3` and had `index.html` cached. Users' browsers serve the cached old version instead of the newly deployed one.

**Fix applied in this session**: `sw.js` bumped from `boom-scorer-v3` to `boom-scorer-v4`.

**THIS HAS NOT BEEN COMMITTED YET. Run this to deploy the fix:**
```bash
cd "C:\Users\haupt\Claude\Boom Scorer"
git add index.html sw.js
git commit -m "fix: new TradiQuote share card + bump SW cache to v4"
git push origin main
```

After deploy, users may need to **close and reopen the app** once for the new service worker to activate and bust the old cache.

---

## 🔧 Key CSS Classes (Share Card)

All share card styles are prefixed `sc-` to avoid conflicts with the rest of the app CSS.

```
.share-card         -> 1080x1080 wrapper, position:fixed left:-9999px (off-screen)
.sc-top-bar         -> Dark 60px header bar
.sc-main            -> Green gradient flex:1 middle section
.sc-bottom-strip    -> Dark 108px TradiQuote footer
.sc-team            -> Team card (frosted glass look)
.sc-team.winner     -> Gold glow border on winning team
.sc-big-score       -> 88px Syne score number
.sc-boom            -> 148px BOOM! headline
.sc-avatar          -> 44px circle (player photo or empty placeholder)
.sc-divider         -> White gradient horizontal rule (z-index:2 to appear above pseudo-elements)
```

---

## 📣 Ad Integration

Two iframe ad zones in `index.html` that load `/ad.html`:
- **Top**: Above game UI (TradiQuote rotating ad creative)
- **Bottom**: Below results screen (TradiQuote CTA)

`ad.html` is a standalone rotating ad file. The iframes are wrapped in a transparent click overlay that opens `https://tradiquote.co.za?utm_source=boomscorer...`

---

## 🛠️ Deployment

**Every push to `main` triggers Vercel auto-deploy** (usually ~30 seconds).

```bash
git add <files>
git commit -m "your message"
git push origin main
```

**Remote URL** uses a GitHub PAT stored in the git remote URL. If push fails with auth error:
```bash
git remote set-url origin https://hauptcc-svg:YOUR_TOKEN@github.com/hauptcc-svg/boomscorer.git
```

**Cache headers** (vercel.json):
- `sw.js` — `no-cache` (always fresh, critical for SW updates)
- `*.mp3`, `*.png`, `*.svg` — `immutable` 1 year
- Everything else — `public, max-age=3600, must-revalidate`

---

## 📐 Design Tokens (Share Card)

```
Orange:      #f97316
Dark bg:     #0f1117
Dark topbar: #1c1c1c
Green grad:  linear-gradient(168deg, #2ecc71 0%, #25b35e 38%, #1a9148 100%)
```

---

## ⚠️ Things NOT to Change

- TradiQuote sponsor content (top bar text, bottom strip wordmark/tagline/CTA)
- Top bar URL (`HTTPS://BOOMSCORER.VERCEL.APP — TRACK YOUR GAMES`)
- Syne + DM Sans fonts in the share card
- The `sc-` CSS prefix convention
- Service worker network-first strategy (intentional for offline support)
- html2canvas version (1.4.1 from cdnjs — tested and working)

---

## 🗂️ Reference File: boom-winner-card.html

A **standalone version** of the share card with its own Download & Share button. Lives at `https://boomscorer.vercel.app/boom-winner-card.html`. Used for visual design testing only — the app uses the embedded `#shareCard` div inside `index.html` for actual downloads.

---

## ✅ Next Steps for Claude Code

1. **Commit and push `sw.js` + `index.html`** — fixes the service worker cache so users get the new card design:
   ```bash
   git add index.html sw.js
   git commit -m "fix: new TradiQuote share card + bump SW cache to v4"
   git push origin main
   ```
2. **Test** — open boomscorer.vercel.app in a fresh/incognito browser, play a game, tap Download & Share, confirm PNG has: dark top bar + green middle section + TradiQuote bottom strip
3. **Verify player names appear** on the downloaded card (check `scPlayers1`/`scPlayers2` rendering via html2canvas)
4. **Optional cleanup** — update the old `fastbusiness.co.za` references in README.md and meta tags to `vercel.app`
