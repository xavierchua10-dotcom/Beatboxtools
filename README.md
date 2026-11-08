# Beatboxtools

Savior's beatbox practice tools in one app, with a bottom tab bar.

- **Record** (`voice.html`): voice note recorder. Tap the mic to record, tap again to save. Raw audio mode (no echo cancelling, noise reduction or auto gain) is on by default.
- **History** (`history.html`): every voice note, newest first. Play back with a waveform you can tap to jump around, change playback speed (1x, 0.75x, 0.5x, 1.5x), rename, download, share or delete.
- **Metronome** (`metronome.html`): BPM, accent, subdivisions, tap tempo
- **Battle** (`battle.html`): battle round timer with 60/120/150/200 sec rounds and a Voice, Horn or Ringing buzzer
- **Routine** (`routine.html`): routine builder. Lay out a set as timed sections, check it against a target length, then rehearse it with a count-in and a beep at every section change. Routines save on the device and can be copied as text.

`index.html` is the shell that holds them. Each tool keeps running when you switch tabs, so the metronome can keep clicking while you record, and a recording carries on if you peek at another tab (a dot shows on the Record tab).

Voice notes are stored in the browser's IndexedDB on the device. They never leave it unless you download or share them. Clearing site data removes them, so download anything you want to keep.

Open a tab directly with `#voice`, `#history`, `#metronome`, `#battle` or `#routine` on the end of the link.

The look matches the SaviorFit Logger: near-black background, gold accent, Oswald headings, Inter body, JetBrains Mono numbers (fonts are self-hosted in `fonts/`). `theme.css` styles Record, History and Routine. `legacy.css` re-skins the metronome and battle pages, which come from the former `savior-audio` and `Saviortimer` repos and are otherwise unchanged (the metronome's colour-theme picker is hidden, since the colours are now fixed).
