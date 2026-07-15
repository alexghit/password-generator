# Password Generator

A Chrome extension that generates strong passwords locally, and its website.

Live: [passwords.hey5.studio](https://passwords.hey5.studio)

## Folders

```
extension/        Chrome extension — load unpacked or package for the Web Store
website/          Static site with a live demo — deploys to Cloudflare Pages
store-assets/     Listing images (not deployed, not part of the extension)
```

## How it works

Passwords come from `crypto.getRandomValues()` — the browser's CSPRNG, seeded
by the OS. Character selection uses rejection sampling, so there's no modulo
bias. Order is shuffled with Fisher-Yates using fresh crypto randomness per
swap. At the default 16 characters from a 75-character pool that's ~100 bits.

The extension requests one permission: `storage`, used for length and toggle
state. Never passwords. No host permissions — it cannot read pages.

## Shared files

`generator.js` is byte-identical in `extension/` and `website/`. Change it in
one place, copy to the other.

`base.css` is byte-identical to `design-system/base.css` in the tools kit.
Never edit it here — tool-specific rules belong in `style.css`.

`website/demo.js` is `extension/popup.js` minus `chrome.storage`. Keep the two
in sync when changing behaviour.

## Deploy the website (Cloudflare Pages)

1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Pick the repo, then set:
   - Production branch: `main`
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `website`
4. Save and Deploy.
5. Custom domains → Set up a domain → `passwords.hey5.studio`.

No build step. `_headers`, `robots.txt`, and `sitemap.xml` are already in
`website/` and deploy with it.

## Test the extension locally

`chrome://extensions` → enable Developer mode → Load unpacked → select
`extension/`.

## Submit to the Chrome Web Store

Zip the **contents** of `extension/`, not the folder itself — `manifest.json`
must sit at the archive root:

```sh
cd extension && zip -r ../extension-upload.zip . -x "*.DS_Store"
```

Then Developer Dashboard → Add new item → upload. See `STORE-LISTING.md` for
the field-by-field text and the required images.

## Releasing

Bump `version` in `extension/manifest.json` for every store submission — Chrome
rejects re-uploads of an existing version. Update the footer version in
`website/index.html` to match.

## Before first publish

Replace `href="#"` on the Add to Chrome button (`#install-link` in
`website/index.html`) with the Web Store URL once the listing is live.
