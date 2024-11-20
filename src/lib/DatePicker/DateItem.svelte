<script lang="ts">
  interface Props {
    isOlder: boolean;
    isCurrent: boolean;
    index: number;
    clickHandler: (() => void) | undefined;
    children?: import('svelte').Snippet;
  }

  let {
    isOlder,
    isCurrent,
    index,
    clickHandler,
    children
  }: Props = $props();
</script>

<span
  class:older={isOlder}
  class:current={isCurrent}
  class:clickable={!isOlder && !!clickHandler}
  onpointerdown={clickHandler}
>
  {index + 1}
  {@render children?.()}
</span>
