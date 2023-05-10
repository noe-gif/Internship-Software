import {
  LATE_FLIGHT_ICON_COLOR,
  ON_TIME_FLIGHT_ICON_COLOR,
  DEFAULT_FLIGHT_ICON_COLOR,
} from '../../../constants/flightIconColors';

export function arrivalFlightIconColorConditions(
  flightStatus,
  actualArrivalDateTime,
  estimatedArrivalDateTime,
  scheduledArrivalDateTime,
) {
  if (flightStatus === 'canceled') {
    return DEFAULT_FLIGHT_ICON_COLOR;
  }
  if (!actualArrivalDateTime && flightStatus === 'completed') {
    return ON_TIME_FLIGHT_ICON_COLOR;
  }
  if ((!actualArrivalDateTime && !estimatedArrivalDateTime) || !scheduledArrivalDateTime) {
    return DEFAULT_FLIGHT_ICON_COLOR;
  } else if ((actualArrivalDateTime || estimatedArrivalDateTime) > scheduledArrivalDateTime) {
    return LATE_FLIGHT_ICON_COLOR;
  } else if ((actualArrivalDateTime || estimatedArrivalDateTime) <= scheduledArrivalDateTime) {
    return ON_TIME_FLIGHT_ICON_COLOR;
  } else {
    return DEFAULT_FLIGHT_ICON_COLOR;
  }
}

export function departureFlightIconColorConditions(flightStatus, actualDepartureDateTime, scheduledDepartureDateTime) {
  if (flightStatus === 'canceled') {
    return DEFAULT_FLIGHT_ICON_COLOR;
  }
  if (!actualDepartureDateTime && flightStatus === 'completed') {
    return ON_TIME_FLIGHT_ICON_COLOR;
  }
  if (!actualDepartureDateTime || !scheduledDepartureDateTime) {
    return DEFAULT_FLIGHT_ICON_COLOR;
  } else if (actualDepartureDateTime > scheduledDepartureDateTime) {
    return LATE_FLIGHT_ICON_COLOR;
  } else if (actualDepartureDateTime <= scheduledDepartureDateTime) {
    return ON_TIME_FLIGHT_ICON_COLOR;
  } else {
    return DEFAULT_FLIGHT_ICON_COLOR;
  }
}
