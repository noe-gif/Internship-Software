const LOCALES = 'en-US';

const getDateByTimezone = (dateToConvert, selectedTimezone) => (
  new Date(dateToConvert).toLocaleString(LOCALES, {
    timeZone: selectedTimezone,
  })
);

const splitDate = (dateWithCorrectTimezone) => {
  const date = new Date(dateWithCorrectTimezone);

  const fourDigitsYear = date.toLocaleString(LOCALES, { year: 'numeric' });
  const twoDigitsYear = date.toLocaleString(LOCALES, { year: '2-digit' });
  const monthNumber = date.toLocaleString(LOCALES, { month: '2-digit' }).padStart(2, '0');
  const monthName = date.toLocaleString(LOCALES, { month: 'long' }).toUpperCase();
  const dayNumber = date.toLocaleString(LOCALES, { day: '2-digit' }).padStart(2, '0');
  const dayName = date.toLocaleString(LOCALES, { weekday: 'long' }).toUpperCase();
  const hours = date.toLocaleString(LOCALES, { hour: '2-digit', hourCycle: 'h23' }).padStart(2, '0');
  const minutes = date.toLocaleString(LOCALES, { minute: '2-digit' }).padStart(2, '0');
  const seconds = date.toLocaleString(LOCALES, { second: '2-digit' }).padStart(2, '0');

  const firstThreeLettersOfMonthName = monthName.slice(0, 3);

  return {
    fourDigitsYear,
    twoDigitsYear,
    monthNumber,
    monthName,
    firstThreeLettersOfMonthName,
    dayNumber,
    dayName,
    hours,
    minutes,
    seconds,
  };
};

export default function representUTCDateToChosenTimezoneAndFormat(
  utcDateString,
  dateFormat,
  selectedTimezone,
) {
  if (!utcDateString) {
    return null;
  }

  const dateWithCorrectTimezone = getDateByTimezone(utcDateString, selectedTimezone);

  const {
    fourDigitsYear,
    twoDigitsYear,
    monthNumber,
    monthName,
    firstThreeLettersOfMonthName,
    dayNumber,
    hours,
    minutes,
    seconds,
    dayName,
  } = splitDate(dateWithCorrectTimezone);

  switch (dateFormat.toUpperCase()) {
  case 'YYYY-MM-DD HH:MM:SS':
    return `${fourDigitsYear}-${monthNumber}-${dayNumber} ${hours}:${minutes}:${seconds}`;

  case 'DD-MM-YYYY':
    return `${dayNumber}-${monthNumber}-${fourDigitsYear}`;

  case 'DD/MM/YYYY':
    return `${dayNumber}/${monthNumber}/${fourDigitsYear}`;

  case 'MM/DD/YYYY':
    return `${monthNumber}/${dayNumber}/${fourDigitsYear}`;

  case 'DDMMMYY':
    return `${dayNumber}${firstThreeLettersOfMonthName}${twoDigitsYear}`;

  case 'HH:MM:SS':
    return `${hours}:${minutes}:${seconds}`;

  case 'YYYY-MM-DD':
    return `${fourDigitsYear}-${monthNumber}-${dayNumber}`;

  case 'MM-DD-YYYY':
    return `${monthNumber}-${dayNumber}-${fourDigitsYear}`;

  case 'DD MMMM YYYY - DDDD':
    return `${dayNumber} ${monthName} ${fourDigitsYear} - ${dayName}`;

  case 'HH:MM':
    return `${hours}:${minutes}`;

  default:
    return `${fourDigitsYear}-${monthNumber}-${dayNumber} ${hours}:${minutes}:${seconds}`;
  }
}
