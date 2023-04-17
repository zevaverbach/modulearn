- [ ] resolve the 'flashing'/re-rendering of the progress bars
  - [ ] hide the progress bar until maybe "unmute"?
  - [ ] related: don't re-render the progress bar to "done" or "empty" in current module
    right before switch
- [ ] support modules from the same UID in a different order
- [ ] load data from an API
- [ ] enable search
- [ ] add checkboxes for 'want to watch'
- [ ] gray out watched modules

# Later
- [ ] bug: when you go 5/30 seconds back to an earlier module, it doesn't switch to highlighting
  that module (forwards is fine)
- [ ] don't let the YouTube iframe take control of keyboard events
  - [ ] make it unclickable if possible
    - https://stackoverflow.com/questions/17051594/prevent-all-js-events-inside-iframe
    - https://stackoverflow.com/questions/5261328/receive-mousemove-events-from-iframe-too
- [ ] possible to "hide" iframes that have already been loaded and "show" them on selection?
  - [ ] if so, can you load all the iframes in the background on first page load?
- [ ] make it work decently for mobile!
  - [Plyr.js](https://github.com/sampotts/plyr#api) might help with this
    - [Svelte Wrapper](https://github.com/benwoodward/svelte-plyr#readme)
- [ ] add a diagonally oriented aqua triangle at the upper right, as the logo
- [ ] set up CSS for "light mode"

# Done
- [x] support segments from multiple videos
- [x] either don't allow going before the first module, or fix it so that the first module isn't highlighted when watching the pre-module content (first solution is easier)
- [x] add "flat" drop shadow to progress bar and modules
- [x] fix bug where the "current Module" no longer updates after you've navigated outside the bounds
  of the modules' timestamps
    - [x] or (easier) require the modules' timestamps to cover the entirety of the recording
- [x] most of these should be fixed by changing it so a new iframe with start/end is rendered on
  every module change
    - [x] bug: when the newly seleted module is from a different YouTube UID, it doesn't autoplay and it
      doesn't advance
- [x] unmute the player on each module change?
- [x] ` for pause/unpause
- [x] `m` for mute/unmute
- [x] add a 'muted' indicator outside the iframe
- [x] remove controls, since we want to be nonlinear
