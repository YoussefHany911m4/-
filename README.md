# Youssef Hany | Luxury & Exotics

Bilingual static website for GitHub Pages. Source is in `data/`, `i18n/`, `src/`, `site.config.json`, and `generate.py`. The generated site is committed under `docs/`.

## Local build

Requirements: Node.js and Python 3. Run `npm run build`. The build generates the `/docs` static pages and checks that the five vehicle records and all referenced car photos exist.

## GitHub Pages

Set the repository's Pages source to the `main` branch and `/docs` folder. `site.config.json` currently uses `base_path: "/-"` to match `https://youssefhany911m4.github.io/-/`. Change this value if the repository path changes, then rebuild.

## Vehicle data

`data/vehicles.json` is the single source of truth for prices, specs, status, and image order. Missing data should remain omitted. To add a vehicle: (1) add its own photo files under `source-assets/cars/`, (2) create optimized copies in `docs/assets/cars/<id>/`, (3) add a record based on `data/_vehicle.template.json`, (4) verify facts and bilingual alt text, (5) rebuild and review `LAUNCH_BLOCKERS.md`. To mark a car sold or reserved, update only its `status` and rebuild. Hidden cars do not render.

## Important before launch

See `LAUNCH_BLOCKERS.md` and `IMAGE_RIGHTS.md`. All image rights and contact details require owner verification. Commission terms are unconfirmed. Legal pages require owner completion and review by a qualified Egyptian lawyer. The site intentionally avoids unsupported vehicle details and does not use the old website's layout or photos.
