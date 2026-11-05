# How to put FitOut Quotes on GitHub (one time, about 5–10 minutes)

Repo: https://github.com/fitoutengg-sg/quotes-app
Your phone link (after setup): **https://fitoutengg-sg.github.io/quotes-app/**

This is the **Phone App edition**: same as V2.9 but WITHOUT the internal Project Fee & Profit Sharing section,
because GitHub Pages pages are public. Use your computer file (FitOut_Quotation_System_V2.9.html) for the full costing.

## Step 0 – Make sure the repo is Public
1. Open https://github.com/fitoutengg-sg/quotes-app and sign in.
2. Next to the repo name you will see **Public** or **Private**.
   If it says Private: click **Settings** (top menu) → scroll to the bottom ("Danger Zone") → **Change visibility** → **Public** → confirm.
   (Free GitHub Pages only works on Public repos. Only the app goes there – never quote files or bank details.)
3. If the repo does not exist yet: top-right **+** → **New repository** → name `quotes-app` → choose **Public** → **Create repository**.

## Step A – Upload the files
1. On your computer, find **FitOut_quotes-app_V2.9_upload.zip** → right-click → **Extract All…** → **Extract**.
   A folder opens with: `icons` folder, `index.html`, `manifest.json`, `service-worker.js`, `README.md`, `HOW_TO_UPLOAD.md`.
2. In the GitHub repo page, click **Add file** → **Upload files**.
   (Empty repo? Click the link **"uploading an existing file"** instead.)
3. In the extracted folder press **Ctrl + A** (select all), then **drag everything with the mouse** onto the GitHub page.
   - Drag the files and the `icons` folder – do NOT drag the outer folder itself.
   - Use dragging, not "choose your files" (that button cannot upload folders).
4. Wait until the list shows `icons/icon-192.png` … and `index.html`, then click the green **Commit changes**.
5. Check: the repo's main page must show `index.html` and the `icons` folder **at the top level** (not inside another folder).

## Step B – Switch on the website (GitHub Pages)
1. In the repo, click **Settings** (top menu, gear icon).
2. Left menu → **Pages**.
3. "Build and deployment": Source = **Deploy from a branch**; Branch = **main**, folder **/ (root)** → **Save**.
4. Wait 1–2 minutes, refresh. It shows "Your site is live at **https://fitoutengg-sg.github.io/quotes-app/**". Click it to test.

## Step C – Install on your phone
- **Android (Chrome):** open the link → tap the orange **📲 Install App** button
  (or the ⋮ menu → **Install app** / **Add to Home screen**).
- **iPhone:** open the link in Safari → tap **Share** (square with arrow; on newer iPhones it may be under **⋯** first)
  → **Add to Home Screen** → **Add**. Always open it from the Home Screen icon – iPhone may clear saved quotes
  of websites not used for about 7 days, but not of Home Screen apps.
- Then open ⚙️ **Settings** in the app once, fill in your details (bank details: type them only in the app) → **Save**.

## Step D – Future updates
Claude will give you a small update package (index.html + service-worker.js). Upload them the same way
(Add file → Upload files → drag → Commit). The phone gets the new version the next time it opens online.
**Never** upload the computer file FitOut_Quotation_System_V…html here – it has the internal costing and no phone-app parts.

## Good to know
- Quotes, Settings and photos are saved on each device separately (phone and computer don't share).
  To move a quote: 💾 Save to Desktop on one device → Load Quote on the other.
- Quotes made at the old GitHub address (engineeringfitout-oss/fitout-quotation) won't show here.
  Open the old address, 💾 Save to Desktop, then Load them in the new app.
- 🔒 Never upload quote files, passwords or bank details to GitHub, and never paste them in chat.
