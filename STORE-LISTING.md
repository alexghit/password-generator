# Chrome Web Store listing

Copy-paste for the Developer Dashboard. Nothing here is code — it's the
submission form.

## Upload

Zip the **contents** of `extension/` (manifest.json at the root, no wrapper
folder) and upload under Add new item.

## Store listing tab

**Name**
```
Password Generator
```

**Summary** (132 char max — this is `description` in manifest.json)
```
Generate strong passwords. Nothing leaves your machine.
```

**Description**
```
A password generator that does one thing and does it honestly.

Passwords are generated in your browser using crypto.getRandomValues(), the
browser's cryptographic random number generator, seeded by your operating
system. Not Math.random(), which is predictable and unfit for this.

Character selection uses rejection sampling, so there is no modulo bias — no
letter is more likely than any other. Order is shuffled with Fisher-Yates
using fresh cryptographic randomness for every swap.

FEATURES

• Length from 6 to 64 — drag the slider or type the number
• Toggle uppercase, lowercase, digits, and symbols
• Optionally exclude I l 1 O 0 for passwords you'll read off a screen
• Entropy shown in bits, not a vague strength bar
• One-click copy
• Space for a new password, C to copy

PRIVACY

No network requests. No analytics. No password history. No account.

The extension requests a single permission — storage — used to remember your
preferred length and which character sets you have enabled. It never stores
passwords. It requests no host permissions, so it cannot read the pages you
visit.

Full privacy policy: https://passwords.hey5.studio
```

**Category**: Productivity
**Language**: English

## Graphics

All three are in `store-assets/`:

| Asset | Size | File | Required |
|---|---|---|---|
| Store icon | 128×128 | `extension/icon128.png` | yes |
| Screenshot | 1280×800 | `screenshot-1280x800.png` | yes (min 1) |
| Small promo tile | 440×280 | `promo-tile-440x280.png` | yes |
| Marquee promo tile | 1400×560 | `marquee-1400x560.png` | optional |

## Privacy tab

**Single purpose**
```
Generate strong random passwords for the user.
```

**Permission justification — storage**
```
Stores the user's preferred password length and which character sets are
enabled, so the popup opens with their settings instead of resetting each
time. No passwords or personal data are stored.
```

**Host permission justification**
```
None requested.
```

**Remote code**
```
No, I am not using remote code.
```
All code is in the package. The popup loads no external scripts.

**Data usage** — tick nothing. Then declare all three:

- Not being sold to third parties ✓
- Not being used or transferred for purposes unrelated to the single purpose ✓
- Not being used or transferred to determine creditworthiness or for lending ✓

**Privacy policy URL**
```
https://passwords.hey5.studio
```

## After it goes live

1. Copy the Web Store URL.
2. In `website/index.html`, replace `href="#"` on `#install-link` with it.
3. Commit and push — Cloudflare redeploys automatically.
