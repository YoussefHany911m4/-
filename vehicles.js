/*
  VEHICLE DATA — the only file you need to edit to add, change or remove a car.

  Rules:
  - Only list facts supplied by the owner. If something is unknown, leave the field out
    (a missing field is simply not shown; nothing is filled in automatically).
  - Photos live in assets/cars/. For each photo give the file name WITHOUT ".jpg",
    its width/height, and `small: true` if an "-800.jpg" smaller copy exists.
  - `featured: true` makes the card large (full width).
  - `group` drives the filter buttons; the button label is taken from `brand`.
*/
window.VEHICLES = [
  {
    id: 'rolls-royce-cullinan-2026',
    group: 'rolls-royce',
    brand: 'Rolls-Royce',
    model: 'Cullinan',
    year: 2026,
    condition: 'Zero / Brand New',
    tag: 'Zero',
    location: 'Fifth Settlement',
    locationAr: 'التجمع الخامس',
    noteAr: 'عربيه لاصحاب الفخامة والرقي والازدهار',
    featured: true,
    images: [
      { file: 'rolls-royce-cullinan-2026-front',    w: 1600, h: 944,  small: true, alt: '2026 Rolls-Royce Cullinan, front view', pos: '50% 62%' },
      { file: 'rolls-royce-cullinan-2026-rear',     w: 1393, h: 1129, small: true, alt: '2026 Rolls-Royce Cullinan, rear view', pos: '50% 60%' },
      { file: 'rolls-royce-cullinan-2026-interior', w: 1280, h: 853,  small: true, alt: '2026 Rolls-Royce Cullinan, interior' }
    ]
  },
  {
    id: 'mercedes-e300-2021',
    group: 'mercedes',
    brand: 'Mercedes',
    model: 'E300',
    year: 2021,
    package: 'AMG Night Package',
    body: 'Convertible',
    mileage: '113,000 km',
    location: 'Al Obour',
    locationAr: 'العبور',
    noteAr: 'عربيه لاصحاب التميز و أقل سعر في مصر',
    images: [
      { file: 'mercedes-e300-2021-front',    w: 769, h: 545, alt: '2021 Mercedes E300 AMG Night Package Convertible, front view' },
      { file: 'mercedes-e300-2021-rear',     w: 790, h: 772, alt: '2021 Mercedes E300 AMG Night Package Convertible, rear view', pos: '50% 65%' },
      { file: 'mercedes-e300-2021-interior', w: 799, h: 733, alt: '2021 Mercedes E300 AMG Night Package Convertible, interior' }
    ]
  },
  {
    id: 'mercedes-e200-2023',
    group: 'mercedes',
    brand: 'Mercedes',
    model: 'E200',
    year: 2023,
    package: 'Avangarde Plus',
    spec: 'Fully Loaded',
    mileage: '20,000 km',
    location: 'Nasr City',
    locationAr: 'مدينة نصر',
    images: [
      { file: 'mercedes-e200-2023-front',    w: 1200, h: 1338, small: true, alt: '2023 Mercedes E200 Avangarde Plus, front view', pos: '50% 100%' },
      { file: 'mercedes-e200-2023-rear',    w: 1200, h: 1342, small: true, alt: '2023 Mercedes E200 Avangarde Plus, rear view', pos: '50% 68%' },
      { file: 'mercedes-e200-2023-interior', w: 960,  h: 1090, small: true, alt: '2023 Mercedes E200 Avangarde Plus, interior', pos: '50% 55%' }
    ]
  }
];
