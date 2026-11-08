# Beatboxtools

Savior's beatbox practice tools in one app, with a bottom tab bar.

- **Record** (`voice.html`): voice note recorder. Tap the mic to record, tap again to save. Raw audio mode (no echo cancelling, noise reduction or auto gain) is on by default.
- **History** (`history.html`): every voice note, newest first. Play back with a waveform you can tap to jump around, change playback speed (1x, 0.75x, 0.5x, 1.5x), rename, download, share or delete.
- **Routine** (`routine.html`): routine builder. Lay out a set as timed sections, check it against a target length, then rehearse it with a count-in and a beep at every section change. Routines save on the device and can be copied as text.
- **Settings** (`settings.html`): raw audio toggle, rehearsal count-in (none, 3, 5 or 10 sec), beeps and vibration on or off, how many voice notes and routines are saved, and delete all voice notes.
- **Tools** (grid button in the top bar): opens a full-screen list with **Metronome** (`metronome.html`: BPM, accent, subdivisions, tap tempo), **Battle round** (`battle.html`: 60/120/150/200 sec rounds with a Voice, Horn or Ringing buzzer). X closes the layer. A gold dot on the button shows while the metronome plays or a round is running.

`index.html` is the shell that holds them. Every page stays loaded, so the metronome keeps clicking while you record, and a recording carries on if you peek at another tab (a dot shows on the Record tab).

Voice notes are stored in the browser's IndexedDB on the device. They never leave it unless you download or share them. Clearing site data removes them, so download anything you want to keep.

Open a page directly with `#voice`, `#history`, `#routine`, `#settings`, `#tools`, `#metronome` or `#battle` on the end of the link.

The look matches the SaviorFit Logger: near-black background, gold accent, Oswald headings, Inter body, JetBrains Mono numbers (fonts are self-hosted in `fonts/`). `theme.css` styles Record, History and Routine. `legacy.css` re-skins the metronome and battle pages, which come from the former `savior-audio` and `Saviortimer` repos and are otherwise unchanged (the metronome's colour-theme picker is hidden, since the colours are now fixed).
