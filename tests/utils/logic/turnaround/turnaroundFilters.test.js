import { 
  filterTurnaroundsInProgressStatus,
  filterTurnaroundsIncomingStatus,
  filterTurnaroundsCompletedStatus,
  filterTurnaroundsCanceledStatus,
  filterTurnarounds,
  doesTheFlightNumberMatch,
  doesTheTailNumberMatch
} from 'src/utils/logic/turnaround/turnaroundFilters';

import { inProgressArrivalOnlyTurnaround, completedDepartureOnlyTurnaround, incomingTurnaround } from 'tests/utils/logic/turnaround/turnaroundData/flightsTestingStatus';

import { completeLGGFlightReceived, expectedLGGFlightReturned } from 'tests/utils/logic/turnaround/turnaroundData/flightToFilter';

const dateForTestingWithTurnaround = "2021-06-14T03:00:00Z";
const dateForTestingWithoutTurnaround = "2021-06-25T00:00:00Z";

const flights = [
  {
    arrival_flight: null,
    departure_flight: {
      flight_number: 711,
      aircraft: {
        tail_number: 'HFGEF',
      }
    },
  },
  {
    arrival_flight: {
      flight_number: 710,
      aircraft: {
        tail_number: 'HFGEF',
      }
    },
    departure_flight: null,
  },
]

describe('Testing turnaround filter functions', function() {
  it('test filterTurnaroundsInProgressStatus with 1 in_progress turnarounds', function() {
    const expectedFilteredTurnaround = [inProgressArrivalOnlyTurnaround];

    const turnaroundToFilter = [inProgressArrivalOnlyTurnaround, completedDepartureOnlyTurnaround, incomingTurnaround];
    let result = filterTurnaroundsInProgressStatus(turnaroundToFilter);

    expect(result).toStrictEqual(expectedFilteredTurnaround);
  });

  it('test filterTurnaroundsIncomingStatus with 1 incoming turnarounds', function() {
    const expectedFilteredTurnaround = [incomingTurnaround];

    const turnaroundToFilter = [inProgressArrivalOnlyTurnaround, completedDepartureOnlyTurnaround, incomingTurnaround];
    let result = filterTurnaroundsIncomingStatus(turnaroundToFilter);

    expect(result).toStrictEqual(expectedFilteredTurnaround);
  });

  it('test filterTurnaroundsCompletedStatus with 1 completed turnaround', function() {
    const expectedFilteredTurnaround = [completedDepartureOnlyTurnaround];

    const turnaroundToFilter = [inProgressArrivalOnlyTurnaround, completedDepartureOnlyTurnaround, incomingTurnaround];
    let result = filterTurnaroundsCompletedStatus(turnaroundToFilter);

    expect(result).toStrictEqual(expectedFilteredTurnaround);
  });

  it('test filterTurnaroundsCanceledStatus with 0 canceled turnaround', function() {
    const expectedFilteredTurnaround = [];

    const turnaroundToFilter = [inProgressArrivalOnlyTurnaround, completedDepartureOnlyTurnaround, incomingTurnaround];
    let result = filterTurnaroundsCanceledStatus(turnaroundToFilter);
    
    expect(result).toStrictEqual(expectedFilteredTurnaround);
  });

  it('test each status filter function with null', function() {
    let filteredInProgressTurnarounds = filterTurnaroundsInProgressStatus(null);
    let filteredIncomingTurnarounds = filterTurnaroundsIncomingStatus(null);
    let filteredCompletedTurnarounds = filterTurnaroundsCompletedStatus(null);
    let filteredCanceledTurnarounds = filterTurnaroundsCanceledStatus(null);

    expect(filteredInProgressTurnarounds.length).toStrictEqual(0);
    expect(filteredIncomingTurnarounds.length).toStrictEqual(0);
    expect(filteredCompletedTurnarounds.length).toStrictEqual(0);
    expect(filteredCanceledTurnarounds.length).toStrictEqual(0);
  });
})

describe('Testing filterTurnarounds Function', function() {
  it('multiple turnarounds on provided date', function() {
    const expectedFilteredTurnaround = [completedDepartureOnlyTurnaround, incomingTurnaround];
    const turnaroundsToFilter = [incomingTurnaround, completedDepartureOnlyTurnaround, incomingTurnaround, inProgressArrivalOnlyTurnaround];
    
    let result = filterTurnarounds(turnaroundsToFilter, dateForTestingWithTurnaround);

    expect(result).toStrictEqual(expectedFilteredTurnaround);
  });

  it('no turnaround on provided date', function() {
    const expectedFilteredTurnaround = [];
    const turnaroundsToFilter = [incomingTurnaround, completedDepartureOnlyTurnaround, incomingTurnaround, inProgressArrivalOnlyTurnaround];

    let result = filterTurnarounds(turnaroundsToFilter, dateForTestingWithoutTurnaround);

    expect(result).toStrictEqual(expectedFilteredTurnaround);
  });

  it('all params null', function() {
    const expectedFilteredTurnaround = [];
    let result = filterTurnarounds(null, null);

    expect(result).toStrictEqual(expectedFilteredTurnaround);
  });

  it('should return the turnarounds on the date provide', function() {
    let result = filterTurnarounds(completeLGGFlightReceived, "2022-03-24T04:25:00Z");

    expect(result).toStrictEqual(expectedLGGFlightReturned);
  });
});

describe('Testing flight tail/number match searcher function', function() {
  it('should return the flight that matches with the flight number given', function() {
    const result = flights.filter((flight) =>
      (doesTheFlightNumberMatch(flight, 711)));

    expect(result).toStrictEqual([flights[0]]);
  });

  it('should return multiple flights that matches with the tail numbers given', function() {
    const result = flights.filter((flight) =>
      (doesTheTailNumberMatch(flight, 'HFGEF')));

    expect(result).toStrictEqual([flights[0], flights[1]]);
  });

  it('should return null result if it does not match with any flights', function() {
    const result = flights.filter((flight) =>
      (doesTheTailNumberMatch(flight, null)));

    expect(result).toStrictEqual([]);
  });
});
