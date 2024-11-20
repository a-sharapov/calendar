<script lang="ts">
  interface Props {
    offset: number;
    reverted?: boolean;
    startWith?: number | undefined;
  }

  let { offset, reverted = false, startWith = undefined }: Props = $props();
</script>

{#each Array.from({ length: offset }) as _, i}
  {#if typeof startWith === 'number'}
    {@const dayNum = reverted ? startWith - offset + i + 1 : startWith + i}
    <span class="older">{dayNum}</span>
  {:else}
    <span class="older"></span>
  {/if}
{/each}
