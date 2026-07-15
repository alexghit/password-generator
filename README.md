# Password Generator

The website for Password Generator, a Chrome extension that creates strong
passwords locally.

**[passwords.hey5.studio](https://passwords.hey5.studio)**

## About

The page explains what the extension does and lets you try it first — the demo
is the extension's real interface running the same generator code, not a
mockup or a video.

It's a single static page. No framework, no build step, no dependencies. Dark
theme, ~60KB total.

## How the generator works

Passwords come from `crypto.getRandomValues()`, the browser's cryptographic
random number generator, seeded by the operating system. Never `Math.random()`,
which is predictable.

Characters are picked with rejection sampling, discarding values that would
skew the distribution — without it, a naive `byte % 26` makes early letters
about 20% more likely than late ones. Order is shuffled with Fisher-Yates,
drawing fresh randomness for each swap.

One character from every enabled set is guaranteed, since sites reject
passwords missing a digit or symbol. Filtering happens before that guarantee,
so excluding ambiguous characters can't force one back in.

Entropy is shown in bits — `length × log₂(pool size)` — rather than a strength
bar drawn from nothing in particular. Sixteen characters from a 75-character
pool is about 100 bits.

## Privacy

The page makes no network requests beyond loading its own fonts. No analytics,
no tracking, no cookies. Passwords generated in the demo exist only in the tab
and are never transmitted or stored.

## Files

| File | |
|---|---|
| `index.html` | the page |
| `style.css` | site-specific styles |
| `base.css` | shared design system — byte-identical across hey5 tools, not edited here |
| `generator.js` | the generator, identical to the extension's copy |
| `demo.js` | wires the demo — the extension's popup script minus `chrome.storage` |
| `_headers` | security headers for Cloudflare Pages |

## Deployment

Cloudflare Pages, straight from `main`. No build command, output directory is
the repo root.

---

Made with ♥ by Alex Ghit
