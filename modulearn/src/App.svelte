<script>
  import { onMount } from 'svelte';

  import Modules from './Modules.svelte'
  import YouTube from './YouTube.svelte'
  import Mute from './Mute.svelte'
  import { position, currentModule, uid, muted } from './stores'
  import { getModule } from './utils'
  import modules from './data'

  let video; let interval; let timeout;

  const positionUpdater = () => {
    interval = setInterval(() => {
      updateMute()
      const pos = video.position()
      if (pos == null) return
      const newModule = getModule(pos, $currentModule)
      if (!newModule) return

      position.update(() => pos)
      if (!$currentModule || ($currentModule && newModule.id !== $currentModule.id)) { 
        currentModule.update(() => newModule) 
      }
    }, 100)
  }

  const updateMute = () => {
    if ($muted && !video.muted()) {
      video.mute()
    } else if (!$muted && video.muted()) {
      video.unMute()
    }
  }

  const onSelectModule = event => {
    const { module } = event.detail
    if (module && !$currentModule || module.id !== $currentModule.id) {
      clearTimeout(timeout)
      clearInterval(interval)
      currentModule.update(() => module)
      // TODO: make it change the uid successfully on the iframe!
      //  possibly it's simplest to create a new iframe whenever you switch modules
      position.update(() => module.start)
      video.jumpTo(module.start)
      positionUpdater()
    }
  }

  const onRepositionInModule = event => {
    const { percentage } = event.detail
    const pos = $currentModule.start + ($currentModule.duration * percentage / 100)
    jumpTo(pos)
  }

  onMount(() => positionUpdater())

  const toggle = video => {
    if (video.paused()) {
      video.play()
    } else {
      video.pause()
    }
  }

  const jumpTo = pos => {
    clearInterval(interval)
    video.jumpTo(pos)
    positionUpdater()
  }

  const handleKeyDown = e => {
    const { key, code, ctrlKey, shiftKey, altKey, metaKey } = e

    if (shiftKey || altKey || metaKey) return
    if (!video) return

    const amount = ctrlKey ? 30 : 5
    if (["j", "ArrowDown"].includes(key)) {
      e.preventDefault()
      nextModule()
    } else if (["k", "ArrowUp"].includes(key)) {
      e.preventDefault()
      prevModule()
    } else if ([32, "Space"].includes(code) || key === "`") {
      e.preventDefault()
      toggle(video)
    } else if (["l", "ArrowRight"].includes(key)) {
      e.preventDefault()
      jumpTo($position + amount)
    } else if (["h", "ArrowLeft"].includes(key)) {
      e.preventDefault()
      jumpTo($position - amount)
    } else if (key === "m") {
      e.preventDefault()
      muted.update(m => !m)
    } else if (key === ";") {
      e.preventDefault()
        if (video.paused()) {
            toggle(video)
        } else {
          jumpTo($position - 5)
        }
    }
  }

  const nextModule = () => {
    if (!$currentModule) {
      return onSelectModule({detail: {module: modules[0]}})
    }
    const idx = $currentModule.index
    if (idx < modules.length - 1) {
      const mod = modules[idx + 1]
      onSelectModule({detail: {module: mod}})
    }
  }

  const prevModule = () => {
    if (!$currentModule) return
    const idx = $currentModule.index || 1
    if (idx > 0) {
      const mod = modules[idx - 1]
      onSelectModule({detail: {module: mod}})
    }
  }


</script>

<svelte:window on:keydown={handleKeyDown} />
<svelte:head>
  <title>Modulearn</title>
</svelte:head>

<main>
  <div style="float: left; margin-bottom: 2em; margin-left: 1em;">
    {#key $currentModule}
      <YouTube 
        bind:this={video} 
        videoId={$uid} 
        start={$currentModule.start} 
        end={$currentModule.end}
        controls={0}
      />
    {/key}
  </div>
  <Mute />
  <Modules 
      on:repositionInModule={onRepositionInModule} 
      on:selectModule={onSelectModule}
      modules={modules} 
  />
</main>

<style>
  :global(body) {
    background-color: #222;
    color: #ddd;
  }

  main {
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
