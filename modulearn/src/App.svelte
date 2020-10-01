<script>
  import Youtube from '@sveltecasts/svelte-youtube'
  import { onMount } from 'svelte';

  import Modules from './Modules.svelte'
  import { position, currentModule } from './stores'
  import { getModuleIndex, getModule } from './utils'
  import DATA from './data'

  let video; let interval; let timeout; let firstUpdate;

  // TODO: load data from JSON or an API
  // TODO: validate the data: overlaps? gaps? (gaps should be ok).
  // TODO: support segments from multiple videos
  //   - youtube iframes can have a start/end time, for example
  // TODO: (depends on above) enable search

  const positionUpdater = () => {
      if (firstUpdate) {
          firstUpdate = false
          return 
      }
    interval = setInterval(() => {
      const newModule = getModule($position)
      const pos = video.position()
      position.update(() => pos)
        if (!newModule 
            || newModule && !$currentModule 
            || newModule && $currentModule && newModule.name !== $currentModule.name)
        { currentModule.update(() => newModule) }
    }, 100)
  }

  const onSelectModule = event => {
    const { module } = event.detail
    if (module && !$currentModule || module.name !== $currentModule.name) {
      clearTimeout(timeout)
      clearInterval(interval)
      currentModule.update(() => module)
      position.update(() => module.start)
      video.jumpTo(module.start)
      firstUpdate = true
      timeout = setTimeout(positionUpdater, 500)
    }
  }

  onMount(() => positionUpdater())

  const handleKeyDown = e => {
      e.preventDefault()
      const { key, code } = e
      if (["j", "ArrowDown"].includes(key)) {
          nextModule()
      } else if (["k", "ArrowUp"].includes(key)) {
          prevModule()
      } else if ([32, "Space"].includes(code)) {
          video.toggle()
      } else if (["l", "ArrowRight"].includes(key)) {
          video.jumpTo($position + 5)
          clearInterval(interval)
          positionUpdater()
      } else if (["h", "ArrowLeft"].includes(key)) {
          video.jumpTo($position - 5)
          clearInterval(interval)
          positionUpdater()
      }
  }

  const nextModule = () => {
    if (!$currentModule) {
      return onSelectModule({detail: {module: DATA.modules[0]}})
    }
    const idx = $currentModule.index
    if (idx < DATA.modules.length - 1) {
      const mod = DATA.modules[idx + 1]
      onSelectModule({detail: {module: mod}})
    }
  }

  const prevModule = () => {
    if (!$currentModule) return
    const idx = $currentModule.index || 1
    if (idx > 0) {
      const mod = DATA.modules[idx - 1]
      onSelectModule({detail: {module: mod}})
    }
  }

</script>

<svelte:window on:keydown={handleKeyDown} />

<main>
  <Youtube bind:this={video} videoId={DATA.uid} />
  <Modules on:selectModule={onSelectModule} modules={DATA.modules} />
</main>

<style>
  @media (prefers-color-scheme: dark) {
    :global(body) {
      background-color: #222;
      color: #ddd;
    }
  }

  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
        max-width: none;
    }
  }
</style>
