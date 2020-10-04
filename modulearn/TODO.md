- [ ] fix bug where the "current Module" no longer updates after you've navigated outside the bounds
  of the modules' timestamps
    - [ ] or (easier) require the modules' timestamps to cover the entirety of the recording
- [ ] load data from JSON or an API
- [ ] validate the data: overlaps? gaps?
- [ ] support segments from multiple videos
- [ ] youtube iframes can have a start/end time, for example
- [ ] (depends on above) enable search
- [ ] add checkboxes for 'want to watch'
- [ ] gray out watched modules
- [ ] resolve the 'flashing'/re-rendering of the progress bars
- [ ] related to above: don't re-render the progress bar to "done" or "empty" in current module
  right before switch
- [ ] make it work decently for mobile!
  - [Plyr.js](https://github.com/sampotts/plyr#api) might help with this
    - [Svelte Wrapper](https://github.com/benwoodward/svelte-plyr#readme)
- [x] either don't allow going before the first module, or fix it so that the first module isn't highlighted when watching the pre-module content (first solution is easier)
- [x] add "flat" drop shadow to progress bar and modules
- [ ] add a diagonally oriented aqua triangle at the upper right, as the logo
