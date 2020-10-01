<script>
  import Youtube from '@sveltecasts/svelte-youtube'
  import { onMount } from 'svelte';

  import Modules from './Modules.svelte'
  import currentModule from './stores'
  import DATA from './data'

  let video; let position; let interval; let timeout;

  // TODO: load data from JSON or an API
  // TODO: validate the data: overlaps? gaps? (gaps should be ok).
  // TODO: support segments from multiple videos
  //   - youtube iframes can have a start/end time, for example
  // TODO: (depends on above) enable search

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
    const { module } = event.detail
    if (module.name !== $currentModule) {
      if (timeout) clearTimeout(timeout)
      clearInterval(interval)
      currentModule.update(() => module.name)
      video.jumpTo(module.start)
      timeout = setTimeout(() => positionUpdater(), 1000)
    }
  }

  const getModuleIndex = moduleName => {
    for (const index in DATA.modules) {
      if (DATA.modules[index].name === moduleName) {
        return parseInt(index)
      }
    }
  }

  const getModule = position => {
    for (const module of DATA.modules) {
      if (position > module.start && position < module.end) {
        return module.name
      }
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
          video.jumpTo(position + 5)
      } else if (["h", "ArrowLeft"].includes(key)) {
          video.jumpTo(position - 5)
      }
  }

  const nextModule = () => {
    const currentModuleIndex = getModuleIndex($currentModule)
    if (currentModuleIndex < DATA.modules.length - 1) {
      const mod = DATA.modules[currentModuleIndex + 1]
      onSelectModule({detail: {module: mod}})
    } else if (currentModuleIndex === undefined) {
      const mod = DATA.modules[0]
      onSelectModule({detail: {module: mod}})
    }
  }

  const prevModule = () => {
    const currentModuleIndex = getModuleIndex($currentModule) || 1
    if (currentModuleIndex > 0) {
      const mod = DATA.modules[currentModuleIndex - 1]
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
