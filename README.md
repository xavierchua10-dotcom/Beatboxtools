# Beatboxtools

Savior's beatbox practice tools in one app, with a bottom tab bar.

- **Record** (`voice.html`): voice note recorder. Tap the mic to record, tap again to stop and a sheet pops up to name the note. The take is stored as soon as you stop, so nothing is lost if the app closes. Discard in the sheet removes it. Raw audio mode (no echo cancelling, noise reduction or auto gain) is on by default and is switched in Settings.
- **History** (`history.html`): every voice note, newest first. Play back with a waveform you can tap to jump around, change playback speed (1x, 0.75x, 0.5x, 1.5x), rename, download, share or delete.
- **Routine** (`routine.html`): routine builder. Lay out a set as timed sections, check it against a target length, then rehearse it with a count-in and a beep at every section change. Routines save on the device and can be copied as text.
- **Tools** (bottom tab): a Practice log card and a grid of tools. Each opens full screen with an X at the top left.
  - **Metronome** (`metronome.html`): BPM, accent, subdivisions, tap tempo.
  - **Battle round** (`battle.html`): 60/120/150/200 sec rounds with a Voice, Horn or Ringing buzzer.
  - **Loop pad** (`loop.html`): record up to 4 layers on the beat after a one bar count-in, mute or delete layers, and save the mix to History as a WAV. Sync offset fixes late layers.
  - **Pattern grid** (`pattern.html`): 16-step sequencer (Kick, Snare, Hat, Bass) with preset beats, swing and beatbox notation.
  - **Timing check** (`timing.html`): tap along to a click and see your offset in ms, spread and a score.
  - **BPM ladder** (`ladder.html`): your fastest clean BPM per technique, with goals.
  - **Tuner** (`tuner.html`) and **Mic spectrum** (`spectrum.html`): live pitch and frequency view. They only listen; nothing is recorded, and the mic stops when you close them.
  - **Freestyle prompts** (`prompts.html`): random theme, sound and rule with locks and a round timer.
  - **Practice log** (`log.html`): minutes today, streak, weekly chart and a split by tool. The shell counts time while a tool is open or running; data stays on the device (`savior-practice-v1`).
  A gold dot on the Tools tab shows while the metronome, a battle round, the loop pad, the pattern grid, the timing check or a prompt timer is running.
- Back button works like a normal phone app: it closes a popup first, then a tool or Settings screen, then goes from any tab to Record. On Record the first Back shows "Press back again to quit" and a second Back within 2 sec leaves the app (`popstate` handler in `index.html`).
- Tabs slide left or right when you switch (`.stage.slide` in `index.html`; off with reduced motion).
- **Settings** (gear in the top bar, opens full screen, `settings.html`): theme (Dark, Light or Auto) and accent colour (Default gold #f2b134, Orange, Rose, Mint, Blue, Violet, Cyan; stored in `savior-accent`, defined in `themes.css`, applied by `theme.js`), raw audio switch, rehearsal count-in (none, 3, 5 or 10 sec), beeps and vibration on or off, an Install button, how many voice notes and routines are saved, and delete all voice notes.
- `privacy.html` is the privacy policy (linked at the bottom of Settings). Nothing loads from outside the app: fonts are self-hosted.
- Back up everything (Settings > Your data) saves one `.json` file with all voice notes, routines, practice log and settings; Restore puts them back.

It is an installable app (`manifest.webmanifest`, `sw.js`): install it from the browser menu (Install app / Add to Home screen) and it opens full screen with no browser bar. Settings has an Install button when the browser offers one. The service worker is network first, so updates always win and the cache only helps offline.

`index.html` is the shell that holds them. Every page stays loaded, so the metronome keeps clicking while you record, and a recording carries on if you peek at another tab (a dot shows on the Record tab).

Voice notes are stored in the browser's IndexedDB on the device. They never leave it unless you download or share them. Clearing site data removes them, so download anything you want to keep.

Open a page directly with `#voice`, `#history`, `#routine`, `#tools`, `#settings`, `#log`, `#loop`, `#pattern`, `#timing`, `#ladder`, `#tuner`, `#spectrum`, `#prompts`, `#metronome` or `#battle` on the end of the link.

The look matches the SaviorFit Logger: near-black background, gold accent, Oswald headings, Inter body, JetBrains Mono numbers (fonts are self-hosted in `fonts/`). `theme.css` styles Record, History and Routine. `legacy.css` re-skins the metronome and battle pages, which come from the former `savior-audio` and `Saviortimer` repos and are otherwise unchanged (the metronome's colour-theme picker is hidden, since the app-wide accent colour in Settings replaces it).

## Look (Logger style)
- Header: ring logo, streak chip (opens the Practice log) and Settings.
- Record: backdrop, rings around the mic, a Today card (minutes against goal, streak) and the newest note with a play button.
- Tools: a This week card with daily bars, tools grouped as Rhythm, Ear & timing and Freestyle, and a LIVE border on running tools.
- History: filter chips (All, Loops, This week), notes grouped by day, a LOOP tag on loop mixes.
- Settings: top card with your streak, week and note count; Dark/Light/Auto switch; accent colours with a live preview; daily goal; Raw audio; Rehearsal options; Install; Your data (storage bar, Back up, Restore, last backup date, Delete all in its own card); About (privacy policy, Instagram, YouTube).
