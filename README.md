# Password Generator

Generate strong passwords locally. Nothing leaves your machine.

Live at [passwords.hey5.studio](https://passwords.hey5.studio).

## What it does

Pick a length and which character sets to draw from, and get a password built with `crypto.getRandomValues` — the browser's cryptographic RNG, not `Math.random`. The entropy readout tells you how much randomness you're actually getting, so you can see what a shorter password or a smaller character set costs you.

Nothing is stored, sent, or logged. There's no history, no account, and no network request — the page works with the connection off.

- **Length 6–64** — slider or type an exact number
- **A-Z · a-z · 0-9 · !@#** — toggle each set
- **Exclude look-alikes** — drops `I l 1 O 0` for passwords you'll read off a screen
- **Entropy readout** — updates live as you change the options

### Shortcuts

| Key | Action |
|---|---|
| `Space` | New password |
| `C` | Copy |

## How it's built

Vanilla HTML/CSS/JS, no framework or build step. The site and the extension are each one self-contained file with CSS, JS and the favicon inlined.

```
site/        the landing page — index.html, plus robots.txt and
             sitemap.xml, which crawlers fetch by URL
extension/   the unpacked Chrome extension — popup.html and its icons
```

The generator itself is short enough that both copies carry it inline rather than sharing a file — a Chrome extension can't load code from outside its own folder, so it was already duplicated. If you change how passwords are made, change it in both.

`wrangler.jsonc` points Cloudflare's asset root at `site/` and falls back to `index.html` for any unmatched path, so a wrong URL lands on the app rather than a 404.

## Credits

Made with ♥ by Alex Ghit — <alex@hey5.studio>
