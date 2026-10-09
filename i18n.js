/*
  I18N — language engine. Loaded synchronously in <head> (after translations.js),
  so the right language / direction is set before the first paint.

  Public API (window.I18N):
    t(key, vars)            translated string, English fallback, never undefined
    has(key)                true when the key exists in the current language or English
    plural(key, n, vars)    key.one / key.two / key.few / key.many / key.other
    formatNumber(n)         12,345 (Western digits in every language)
    formatPrice(n, cur)     "EGP 4,950,000"  /  "4,950,000 جنيه مصري"
    lang(), dir(), isRtl()  current language info
    setLang(code)           switch language without reloading (and remember it)
    supported()             languages that are COMPLETE (the only ones offered)
    missing(code)           keys a language still lacks (use in the console)
*/
(function () {
  'use strict';

  var STORE_KEY = 'yh-lang';
  var FALLBACK = 'en';
  var T = window.TRANSLATIONS || {};
  var root = document.documentElement;
  var cur = FALLBACK;
  var pluralRules = {};

  /* ---------- completeness: only finished languages are offered ---------- */
  function keysOf(code) {
    return Object.keys(T[code] || {}).filter(function (k) { return k !== '_meta'; });
  }
  function raw(code, key) {
    var d = T[code];
    return d && typeof d[key] === 'string' && d[key] !== '' ? d[key] : null;
  }
  function missing(code) {
    if (!T[code] || !T[code]._meta) return keysOf(FALLBACK);
    return keysOf(FALLBACK).filter(function (k) {
      if (/\.(zero|two|few|many)$/.test(k)) return false;   /* optional plural forms */
      return raw(code, k) === null;
    });
  }
  var list = Object.keys(T).filter(function (c) {
    return T[c]._meta && T[c]._meta.enabled !== false && missing(c).length === 0;
  }).sort(function (a, b) { return (T[a]._meta.order || 99) - (T[b]._meta.order || 99); });
  if (list.indexOf(FALLBACK) < 0) list.unshift(FALLBACK);

  function ok(c) { return !!c && list.indexOf(c) >= 0; }
  function base(c) { return String(c || '').toLowerCase().split(/[-_]/)[0]; }

  /* ---------- storage (never throws) ---------- */
  function readSaved() { try { return window.localStorage.getItem(STORE_KEY); } catch (e) { return null; } }
  function save(c) { try { window.localStorage.setItem(STORE_KEY, c); } catch (e) { /* private mode */ } }

  /* ---------- detection: saved choice → browser language → English ---------- */
  function detect() {
    try {
      var q = new URLSearchParams(window.location.search).get('lang');   /* handy for sharing / testing */
      if (ok(base(q))) return base(q);
    } catch (e) { /* old browsers */ }
    var s = base(readSaved());
    if (ok(s)) return s;
    var prefs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || navigator.userLanguage];
    for (var i = 0; i < prefs.length; i++) {
      var b = base(prefs[i]);
      if (ok(b)) return b;
    }
    return FALLBACK;
  }

  /* ---------- lookups ---------- */
  function fill(s, vars) {
    return s.replace(/\{(\w+)\}/g, function (m, n) { return vars && vars[n] != null ? vars[n] : ''; });
  }
  function t(key, vars) {
    var s = raw(cur, key);
    if (s === null) s = raw(FALLBACK, key);
    return s === null ? '' : fill(s, vars);
  }
  function has(key) { return raw(cur, key) !== null || raw(FALLBACK, key) !== null; }
  function plural(key, n, vars) {
    var rules = pluralRules[cur] || (pluralRules[cur] = new Intl.PluralRules(cur));
    var cat = rules.select(n);
    var v = {}; v.n = formatNumber(n);
    if (vars) for (var k in vars) v[k] = vars[k];
    return has(key + '.' + cat) ? t(key + '.' + cat, v) : t(key + '.other', v);
  }
  function formatNumber(n) { return Number(n).toLocaleString('en-US'); }
  function formatPrice(n, currency) {
    var c = currency || 'EGP';
    return t('fmt.price', { amount: formatNumber(n), cur: has('cur.' + c) ? t('cur.' + c) : c });
  }
  function meta() { return T[cur]._meta; }

  /* ---------- applying a language to the page ---------- */
  function setMeta(sel, attr, val) {
    var el = document.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  }
  function wa(el) {
    var key = 'wa.' + el.getAttribute('data-wa');
    el.setAttribute('href', 'https://wa.me/201014437631?text=' + encodeURIComponent(t(key)));
  }
  function applyStatic() {
    var m = meta();
    root.lang = m.htmlLang;
    root.dir = m.dir;

    document.title = t('meta.title');
    setMeta('meta[name="description"]', 'content', t('meta.desc'));
    setMeta('meta[property="og:title"]', 'content', t('meta.ogTitle'));
    setMeta('meta[property="og:description"]', 'content', t('meta.ogDesc'));
    setMeta('meta[property="og:site_name"]', 'content', t('meta.siteName'));
    setMeta('meta[property="og:image:alt"]', 'content', t('meta.imgAlt'));
    setMeta('meta[property="og:locale"]', 'content', m.locale);
    setMeta('meta[name="twitter:title"]', 'content', t('meta.ogTitle'));
    setMeta('meta[name="twitter:description"]', 'content', t('meta.twDesc'));

    var i, els;
    els = document.querySelectorAll('[data-i18n]');
    for (i = 0; i < els.length; i++) els[i].textContent = t(els[i].getAttribute('data-i18n'));
    els = document.querySelectorAll('[data-i18n-html]');
    for (i = 0; i < els.length; i++) els[i].innerHTML = t(els[i].getAttribute('data-i18n-html'));
    els = document.querySelectorAll('[data-i18n-attr]');
    for (i = 0; i < els.length; i++) {
      els[i].getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':');
        if (p.length === 2) this.setAttribute(p[0].trim(), t(p[1].trim()));
      }, els[i]);
    }
    els = document.querySelectorAll('[data-wa]');
    for (i = 0; i < els.length; i++) wa(els[i]);
    renderSwitcher();
  }

  /* ---------- language switcher ---------- */
  function renderSwitcher() {
    var box = document.getElementById('langSwitch');
    if (!box) return;
    if (list.length < 2) { box.hidden = true; return; }    /* nothing to switch between */
    box.hidden = false;
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', t('lang.label'));
    if (!box.firstChild || box.getAttribute('data-built') !== list.join()) {
      var h = '';
      list.forEach(function (c, k) {
        var m = T[c]._meta;
        if (k) h += '<span class="lg-sep" aria-hidden="true">|</span>';
        h += '<button type="button" data-lang="' + c + '" lang="' + m.htmlLang + '" aria-label="' + m.switchTo + '">' +
             '<span class="lg-full" aria-hidden="true">' + m.name + '</span>' +
             '<span class="lg-short" aria-hidden="true">' + m.short + '</span></button>';
      });
      box.innerHTML = h;
      box.setAttribute('data-built', list.join());
    }
    Array.prototype.forEach.call(box.querySelectorAll('button'), function (b) {
      if (b.getAttribute('data-lang') === cur) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
  }

  /* ---------- switching ---------- */
  function setLang(code, persist) {
    code = base(code);
    if (!ok(code)) code = FALLBACK;
    var changed = code !== cur;
    cur = code;
    if (persist !== false) save(code);
    applyStatic();
    root.classList.remove('i18n-pending');
    if (changed || persist === 'force') {
      document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang: cur } }));
      var s = document.getElementById('langStatus');
      if (s) s.textContent = t('lang.changed');
    }
  }

  /* ---------- boot ---------- */
  cur = detect();
  root.lang = T[cur]._meta.htmlLang;           /* before first paint: no wrong-direction flash */
  root.dir = T[cur]._meta.dir;
  if (cur !== FALLBACK) root.classList.add('i18n-pending');   /* hide English markup until translated */

  function boot() {
    setLang(cur, false);
    var box = document.getElementById('langSwitch');
    if (box) box.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-lang]');
      if (b) setLang(b.getAttribute('data-lang'), true);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.setTimeout(function () { root.classList.remove('i18n-pending'); }, 2500);   /* safety net */

  window.I18N = {
    t: t, has: has, plural: plural, formatNumber: formatNumber, formatPrice: formatPrice,
    lang: function () { return cur; },
    dir: function () { return T[cur]._meta.dir; },
    isRtl: function () { return T[cur]._meta.dir === 'rtl'; },
    setLang: setLang,
    supported: function () { return list.slice(); },
    missing: missing
  };
})();
