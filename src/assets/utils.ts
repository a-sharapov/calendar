export var pipe =
  <T>(...fns: Array<(argument: any) => any>) =>
  (payload: T): T =>
    fns.reduce<T>(
      (arg: T | Promise<T>, fn: (arg: any) => any) =>
        arg instanceof Promise ? arg.then(fn) : fn(arg),
      payload
    )

export var dispatchCustomEvent = <T extends Record<string, any>>(
  eventName: string,
  detail: T
): boolean =>
  document.dispatchEvent(
    new CustomEvent(eventName, {
      detail
    })
  )

export var checkOutOfBounds = (selector: HTMLElement, event: MouseEvent): boolean => {
  const { left, right, top, bottom } = selector?.getBoundingClientRect()
  const { clientX, clientY } = event

  return left > clientX || right < clientX || top > clientY || bottom < clientY
}

export var closeByOutsideClick = (
  event: MouseEvent,
  selector: HTMLDialogElement,
  handler: (selector: HTMLDialogElement) => void
): void => void (checkOutOfBounds(selector, event) && handler(selector))
