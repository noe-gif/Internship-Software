import { checkArrivalDate, checkDepartureDate } from 'src/utils/logic/checkTurnaroundDate';
import dateStringToUTCDate from 'src/utils/logic/date/dateStringToUTCDate';

function getTurnaroundUsableTime(turnaround) {
  const turnaroundArrivalCheck = checkArrivalDate(turnaround.arrival_flight);
  const turnaroundArrivalDate = new Date(turnaroundArrivalCheck);
  const turnaroundArrivalDateToCompare = new Date(turnaroundArrivalCheck).setHours(turnaroundArrivalDate.getHours + 2);

  const turnaroundDepartureCheck = checkDepartureDate(turnaround.departure_flight);
  const turnaroundDepartureDate = new Date(turnaroundDepartureCheck);

  if (new Date() < turnaroundArrivalDateToCompare) {
    return turnaroundArrivalDate;
  } else {
    return turnaroundDepartureDate;
  }
}

export function compareDates(dateA, dateB) {
  if (!dateA || !dateB) {
    return 0;
  }

  if (dateA > dateB) {
    return 1;
  } else if (dateA < dateB) {
    return -1;
  } else {
    return 0;
  }
}

export function sortArrivalsByTime(arrivalA, arrivalB) {
  if (!arrivalA || !arrivalB) {
    return 0;
  }

  const arrivalATimeToCompare = dateStringToUTCDate(checkArrivalDate(arrivalA.arrival_flight));
  const arrivalBTimeToCompare = dateStringToUTCDate(checkArrivalDate(arrivalB.arrival_flight));

  return (compareDates(arrivalATimeToCompare, arrivalBTimeToCompare));
}

export function sortDeparturesByTime(departureA, departureB) {
  if (!departureA || !departureB) {
    return 0;
  }

  const departureATimeToCompare = dateStringToUTCDate(checkDepartureDate(departureA.departure_flight));
  const departureBTimeToCompare = dateStringToUTCDate(checkDepartureDate(departureB.departure_flight));

  return (compareDates(departureATimeToCompare, departureBTimeToCompare));
}

export function sortTurnaroundsByTime(turnaroundA, turnaroundB) {
  if (!turnaroundA || !turnaroundB) {
    return 0;
  }

  const turnaroundADateToCompare = getTurnaroundUsableTime(turnaroundA);
  const turnaroundBDateToCompare = getTurnaroundUsableTime(turnaroundB);

  return (compareDates(turnaroundADateToCompare, turnaroundBDateToCompare));
}
