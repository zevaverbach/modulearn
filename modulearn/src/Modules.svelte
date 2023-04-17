<script>
  export let modules
  import Module from "./Module.svelte"
</script>

<div style="float: left">
  {#each modules as module}
    <Module on:repositionInModule on:selectModule {module} />
  {/each}
</div>

<style>
  div {
    background-color: #333;
    margin-left: 1em;
    margin-top: .3em;
    text-align: left;
    box-shadow: 14px 14px #111;
    padding-top: .5em;
    padding-bottom: .5em;
  }
</style>
