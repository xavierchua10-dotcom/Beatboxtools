/* Helpers shared by the practice tool pages. The shell tells a page when it is shown or hidden. */
(function () {
  var shown = [], hidden = [];
  var inFrame = window.parent !== window;
  window.addEventListener('message', function (e) {
    if (e.origin !== location.origin || !e.data) return;
    var list = e.data.type === 'shown' ? shown : e.data.type === 'hidden' ? hidden : null;
    if (list) list.forEach(function (f) { try { f(); } catch (x) {} });
  });
  var ctx = null;
  window.Tools = {
    $: function (s, r) { return (r || document).querySelector(s); },
    onShown: function (f) { shown.push(f); },
    onHidden: function (f) { hidden.push(f); },
    /* the shell watches this flag to show the gold dot and to count practice time */
    running: function (on) { document.documentElement.setAttribute('data-running', on ? '1' : '0'); },
    ctx: function () {
      if (!ctx) { var C = window.AudioContext || window.webkitAudioContext; ctx = new C({ latencyHint: 'interactive' }); }
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    },
    hasCtx: function () { return !!ctx; },
    /* raw mic: no echo cancel, no noise gate, no auto gain, so beatbox sounds are not mangled */
    mic: function () {
      return navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false, channelCount: 1 } });
    },
    micError: function (e) {
      var n = e && e.name;
      if (n === 'NotAllowedError' || n === 'SecurityError') return 'Microphone is blocked. Allow it in your browser settings and try again.';
      if (n === 'NotFoundError') return 'No microphone found.';
      return 'Could not open the microphone.';
    },
    store: {
      get: function (k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
      set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
    },
    tell: function (m) { try { if (inFrame) window.parent.postMessage(m, location.origin); } catch (e) {} },
    clamp: function (v, a, b) { return Math.max(a, Math.min(b, v)); },
    buzz: function (p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) {} }
  };
})();
