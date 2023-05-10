import { formatDateToHHmm, formatDateToYYYYMMDD } from './formattedDate';

export default function formatDateToDateTimeLocal(utcDatetimeRepresentation, selectedTimezone) {
  if (!utcDatetimeRepresentation) {
    return null;
  }

  const localDateRepresentation = formatDateToYYYYMMDD(utcDatetimeRepresentation, selectedTimezone);
  const localTimeRepresentation = `${formatDateToHHmm(utcDatetimeRepresentation, selectedTimezone)}:00`;

  return `${localDateRepresentation}T${localTimeRepresentation}`;
}
