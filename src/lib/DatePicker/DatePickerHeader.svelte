<script lang="ts">
  import { run } from 'svelte/legacy';

  import { fade } from 'svelte/transition'
  import { getMonthName, useDate } from './utils'

  interface Props {
    currentDate: Date;
    isReverse?: boolean;
    children?: import('svelte').Snippet;
  }

  let { currentDate = $bindable(), isReverse = $bindable(false), children }: Props = $props();

  let { year, month: currentMonth } = $state(useDate(currentDate))

  const decreaseMonth = () => {
    const isShouldUpdateYear = currentMonth === 0

    isReverse = true
    isShouldUpdateYear && (year = year - 1)
    currentMonth = currentMonth > 0 ? currentMonth - 1 : 11
  }
  const increaseMonth = () => {
    const isShouldUpdateYear = currentMonth === 11

    isReverse = false
    isShouldUpdateYear && (year = year + 1)
    currentMonth = currentMonth < 11 ? currentMonth + 1 : 0
  }

  run(() => {
    currentDate = new Date(year, currentMonth, currentDate.getDate())
  });
</script>

<header>
  <button onpointerdown={decreaseMonth}>&larr;</button>
  <div>
    {#key currentMonth}
      {@render children?.()}
      <span transition:fade={{ duration: 2e2 }}>{getMonthName(currentMonth)} {year}</span>
    {/key}
  </div>
  <button onpointerdown={increaseMonth}>&rarr;</button>
</header>
