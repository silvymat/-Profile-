# Dr. Silvy Mathew: Portfolio

A personal portfolio website for Dr. Silvy Mathew, psychiatric social worker, counsellor and Student Welfare Officer at Rajagiri School of Engineering & Technology, Kochi.

Built with plain HTML, CSS and JavaScript. No build step and no dependencies.

## Project structure

```
.
├── index.html      Page structure and content
├── style.css       Styles (light and dark mode, responsive)
├── script.js       Menu, tabs, copy buttons, contact form
├── assets/
│   └── silvy.jpg   Portrait photo
├── .nojekyll       Tells GitHub Pages to serve files as they are
└── README.md
```

## Run locally

Open `index.html` in a browser. Or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy for free

**GitHub Pages**
1. Push this repo to GitHub.
2. Go to Settings, then Pages.
3. Under Build and deployment, choose "Deploy from a branch", select `main` and `/ (root)`, and save.
4. The site goes live at `https://<your-username>.github.io/<repo-name>/`.

**Netlify or Cloudflare Pages**
Connect the repo, leave the build command empty, and set the publish directory to `/`.

## Customising

- **Text:** edit the sections in `index.html`.
- **Colours:** change the variables at the top of `style.css` (`--ink`, `--emerald`, `--gold`, `--mist`).
- **Contact email:** update `CONTACT_EMAIL` in `script.js` and the `mailto:` links in `index.html`.
- **Photo:** replace `assets/silvy.jpg` with a larger image for a sharper result.

## Notes

The contact form has no server. It checks the fields and opens the visitor's email app with the message filled in.
