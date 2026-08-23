# cmwim.org

Static site for **CMWIM**, the Canadian Muslim Women in Medicine Network.
Plain HTML and CSS, no build step. GitHub Pages serves these files as they are.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home |
| `team.html` | Our team. Circular portraits, click to open a bio |
| `events.html` | Events and initiatives |
| `cmwis.html` | Canadian Muslim Women in Surgery |
| `contact.html` | Contact |
| `404.html` | Not found |

`assets/css/cmwim.css` holds all styling, with the palette as variables at the top.
`assets/js/site.js` is progressive enhancement only: every page renders without it.

The folders `home/`, `our-team/`, `mentor-sign-up/`, `mentee-sign-up/`,
`contact-us/` and `canadian-muslim-women-in-surgery-cmwis/` are redirect stubs so
links to the old Google Sites addresses keep working.

## Brand

Sampled from the logo:

| Token | Value |
|---|---|
| Cream | `#FEFAE7` |
| Red | `#BD3232` |
| Warm ink | `#3D1F1D` |

Change them once in the `:root` block of `assets/css/cmwim.css` and they apply everywhere.

### Typeface

The display face is **Kelin Eator** (ngene, sold on Creative Market). A desktop
licence does not cover web embedding, so the site needs a **webfont licence** and
the `.woff2` files. Until then it falls back to Bodoni Moda from Google Fonts,
which shares the high contrast Didone character.

To switch: drop the files in `assets/fonts/` and uncomment the `@font-face` block
at the top of `assets/css/cmwim.css`. Nothing else changes.

## Editing

Everything is plain HTML. Open a file, change the words, commit. GitHub's web
editor works fine: press `.` in the repo, or click the pencil on any file.

**Adding a team member:** copy a `<button class="face">` block in `team.html` into
the right chapter group and edit its `data-name`, `data-role`, `data-meta` and
`data-bio` attributes. The bio panel reads those attributes, so there is nothing
else to wire up.

**Adding portraits:** square images, 400px or larger, in `assets/img/team/`,
named `firstname_school.jpg`.

## Deploying

Any push to `main` publishes once Pages is on:

1. Settings, then Pages
2. Source: deploy from branch `main`, folder `/ (root)`
3. Custom domain: `cmwim.org` (the `CNAME` file sets this too)
4. Tick Enforce HTTPS once the certificate is issued

### DNS

Replace the current Google Sites records at the registrar with:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | cmwim.github.io. |

Check with `dig cmwim.org +noall +answer` before switching off the Google Site.

## Still to do

- [ ] Confirm the keynote speaker name and date on `events.html`, currently read off a projector slide in a photo
- [ ] Replace the mentee email sign-up with a Google Form once a destination exists. The mentor button points at the live Google Form.
- [ ] Add remaining past events
- [ ] Resolve the Kelin Eator webfont licence

## Credits

Motion mechanics (blur-in reveals, easing, scroll progress, crosshair frame)
adapted from [Watermelon Platform](https://github.com/WatermelonCorp/watermelon-platform),
MIT licensed. The notice is kept at the top of the ported block in `assets/css/cmwim.css`.
