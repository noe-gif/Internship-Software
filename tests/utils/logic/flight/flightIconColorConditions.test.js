import { arrivalFlightIconColorConditions, departureFlightIconColorConditions } from '../../../../src/utils/logic/flight/flightIconColorConditions';

import { LATE_FLIGHT_ICON_COLOR, ON_TIME_FLIGHT_ICON_COLOR, DEFAULT_FLIGHT_ICON_COLOR } from '../../../../src/constants/flightIconColors';

import { DATE_NOW, DATE_NOW_PLUS_1_SEC, DATE_NOW_MINUS_1_SEC } from '../../../constants/dateTime';

describe('Testing arrivalFlightIconColorConditions Function', function() {
  it('completed status && actual null', function() {
    let result = arrivalFlightIconColorConditions(
      "completed",
      null,
      DATE_NOW_MINUS_1_SEC,
      DATE_NOW);

    expect(result).toStrictEqual(ON_TIME_FLIGHT_ICON_COLOR);
  });

  it('canceled status', function() {
    let result = arrivalFlightIconColorConditions(
      "canceled",
      DATE_NOW,
      DATE_NOW,
      DATE_NOW);

    expect(result).toStrictEqual(DEFAULT_FLIGHT_ICON_COLOR);
  });

  it('completed status && actual provide && actual > scheduled', function() {
    let result = arrivalFlightIconColorConditions(
      "completed",
      DATE_NOW_PLUS_1_SEC,
      DATE_NOW_MINUS_1_SEC,
      DATE_NOW);

    expect(result).toStrictEqual(LATE_FLIGHT_ICON_COLOR);
  });

  it('completed status && actual provide && actual < scheduled', function() {
    let result = arrivalFlightIconColorConditions(
      "completed",
      DATE_NOW_MINUS_1_SEC,
      DATE_NOW_PLUS_1_SEC,
      DATE_NOW);

    expect(result).toStrictEqual(ON_TIME_FLIGHT_ICON_COLOR);
  });

  it('in_progress status && actual null && estimated > scheduled', function() {
    let result = arrivalFlightIconColorConditions(
      "in_progress",
      null,
      DATE_NOW_PLUS_1_SEC,
      DATE_NOW);

    expect(result).toStrictEqual(LATE_FLIGHT_ICON_COLOR);
  });

  it('in_progress status && actual null && estimated < schedule', function() {
    let result = arrivalFlightIconColorConditions(
      "in_progress",
      null,
      DATE_NOW_MINUS_1_SEC,
      DATE_NOW);

    expect(result).toStrictEqual(ON_TIME_FLIGHT_ICON_COLOR);
  });

  it('in_progress status && actual > scheduled && estimated < scheduled', function() {
    let result = arrivalFlightIconColorConditions(
      "in_progress",
      DATE_NOW_PLUS_1_SEC,
      DATE_NOW_MINUS_1_SEC,
      DATE_NOW);

    expect(result).toStrictEqual(LATE_FLIGHT_ICON_COLOR);
  });

  it('in_progress status && actual < scheduled && estimated > scheduled', function() {
    let result = arrivalFlightIconColorConditions(
      "in_progress",
      DATE_NOW_MINUS_1_SEC,
      DATE_NOW_PLUS_1_SEC,
      DATE_NOW);

    expect(result).toStrictEqual(ON_TIME_FLIGHT_ICON_COLOR);
  });

  it('in_progress status && actual === scheduled && estimated > scheduled', function() {
    let result = arrivalFlightIconColorConditions(
      "in_progress",
      DATE_NOW,
      DATE_NOW_PLUS_1_SEC,
      DATE_NOW);

    expect(result).toStrictEqual(ON_TIME_FLIGHT_ICON_COLOR);
  });

  it('all params null', function() {
    let result = arrivalFlightIconColorConditions(
      null,
      null,
      null,
      null);

    expect(result).toStrictEqual(DEFAULT_FLIGHT_ICON_COLOR);
  })

  it('in_progress status && actual null && estimated null', function() {
    let result = arrivalFlightIconColorConditions(
      "in_progress",
      null,
      null,
      DATE_NOW);

    expect(result).toStrictEqual(DEFAULT_FLIGHT_ICON_COLOR);
  });

  it('in_progress status && schedule null', function() {
    let result = arrivalFlightIconColorConditions(
      "in_progress",
      DATE_NOW_PLUS_1_SEC,
      DATE_NOW,
      null);

    expect(result).toStrictEqual(DEFAULT_FLIGHT_ICON_COLOR);
  });
});

describe('Testing departureFlightIconColorConditions Function', function() {
  it('completed status && actual null', function() {
    let result = departureFlightIconColorConditions(
      "completed",
      null,
      DATE_NOW);

    expect(result).toStrictEqual(ON_TIME_FLIGHT_ICON_COLOR);
  });

  it('completed status && actual > scheduled', function() {
    let result = departureFlightIconColorConditions(
      "completed",
      DATE_NOW_PLUS_1_SEC,
      DATE_NOW);

    expect(result).toStrictEqual(LATE_FLIGHT_ICON_COLOR);
  });

  it('canceled status', function() {
    let result = departureFlightIconColorConditions(
      "canceled",
      DATE_NOW,
      DATE_NOW);

    expect(result).toStrictEqual(DEFAULT_FLIGHT_ICON_COLOR);
  });

  it('in_progress status && actual < scheduled', function() {
    let result = departureFlightIconColorConditions(
      "in_progress",
      DATE_NOW_MINUS_1_SEC,
      DATE_NOW);

    expect(result).toStrictEqual(ON_TIME_FLIGHT_ICON_COLOR);
  });

  it('in_progress status && actual > scheduled', function() {
    let result = departureFlightIconColorConditions(
      "in_progress",
      DATE_NOW_PLUS_1_SEC,
      DATE_NOW);

    expect(result).toStrictEqual(LATE_FLIGHT_ICON_COLOR);
  });

  it('in_progress status && scheduled null', function() {
    let result = departureFlightIconColorConditions(
      "in_progress",
      DATE_NOW,
      null);

    expect(result).toStrictEqual(DEFAULT_FLIGHT_ICON_COLOR);
  });

  it('all params null', function() {
    let result = departureFlightIconColorConditions(
      null,
      null,
      null);

    expect(result).toStrictEqual(DEFAULT_FLIGHT_ICON_COLOR);
  });
});
