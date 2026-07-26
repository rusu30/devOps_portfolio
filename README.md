# Sumedh Lokhande — DevOps Portfolio

A single-page portfolio site for Sumedh Keshavrao Lokhande, DevOps Engineer.
Plain HTML/CSS/JS — no build step, no framework, no dependencies to install.

## Structure

```
.
├── index.html          # all page content/sections
├── css/
│   └── style.css       # design system + layout
├── js/
│   └── script.js       # typing effect, counters, scroll reveal
├── assets/              # put resume PDF / images here if you add any
├── .gitignore
└── README.md
```

## View it locally

Just open `index.html` in a browser — or run a tiny local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Push to GitHub

```bash
# 1. From inside this folder, initialize git
git init
git add .
git commit -m "Initial commit: DevOps portfolio site"

# 2. Create a new EMPTY repo on GitHub first (no README/license), e.g.
#    https://github.com/new  -> name it "portfolio"

# 3. Point your local repo at it and push
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

## Free hosting (pick one)

**GitHub Pages** — easiest, zero config:
```bash
# in the repo on GitHub: Settings -> Pages -> Deploy from branch -> main -> / (root)
```
Site will be live at `https://<your-username>.github.io/portfolio/`

**Netlify / Vercel** — drag-and-drop the folder, or connect the GitHub repo for
auto-deploys on every push.

## Customize

- Content lives directly in `index.html` (summary, skills, experience, etc.)
- Colors/fonts/spacing are defined as CSS variables at the top of `css/style.css`
  under `:root` — change those to re-theme the whole site.
- Add a real resume PDF to `assets/` and link it from the "get resume" button
  in the nav (`index.html`) if you want a direct download.

## Contact info shown on the site

- Email: sumedhkl30@gmail.com
- Phone: +91 84219 20264
- LinkedIn: linkedin.com/in/sumedh-lokhande
- Location: Hyderabad, India
