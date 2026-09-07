# FitOut Quotes — Mobile App Setup

This turns your quotation tool into an app icon you tap on your phone —
no app store needed. It opens full-screen, like a real app.

## What's in this folder

- `index.html` — your quotation tool (same content as V2.2, now app-ready)
- `manifest.json` — tells the phone this is an installable app
- `service-worker.js` — lets it open even with a weak signal
- `icons/` — the app icon in the sizes phones need

## Step 1: Put it online at its own address

A phone can only "install" a web app from a real web address (not from
inside the Wix embed you're using now). Pick ONE of these — both are free:

### Option A — Netlify Drop (fastest, 2 minutes, no account needed)
1. Go to **app.netlify.com/drop** in a browser.
2. Drag this entire folder onto the page.
3. It gives you a link like `https://random-name-123.netlify.app` —
   that's your app's address. (You can rename it for free with a
   Netlify account, e.g. `fitout-quotes.netlify.app`.)

### Option B — GitHub Pages (since you already have the
`engineeringfitout-oss` GitHub account)
1. Create a new repository, e.g. `fitout-quotes-app`.
2. Upload all the files in this folder (keep the `icons` folder as-is).
3. In the repo's Settings → Pages, set the source to the main branch.
4. GitHub gives you a link like
   `https://engineeringfitout-oss.github.io/fitout-quotes-app/`.

Either way, keep note of the link you get — that's the one your team
opens on their phones.

## Step 2: Install it on a phone

**iPhone (Safari):**
1. Open the link from Step 1 in Safari (must be Safari, not Chrome).
2. Tap the Share button (square with an arrow).
3. Tap "Add to Home Screen".

**Android (Chrome):**
1. Open the link from Step 1 in Chrome.
2. You'll usually see a green "📲 Install App" button appear in the
   toolbar — tap it. If not, tap the ⋮ menu → "Install app".

Once installed, it opens from the home screen icon like any other app —
no browser address bar, no typing the link again.

## Notes

- This is the same quotation tool, same data entry, same PDFs — just
  wrapped so it installs as an app.
- It's set up for "nice to have" offline support: it'll open even with
  a weak signal, but PDF generation and the very first load still need
  internet once.
- Your Wix embed at fitoutengineering.co/quotes can stay exactly as it
  is for desktop use — this is an additional way to reach the same tool
  from a phone.
- If you'd rather I set up the Netlify or GitHub hosting for you
  directly, I'd need you to do the actual account sign-in/upload step
  yourself (I don't handle logins or account creation) — but I can
  walk you through it live.
