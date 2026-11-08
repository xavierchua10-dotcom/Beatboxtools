/* Picks dark or light before the page paints. The choice lives in Settings (savior-theme: dark, light or system). */
(function () {
  var K = 'savior-theme', mq = window.matchMedia ? matchMedia('(prefers-color-scheme: light)') : null;
  function pref() { try { var v = localStorage.getItem(K); return v === 'light' || v === 'system' ? v : 'dark'; } catch (e) { return 'dark'; } }
  function eff() { var p = pref(); return p === 'system' ? (mq && mq.matches ? 'light' : 'dark') : p; }
  function apply() {
    var t = eff(); document.documentElement.setAttribute('data-theme', t);
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', t === 'light' ? '#f4f1ea' : '#14161a');
  }
  apply();
  document.addEventListener('DOMContentLoaded', apply);
  window.addEventListener('storage', function (e) { if (e.key === K || e.key === null) apply(); });
  if (mq && mq.addEventListener) mq.addEventListener('change', apply);
  window.SaviorTheme = { get: pref, set: function (v) { try { localStorage.setItem(K, v); } catch (e) {} apply(); } };
})();
