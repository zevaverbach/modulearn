<script>
  import Youtube from "svelte-youtube";
  import { onMount } from 'svelte';

  import Modules from "./Modules.svelte"
  import { currentModule } from "./stores"
  import DATA from "./data"

  let video, position, interval;

  // TODO: load data from JSON or an API
  // TODO: validate the data: overlaps? gaps? (gaps should be ok).
  // TODO: support segments from multiple videos
  //   - youtube iframes can have a start/end time, for example
  // TODO: (depends on above) enable search

  
  onMount(() => positionUpdater())

  const positionUpdater = () => {
    interval = setInterval(() => {
      position = video.position()
      const newModule = getModule(position)
      if (newModule !== $currentModule) {
        currentModule.update(() => newModule)
      }
    }, 100)
  }

  const onSelectModule = event => {
    const module = event.detail.module
    if (module.name !== $currentModule) {
      clearInterval(interval)
      currentModule.update(() => module.name)
      video.jumpTo(module.start)
      positionUpdater()
    }
  }

  const getModule = position => {
    for (const module of DATA.modules) {
      if (position > module.start && position < module.end) {
        return module.name
      }
    }
  }

</script>

<main>
  <Youtube bind:this={video} videoId={DATA.uid} />
  <Modules on:selectModule={onSelectModule} modules={DATA.modules} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
        max-width: none;
    }
  }
</style>
