import COMPONENT_SIZE from 'src/constants/turnaroundDetail/turnaroundDetailText.json';

import { formatDateToYYYYMMDD } from 'src/utils/logic/date/formattedDate';

export function isComponentSizeLarge(componentSize) {
  return (componentSize === COMPONENT_SIZE.componentSize.large);
}

export function isArrivalFlight(turnaroundData) {
  return (turnaroundData.arrival_flight);
}

export function isDepartureFlight(turnaroundData) {
  return (turnaroundData.departure_flight);
}

export function getFlightTimingDate(dateExists, selectedTimezone) {
  if (dateExists) {
    return formatDateToYYYYMMDD(dateExists, selectedTimezone);
  }
  return null;
}
