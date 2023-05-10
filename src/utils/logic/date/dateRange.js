import { dateToUTCDate } from 'src/utils/logic/date/dateToUTCDate';
import getNextDate from 'src/utils/logic/date/getNextDate';

export const calculateNumberOfDaysBetweenTwoDates = (dateEnd, dateStart) => (
  Math.floor(dateEnd - dateStart) / (1000 * 60 * 60 * 24)
);

export function dateRange(dateStart, dateEnd) {
  const utcDateStart = dateToUTCDate(dateStart);
  const utcDateEnd = dateToUTCDate(dateEnd);
  const rangeDatesFromParameters = [utcDateStart];
  const dateInterval = calculateNumberOfDaysBetweenTwoDates(utcDateEnd, utcDateStart);

  for (let index = 0; index < dateInterval; index += 1) {
    rangeDatesFromParameters.push(getNextDate(rangeDatesFromParameters.slice(-1)[0]));
  }

  return rangeDatesFromParameters;
}
