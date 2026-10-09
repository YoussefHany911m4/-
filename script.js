(function () {
  'use strict';

  var PHONE = '201014437631';
  var I = window.I18N;
  var V = window.VEHICLES || [];
  var byId = {};
  V.forEach(function (v) { byId[v.id] = v; });

  /* ---------- helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function t(k, vars) { return I.t(k, vars); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---- everything shown about a vehicle comes from these helpers (one record → every view) ---- */
  function lab(val) { return val == null || val === '' ? '' : (I.has('v.' + val) ? t('v.' + val) : String(val)); }
  function nameOf(v) { return v.brand + ' ' + v.model; }
  function hasPrice(v) { return typeof v.price === 'number' && v.price > 0; }
  function priceOf(v) { return hasPrice(v) ? I.formatPrice(v.price, v.currency) : ''; }
  function mileageOf(v) { return typeof v.mileage === 'number' ? t('fmt.km', { n: I.formatNumber(v.mileage) }) : (v.mileage || ''); }
  function noteOf(v) { return v.note && v.note[I.lang()] ? v.note[I.lang()] : ''; }
  function parts(v) { return [v.trim, v.package, v.body, v.spec].filter(Boolean).map(lab); }
  function specLine(v) { return [v.year].concat(parts(v)).join(' · '); }
  function detailText(v) { return [v.trim, v.package].filter(Boolean).map(lab).join(' '); }
  function altOf(v, im) {
    var base = t('alt.base', { name: nameOf(v), year: v.year, detail: detailText(v) }).replace(/\s+/g, ' ').trim();
    return im && im.view ? t('alt.view', { base: base, view: t('view.' + im.view) }) : base;
  }
  function waLink(v) {
    var p = priceOf(v);
    var msg = t(p ? 'wa.vehicle' : 'wa.vehicleNoPrice', { name: nameOf(v), year: v.year, price: p });
    return 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(msg);
  }
  function path(i) { return 'assets/cars/' + i.file + '.jpg'; }
  function pathSm(i) { return 'assets/cars/' + i.file + (i.small ? '-800' : '') + '.jpg'; }
  function srcset(i) { return i.small ? pathSm(i) + ' 800w, ' + path(i) + ' ' + i.w + 'w' : ''; }
  function setImg(el, i, alt, sizes) {
    var s = srcset(i);
    if (s) { el.setAttribute('srcset', s); el.setAttribute('sizes', sizes); } else { el.removeAttribute('srcset'); el.removeAttribute('sizes'); }
    el.src = path(i);
    el.alt = alt;
  }
  var ICON_PREV = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M15 4 7 12l8 8"/></svg>';
  var ICON_NEXT = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m9 4 8 8-8 8"/></svg>';

  /* ---------- mobile menu ---------- */
  var btn = $('menuBtn');
  var nav = $('nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', t(open ? 'menu.close' : 'menu.open'));
    document.body.classList.toggle('lock', open);
  }
  btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1080 && nav.classList.contains('open')) setMenu(false); });

  /* ---------- vehicle cards ---------- */
  var grid = $('vgrid');
  var filters = $('filters');
  var status = $('vstatus');
  var activeGroup = 'all';
  var firstRender = true;

  function card(v) {
    var c = v.images[0];
    var cells = [];
    if (v.mileage != null && v.mileage !== '') cells.push([t('label.mileage'), mileageOf(v)]);
    if (v.condition) cells.push([t('label.condition'), lab(v.condition)]);
    if (v.location) cells.push([t('label.location'), lab(v.location)]);
    var sizes = v.featured ? '(min-width:1025px) 740px, 100vw' : '(min-width:821px) 600px, 100vw';
    var pos = c.pos ? ' style="object-position:' + c.pos + '"' : '';
    var srcs = srcset(c) ? ' srcset="' + srcset(c) + '" sizes="' + sizes + '"' : '';
    var nm = v.year + ' ' + nameOf(v);
    var note = noteOf(v);

    var h = '<article class="vcar' + (v.featured ? ' car--feature' : '') + '" data-group="' + esc(v.group) + '" aria-labelledby="b-' + v.id + ' t-' + v.id + '"' + (v.group !== activeGroup && activeGroup !== 'all' ? ' hidden' : '') + '>';
    h += '<div class="vcar-media" data-open="' + v.id + '">';
    h += '<img src="' + path(c) + '"' + srcs + ' alt="' + esc(altOf(v, c)) + '" width="' + c.w + '" height="' + c.h + '" loading="lazy" decoding="async"' + pos + '>';
    if (v.tag) h += '<span class="vtag">' + esc(t('tag.' + v.tag)) + '</span>';
    h += '<span class="vcount">' + esc(I.plural('photos', v.images.length)) + '</span>';
    h += '</div>';
    h += '<div class="vcar-info">';
    h += '<p class="vbrand" id="b-' + v.id + '" lang="en" dir="ltr">' + esc(v.brand) + '</p>';
    h += '<h3 class="vmodel" id="t-' + v.id + '" lang="en" dir="ltr">' + esc(v.model) + '</h3>';
    h += '<p class="vspec">' + esc(specLine(v)) + '</p>';
    if (hasPrice(v)) {
      h += '<div class="vprice"><span class="vprice-l">' + esc(t('label.price')) + '</span><strong>' + esc(priceOf(v)) + '</strong></div>';
      h += '<p class="vprice-n">' + esc(t('price.note')) + '</p>';
    }
    if (note) h += '<p class="vnote">' + esc(note) + '</p>';
    if (cells.length) {
      h += '<dl class="vmeta" style="--n:' + cells.length + '">';
      cells.forEach(function (x) { h += '<div><dt>' + esc(x[0]) + '</dt><dd>' + esc(x[1]) + '</dd></div>'; });
      h += '</dl>';
    }
    h += '<div class="vactions">';
    h += '<button type="button" class="btn btn-line" data-open="' + v.id + '" aria-label="' + esc(t('card.viewAria', { name: nm })) + '">' + esc(t('card.view')) + '<span class="btn-arrow" aria-hidden="true"></span></button>';
    h += '<a class="btn btn-gold" href="' + waLink(v) + '" target="_blank" rel="noopener" aria-label="' + esc(t('card.waAria', { name: nm })) + '">' + esc(t('card.wa')) + '</a>';
    h += '</div></div></article>';
    return h;
  }

  function updateStatus() {
    if (!grid || !status) return;
    var n = grid.querySelectorAll('.vcar:not([hidden])').length;
    status.textContent = n ? I.plural('inv.status', n) : '';
  }

  function renderFilters() {
    if (!filters) return;
    var groups = [];
    V.forEach(function (v) { if (!groups.some(function (g) { return g.id === v.group; })) groups.push({ id: v.group, label: v.brand }); });
    if (groups.length < 2) { filters.hidden = true; filters.innerHTML = ''; activeGroup = 'all'; return; }
    if (!groups.some(function (g) { return g.id === activeGroup; })) activeGroup = 'all';
    filters.hidden = false;
    filters.setAttribute('aria-label', t('filter.label'));
    var fh = '<button type="button" data-filter="all" aria-pressed="' + (activeGroup === 'all') + '">' + esc(t('filter.all')) + '</button>';
    groups.forEach(function (g) {
      fh += '<button type="button" data-filter="' + esc(g.id) + '" aria-pressed="' + (activeGroup === g.id) + '" lang="en" dir="ltr">' + esc(g.label) + '</button>';
    });
    filters.innerHTML = fh;
  }

  if (filters) filters.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-filter]');
    if (!b) return;
    activeGroup = b.getAttribute('data-filter');
    filters.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    grid.querySelectorAll('.vcar').forEach(function (c) {
      c.hidden = !(activeGroup === 'all' || c.getAttribute('data-group') === activeGroup);
    });
    updateStatus();
  });

  function renderGrid() {
    if (!grid) return;
    var noscript = grid.querySelector('noscript');
    var html = '';
    if (!V.length) html = '<p class="lead vempty">' + esc(t('inv.empty')) + '</p>';
    V.forEach(function (v) { html += card(v); });
    grid.innerHTML = html;
    if (noscript) { /* noscript is only relevant without JS */ }
    renderFilters();
    var cars = grid.querySelectorAll('.vcar');
    if (firstRender) observe(cars); else cars.forEach(function (c) { c.classList.add('reveal', 'in'); });
    updateStatus();
  }

  /* ---------- detail dialog + lightbox ---------- */
  var dlg = $('vd'), lb = $('lb');
  var main = $('vdMain'), thumbs = $('vdThumbs'), count = $('vdCount');
  var lbImg = $('lbImg'), lbCount = $('lbCount');
  var cur = null, opener = null;

  function lockCheck() {
    if (!document.querySelector('dialog[open]') && !nav.classList.contains('open')) document.body.classList.remove('lock');
  }

  function show(i) {
    var im = cur.v.images;
    cur.i = (i + im.length) % im.length;
    var m = im[cur.i];
    var alt = altOf(cur.v, m);
    setImg(main, m, alt, '(min-width:821px) 700px, 100vw');
    main.width = m.w; main.height = m.h;
    var label = '\u200E' + (cur.i + 1) + ' / ' + im.length;
    count.textContent = label;
    lbCount.textContent = label;
    thumbs.querySelectorAll('button').forEach(function (b, k) {
      if (k === cur.i) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
    });
    if (lb.open) { lbImg.src = path(m); lbImg.alt = alt; }
  }
  function step(d) { if (cur) show(cur.i + d); }

  function fillDialog() {
    var v = cur.v;
    $('vdTitle').textContent = nameOf(v);
    $('vdTitle').setAttribute('dir', 'ltr'); $('vdTitle').setAttribute('lang', 'en');
    $('vdYear').textContent = v.year;
    var p = $('vdPrice');
    if (hasPrice(v)) { p.innerHTML = '<strong>' + esc(priceOf(v)) + '</strong><span>' + esc(t('price.note')) + '</span>'; p.hidden = false; } else { p.hidden = true; }
    var sp = $('vdSpec');
    var pl = parts(v).join(' · ');
    sp.textContent = pl; sp.hidden = !pl;
    var note = $('vdNote'), nt = noteOf(v);
    note.textContent = nt; note.hidden = !nt;

    var rows = [[t('label.year'), v.year], [t('label.trim'), lab(v.trim)], [t('label.package'), lab(v.package)],
                [t('label.body'), lab(v.body)], [t('label.spec'), lab(v.spec)], [t('label.condition'), lab(v.condition)],
                [t('label.mileage'), mileageOf(v)], [t('label.location'), lab(v.location)]];
    var sh = '';
    rows.forEach(function (r) { if (r[1]) sh += '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>'; });
    $('vdSpecs').innerHTML = sh;

    $('vdWa').href = waLink(v);
    $('vdWa').setAttribute('aria-label', t('card.waAria', { name: v.year + ' ' + nameOf(v) }));

    var th = '';
    v.images.forEach(function (m, k) {
      th += '<button type="button" data-i="' + k + '" aria-label="' + esc(t('dlg.thumb', { i: k + 1, n: v.images.length })) + '"><img src="' + pathSm(m) + '" alt="" loading="lazy" decoding="async"></button>';
    });
    thumbs.innerHTML = th;
    thumbs.hidden = v.images.length < 2;
    dlg.querySelectorAll('.vd-nav').forEach(function (b) { b.hidden = v.images.length < 2; });
    lb.querySelectorAll('.vd-nav').forEach(function (b) { b.hidden = v.images.length < 2; });
    show(cur.i);
  }

  function openDetails(id, from) {
    var v = byId[id];
    if (!v) return;
    cur = { v: v, i: 0 };
    opener = from || null;
    fillDialog();
    document.body.classList.add('lock');
    dlg.showModal();
    dlg.querySelector('.vd-info').scrollTop = 0;
  }

  function openLightbox() {
    if (!cur) return;
    var m = cur.v.images[cur.i];
    lbImg.src = path(m); lbImg.alt = altOf(cur.v, m);
    lb.showModal();
  }

  if (grid) {
    grid.addEventListener('click', function (e) {
      var tg = e.target.closest('[data-open]');
      if (!tg) return;
      openDetails(tg.getAttribute('data-open'), tg.tagName === 'BUTTON' ? tg : tg.closest('.vcar').querySelector('button[data-open]'));
    });
  }

  thumbs.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-i]');
    if (b) show(+b.getAttribute('data-i'));
  });
  [dlg, lb].forEach(function (d) {
    d.querySelectorAll('[data-step]').forEach(function (b) {
      b.addEventListener('click', function () { step(+b.getAttribute('data-step')); });
    });
  });
  $('vdClose').addEventListener('click', function () { dlg.close(); });
  $('lbClose').addEventListener('click', function () { lb.close(); });
  $('vdZoom').addEventListener('click', openLightbox);
  main.addEventListener('click', openLightbox);

  [dlg, lb].forEach(function (d) {
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
  });
  dlg.addEventListener('close', function () {
    lockCheck();
    if (opener && document.contains(opener)) opener.focus();
  });
  lb.addEventListener('close', lockCheck);

  /* arrow keys / swipes follow the reading direction: in Arabic "next" is to the left */
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && (lb.open || dlg.open)) {
      e.preventDefault();
      var fwd = I.isRtl() ? 'ArrowLeft' : 'ArrowRight';
      step(e.key === fwd ? 1 : -1);
    }
  });
  [dlg.querySelector('.vd-stage'), lb].forEach(function (el) {
    var x0 = null;
    el.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 45) step((dx < 0) !== I.isRtl() ? 1 : -1);
    }, { passive: true });
  });

  /* ---------- reveal ---------- */
  var io = null;
  function observe(list) {
    list.forEach(function (el) { el.classList.add('reveal'); });
    if ('IntersectionObserver' in window) {
      if (!io) io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.08 });
      list.forEach(function (el) { io.observe(el); });
    } else {
      list.forEach(function (el) { el.classList.add('in'); });
    }
  }
  observe(document.querySelectorAll('.head, .inv-head, .sourcing, .trio article, .services article, .steps li, .brands, .about, .faq-wrap, .social, .commission .wrap'));

  /* chevrons are drawn once; CSS mirrors them in RTL */
  document.querySelectorAll('[data-icon="prev"]').forEach(function (el) { el.innerHTML = ICON_PREV; });
  document.querySelectorAll('[data-icon="next"]').forEach(function (el) { el.innerHTML = ICON_NEXT; });

  /* ---------- language-dependent pieces built by script ---------- */
  function refresh() {
    renderGrid();
    setMenu(nav.classList.contains('open'));
    $('legal').textContent = t('foot.legal', { year: new Date().getFullYear() });
    var hero = $('heroImg');
    var hv = hero && byId[hero.getAttribute('data-vehicle')];
    if (hv) hero.alt = altOf(hv, hv.images[0]);
    if (cur && dlg.open) fillDialog();
  }
  refresh();
  firstRender = false;
  document.addEventListener('i18n:change', refresh);
})();
