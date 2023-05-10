export default function scheduledArrivalTimeHook(arrivalFlightRescheduledDatetime, arrivalFlightScheduledDatetime) {
  const areRescheduledDatetimeAndScheduledDatetimeDifferent = () =>
    (arrivalFlightRescheduledDatetime && arrivalFlightRescheduledDatetime !== arrivalFlightScheduledDatetime);

  const getScheduledArrivalDatetimeText = (rescheduledDatetimeText, scheduledDatetimeText) => {
    if (areRescheduledDatetimeAndScheduledDatetimeDifferent()) {
      return rescheduledDatetimeText;
    } else {
      return scheduledDatetimeText;
    }
  };

  const getScheduledArrivalDatetimeContent = (rescheduledDatetimeContent, scheduledDatetimeContent) => {
    if (areRescheduledDatetimeAndScheduledDatetimeDifferent()) {
      return rescheduledDatetimeContent;
    } else {
      return scheduledDatetimeContent;
    }
  };

  return {
    getScheduledArrivalDatetimeContent,
    getScheduledArrivalDatetimeText,
  };
}
