<script context="module">
  let YouTubeIframeAPIReady = false
</script>

<script>
  import { onMount, createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  let divId = `player_${parseInt(Math.random() * 100000).toString()}`

  export let videoId; export let height = "390"; export let width = "640"; export let start;
  export let end; export let controls = 1;

  let player;

  onMount(() => {
    const ytTagUrl = "https://www.youtube.com/iframe_api";
    if (!isMyScriptLoaded(ytTagUrl)) {
      // 2. This code loads the IFrame Player API code asynchronously.
      const tag = document.createElement("script");
      tag.src = ytTagUrl;
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = function() {
      window.dispatchEvent(new Event("YouTubeIframeAPIReady"));
    };

    window.addEventListener("YouTubeIframeAPIReady", function() {
      if (YouTubeIframeAPIReady == false) {
        // first load of an YT Video on this project
        YouTubeIframeAPIReady = true; // now the Player can be created
        createPlayer();
      }
   });
    
   function onPlayerStateChange({ data }) {		
     dispatch("StateChange", data);		  
   }
    function createPlayer() {
      player = new YT.Player(divId, {
        height,
        width,
        videoId,
        events: {
          //'onReady': onPlayerReady,
          onStateChange: onPlayerStateChange
        },
        playerVars: { 'autoplay': 1, start, end, mute: 1, controls, disablekb: 1 },

      });
    }
    if (YouTubeIframeAPIReady) {
      createPlayer(); // if the YT Script is ready, we can create our player
    }
  });

  function isMyScriptLoaded(url = "") {
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length; i--; ) {
      if (scripts[i].src == url) return true;
    }
    return false;
  }

  export function position() { if (player.getCurrentTime) return player.getCurrentTime() }
  export function play() { player.playVideo() }
  export function jumpTo(seconds) { if (player.seekTo) player.seekTo(seconds) }
  export function pause() { player.pauseVideo() }
  export function paused() { return [5, 2, -1].includes(player.getPlayerState()) }
  export function buffering() { return player.getPlayerState() === 3 }
  export function state() { return player.getPlayerState() }
  export function unMute() { return player.unMute() }
  export function muted() { return player.isMuted() }
  export function mute() { return player.mute() }
</script>

<span class="yt-component" style="float: left">
  <div id={divId} />
</span>
<style>
  .yt-component {
    box-shadow: 15px 15px #111;
  }
</style>
