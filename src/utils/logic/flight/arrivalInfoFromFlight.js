import {
  IN_PROGRESS,
  CANCELED,
  INCOMING,
  COMPLETED,
} from 'src/types/FlightStatus';

import TIMING_ACRONYMS from 'src/constants/timingAcronyms.json';
import { TIMING_ARRIVAL_PRIMARY_COLOR } from 'src/constants/colors';

function getFlightIncomingTimeText(arrivalFlight) {
  const {
    estimated_gate_arrival_datetime: estimatedGateArrivalDateTime,
  } = arrivalFlight;

  if (estimatedGateArrivalDateTime) {
    return `${TIMING_ACRONYMS.arrival_text.estimated_time_arrival}`;
  } else {
    return TIMING_ACRONYMS.empty_data;
  }
}

function getFlightIncomingContentText(arrivalFlight) {
  const {
    estimated_gate_arrival_datetime: estimatedGateArrivalDateTime,
  } = arrivalFlight;

  if (estimatedGateArrivalDateTime) {
    return estimatedGateArrivalDateTime;
  } else {
    return TIMING_ACRONYMS.empty_data;
  }
}

export default function arrivalInfoFromFlight(
  arrivalFlight,
  turnaroundStatus,
) {
  const defaultArrivalTimeInfos = {
    arrivalTimeText: TIMING_ACRONYMS.empty_data,
    arrivalTimeContent: TIMING_ACRONYMS.empty_data,
    arrivalTimeTextColor: TIMING_ARRIVAL_PRIMARY_COLOR,
    arrivalTimeContentColor: TIMING_ARRIVAL_PRIMARY_COLOR,
  };

  if (!arrivalFlight) {
    return {
      ...defaultArrivalTimeInfos,
      arrivalTimeTextColor: TIMING_ACRONYMS.empty_data,
      arrivalTimeContentColor: TIMING_ACRONYMS.empty_data,
    };
  }

  switch (turnaroundStatus) {
  case (CANCELED):
    return ({
      ...defaultArrivalTimeInfos,
      arrivalTimeTextColor: TIMING_ACRONYMS.empty_data,
      arrivalTimeContentColor: TIMING_ACRONYMS.empty_data,
    });

  case (IN_PROGRESS):
    return ({
      ...defaultArrivalTimeInfos,
      arrivalTimeText: TIMING_ACRONYMS.arrival_text.actual_time_arrival,
      arrivalTimeContent: arrivalFlight.actual_gate_arrival_datetime,
    });

  case (INCOMING):
    return ({
      ...defaultArrivalTimeInfos,
      arrivalTimeText: getFlightIncomingTimeText(arrivalFlight),
      arrivalTimeContent: getFlightIncomingContentText(arrivalFlight),
    });

  case (COMPLETED):
    return ({
      ...defaultArrivalTimeInfos,
      arrivalTimeText: TIMING_ACRONYMS.arrival_text.actual_time_arrival,
      arrivalTimeContent: arrivalFlight.actual_gate_arrival_datetime,
    });

  default:
    return ({
      ...defaultArrivalTimeInfos,
    });
  }
}
