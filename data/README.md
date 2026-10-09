# Vehicle data
`vehicles.json` is the single source of truth for vehicle data. Missing fields must be omitted from the UI. `status` is `available`, `reserved`, `sold`, or `hidden`. Each image has a filename, view, bilingual alt text, and `rights_confirmed` flag.

## Add a car in 5 steps
1. Add the real, owner-confirmed photos under `source-assets/` and make optimized copies under `docs/assets/cars/<id>/`.
2. Copy `_vehicle.template.json` and choose a unique lowercase slug.
3. Enter only verified facts from the owner's source post; use `null` for unknown values.
4. Set each photo's `rights_confirmed` to `true` only after written permission is confirmed.
5. Run `npm run build`, review `LAUNCH_BLOCKERS.md`, and verify both language pages before publishing.
