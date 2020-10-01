<script>
  import { createEventDispatcher } from 'svelte';
  import { currentModule } from "./stores.js"

  const dispatcher = createEventDispatcher()

  export let module
  let class_
  $: class_ = $currentModule === module.name ? "current" : ""

  // TODO: add checkboxes for 'want to watch'
  // TODO: add links to jump to that module
      // TODO: fire events 
  // TODO: gray out watched modules

</script>

<div on:click={() => dispatcher("selectModule", {module})} class="{class_}">I want to {module.outcome}.</div>


<style>
  div {
    padding: .3em;
    cursor: pointer;
  }
  div.current {
    background-color: yellow;
  }

  /* div.current:hover { */
  /*   background-color: #FFFF99; */
  /* } */

  div:hover {
    background-color: lightgrey;
  }

</style>
