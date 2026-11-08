/* "Are you sure?" popup, same look as the SaviorFit Logger. Confirm.ask({title, message, confirmLabel}) resolves true or false.
   Pages inside the app ask the shell to show it, so it covers the whole screen, header and tab bar included. */
(function () {
  var inFrame = window.parent !== window;
  var seq = 0, waiting = {}, open = null;

  var CSS =
    '.cf-ov{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:24px;background:var(--scrim,rgba(8,9,11,.68));-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);animation:cfIn .15s ease}' +
    '.cf-panel{position:relative;overflow:hidden;text-align:center;width:100%;max-width:330px;background:var(--panel,#1c1f24);border:1px solid rgba(var(--accent-rgb,242,177,52),.28);border-radius:22px;padding:30px 22px 22px;box-shadow:0 20px 60px rgba(0,0,0,.35),0 0 40px rgba(var(--accent-rgb,242,177,52),.06);animation:cfPop .2s cubic-bezier(.16,1,.3,1);color:var(--text,#e9e6df);font-family:Inter,system-ui,sans-serif}' +
    '.cf-panel::before{content:"";position:absolute;top:0;left:22%;right:22%;height:2px;background:linear-gradient(90deg,transparent,var(--accent,#f2b134),transparent)}' +
    '.cf-panel.danger{border-color:rgba(226,92,82,.35);box-shadow:0 20px 60px rgba(0,0,0,.6),0 0 40px rgba(226,92,82,.07)}' +
    '.cf-panel.danger::before{background:linear-gradient(90deg,transparent,#e25c52,transparent)}' +
    '.cf-icon{width:52px;height:52px;border-radius:50%;margin:0 auto 14px;display:flex;align-items:center;justify-content:center;color:var(--accent-ink,var(--accent,#f2b134));background:rgba(var(--accent-rgb,242,177,52),.10);border:1.5px solid rgba(var(--accent-rgb,242,177,52),.55)}' +
    '.danger .cf-icon{color:#d3453a;background:rgba(226,92,82,.10);border-color:rgba(226,92,82,.55)}' +
    '.cf-title{font:700 21px Oswald,"Arial Narrow",system-ui,sans-serif;margin-bottom:10px;letter-spacing:.05em;text-transform:uppercase}' +
    '.cf-msg{font-size:14px;color:var(--text-dim,#8b9098);line-height:1.55;margin:0 auto 24px;max-width:270px;overflow-wrap:anywhere}' +
    '.cf-btns{display:flex;gap:12px}' +
    '.cf-btns button{min-height:50px;border-radius:14px;font:600 14px Oswald,"Arial Narrow",system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;touch-action:manipulation}' +
    '.cf-no{flex:1;border:1px solid var(--line-strong,#3a4049);background:transparent;color:var(--text-dim,#c7ccd3)}' +
    '.cf-no:active{background:var(--panel-3,#2a2f38)}' +
    '.cf-yes{flex:1.25;border:none;background:#c1443c;color:#fdf1f0;box-shadow:0 6px 20px rgba(226,92,82,.22);font-weight:700!important}' +
    '.cf-panel:not(.danger) .cf-yes{background:var(--accent,#f2b134);color:var(--on-accent,#1c1500);box-shadow:0 6px 20px rgba(var(--accent-rgb,242,177,52),.25)}' +
    '.cf-yes:active{opacity:.85}' +
    '.cf-btns button:focus-visible{outline:2px solid var(--accent,#f2b134);outline-offset:2px}' +
    '@keyframes cfIn{from{opacity:0}to{opacity:1}}' +
    '@keyframes cfPop{from{opacity:0;transform:scale(.95) translateY(8px)}to{opacity:1;transform:none}}' +
    '@media (prefers-reduced-motion:reduce){.cf-ov,.cf-panel{animation:none}}';
  var TRASH = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>';
  var WARN = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function local(o) {
    if (open) open.close(false);
    return new Promise(function (resolve) {
      if (!document.getElementById('cfStyle')) { var st = document.createElement('style'); st.id = 'cfStyle'; st.textContent = CSS; document.head.appendChild(st); }
      var danger = o.danger !== false, label = o.confirmLabel || 'Delete';
      var ov = document.createElement('div');
      ov.className = 'cf-ov'; ov.setAttribute('role', 'alertdialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-labelledby', 'cfTitle');
      if (o.message) ov.setAttribute('aria-describedby', 'cfMsg');
      ov.innerHTML = '<div class="cf-panel' + (danger ? ' danger' : '') + '"><div class="cf-icon">' + (danger && /delete|remove|clear|discard/i.test(o.title + ' ' + label) ? TRASH : danger ? WARN : WARN) + '</div>' +
        '<div class="cf-title" id="cfTitle">' + esc(o.title || 'Are you sure?') + '</div>' + (o.message ? '<div class="cf-msg" id="cfMsg">' + esc(o.message) + '</div>' : '') +
        '<div class="cf-btns"><button type="button" class="cf-no">' + esc(o.cancelLabel || 'Cancel') + '</button><button type="button" class="cf-yes">' + esc(label) + '</button></div></div>';
      var no = ov.querySelector('.cf-no'), yes = ov.querySelector('.cf-yes');
      /* everything behind the popup stops taking taps and focus until it closes */
      var held = [];
      Array.prototype.forEach.call(document.body.children, function (el) {
        if (el === ov || el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;
        held.push([el, el.hasAttribute('inert')]); el.setAttribute('inert', '');
      });
      var back = document.activeElement;
      function close(ok) {
        if (!open || open.ov !== ov) return;
        open = null; window.removeEventListener('keydown', key, true);
        held.forEach(function (h) { if (!h[1]) h[0].removeAttribute('inert'); });
        if (ov.parentNode) ov.parentNode.removeChild(ov);
        try { if (back && back.focus && document.contains(back)) back.focus({ preventScroll: true }); } catch (e) {}
        resolve(ok);
      }
      function key(e) {
        if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); close(false); }
        else if (e.key === 'Tab') { e.preventDefault(); (document.activeElement === no ? yes : no).focus(); }
      }
      window.addEventListener('keydown', key, true);
      no.addEventListener('click', function () { close(false); });
      yes.addEventListener('click', function () { close(true); });
      ov.addEventListener('click', function (e) { if (e.target === ov) close(false); });
      document.body.appendChild(ov);
      open = { ov: ov, close: close };
      /* Cancel is focused first, so a stray Enter never deletes anything */
      no.focus({ preventScroll: true });
    });
  }

  function remote(o) {
    return new Promise(function (resolve) {
      var id = ++seq; waiting[id] = resolve;
      window.parent.postMessage({ type: 'confirm', id: id, o: { title: o.title, message: o.message, confirmLabel: o.confirmLabel, cancelLabel: o.cancelLabel, danger: o.danger } }, location.origin);
    });
  }

  window.addEventListener('message', function (e) {
    if (e.origin !== location.origin || !e.data) return;
    var d = e.data;
    if (d.type === 'confirmResult' && waiting[d.id]) { var r = waiting[d.id]; delete waiting[d.id]; r(!!d.ok); }
    else if (d.type === 'confirm' && !inFrame && e.source) {
      var src = e.source;
      local(d.o || {}).then(function (ok) { try { src.postMessage({ type: 'confirmResult', id: d.id, ok: ok }, location.origin); } catch (x) {} });
    }
  });

  window.Confirm = { dismiss: function () { if (open) { open.close(false); return true; } return false; }, ask: function (o) { return inFrame ? remote(o || {}) : local(o || {}); } };
})();
