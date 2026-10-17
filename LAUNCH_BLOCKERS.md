# Launch blockers

This site is a working static build, not approved for public launch until the following items are resolved.

- [ ] Confirm the legal/registered name of the person or entity operating the business.
- [ ] Confirm the business address or exact service area, working hours, and applicable commercial-register/tax details.
- [ ] Confirm the 1% commission, including who pays, calculation base, due date, taxes and other charges. Until confirmed, do not present the commission as a fact.
- [ ] Confirm whether deposits or reservation payments are ever taken and, if so, refund conditions.
- [ ] Confirm chat retention period, who can access chats, and response time for deletion/access requests.
- [ ] Confirm governing law and jurisdiction for the Terms page.
- [ ] Owner must verify phone/WhatsApp, email, Instagram and Facebook details.
- [ ] Obtain written publication rights for every vehicle photo and confirm visible faces/license plates are acceptable. All `rights_confirmed` flags remain false.
- [ ] Confirm the official tagline or remove it from configuration before use.
- [ ] Confirm the location for Mercedes-Benz E200 2024 (not supplied, omitted).
- [ ] Self-host licensed Playfair Display, Montserrat and Cairo WOFF2 files and license texts. Current build uses system fallbacks.
- [ ] 33 of the 65 photos in Car.zip are about 800 px (Facebook downloads). Supply originals or accept softer images. No upscaling is used.
- [ ] Complete formal accessibility QA: axe-core/pa11y across every page type and language, manual keyboard test, screen-reader spot check, and 200%/400% zoom reflow.
- [ ] Run the full Lighthouse and third-party-request checks on the deployed GitHub Pages site.
- [ ] A qualified Egyptian lawyer must review privacy, terms, cookies, commission and fees pages before launch.

## Inventory update, 17 October 2026 (open items)

- [ ] Photo grouping: no photo in Car.zip is assigned to a vehicle. Owner to say which refs (see `IMAGE_MANIFEST.md`, `data/contact-sheet-*.jpg`) belong to which car, then run `scripts/apply_images.py`. Only 3 cars currently have photos (E200 2023, E200 2024, E300 2021). Confirm whether the remaining 8 of 73 images are coming.
- [ ] BMW M Sport: model and year not supplied. Shown as "BMW M Sport" without a year.
- [ ] Bentley Bentayga 2019: "Trip Ticket" unclear; not shown on the site.
- [ ] Mercedes E300 2021 Convertible: price not supplied; shows "Price on request". The old 2,900,000 is NOT used.
- [ ] Rolls-Royce Cullinan 2026 (Black Package, EGP 55,000,000): kept in `data/vehicles.json` with status `pending_confirmation`, not published. Set status to `available` once confirmed.
- [ ] Audi A3 S Line 2025: engine and location not supplied.
- [ ] E200 Avantgarde Plus 2023: equipment, safety, protection, source, warranty and registration details were not in the material received; only 2,000 cc and 256 hp are shown.
- [ ] C180 registration wording ("New Cairo traffic department, two-year registration validity") shown as supplied; confirm meaning.
- [ ] "Price on request" / "السعر عند الطلب" is the missing-price wording chosen; confirm or change in `i18n/*.json`.
- [ ] Mercedes G63 removed (originals archived in `source-assets/_removed/`, never published).

## Legal research checked 9 October 2026

- Egypt's Personal Data Protection Law No. 151 of 2020 is in force. The official Personal Data Protection Center identifies Executive Regulations No. 816 of 2025 as part of the current framework. The detailed obligations and any transition position should be confirmed by counsel. Source: Personal Data Protection Center, https://www.pdpc.gov.eg/.
- Egypt's Consumer Protection Law No. 181 of 2018 is listed by WIPO Lex with entry into force on 14 December 2018. Consumer-facing prices and supplier details should be clear. Source: WIPO Lex, https://www.wipo.int/wipolex/en/legislation/details/19866.
- The legal pages are drafts, not legal advice. Their final adequacy for this specific brokerage business has not been verified.
