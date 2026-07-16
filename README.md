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

```
site/        the deployed website
extension/   the Chrome extension — not deployed
```

| | |
|---|---|
| `site/index.html` | the page |
| `site/style.css` | site styles |
| `site/base.css` | design tokens — colours, type, and shared components |
| `site/generator.js` | the generator, identical to the extension's copy |
| `site/demo.js` | wires the live demo — the popup script minus `chrome.storage` |
| `site/_headers` | security headers for Cloudflare |
| `extension/` | the Chrome extension, self-contained |
| `extension-preview.html` | the popup in a normal browser tab — open it directly, no build, no install |
| `STORE-LISTING.md` | Web Store submission text |

`wrangler.jsonc` points Cloudflare's asset root at `site/`, so only the website
is uploaded — the extension source stays out of the deployed site.

`generator.js` and `base.css` are duplicated between `site/` and `extension/` on
purpose — the extension package has to be self-contained, since Chrome can't
load files from outside it. Change one, copy to the other.

`extension-preview.html` inlines the popup's CSS and JS and stubs out
`chrome.storage`, so the popup renders at its real 340px width without loading
the unpacked extension. It's for eyeballing changes only — regenerate it after
editing the popup, and don't ship it in the store package.

## Credits

Made with ♥ by Alex Ghit — alex@hey5.studio
