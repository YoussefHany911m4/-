(function () {
  'use strict';

  var PHONE = '201014437631';
  var V = window.VEHICLES || [];
  var byId = {};
  V.forEach(function (v) { byId[v.id] = v; });

  /* ---------- helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function waLink(v) {
    var t = 'Hello Youssef Hany, I am interested in the ' + v.brand + ' ' + v.model + ' ' + v.year + '.';
    return 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(t);
  }
  function path(i) { return 'assets/cars/' + i.file + '.jpg'; }
  function pathSm(i) { return 'assets/cars/' + i.file + (i.small ? '-800' : '') + '.jpg'; }
  function srcset(i) { return i.small ? pathSm(i) + ' 800w, ' + path(i) + ' ' + i.w + 'w' : ''; }
  function specLine(v) { return [v.package, v.body, v.spec].filter(Boolean).join(' · '); }
  function setImg(el, i, sizes) {
    var s = srcset(i);
    if (s) { el.setAttribute('srcset', s); el.setAttribute('sizes', sizes); } else { el.removeAttribute('srcset'); el.removeAttribute('sizes'); }
    el.src = path(i);
    el.alt = i.alt;
    el.style.objectPosition = '';
  }
  var ICON_PREV = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M15 4 7 12l8 8"/></svg>';
  var ICON_NEXT = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m9 4 8 8-8 8"/></svg>';

  /* ---------- mobile menu ---------- */
  var btn = $('menuBtn');
  var nav = $('nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('lock', open);
  }
  btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 820 && nav.classList.contains('open')) setMenu(false); });

  var yr = $('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- vehicle cards ---------- */
  var grid = $('vgrid');

  function card(v) {
    var c = v.images[0];
    var cells = [['Year', v.year]];
    if (v.mileage) cells.push(['Mileage', v.mileage]);
    else if (v.condition) cells.push(['Condition', v.condition]);
    if (v.location) cells.push(['Location', v.location]);
    var sizes = v.featured ? '(min-width:1025px) 740px, 100vw' : '(min-width:821px) 600px, 100vw';
    var spec = specLine(v);
    var pos = c.pos ? ' style="object-position:' + c.pos + '"' : '';
    var srcs = srcset(c) ? ' srcset="' + srcset(c) + '" sizes="' + sizes + '"' : '';

    var h = '<article class="vcar' + (v.featured ? ' car--feature' : '') + '" data-group="' + esc(v.group) + '" aria-labelledby="b-' + v.id + ' t-' + v.id + '">';
    h += '<div class="vcar-media" data-open="' + v.id + '">';
    h += '<img src="' + path(c) + '"' + srcs + ' alt="' + esc(c.alt) + '" width="' + c.w + '" height="' + c.h + '" loading="lazy" decoding="async"' + pos + '>';
    if (v.tag) h += '<span class="vtag">' + esc(v.tag) + '</span>';
    h += '<span class="vcount">' + v.images.length + ' photos</span>';
    h += '</div>';
    h += '<div class="vcar-info">';
    h += '<p class="vbrand" id="b-' + v.id + '">' + esc(v.brand) + '</p>';
    h += '<h3 class="vmodel" id="t-' + v.id + '">' + esc(v.model) + '</h3>';
    if (spec) h += '<p class="vspec">' + esc(spec) + '</p>';
    if (v.noteAr) h += '<p class="vnote" lang="ar" dir="rtl">' + esc(v.noteAr) + '</p>';
    h += '<dl class="vmeta" style="--n:' + cells.length + '">';
    cells.forEach(function (x) { h += '<div><dt>' + x[0] + '</dt><dd>' + esc(x[1]) + '</dd></div>'; });
    h += '</dl>';
    h += '<div class="vactions">';
    h += '<button type="button" class="btn btn-line" data-open="' + v.id + '" aria-label="View details: ' + esc(v.year + ' ' + v.brand + ' ' + v.model) + '">View Details</button>';
    h += '<a class="btn btn-gold" href="' + waLink(v) + '" target="_blank" rel="noopener" aria-label="Inquire on WhatsApp about the ' + esc(v.year + ' ' + v.brand + ' ' + v.model) + '">Inquire on WhatsApp</a>';
    h += '</div></div></article>';
    return h;
  }

  var html = '';
  V.forEach(function (v) { html += card(v); });
  if (grid) grid.innerHTML = html;

  /* ---------- filters ---------- */
  var filters = $('filters');
  var status = $('vstatus');
  var groups = [];
  V.forEach(function (v) { if (!groups.some(function (g) { return g.id === v.group; })) groups.push({ id: v.group, label: v.brand }); });
  if (filters && groups.length > 1) {
    var fh = '<button type="button" data-filter="all" aria-pressed="true">All</button>';
    groups.forEach(function (g) { fh += '<button type="button" data-filter="' + esc(g.id) + '" aria-pressed="false">' + esc(g.label) + '</button>'; });
    filters.innerHTML = fh;
    filters.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-filter]');
      if (!b) return;
      var g = b.getAttribute('data-filter');
      filters.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      var n = 0;
      grid.querySelectorAll('.vcar').forEach(function (c) {
        var show = g === 'all' || c.getAttribute('data-group') === g;
        c.hidden = !show;
        if (show) n++;
      });
      if (status) status.textContent = 'Showing ' + n + (n === 1 ? ' automobile' : ' automobiles');
    });
  } else if (filters) {
    filters.hidden = true;
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
    setImg(main, m, '(min-width:821px) 700px, 100vw');
    main.width = m.w; main.height = m.h;
    var label = (cur.i + 1) + ' / ' + im.length;
    count.textContent = label;
    lbCount.textContent = label;
    thumbs.querySelectorAll('button').forEach(function (b, k) {
      if (k === cur.i) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
    });
    if (lb.open) { lbImg.src = path(m); lbImg.alt = m.alt; }
  }
  function step(d) { if (cur) show(cur.i + d); }

  function openDetails(id, from) {
    var v = byId[id];
    if (!v) return;
    cur = { v: v, i: 0 };
    opener = from || null;

    $('vdTitle').textContent = v.brand + ' ' + v.model;
    var spec = specLine(v);
    var sp = $('vdSpec');
    sp.textContent = spec; sp.hidden = !spec;
    var note = $('vdNote');
    if (v.noteAr) { note.textContent = v.noteAr; note.hidden = false; } else { note.hidden = true; }

    var rows = [['Year', v.year], ['Package', v.package], ['Body style', v.body], ['Specification', v.spec],
                ['Condition', v.condition], ['Mileage', v.mileage]];
    var sh = '';
    rows.forEach(function (r) { if (r[1]) sh += '<div><dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd></div>'; });
    if (v.location) sh += '<div><dt>Location</dt><dd>' + esc(v.location) + (v.locationAr ? ' · <span lang="ar" dir="rtl">' + esc(v.locationAr) + '</span>' : '') + '</dd></div>';
    $('vdSpecs').innerHTML = sh;

    var name = v.year + ' ' + v.brand + ' ' + v.model;
    $('vdWa').href = waLink(v);
    $('vdWa').setAttribute('aria-label', 'Inquire on WhatsApp about the ' + name);

    var th = '';
    v.images.forEach(function (m, k) {
      th += '<button type="button" data-i="' + k + '" aria-label="Show photo ' + (k + 1) + ' of ' + v.images.length + '"><img src="' + pathSm(m) + '" alt="" loading="lazy" decoding="async"></button>';
    });
    thumbs.innerHTML = th;
    thumbs.hidden = v.images.length < 2;
    dlg.querySelectorAll('.vd-nav').forEach(function (b) { b.hidden = v.images.length < 2; });

    show(0);
    document.body.classList.add('lock');
    dlg.showModal();
    dlg.querySelector('.vd-info').scrollTop = 0;
  }

  function openLightbox() {
    if (!cur) return;
    var m = cur.v.images[cur.i];
    lbImg.src = path(m); lbImg.alt = m.alt;
    lb.querySelectorAll('.vd-nav').forEach(function (b) { b.hidden = cur.v.images.length < 2; });
    lb.showModal();
  }

  if (grid) {
    grid.addEventListener('click', function (e) {
      var t = e.target.closest('[data-open]');
      if (!t) return;
      openDetails(t.getAttribute('data-open'), t.tagName === 'BUTTON' ? t : t.closest('.vcar').querySelector('button[data-open]'));
    });
  }

  thumbs.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-i]');
    if (b) show(+b.getAttribute('data-i'));
  });
  dlg.querySelectorAll('[data-step]').forEach(function (b) {
    b.addEventListener('click', function () { step(+b.getAttribute('data-step')); });
  });
  lb.querySelectorAll('[data-step]').forEach(function (b) {
    b.addEventListener('click', function () { step(+b.getAttribute('data-step')); });
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

  document.addEventListener('keydown', function (e) {
    if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && (lb.open || dlg.open)) {
      e.preventDefault();
      step(e.key === 'ArrowRight' ? 1 : -1);
    }
  });

  /* swipe on touch screens */
  [dlg.querySelector('.vd-stage'), lb].forEach(function (el) {
    var x0 = null;
    el.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
    }, { passive: true });
  });

  /* ---------- reveal ---------- */
  var items = document.querySelectorAll('.head, .inv-head, .vcar, .sourcing, .trio article, .services article, .steps li, .brands, .about, .faq-wrap, .social, .commission .wrap');
  items.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* expose chevrons to markup that is built once */
  document.querySelectorAll('[data-icon="prev"]').forEach(function (el) { el.innerHTML = ICON_PREV; });
  document.querySelectorAll('[data-icon="next"]').forEach(function (el) { el.innerHTML = ICON_NEXT; });
})();
