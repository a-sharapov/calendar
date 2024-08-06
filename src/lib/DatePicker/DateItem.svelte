<script lang="ts">
  export let isOlder: boolean;
  export let isCurrent: boolean;
  export let index: number;
  export let clickHandler: (() => void) | undefined;
</script>


<span 
  class:older={isOlder}
  class:current={isCurrent}
  class:clickable={!isOlder && !!clickHandler}
  on:pointerdown={clickHandler}
>
  {index + 1}
  <slot />
</span>
