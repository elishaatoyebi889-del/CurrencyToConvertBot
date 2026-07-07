# Currency To Convert Bot (@CurrencyToConvertBot)

A Telegram bot that converts any world currency to another, defaulting to NGN (Nigerian Naira).

## Features
- `/start` — shows instructions
- `/convert <amount> <from> <to>` — e.g. `/convert 100 USD NGN`
- `/convert <amount> <from>` — defaults target to NGN, e.g. `/convert 100 USD`
- Uses free, no-key-required exchange rate API (https://open.er-api.com)

---

## 1. Get your Bot Token from Telegram

1. Open Telegram, search for **@BotFather**
2. Send `/newbot`
3. Choose a display name (e.g. "Currency Convert")
4. Choose the username: `CurrencyToConvertBot` (must end in "bot")
5. BotFather will give you a **token** — save it, you'll need it below

---

## 2. Run Locally (optional, to test first)

```bash
git clone <your-repo-url>
cd currency-bot
npm install
cp .env.example .env
# open .env and paste your real token after BOT_TOKEN=
npm start
```

Then message your bot on Telegram to test it.

---

## 3. Push to GitHub

```bash
cd currency-bot
git init
git add .
git commit -m "Initial commit: currency convert bot"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

> Note: `.env` is in `.gitignore` so your real token is never pushed to GitHub. Never commit your real token.

---

## 4. Deploy on Railway

1. Go to https://railway.app and log in (GitHub login is easiest)
2. Click **New Project** → **Deploy from GitHub repo**
3. Select the repo you just pushed
4. Railway will detect it's a Node.js app automatically
5. Go to your new project → **Variables** tab
6. Add a variable:
   - **Key:** `BOT_TOKEN`
   - **Value:** *(paste your real token from BotFather)*
7. Go to **Settings** tab → confirm the **Start Command** is `npm start` (Railway usually auto-detects this from `package.json`)
8. Deploy — Railway will build and run it automatically
9. Check the **Deployments → Logs** tab — you should see `Bot is running...`

Your bot is now live 24/7. Test it by messaging @CurrencyToConvertBot on Telegram.

---

## Notes
- The bot uses **polling** (not webhooks), so it works out of the box on Railway with no extra domain/webhook setup.
- If you ever regenerate your bot token in BotFather, update the `BOT_TOKEN` variable in Railway too.
- Free exchange rate API updates rates roughly every 24 hours — fine for casual use, not for high-frequency trading.
