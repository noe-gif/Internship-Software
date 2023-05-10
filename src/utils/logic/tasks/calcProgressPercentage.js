import dateStringToUTCDate from 'src/utils/logic/date/dateStringToUTCDate';

export default function calcProgressPercentage(plannedStartString, plannedEndString) {
  const plannedStartDate = dateStringToUTCDate(plannedStartString);
  const plannedEndDate = dateStringToUTCDate(plannedEndString);

  const timeStartDate = plannedStartDate.getTime();
  const timeEndDate = plannedEndDate.getTime();
  const timeActualDate = new Date().getTime();

  const total = timeEndDate - timeStartDate;

  const current = timeActualDate - timeStartDate;

  const percentage = (current / total) * 100;

  return (percentage > 100 || percentage < 0) ? 100 : Math.round(percentage);
}
