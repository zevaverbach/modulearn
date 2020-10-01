<script>
  export let modules
  import Module from "./Module.svelte"
</script>

<span style="float: left">
  {#each modules as module}
    <Module on:selectModule {module} />
  {/each}
</span>

<style>
  span {
    margin-left: 4em;
    margin-top: 2em;
    text-align: left;
  }
</style>
