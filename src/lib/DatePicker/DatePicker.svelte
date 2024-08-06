<script lang="ts">
  import { onMount } from 'svelte'
  import { slide } from 'svelte/transition'
  import { closeByOutsideClick, dispatchCustomEvent } from '../../assets/utils'
  import { CLOSE, DEFAULT_EVENT_NAME, OPEN } from './assets'
  import DateItem from './DateItem.svelte'
  import './DatePicker.scss'
  import DatePickerHeader from './DatePickerHeader.svelte'
  import DatePickerOffset from './DatePickerOffset.svelte'
  import DatePickerWeekDays from './DatePickerWeekDays.svelte'
  import { isCurrentDate, isCurrentDateInAvailableDates, isOlderThanToday, useDate } from './utils'

  export let ref: HTMLDialogElement | undefined
  export let eventName: string = DEFAULT_EVENT_NAME
  export let date: Date | string = new Date()
  export let availableDates: Array<Date | string> = []

  let currentDate = new Date(date)
  let { lastDate, startOffset, endOffset } = useDate(currentDate)
  let previousLastDate = useDate(currentDate, -1).lastDate
  let isReverse = false
  let nextStartDate = 1

  const eventHandler = (event: CustomEvent): void => {
    const closeHandler = () => void dispatchCustomEvent(eventName, { state: CLOSE })
    const outsideClickListener = (event: PointerEvent) =>
      closeByOutsideClick(event, ref as HTMLDialogElement, closeHandler)

    switch (event.detail.state) {
      case OPEN:
        ref?.showModal()
        ref?.addEventListener('pointerdown', outsideClickListener)
        break

      case CLOSE:
        ref?.removeEventListener('pointerdown', outsideClickListener)
        ref?.close()
        break
    }
  }

  const updateDate = (day: number) => {
    date = new Date(useDate(currentDate).year, useDate(currentDate).month, day)

    void ref?.close(date.toLocaleDateString())
  }

  onMount(() => {
    document.addEventListener(eventName as any, eventHandler)
    return () => document.removeEventListener(eventName as any, eventHandler)
  })

  $: {
    lastDate = useDate(currentDate).lastDate
    startOffset = useDate(currentDate).startOffset
    endOffset = useDate(currentDate).endOffset
    previousLastDate = useDate(currentDate, -1).lastDate
  }
</script>

<dialog id="date-picker" bind:this={ref}>
  <DatePickerHeader bind:currentDate bind:isReverse />
  <DatePickerWeekDays />
  <div class="days-container" class:reverse={isReverse}>
    {#key startOffset}
      <section class="days" transition:slide={{ duration: 5e2, axis: 'x' }}>
        <DatePickerOffset offset={startOffset} startWith={previousLastDate} reverted />
        {#each Array.from({ length: lastDate }) as _, index}
          {@const parseCurrentDate = (inc = 1) =>
            new Date(useDate(currentDate).year, useDate(currentDate).month, index + inc)}
          {@const isOlder = isOlderThanToday(parseCurrentDate(2))}
          {@const isCurrent = isCurrentDate(parseCurrentDate())}
          {@const isClickable = isCurrentDateInAvailableDates(parseCurrentDate(), availableDates)}

          <DateItem
            {isOlder}
            {isCurrent}
            {index}
            clickHandler={isClickable ? () => updateDate(index + 1) : void 0}
          />
        {/each}
        <DatePickerOffset offset={endOffset} startWith={nextStartDate} />
      </section>
    {/key}
  </div>
  <slot />
</dialog>
