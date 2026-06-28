/* ============================================================================
   DRIP – shared top banner INJECTOR (for self-extracting bundle pages)
   ----------------------------------------------------------------------------
   Most DRIP pages embed the .drip-topbar markup statically and just link
   drip-topbar.css — they do NOT need this file. But a few pages (the
   Constellation Dashboard, the Monitoring System, When Women Lead) are
   self-contained single-file BUNDLES: on load they decode an embedded payload
   and call documentElement.replaceWith(...), which throws away whatever static
   markup the page started with. A banner placed in their HTML would vanish.

   The bundler relies on `window` surviving that swap (it keeps its error sink
   there). We use the same trick: this script sets up a persistent re-injector
   on `window`, so after the bundle rebuilds the DOM the banner is (re)inserted.

   Load it as a CLASSIC script in the original <head>:
     <script src="drip-topbar.js"></script>          (root pages)
     <script src="../drip-topbar.js"></script>       (pages in a sub-folder)
   The path prefix for the banner's own links + CSS is auto-detected, or set
   window.DRIP_ROOT = '../' before loading to override.
   ============================================================================ */
(function () {
  var ROOT = (typeof window.DRIP_ROOT === 'string')
    ? window.DRIP_ROOT
    : (/\/dsl-ip-monitoring\//.test(location.pathname) ? '../' : '');

  var ic = function (p) {
    return '<svg class="db-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>';
  };
  var ICONS = {
    home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    about: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
    library: '<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>',
    marvel: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    water: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C4 11.1 3 13 3 15a7 7 0 0 0 7 7z"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    lang: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>'
  };

  function bannerHTML() {
    var H = ROOT + 'DRIP.html';
    return '' +
      '<div class="drip-topbar" id="drip-topbar">' +
      '<a class="db-brand" href="' + H + '"><span class="db-dm">DRIP<span>.</span></span><span class="db-sub">Drylands Restoration Initiatives Platform</span></a>' +
      '<nav class="db-nav">' +
      '<a class="db-home" href="' + H + '">' + ic(ICONS.home) + '<span>Home</span></a>' +
      '<a href="' + H + '#story">' + ic(ICONS.about) + '<span>About</span></a>' +
      '<a href="' + ROOT + 'DRIP Map.html">' + ic(ICONS.map) + '<span>Map</span></a>' +
      '<a href="' + H + '#library">' + ic(ICONS.library) + '<span>Library</span></a>' +
      '<a href="' + ROOT + 'MARVEL.html">' + ic(ICONS.marvel) + '<span>MARVEL</span></a>' +
      '<a href="' + ROOT + 'Water.html">' + ic(ICONS.water) + '<span>Water</span></a>' +
      '<a href="' + H + '#transparency">' + ic(ICONS.shield) + '<span>Transparency and Data Policy</span></a>' +
      '<div class="langsw" id="langsw" role="group" aria-label="Choose a language">' +
      '<svg class="langsw-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>' +
      '<button type="button" class="flag flag-en is-on" data-lang="en" title="English" aria-label="English"></button>' +
      '<button type="button" class="flag flag-es" data-lang="es" title="Español" aria-label="Español"></button>' +
      '<button type="button" class="flag flag-fr" data-lang="fr" title="Français" aria-label="Français"></button>' +
      '<button type="button" class="flag flag-ru" data-lang="ru" title="Русский" aria-label="Русский"></button>' +
      '<button type="button" class="flag flag-ar" data-lang="ar" title="العربية" aria-label="العربية"></button>' +
      '<button type="button" class="flag flag-zh" data-lang="zh" title="中文" aria-label="中文"></button>' +
      '</div>' +
      '</nav>' +
      '</div>';
  }

  function ensureCSS() {
    var head = document.head || document.documentElement;
    if (!head || head.querySelector('link[data-drip-topbar]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = ROOT + 'drip-topbar.css';
    l.setAttribute('data-drip-topbar', '');
    head.appendChild(l);
  }

  function makeBar() {
    var tmp = document.createElement('div');
    tmp.innerHTML = bannerHTML();
    var bar = tmp.firstChild;
    // float above any full-screen app chrome; the app keeps its own layout
    bar.style.position = 'sticky';
    bar.style.top = '0';
    bar.style.zIndex = '2147483600';
    return bar;
  }

  function inject() {
    if (!document.body) return;
    ensureCSS();

    // Already in place from a previous tick? Just clear out any stale banners
    // the bundle's replaceWith may have re-introduced alongside ours.
    if (document.getElementById('drip-topbar')) {
      document.querySelectorAll('.drip-topbar').forEach(function (el) {
        if (el.id !== 'drip-topbar') el.remove();
      });
      return;
    }

    var existing = document.querySelectorAll('.drip-topbar');
    var bar = makeBar();
    if (existing.length) {
      // These bundle pages ship an OLDER .drip-topbar frozen in their payload.
      // Replace the first with the current standard banner, drop any extras.
      existing[0].replaceWith(bar);
      document.querySelectorAll('.drip-topbar').forEach(function (el) {
        if (el !== bar) el.remove();
      });
    } else {
      // No banner at all (e.g. a full-screen app) — add one at the top.
      document.body.insertBefore(bar, document.body.firstChild);
      adjustFullscreen(bar);
    }
  }

  // Full-screen apps (e.g. the Constellation Dashboard) pin their own chrome to
  // the very top and fill the viewport with a 100vh canvas. Once a banner sits
  // above them, nudge that chrome down and trim the canvas so nothing overlaps
  // or is clipped. Scoped to known element ids, so other pages are untouched.
  function adjustFullscreen(bar) {
    var graph = document.getElementById('graph');
    var tabs = document.getElementById('tabs');
    if (!graph && !tabs) return;
    if (document.getElementById('drip-topbar-appfix')) return;
    var h = Math.round((bar.getBoundingClientRect().height || 56));
    var st = document.createElement('style');
    st.id = 'drip-topbar-appfix';
    st.textContent =
      '#tabs{top:' + (h + 10) + 'px !important;}' +
      '#panel{top:' + (h + 10) + 'px !important;max-height:calc(100vh - ' + (h + 24) + 'px) !important;}' +
      '#graph{height:calc(100vh - ' + h + 'px) !important;}';
    (document.head || document.documentElement).appendChild(st);
  }

  // run as early as possible, then keep watch — the bundle's replaceWith() runs
  // on DOMContentLoaded and wipes the DOM, so re-inject for a while afterwards.
  inject();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  window.addEventListener('load', inject);
  var ticks = 0;
  var timer = setInterval(function () { inject(); if (++ticks > 120) clearInterval(timer); }, 500); // ~60s
})();
