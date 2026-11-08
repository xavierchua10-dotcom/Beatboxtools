# Beatboxtools

Savior's beatbox practice tools in one app, with a bottom tab bar.

- **Metronome** (`metronome.html`): BPM, accent, subdivisions, tap tempo
- **Battle** (`battle.html`): battle round timer with 60/120/150/200 sec rounds and a Voice, Horn or Ringing buzzer
- **Routine** (`routine.html`): routine builder. Lay out a set as timed sections, check it against a target length, then rehearse it with a count-in and a beep at every section change. Routines save on the device and can be copied as text.

`index.html` is the shell that holds them. Each tool keeps running when you switch tabs, so the metronome can keep clicking while you check the round timer.

Open a tab directly with `#metronome`, `#battle` or `#routine` on the end of the link.

The metronome and battle files come from the former `savior-audio` and `Saviortimer` repos and are unchanged copies of the originals.
