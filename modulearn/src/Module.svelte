<script>
  import { createEventDispatcher } from 'svelte';
  import { currentModule, position } from "./stores"
  export let module

  const dispatch = createEventDispatcher()
  const progressWidth = 240
  const getProgress = pos => {
      return (pos - module.start) / module.duration * 100
  }

  let selected; let progress; let klass; let progressBar;
  $: selected = $currentModule && $currentModule.id === module.id

  $: if (selected) {
    klass = "current"
    progress = getProgress($position)
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
  {#if progress != null}
    <progress 
      bind:this={progressBar} 
      on:click={progressClick} 
      value={progress} 
      max=100>
    </progress>
  {/if}
</div>

<style>
  span.current { 
    background-color: aqua; 
    box-shadow: 4px 4px black;
    color: #222;
  }
  span:hover {
    background-color: blue;
    box-shadow: 4px 4px black;
    color: #ddd;
  }
  progress {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    width: 240px;
    height: 15;
    box-shadow: 4px 4px black;
  }
  progress::-webkit-progress-bar {
    background-color: #ddd;
    box-shadow: 4px 4px black;
  }
  progress::-webkit-progress-value {
    background-color: yellow;
  }
  progress::-moz-progress-bar {
    background-color: #ddd;
    box-shadow: 4px 4px black;
  }
  progress::-moz-progress-bar-value {
    background-color: yellow;
  }
  div { padding: .4em;
     margin-left: .2em;
  }
  span {
    cursor: pointer;
    padding: .35em;
  }
</style>
