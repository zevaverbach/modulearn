<script>
  import { createEventDispatcher } from 'svelte';
  import { currentModule, position } from "./stores"

  const dispatch = createEventDispatcher()

  export let module
  let progressBar
  const getProgress = pos => (pos - module.start) / module.duration * 100

  let selected; let progress; let klass;

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
	const max = 160
	const pos = e.pageX - progressBar.offsetLeft
	let dual = Math.round(pos / max * 100)

	if (dual > 100) {
      console.log(dual)
	  dual = 100;
	}

    dispatch("repositionInModule", {percentage: dual})

	}

</script>

<div on:click={() => dispatch("selectModule", { module })} >
  <span class="{klass}">I want to {module.outcome}.</span>
  {#if progress}
      <progress bind:this={progressBar} on:click={progressClick} value={progress} max=100>Hi</progress>
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
      background-color: lavender;
      color: #222;
    }
  }

  div { padding: .3em; }
  span {
    cursor: pointer;
    padding: .3em;
  }

</style>
