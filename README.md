# Password Generator

A Chrome extension that generates strong passwords locally, and its website.

**[passwords.hey5.studio](https://passwords.hey5.studio)**

## About

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

The extension requests one permission: `storage`, for length and toggle state.
Never passwords. No host permissions, so it cannot read the pages you visit.
No network requests, no analytics, no history, no account.

## Layout

The website lives at the repo root — Cloudflare Pages serves it with no build
step and no output directory to configure. The extension is in `extension/`
and is not deployed.

| | |
|---|---|
| `index.html` | the page |
| `style.css` | site styles |
| `base.css` | shared design system — byte-identical across hey5 tools |
| `generator.js` | the generator, identical to the extension's copy |
| `demo.js` | wires the live demo — the popup script minus `chrome.storage` |
| `_headers` | security headers for Cloudflare Pages |
| `extension/` | the Chrome extension |
| `STORE-LISTING.md` | Web Store submission text |

`generator.js` and `base.css` are duplicated between root and `extension/` on
purpose — the extension package has to be self-contained. Change one, copy to
the other.

---

Made with ♥ by Alex Ghit


