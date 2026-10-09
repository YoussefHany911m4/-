/*
  VEHICLE INVENTORY — the only file to edit to add, change or remove a car.

  One record = one vehicle. The card, the detail view, the gallery, the filters,
  the price and the WhatsApp message are ALL generated from that record.
  Nothing else on the site mentions a specific car or price.

  HOW TO ADD A VEHICLE
    1. Put the photos in assets/cars/  (JPG, ideally ~1600px wide).
       Optional: add an "-800" copy (800px wide) and set small:true for faster phones.
    2. Copy a block below, change the values, keep the commas right. Done.

  FIELDS  (every field is optional except id, group, brand, model, year, images)
    id         unique, lowercase, no spaces (used for the detail view)
    group      filter bucket, e.g. 'mercedes'  (filter buttons appear automatically,
               one per brand that actually has vehicles)
    brand      shown as-is in every language ("Mercedes", "Rolls-Royce")
    model      shown as-is ("E200", "G63", "Cullinan")
    year       number
    trim       e.g. 'amg-premium-plus'
    package    e.g. 'amg-night-package', 'black-package'
    spec       e.g. 'fully-loaded'
    body       e.g. 'convertible'
    condition  e.g. 'zero'      (use for new cars instead of mileage)
    mileage    NUMBER of km, e.g. 25000   (shown as "25,000 km" / "25,000 كم")
    location   e.g. 'fifth-settlement'
    price      NUMBER, e.g. 4950000      (formatted automatically everywhere)
    currency   'EGP'
    tag        optional badge key, e.g. 'zero'
    note       optional per-language line: { ar: '…' }
    images     [{ file, w, h, view, pos, small }]   first image = card cover
               view: 'front' | 'rear' | 'interior' | 'grille' (used in alt text)

  Words like 'amg-premium-plus' or 'fifth-settlement' are translated through the
  `v.*` entries in translations.js. A word with no entry is shown as typed.

  RULE: only enter facts supplied by the owner. A missing field is simply not shown.
*/
window.VEHICLES = [
  {
    id: 'rolls-royce-cullinan-2026',
    group: 'rolls-royce',
    brand: 'Rolls-Royce',
    model: 'Cullinan',
    year: 2026,
    package: 'black-package',
    condition: 'zero',
    tag: 'zero',
    location: 'fifth-settlement',
    price: 55000000,
    currency: 'EGP',
    note: { ar: 'لأصحاب الفخامة والرقي والازدهار' },
    images: [
      { file: 'rolls-royce-cullinan-2026-front',    w: 1600, h: 944,  small: true, view: 'front',    pos: '50% 62%' },
      { file: 'rolls-royce-cullinan-2026-rear',     w: 1393, h: 1129, small: true, view: 'rear',     pos: '50% 60%' },
      { file: 'rolls-royce-cullinan-2026-interior', w: 1280, h: 853,  small: true, view: 'interior' }
    ]
  },
  {
    id: 'mercedes-g63-2025',
    group: 'mercedes',
    brand: 'Mercedes',
    model: 'G63',
    year: 2025,
    package: 'amg-night-package',
    spec: 'fully-loaded',
    mileage: 12000,
    price: 16250000,
    currency: 'EGP',
    note: { ar: 'لأصحاب الفخامة والتميز' },
    images: [
      { file: 'mercedes-g63-2025-front',    w: 788, h: 503, view: 'front' },
      { file: 'mercedes-g63-2025-rear',     w: 797, h: 499, view: 'rear' },
      { file: 'mercedes-g63-2025-interior', w: 798, h: 890, view: 'interior', pos: '50% 45%' }
    ]
  },
  {
    id: 'mercedes-e200-2024',
    group: 'mercedes',
    brand: 'Mercedes',
    model: 'E200',
    year: 2024,
    trim: 'amg-premium-plus',
    spec: 'fully-loaded',
    mileage: 25000,
    price: 4950000,
    currency: 'EGP',
    note: { ar: 'لأصحاب الفخامة والتميز' },
    images: [
      { file: 'mercedes-e200-2024-front',    w: 1200, h: 1600, small: true, view: 'front',    pos: '50% 62%' },
      { file: 'mercedes-e200-2024-rear',     w: 1222, h: 1600, small: true, view: 'rear',     pos: '50% 60%' },
      { file: 'mercedes-e200-2024-interior', w: 1200, h: 1600, small: true, view: 'interior', pos: '50% 50%' },
      { file: 'mercedes-e200-2024-grille',   w: 1600, h: 990,  small: true, view: 'grille' }
    ]
  },
  {
    id: 'mercedes-e300-2021',
    group: 'mercedes',
    brand: 'Mercedes',
    model: 'E300',
    year: 2021,
    package: 'amg-night-package',
    body: 'convertible',
    mileage: 113000,
    location: 'al-obour',
    price: 2900000,
    currency: 'EGP',
    note: { ar: 'لأصحاب التميز' },
    images: [
      { file: 'mercedes-e300-2021-front',    w: 769, h: 545, view: 'front' },
      { file: 'mercedes-e300-2021-rear',     w: 790, h: 772, view: 'rear', pos: '50% 65%' },
      { file: 'mercedes-e300-2021-interior', w: 799, h: 733, view: 'interior' }
    ]
  }
];
