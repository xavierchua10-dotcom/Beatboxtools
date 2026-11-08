/* Practice log data, shared by the shell (which records time) and the log page (which shows it). Stays on this device. */
(function () {
  var KEY = 'savior-practice-v1';
  var NAMES = { record: 'Record', routine: 'Routine', metronome: 'Metronome', battle: 'Battle round', loop: 'Loop pad', pattern: 'Pattern grid', timing: 'Timing check', ladder: 'BPM ladder', tuner: 'Tuner', spectrum: 'Mic spectrum', prompts: 'Freestyle prompts' };
  function key(d) { d = d || new Date(); var m = d.getMonth() + 1, x = d.getDate(); return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (x < 10 ? '0' : '') + x; }
  function load() {
    try { var o = JSON.parse(localStorage.getItem(KEY)); if (o && o.days) return o; } catch (e) {}
    return { goal: 30, days: {} };
  }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  function add(tool, sec) {
    var o = load(), k = key(), d = o.days[k] || (o.days[k] = {});
    d[tool] = Math.round(((d[tool] || 0) + sec) * 10) / 10;
    save(o);
  }
  function total(day) { var t = 0; for (var k in (day || {})) t += day[k]; return t; }
  function daysAgo(n) { var d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - n); return d; }
  /* a day counts toward the streak with at least one minute of practice */
  function streak(o) {
    var run = 0, i = total(o.days[key()]) >= 60 ? 0 : 1;
    for (; i < 4000; i++) { if (total(o.days[key(daysAgo(i))]) >= 60) run++; else break; }
    var keys = Object.keys(o.days).filter(function (k) { return total(o.days[k]) >= 60; }).sort(), best = 0, cur = 0, prev = null;
    keys.forEach(function (k) {
      var t = new Date(k + 'T12:00:00').getTime();
      cur = prev !== null && Math.round((t - prev) / 86400000) === 1 ? cur + 1 : 1;
      prev = t; if (cur > best) best = cur;
    });
    return { now: run, best: Math.max(best, run) };
  }
  /* Monday to Sunday of the current week */
  function week(o) {
    var now = new Date(), idx = (now.getDay() + 6) % 7, out = [];
    for (var i = 0; i < 7; i++) {
      var d = daysAgo(idx - i);
      out.push({ label: 'MTWTFSS'.charAt(i), sec: total(o.days[key(d)]), today: i === idx, future: i > idx });
    }
    return out;
  }
  window.PLog = { KEY: KEY, NAMES: NAMES, key: key, load: load, save: save, add: add, total: total, streak: streak, week: week };
})();
