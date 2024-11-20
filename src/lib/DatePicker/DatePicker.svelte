<script lang="ts">
  import { run } from 'svelte/legacy';

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

  interface Props {
    ref: HTMLDialogElement | undefined;
    eventName?: string;
    date?: Date | string;
    availableDates?: Array<Date | string>;
    children?: import('svelte').Snippet;
  }

  let {
    ref = $bindable(),
    eventName = DEFAULT_EVENT_NAME,
    date = $bindable(new Date()),
    availableDates = [],
    children
  }: Props = $props();

  let currentDate = $state(date instanceof Date ? date : new Date(date))
  let { lastDate, startOffset, endOffset } = $state(useDate(currentDate))
  let previousLastDate = $state(useDate(currentDate, -1).lastDate)
  let isReverse = $state(false)
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
        ref?.close(event.detail.value)
        break
    }
  }

  const updateDate = (day: number) => {
    date = new Date(useDate(currentDate).year, useDate(currentDate).month, day)
    void dispatchCustomEvent(eventName, { state: CLOSE, value: date.toLocaleDateString() })
  }

  onMount(() => {
    document.addEventListener(eventName as any, eventHandler)
    return () => document.removeEventListener(eventName as any, eventHandler)
  })

  run(() => {
    const updated = useDate(currentDate)
    lastDate = updated.lastDate
    startOffset = updated.startOffset
    endOffset = updated.endOffset
    previousLastDate = useDate(currentDate, -1).lastDate
  });
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
            clickHandler={isClickable && !isOlder ? () => updateDate(index + 1) : void 0}
          />
        {/each}
        <DatePickerOffset offset={endOffset} startWith={nextStartDate} />
      </section>
    {/key}
  </div>
  {@render children?.()}
</dialog>
