/* Picks dark or light before the page paints. The choice lives in Settings (savior-theme: dark, light or system). */
(function () {
  var K = 'savior-theme', A = 'savior-accent', ACC = ['orange','rose','mint','blue','violet','cyan'], mq = window.matchMedia ? matchMedia('(prefers-color-scheme: light)') : null;
  function pref() { try { var v = localStorage.getItem(K); return v === 'light' || v === 'system' ? v : 'dark'; } catch (e) { return 'dark'; } }
  function eff() { var p = pref(); return p === 'system' ? (mq && mq.matches ? 'light' : 'dark') : p; }
  function acc() { try { var v = localStorage.getItem(A); return ACC.indexOf(v) > -1 ? v : 'gold'; } catch (e) { return 'gold'; } }
  function apply() {
    var a = acc(); if (a === 'gold') document.documentElement.removeAttribute('data-accent'); else document.documentElement.setAttribute('data-accent', a);
    var t = eff(); document.documentElement.setAttribute('data-theme', t);
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', t === 'light' ? '#f4f1ea' : '#14161a');
  }
  apply();
  document.addEventListener('DOMContentLoaded', apply);
  window.addEventListener('storage', function (e) { if (e.key === K || e.key === A || e.key === null) apply(); });
  if (mq && mq.addEventListener) mq.addEventListener('change', apply);
  window.SaviorTheme = { get: pref, accent: acc, setAccent: function (v) { try { if (v === 'gold') localStorage.removeItem(A); else localStorage.setItem(A, v); } catch (e) {} apply(); }, set: function (v) { try { localStorage.setItem(K, v); } catch (e) {} apply(); } };
})();
