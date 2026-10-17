# Build and audit report

Date: 9 October 2026

## Delivered

- New bilingual Arabic RTL and English LTR static site, built from scratch for GitHub Pages.
- 31 generated language pages plus the root language router and 404 page.
- Five car detail pages in both languages, shared inventory data in `data/vehicles.json`, individual photo galleries, inquiry links, call and share actions.
- Inventory search, brand/year/status filters, minimum-price filter and sorting; setup forms for selling a car and requesting a car, which prepare a WhatsApp message without sending data to a site server.
- About, contact, privacy, terms, fees/refunds and cookie/storage pages.
- Site metadata, language alternates, sitemap, robots file, web manifest, optimized local vehicle images, source asset archive, build scripts and launch-blocker report.
- Brand PDF inspected across all three pages. The supplied identity rules show 12 logo applications: primary, secondary, icon, monogram, wordmark, favicon, social profile icon, website header, business card, light background, dark background, and black/white. The primary logo and shield icon are used without editing; the supplied horizontal logo was not used. The Facebook cover was not deployed because its imagery implies Dubai and is described as AI-generated in the project brief.
- All five original vehicle post creatives and all 16 supplied vehicle photographs were reviewed. Vehicle photos are grouped by their source vehicle; no old-site photos or internet images are deployed.

## Vehicle data audit

The five website records follow the final table in the supplied build prompt. Prices, years, packages, mileage, condition and locations are generated from that single data file. Unknown fields remain omitted. The Cullinan has no package added, and no location was invented for the E200 2024 or G63.

**Source discrepancy to resolve:** the supplied Mercedes-Benz E300 2021 post creative appears to include a “Fully Loaded” spec line, while the prompt's final vehicle data table explicitly sets its `spec` to `none`. In accordance with the prompt's binding final table, the website currently omits the E300 spec. Owner should confirm before launch.

## Automated checks run

- `npm run build`: passed.
- 5 vehicle records checked; 16 referenced vehicle images exist.
- 32 HTML files found (31 generated route index pages plus the root index; the 404 file is separate).
- Contrast-token test passed for the tested text/background pairs: all ratios were above 4.5:1.
- Generated HTML scan found zero external script, stylesheet, or image requests.
- Car detail price checks passed for both languages.
- Internal local asset links checked separately: no missing local references found.

## Not yet verified

- No live browser screenshot or cross-device visual QA was run in this environment.
- Lighthouse mobile scores, axe-core/pa11y on every page type, keyboard-only testing, screen-reader spot checks, and 200%/400% zoom reflow still need to be performed.
- No deployed-network request crawl was run. The generated pages contain no third-party runtime scripts/styles/images, but verify this after deployment.
- The required Playfair Display, Montserrat and Cairo WOFF2 files were not included in the provided assets. The build uses system fallbacks; self-host the licensed fonts and their OFL texts before launch.
- No vehicle image rights are marked confirmed. Obtain written permission for all 16 photos and confirm visible faces/plates are acceptable.
- All contact details remain marked unverified in `site.config.json`.
- Commission, deposits, retention periods, legal business identity and other owner-only facts remain launch blockers. Legal pages require qualified Egyptian counsel review.

## Legal research

Checked the official Personal Data Protection Center, which identifies Law No. 151 of 2020 and Executive Regulations No. 816 of 2025 as the current framework, and WIPO Lex's entry for Consumer Protection Law No. 181 of 2018. The site copy avoids making a legal compliance guarantee. Counsel must confirm applicability and the required disclosures for this business.
