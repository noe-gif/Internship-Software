export default function scheduledDepartureTimeHook(
  departureFlightRescheduledDatetime,
  departureFlightScheduledDatetime,
) {
  const areRescheduledDatetimeAndScheduledDatetimeDifferent = () =>
    (departureFlightRescheduledDatetime && departureFlightRescheduledDatetime !== departureFlightScheduledDatetime);

  const getScheduledDepartureDatetimeText = (rescheduledDatetimeText, scheduledDatetimeText) => {
    if (areRescheduledDatetimeAndScheduledDatetimeDifferent()) {
      return rescheduledDatetimeText;
    } else {
      return scheduledDatetimeText;
    }
  };

  const getScheduledDepartureDatetimeContent = (rescheduledDatetimeContent, scheduledDatetimeContent) => {
    if (areRescheduledDatetimeAndScheduledDatetimeDifferent()) {
      return rescheduledDatetimeContent;
    } else {
      return scheduledDatetimeContent;
    }
  };

  return {
    getScheduledDepartureDatetimeContent,
    getScheduledDepartureDatetimeText,
  };
}
