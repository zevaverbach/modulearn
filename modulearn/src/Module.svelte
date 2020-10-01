<script>
  import { createEventDispatcher } from 'svelte';
  import currentModule from "./stores"

  const dispatcher = createEventDispatcher()

  export let module
  let klass
  $: klass = $currentModule === module.name ? "current" : ""

  // TODO: add checkboxes for 'want to watch'
  // TODO: gray out watched modules
</script>

<div on:click={() => dispatcher("selectModule", { module })} class="{klass}"><span>I want to {module.outcome}.</span></div>


<style>
  @media (prefers-color-scheme: light) {
    div.current span { background-color: yellow;}
    div span:hover { background-color: lightgrey; }
  }

  @media (prefers-color-scheme: dark) {
    div.current span { background-color: blue; }
    div span:hover {
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
