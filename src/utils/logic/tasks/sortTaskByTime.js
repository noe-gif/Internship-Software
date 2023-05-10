import { compareDates } from 'src/utils/logic/turnaround/sortTurnaroundByTime';
import dateStringToUTCDate from 'src/utils/logic/date/dateStringToUTCDate';

function getTaskDatetime(task) {
  if (task.planned_start_datetime) {
    return (task.planned_start_datetime);
  } else {
    return (task.planned_end_datetime);
  }
}

export default function sortTaskByTime(taskA, taskB) {
  if (!taskA || !taskB) {
    return 0;
  }

  const taskATimeToCompare = dateStringToUTCDate(getTaskDatetime(taskA));
  const taskBTimeToCompare = dateStringToUTCDate(getTaskDatetime(taskB));

  return (compareDates(taskATimeToCompare, taskBTimeToCompare));
}
