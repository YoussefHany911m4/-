# Youssef Hany | Luxury & Exotics

Bilingual static website for GitHub Pages. Source is in `data/`, `i18n/`, `src/`, `site.config.json`, and `generate.py`. The generated site is committed under `docs/` and mirrored to the repository root so the site still works if GitHub Pages is configured to publish from `/(root)`.

## Local build

Requirements: Node.js and Python 3. Run `npm run build`. The build generates the `/docs` static pages and checks that the five vehicle records and all referenced car photos exist.

## GitHub Pages

Recommended: set **Settings → Pages → Deploy from a branch → `main` → `/(root)`**. The generated site is now mirrored to the repository root and `docs/`, so either root or `/docs` publishing can work. For the root setting, the repository root `index.html`, `ar/`, `en/`, and `assets/` are the published site. `site.config.json` uses `base_path: "/-"` to match `https://youssefhany911m4.github.io/-/`. If the repository path changes, update it and run `npm run build`. After pushing, open **Actions** and wait for Pages to finish deploying; GitHub notes publication may take up to 10 minutes.

## Vehicle data

`data/vehicles.json` is the single source of truth for prices, specs, status, and image order. Missing data should remain omitted. To add a vehicle: (1) add its own photo files under `source-assets/cars/`, (2) create optimized copies in `docs/assets/cars/<id>/`, (3) add a record based on `data/_vehicle.template.json`, (4) verify facts and bilingual alt text, (5) rebuild and review `LAUNCH_BLOCKERS.md`. To mark a car sold or reserved, update only its `status` and rebuild. Hidden cars do not render.

## Important before launch

See `LAUNCH_BLOCKERS.md` and `IMAGE_RIGHTS.md`. All image rights and contact details require owner verification. Commission terms are unconfirmed. Legal pages require owner completion and review by a qualified Egyptian lawyer. The site intentionally avoids unsupported vehicle details and does not use the old website's layout or photos.
