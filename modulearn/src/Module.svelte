<script>
  import { createEventDispatcher } from 'svelte';
  import { currentModule, position } from "./stores"

  const dispatcher = createEventDispatcher()

  export let module
  const duration = module.end - module.start
  const getProgress = pos => (pos - module.start) / duration * 100

  let styl; let selected; let progress;
  $: selected = $currentModule && $currentModule.name === module.name
  $: if (selected) progress = getProgress($position)
  $: styl = selected 
      ? `background: linear-gradient(to right, var(--finished-bg) 0%, var(--finished-bg) ${progress + 1}%, var(--pending-bg) ${100 - progress}%, var(--pending-bg) 100%)` 
      : ""

  // TODO: add checkboxes for 'want to watch'
  // TODO: gray out watched modules
</script>

<div on:click={() => dispatcher("selectModule", { module })} ><span style="{styl}" >I want to {module.outcome}.</span></div>
{#if progress}
<div>
  <progress value={progress} max=100>Hi</progress>
</div>
{/if}


<style>
  @media (prefers-color-scheme: light) {
    /* span.current { background-color: yellow;} */
    span.current:hover { background-color: lightgrey; }
	:root {
	  --pending-bg: yellow; 
      --finished-bg: white;
	}
  }

  @media (prefers-color-scheme: dark) {
	 :root {
	  --pending-bg: #222; 
      --finished-bg: blue;
	}

    /* span.current { background-color: blue; } */
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
