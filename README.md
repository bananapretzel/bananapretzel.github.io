# Eventide XI (static clone from Wayback snapshot)

This repo is structured for **GitHub Pages**.

## Deploy
1. Create a new GitHub repo (public).
2. Upload all files in this folder (or push with git).
3. In **Settings → Pages**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main` (or `master`) and folder `/root`.
4. (Optional) For a custom domain (e.g., `eventideXI.com`), create a file named **CNAME** in the repo root with exactly the domain name, then configure your DNS to point the domain to GitHub Pages.

## Notes
- `index.html` is the homepage HTML captured on Wayback. It hot‑links Squarespace assets as the original did. 
- `pages/custom-changes.html`, `pages/install.html`, `pages/patch-notes.html` are placeholders linking to the archived versions. Replace the contents with the exact HTML if you later capture those pages' source.
- `404.html` helps GitHub Pages serve a not‑found page that returns to `/`.

## Replace placeholders with real page HTML
If you retrieve the full HTML for each subpage from the Wayback Machine, paste it over the corresponding file in `pages/` (or move the file to the repo root and adjust links).

