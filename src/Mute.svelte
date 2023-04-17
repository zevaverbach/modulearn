<script>
  import { muted } from './stores'
  import UnMuteSvg from './unmute.svg'
  import MuteSvg from './mute.svg'
</script>

{#if $muted}
  <div style="float: left; padding: 2em 0em 0em 2em;">
    <span on:click={() => muted.update(() => false)}>
      <MuteSvg style="cursor: pointer;" width="24"/>
    </span>
  </div>
  {:else}
  <div style="float: left; padding: 2em 0em 0em 2em;">
    <span on:click={() => muted.update(() => true)}>
      <UnMuteSvg style="cursor: pointer;" width="24"/>
    </span>
  </div>
{/if}
