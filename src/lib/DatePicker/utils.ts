import { DEFAULT_LOCALE } from "./assets";

export var getMonthName = (month: number, locale = DEFAULT_LOCALE) =>
  new Date(0, month, 1).toLocaleDateString(locale, { month: "long" });

export var getDayName = (
  day: number,
  year = 0,
  month = 0,
  locale = DEFAULT_LOCALE
) =>
  new Date(year, month, day).toLocaleDateString(locale, { weekday: "short" });

export var isOlderThanToday = (date: Date | number) =>
  new Date(date).getTime() <= new Date().getTime();

export var isCurrentDate = (date: Date) =>
  new Date(date).getTime() ===
  new Date(new Date().setHours(0, 0, 0, 0)).getTime();

export var isCurrentDateInAvailableDates = (
  date: Date,
  availableDates: Array<Date | string>
) =>
  availableDates.some(
    (availableDate) =>
      new Date(availableDate).getTime() === new Date(date).getTime()
  );

export var useDate = (date: Date, monthOffset = 0) => {
  const preparedDate = date instanceof Date ? date : new Date(date);
  const year = preparedDate.getFullYear();
  const month = preparedDate.getMonth();

  const lastDate = new Date(year, month + monthOffset + 1, 0).getDate();
  const firstMonthDay = new Date(year, month + monthOffset, 1).getDay();
  const lastMonthDay = new Date(year, month + monthOffset + 1, 0).getDay();
  const startOffset = firstMonthDay === 0 ? 0 : firstMonthDay;
  const endOffset = lastMonthDay === 0 ? 6 : 6 - lastMonthDay;

  return {
    year,
    month,
    firstMonthDay,
    lastMonthDay,
    lastDate,
    startOffset,
    endOffset,
  };
};
