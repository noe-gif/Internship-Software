import parseAgoaStringDate from './parseAgoaStringDate';

export default function dateStringToUTCDate(dateString) {
  const dateFromString = parseAgoaStringDate(dateString);

  if (!dateFromString) {
    return new Date();
  }

  const UTCDate = Date.UTC(
    dateFromString.year,
    dateFromString.month - 1, // Month is set with minus 1 to send him as an index in month array
    dateFromString.day,
    dateFromString.hours,
    dateFromString.minutes,
    dateFromString.seconds,
  );

  return new Date(UTCDate);
}
