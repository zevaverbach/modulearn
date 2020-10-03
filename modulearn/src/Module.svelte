<script>
  import { createEventDispatcher } from 'svelte';
  import { currentModule, position } from "./stores"

  export let module

  const dispatch = createEventDispatcher()
  const progressWidth = 240
  const getProgress = pos => (pos - module.start) / module.duration * 100

  let selected; let progress; let klass; let progressBar

  $: selected = $currentModule && $currentModule.name === module.name
  $: if (selected) {
      progress = getProgress($position)
      klass = "current"
    } else {
      progress = null;
      klass = ""
  }

  const progressClick = e => {
	// https://stackoverflow.com/a/28311723/4386191
	const pos = e.pageX - progressBar.offsetLeft
	let dual = Math.round(pos / progressWidth * 100)
	if (dual > 100) dual = 100;
    dispatch("repositionInModule", {percentage: dual})
  }

</script>

<div on:click={() => dispatch("selectModule", { module })} >
  <span class="{klass}">I want to {module.outcome}.</span>
  {#if progress}
      <progress 
         bind:this={progressBar} 
         on:click={progressClick} 
         value={progress} 
         max=100>
      </progress>
  {/if}
</div>

<style>
  @media (prefers-color-scheme: light) {
    span.current { background-color: yellow;}
    span.current:hover { background-color: lightgrey; }
  }

  @media (prefers-color-scheme: dark) {
    span.current { background-color: blue; }
    span:hover {
      background-color: purple;
    }
    progress {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: none;
      width: 240px;
      height: 15;
    }
    progress::-webkit-progress-bar {
      background-color: #ddd;
    }
    progress::-webkit-progress-value {
      background-color: yellow;
    }

    progress::-moz-progress-bar {
      background-color: #ddd;
    }
    progress::-moz-progress-bar-value {
      background-color: yellow;
    }
  }

  div { padding: .3em; }
  span {
    cursor: pointer;
    padding: .3em;
  }

</style>
