<script>
  import Youtube from '@sveltecasts/svelte-youtube'
  import { onMount } from 'svelte';

  import Modules from './Modules.svelte'
  import { position, currentModule } from './stores'
  import { getModuleIndex, getModule } from './utils'
  import DATA from './data'

  let video; let interval; let timeout;

  const positionUpdater = () => {
    interval = setInterval(() => {
      const pos = video.position()
      const newModule = getModule(pos)
      if (!pos) return console.log('no pos')
      position.update(() => pos)
        if (newModule && !$currentModule 
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
      positionUpdater()
    }
  }

  onMount(() => positionUpdater())

  const toggle = video => {
      if (video.paused()) {
          video.play()
      } else {
          video.pause()
      }
  }

  const handleKeyDown = e => {
      const { key, code } = e
      if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
          return
      }
      if (["j", "ArrowDown"].includes(key)) {
          e.preventDefault()
          nextModule()
      } else if (["k", "ArrowUp"].includes(key)) {
          e.preventDefault()
          prevModule()
      } else if ([32, "Space"].includes(code)) {
          e.preventDefault()
          toggle(video)
      } else if (["l", "ArrowRight"].includes(key)) {
          e.preventDefault()
          clearInterval(interval)
          video.jumpTo($position + 5)
          positionUpdater()
      } else if (["h", "ArrowLeft"].includes(key)) {
          e.preventDefault()
          clearInterval(interval)
          video.jumpTo($position - 5)
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
