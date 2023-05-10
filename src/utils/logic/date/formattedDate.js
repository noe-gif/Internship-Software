import { FR_DATETIME_FORMAT } from 'src/constants/datetimeFormat';
import dateStringToUTCDate from 'src/utils/logic/date/dateStringToUTCDate';
import representUTCDateToChosenTimezoneAndFormat from 'src/utils/logic/date/representUTCDateToChosenTimezoneAndFormat';

export function formatDateToDDMMYYYY(date) {
  if (!date) {
    return null;
  }

  return new Intl.DateTimeFormat(FR_DATETIME_FORMAT, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatDateToDDMMYYYYWithHyphen(date, selectedTimezone) {
  return representUTCDateToChosenTimezoneAndFormat(date, 'dd-mm-yyyy', selectedTimezone);
}

export function formatDateToYYYYMMDD(date, selectedTimezone) {
  return representUTCDateToChosenTimezoneAndFormat(date, 'YYYY-MM-DD', selectedTimezone);
}

export function dateToFormatWithWords(date, selectedTimezone) {
  return representUTCDateToChosenTimezoneAndFormat(date, 'DD MMMM YYYY - DDDD', selectedTimezone);
}

export function formatDatePickerDateTime(formattedDate) {
  if (formattedDate.timing === null) {
    return null;
  }

  const dateSplit = formattedDate.date.split('-');
  const timingSplit = formattedDate.timing.split(':');

  const newDatePickerDate = new Date(
    dateSplit[0],
    Number(dateSplit[1]) - 1,
    dateSplit[2],
    timingSplit[0],
    timingSplit[1],
    '00',
  );

  return newDatePickerDate;
}

export function formatDateToStringDDMMMYY(date, selectedTimezone) {
  return representUTCDateToChosenTimezoneAndFormat(date, 'DDMMMYY', selectedTimezone);
}

export function formatDateToHHmm(datetime, selectedTimezone) {
  return representUTCDateToChosenTimezoneAndFormat(datetime, 'hh:mm', selectedTimezone);
}

export const formatTzDateRepresentationToUTCTzDate = (date) => (
  `${formatDateToYYYYMMDD(dateStringToUTCDate(date))}T${formatDateToHHmm(dateStringToUTCDate(date))}:00Z`
);
