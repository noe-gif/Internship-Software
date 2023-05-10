import { IN_PROGRESS } from 'src/types/FlightStatus';

export default function getTurnaroundAlertIcons(
  departureFlight,
  turnaroundStatus,
) {
  const alertIconsToReturn = [];

  if (turnaroundStatus !== IN_PROGRESS) {
    return [];
  } else {
    const estimatedDeparture = departureFlight?.estimated_gate_departure_datetime;
    const scheduledDeparture = departureFlight?.scheduled_time_departure_datetime;

    if (estimatedDeparture > scheduledDeparture) {
      alertIconsToReturn.push('DELAY');
    }

    return alertIconsToReturn;
  }
}
