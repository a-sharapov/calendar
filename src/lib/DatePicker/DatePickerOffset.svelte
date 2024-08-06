<script lang="ts">
  export let offset: number
  export let reverted: boolean = false
  export let startWith: number | undefined = undefined
</script>

{#each Array.from({ length: offset }) as _, i}
  {#if typeof startWith === 'number'}
    {@const dayNum = reverted ? startWith - offset + i + 1 : startWith + i}
    <span class="older">{dayNum}</span>
  {:else}
    <span class="older" />
  {/if}
{/each}
