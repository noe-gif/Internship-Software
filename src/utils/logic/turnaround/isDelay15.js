export const validDelay15Color = 'green';
export const notValidDelay15Color = 'red';
export const maximalIntervalTime = 900000;

export function isDelay15(departureFlight) {
  if (!departureFlight?.actual_gate_departure_datetime || !departureFlight?.std) {
    return false;
  }

  const { actual_gate_departure_datetime: actualDepartureDateTime, std: scheduledDepartureDateTime } = departureFlight;

  if (actualDepartureDateTime > scheduledDepartureDateTime) {
    return true;
  } else {
    return false;
  }
}

export function getDelay15Color(departureFlight) {
  if (!departureFlight?.actual_gate_departure_datetime || !departureFlight?.std) {
    return validDelay15Color;
  }

  const { actual_gate_departure_datetime: actualDepartureDateTime, std: scheduledDepartureDateTime } = departureFlight;

  if (Date.parse(actualDepartureDateTime) - Date.parse(scheduledDepartureDateTime) > maximalIntervalTime) {
    return notValidDelay15Color;
  } else {
    return validDelay15Color;
  }
}
