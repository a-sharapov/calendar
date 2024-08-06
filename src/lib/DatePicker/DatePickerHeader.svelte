<script lang="ts">
  import { fade } from 'svelte/transition'
  import { getMonthName, useDate } from './utils'

  export let currentDate: Date
  export let isReverse: boolean = false

  let { year, month: currentMonth } = useDate(currentDate)

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

  $: currentDate = new Date(year, currentMonth, currentDate.getDate())
</script>

<header>
  <button on:pointerdown={decreaseMonth}>&#x1F850;</button>
  <div>
    {#key currentMonth}
      <slot />
      <span transition:fade={{ duration: 2e2 }}>{getMonthName(currentMonth)} {year}</span>
    {/key}
  </div>
  <button on:pointerdown={increaseMonth}>&#x1F852;</button>
</header>
