# cmwim.org — CMWIM Network website

Static site for the **Canadian Muslim Women in Medicine Network**. Plain HTML and CSS,
no build step, no dependencies. GitHub Pages serves the files exactly as they are in this repo.

## Structure

```
index.html          Home
team.html           Our Team (co-founders + chapter leads)
mentorship.html     Mentor + mentee sign-up
cmwis.html          Canadian Muslim Women in Surgery
contact.html        Contact
404.html            Not-found page
assets/css/style.css   All styling (design tokens at the top)
assets/js/main.js      Mobile menu + scroll reveal
assets/img/            Logo + favicon
CNAME               Custom domain (cmwim.org)
/home, /our-team, ... Redirect stubs so old Google Sites links keep working
```

## Editing content

Everything is plain HTML — open a file, change the words, commit. No tooling needed.
GitHub's web editor (press `.` in the repo, or click the pencil icon on any file) works fine.

**Adding a team member:** open `team.html`, copy an existing
`<article class="card person">` block into the right chapter group, and edit it.
Instructions are in an HTML comment at the top of that section.

**Using real photos instead of initials:** put square images (300×300 or larger) in
`assets/img/team/`, then replace

```html
<span class="person-photo" aria-hidden="true">NQ</span>
```

with

```html
<img class="person-photo" src="assets/img/team/noor-qureshi.jpg" alt="" width="74" height="74">
```

**Changing brand colours:** all colours live in the `:root` block at the top of
`assets/css/style.css`. Change them once, they apply everywhere.

## Deploying

Any push to `main` publishes automatically once Pages is enabled:

1. Repo → **Settings** → **Pages**
2. **Source:** Deploy from a branch — **`main`** / **`/ (root)`**
3. **Custom domain:** `cmwim.org` (the `CNAME` file in this repo sets this too)
4. Tick **Enforce HTTPS** once the certificate is issued (can take up to an hour)

## DNS for cmwim.org

At the domain registrar, replace the current Google Sites records with:

| Type  | Name | Value                  |
|-------|------|------------------------|
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | cmwim.github.io.       |

DNS changes take anywhere from a few minutes to 24 hours to take effect.
Verify with `dig cmwim.org +noall +answer` before switching off the Google Site.

## Still to do

- [ ] Replace initials with real team photos
- [ ] Add the official CMWIM logo (currently a placeholder mark in `assets/img/logo.svg`)
- [ ] Add the **mentee** Google Form link — `mentorship.html` currently uses a `mailto:`
      (search the file for `TODO`)
- [ ] Add real dates to the events section on `index.html` when they're scheduled
