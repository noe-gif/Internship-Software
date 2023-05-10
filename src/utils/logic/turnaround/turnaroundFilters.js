import { checkArrivalDate, checkDepartureDate } from 'src/utils/logic/checkTurnaroundDate';
import {
  sortArrivalsByTime,
  sortDeparturesByTime,
  sortTurnaroundsByTime,
} from 'src/utils/logic/turnaround/sortTurnaroundByTime';

import {
  IN_PROGRESS,
  INCOMING,
  COMPLETED,
  CANCELED,
} from 'src/types/FlightStatus';
import representUTCDateToChosenTimezoneAndFormat from 'src/utils/logic/date/representUTCDateToChosenTimezoneAndFormat';

export function filterTurnaroundsInProgressStatus(turnarounds) {
  return turnarounds ? turnarounds.filter((turnaround) => turnaround.status.category === IN_PROGRESS) : [];
}

export function filterTurnaroundsIncomingStatus(turnarounds) {
  return turnarounds ? turnarounds.filter((turnaround) => turnaround.status.category === INCOMING) : [];
}

export function filterTurnaroundsCompletedStatus(turnarounds) {
  return turnarounds ? turnarounds.filter((turnaround) => turnaround.status.category === COMPLETED) : [];
}

export function filterTurnaroundsCanceledStatus(turnarounds) {
  return turnarounds ? turnarounds.filter((turnaround) => turnaround.status.category === CANCELED) : [];
}

function extractArrivalDateString(flight, selectedTimezone) {
  return representUTCDateToChosenTimezoneAndFormat(
    checkArrivalDate(flight.arrival_flight),
    'mm/dd/yyyy',
    selectedTimezone,
  );
}

function extractDepartureDateString(flight, selectedTimezone) {
  return representUTCDateToChosenTimezoneAndFormat(
    checkDepartureDate(flight.departure_flight),
    'mm/dd/yyyy',
    selectedTimezone,
  );
}

export function doesTheFlightNumberMatch(flight, flightNumber) {
  const arrivalFlight = flight.arrival_flight ? flight.arrival_flight.flight_number : null;
  const departureFlight = flight.departure_flight ? flight.departure_flight.flight_number : null;
  const currentFlightNumber = arrivalFlight || departureFlight;
  const doesFlightNumberMatch = currentFlightNumber === flightNumber;

  return (doesFlightNumberMatch);
}

export function doesTheTailNumberMatch(flight, tailNumber) {
  const arrivalFlight = flight.arrival_flight ? flight.arrival_flight.aircraft.tail_number : null;
  const departureFlight = flight.departure_flight ? flight.departure_flight.aircraft.tail_number : null;
  const currentTailNumber = arrivalFlight || departureFlight;
  const doesTailNumberMatch = currentTailNumber === tailNumber;

  return (doesTailNumberMatch);
}

export function filterTurnarounds(turnarounds, date, searchBarValue, selectedTimezone) {
  if (!turnarounds) {
    return [];
  }

  const arrivalFlights = turnarounds.filter((turnaround) => turnaround.arrival_flight && !turnaround.departure_flight);
  const departureFlights = turnarounds.filter(
    (turnaround) => turnaround.departure_flight && !turnaround.arrival_flight,
  );
  const completeTurnaround = turnarounds.filter(
    (turnaround) => turnaround.arrival_flight && turnaround.departure_flight,
  );

  const dateString = representUTCDateToChosenTimezoneAndFormat(date, 'mm/dd/yyyy');

  const arrivalFlightsFiltered = arrivalFlights.filter((flight) =>
    (extractArrivalDateString(flight, selectedTimezone) === dateString));

  const departureFlightsFiltered = departureFlights.filter((flight) =>
    (extractDepartureDateString(flight, selectedTimezone) === dateString));

  const turnaroundFlights = completeTurnaround.filter((turnaround) => {
    const turnaroundArrivalDateString = extractArrivalDateString(turnaround, selectedTimezone);
    const turnaroundDepartureDateString = extractDepartureDateString(turnaround, selectedTimezone);

    const turnaroundArrivalDate = new Date(turnaroundArrivalDateString);
    const turnaroundDepartureDate = new Date(turnaroundDepartureDateString);

    if (turnaroundArrivalDate < new Date(dateString) && turnaroundDepartureDate > new Date(dateString)) {
      return true;
    } else {
      return (turnaroundArrivalDateString === dateString || turnaroundDepartureDateString === dateString);
    }
  });

  arrivalFlightsFiltered.sort(sortArrivalsByTime);
  departureFlightsFiltered.sort(sortDeparturesByTime);
  turnaroundFlights.sort(sortTurnaroundsByTime);

  const arrivalAndDepartureDates = arrivalFlightsFiltered.concat(departureFlightsFiltered).concat(turnaroundFlights);
  const filteredFlights = [];

  arrivalAndDepartureDates.forEach((turnaround) => {
    if (!filteredFlights.includes(turnaround)) {
      filteredFlights.push(turnaround);
    }
  });

  if (searchBarValue) {
    const filteredSearchedNumberFlights = filteredFlights.filter((flight) =>
      (doesTheFlightNumberMatch(flight, searchBarValue)));
    const filteredSearchedTailFlights = filteredFlights.filter((flight) =>
      (doesTheTailNumberMatch(flight, searchBarValue)));
    const flightNumberAndTailNumberFilteredFlights = [];

    return (flightNumberAndTailNumberFilteredFlights.concat(
      filteredSearchedNumberFlights,
      filteredSearchedTailFlights,
    ));
  }
  return filteredFlights;
}
