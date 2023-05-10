import {
  dateRepresentationToUnixTimestamp,
  unixTimestampToHourRepresentation,
} from 'src/utils/logic/date/unixTimestampConvertion';
import { MAX_HOUR_DIFFERENCE } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';
import { formatTzDateRepresentationToUTCTzDate } from 'src/utils/logic/date/formattedDate';

const getReferencePlannedDateTime = (plannedTimingType, task) => (
  plannedTimingType === 'start'
    ? task?.planned_start_datetime
    : task?.planned_end_datetime
);

const getHourDifferenceFromUnixTimestamps = (newActualDatetimeToUnixTimestamp, plannedDateToUnixTimestamp) => {
  const unixTimestampDifference = Math.abs(newActualDatetimeToUnixTimestamp - plannedDateToUnixTimestamp);
  const hourDifference = Math.abs(unixTimestampToHourRepresentation(unixTimestampDifference));

  return (hourDifference);
};

export const isHourDifferenceGreaterThanMaxHourDifference = (hourDifference) => hourDifference >= MAX_HOUR_DIFFERENCE;

export const isDateRepresentationOutOfUpdatableRange = (newActualDateRepresentation, plannedTimingType, task) => {
  const startOrEndPlannedDateTime = getReferencePlannedDateTime(plannedTimingType, task);
  const startOrEndPlannedDateTimeInUTC = formatTzDateRepresentationToUTCTzDate(startOrEndPlannedDateTime);
  const newActualDateTimeAsUnixTimestamp = dateRepresentationToUnixTimestamp(newActualDateRepresentation);
  const plannedDateTimeAsUnixTimestamp = dateRepresentationToUnixTimestamp(startOrEndPlannedDateTimeInUTC);

  const hourDifferenceBetweenNewActualAndPlannedDateTime = getHourDifferenceFromUnixTimestamps(
    newActualDateTimeAsUnixTimestamp,
    plannedDateTimeAsUnixTimestamp,
  );

  return isHourDifferenceGreaterThanMaxHourDifference(hourDifferenceBetweenNewActualAndPlannedDateTime);
};
