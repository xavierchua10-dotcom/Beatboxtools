# Beatboxtools

Savior's beatbox practice tools in one app, with a bottom tab bar.

- **Record** (`voice.html`): voice note recorder. Tap the mic to record, tap again to stop and a sheet pops up to name the note. The take is stored as soon as you stop, so nothing is lost if the app closes. Discard in the sheet removes it. Raw audio mode (no echo cancelling, noise reduction or auto gain) is on by default and is switched in Settings.
- **History** (`history.html`): every voice note, newest first. Play back with a waveform you can tap to jump around, change playback speed (1x, 0.75x, 0.5x, 1.5x), rename, download, share or delete.
- **Routine** (`routine.html`): routine builder. Lay out a set as timed sections, check it against a target length, then rehearse it with a count-in and a beep at every section change. Routines save on the device and can be copied as text.
- **Tools** (bottom tab): a list with **Metronome** (`metronome.html`: BPM, accent, subdivisions, tap tempo) and **Battle round** (`battle.html`: 60/120/150/200 sec rounds with a Voice, Horn or Ringing buzzer). Each opens full screen with an X at the top left. A gold dot on the Tools tab shows while the metronome plays or a round is running.
- **Settings** (gear in the top bar, opens full screen, `settings.html`): raw audio switch, rehearsal count-in (none, 3, 5 or 10 sec), beeps and vibration on or off, an Install button, how many voice notes and routines are saved, and delete all voice notes.

It is an installable app (`manifest.webmanifest`, `sw.js`): install it from the browser menu (Install app / Add to Home screen) and it opens full screen with no browser bar. Settings has an Install button when the browser offers one. The service worker is network first, so updates always win and the cache only helps offline.

`index.html` is the shell that holds them. Every page stays loaded, so the metronome keeps clicking while you record, and a recording carries on if you peek at another tab (a dot shows on the Record tab).

Voice notes are stored in the browser's IndexedDB on the device. They never leave it unless you download or share them. Clearing site data removes them, so download anything you want to keep.

Open a page directly with `#voice`, `#history`, `#routine`, `#tools`, `#settings`, `#metronome` or `#battle` on the end of the link.

The look matches the SaviorFit Logger: near-black background, gold accent, Oswald headings, Inter body, JetBrains Mono numbers (fonts are self-hosted in `fonts/`). `theme.css` styles Record, History and Routine. `legacy.css` re-skins the metronome and battle pages, which come from the former `savior-audio` and `Saviortimer` repos and are otherwise unchanged (the metronome's colour-theme picker is hidden, since the colours are now fixed).
