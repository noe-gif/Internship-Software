import {
  IN_PROGRESS,
  CANCELED,
  INCOMING,
  COMPLETED,
} from 'src/types/FlightStatus';

import TIMING_ACRONYMS from 'src/constants/timingAcronyms.json';
import { TIMING_DEPARTURE_PRIMARY_COLOR, TIMING_DEPARTURE_SECONDARY_COLOR } from 'src/constants/colors';

function getFlightIncomingTimeText(departureFlightData) {
  const {
    estimated_gate_departure_datetime: estimatedGateDepartureDateTime,
  } = departureFlightData;

  if (estimatedGateDepartureDateTime) {
    return `${TIMING_ACRONYMS.departure_text.estimated_departure}`;
  } else {
    return TIMING_ACRONYMS.empty_data;
  }
}

function getFlightIncomingContentText(departureFlightData) {
  const {
    estimated_gate_departure_datetime: estimatedGateDepartureDateTime,
  } = departureFlightData;

  if (estimatedGateDepartureDateTime) {
    return estimatedGateDepartureDateTime;
  } else {
    return TIMING_ACRONYMS.empty_data;
  }
}

export default function departureInfosFromFlight(
  allDoorsClosedTargetDateTime,
  departureFlight,
  turnaroundStatus,
) {
  const defaultDepartureTimeInfos = {
    departureTimeText: TIMING_ACRONYMS.empty_data,
    departureTimeContent: TIMING_ACRONYMS.empty_data,
    departureTimeTextColor: TIMING_DEPARTURE_PRIMARY_COLOR,
    departureTimeContentColor: TIMING_DEPARTURE_PRIMARY_COLOR,
  };

  if (!departureFlight) {
    return {
      ...defaultDepartureTimeInfos,
      departureTimeTextColor: TIMING_ACRONYMS.empty_data,
      departureTimeContentColor: TIMING_ACRONYMS.empty_data,
    };
  }

  switch (turnaroundStatus) {
  case (CANCELED):
    return ({
      ...defaultDepartureTimeInfos,
      departureTimeTextColor: TIMING_ACRONYMS.empty_data,
      departureTimeContentColor: TIMING_ACRONYMS.empty_data,
    });

  case (IN_PROGRESS):
    return ({
      departureTimeText: TIMING_ACRONYMS.departure_text.all_doors_closed_target,
      departureTimeContent: allDoorsClosedTargetDateTime,
      departureTimeTextColor: TIMING_DEPARTURE_SECONDARY_COLOR,
      departureTimeContentColor: TIMING_DEPARTURE_SECONDARY_COLOR,
    });

  case (INCOMING):
    return ({
      ...defaultDepartureTimeInfos,
      departureTimeText: getFlightIncomingTimeText(departureFlight),
      departureTimeContent: getFlightIncomingContentText(departureFlight),
    });

  case (COMPLETED):
    return ({
      ...defaultDepartureTimeInfos,
      departureTimeText: TIMING_ACRONYMS.departure_text.actual_time_departure,
      departureTimeContent: departureFlight.actual_gate_departure_datetime,
    });

  default:
    return ({
      ...defaultDepartureTimeInfos,
    });
  }
}
