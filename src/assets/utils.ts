export var pipe =
  <T>(...fns: Array<(argument: any) => any>) =>
  (payload: T): T =>
    fns.reduce<T>(
      (arg: T | Promise<T>, fn: (arg: any) => any) =>
        arg instanceof Promise ? arg.then(fn) : fn(arg),
      payload
    );

export var dispatchCustomEvent = <T extends Record<string, any>>(
  eventName: string,
  detail: T
): boolean =>
  document.dispatchEvent(
    new CustomEvent(eventName, {
      detail,
    })
  );
