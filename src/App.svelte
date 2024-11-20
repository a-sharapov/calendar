<script lang="ts">
  import { run } from 'svelte/legacy';

  import { dispatchCustomEvent } from './assets/utils'
  import { DEFAULT_EVENT_NAME, OPEN } from './lib/DatePicker/assets'
  import DatePicker from './lib/DatePicker/DatePicker.svelte'

  let currentDate: Date = $state(new Date())
  let datePicker: HTMLDialogElement | undefined = $state()

  const availableDates = [
    new Date().toLocaleDateString(),
    '2024 08/21',
    '2024 08/23',
    '2024 08/29',
    '2024 08/30',
    '2024 09/01',
    '2024 09/11'
  ] as Array<Date | string>

  const showDatePicker = () => void dispatchCustomEvent(DEFAULT_EVENT_NAME, { state: OPEN })

  run(() => {
    console.log(
      `%c 📅 currentDate: ${currentDate}, returnedValue: ${datePicker?.returnValue || ''}`,
      'color: tan; font-size: 1.25em; font-weight: bold; background: #333; padding: .5em 1em'
    )
  });
</script>

<main>
  <h1>📅 Пожалуйста, выберите одну из доступных дат:</h1>
  <p>
    <input
      class="date-picker-trigger"
      type="text"
      value={datePicker?.returnValue || currentDate.toLocaleDateString()}
      readonly
      onpointerdown={showDatePicker}
    />
  </p>

  <DatePicker bind:ref={datePicker} bind:date={currentDate} {availableDates} />
</main>

<style lang="scss">
  input.date-picker-trigger {
    padding: 1em;
    text-align: center;
    font-size: 1.25em;
    transition: 0.2s;
    outline: none;
    border: 0.1em solid orange;
    border-radius: 0.3em;

    &:hover {
      box-shadow: 0 0.1em 1.2em color-mix(in srgb, red, transparent 90%);
    }
  }
</style>
