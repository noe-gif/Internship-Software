export function checkArrivalDate(flightInfos) {
  if (flightInfos.actual_gate_arrival_datetime) {
    return flightInfos.actual_gate_arrival_datetime;
  } else if (flightInfos.estimated_gate_arrival_datetime) {
    return flightInfos.estimated_gate_arrival_datetime;
  } else {
    return flightInfos.rescheduled_time_arrival_datetime
      ? flightInfos.rescheduled_time_arrival_datetime
      : flightInfos.scheduled_time_arrival_datetime;
  }
}

export function checkDepartureDate(flightInfos) {
  if (flightInfos.actual_gate_departure_datetime) {
    return flightInfos.actual_gate_departure_datetime;
  } else if (flightInfos.estimated_gate_departure_datetime) {
    return flightInfos.estimated_gate_departure_datetime;
  } else {
    return flightInfos.rescheduled_time_departure_datetime
      ? flightInfos.rescheduled_time_departure_datetime
      : flightInfos.scheduled_time_departure_datetime;
  }
}
