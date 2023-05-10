import { PROGRESS_BAR_DEFAULT_COLOR } from 'src/constants/tasks/tasksConstant';

export function isActualEndDatetimeNotEmpty(id, task, formattedDateTiming) {
  if (id === 'start' && task.actual_end_datetime !== null && formattedDateTiming === null) {
    return true;
  }
  return false;
}

export function isFormattedDateHasRealValue(formattedDate) {
  if (formattedDate.timing !== null && (formattedDate.timing !== '-:-'
  && formattedDate.date !== 'yyyy-mm-dd')) {
    return true;
  }
  return false;
}

export function stopTimingIsLowerThanStartTiming(id, actualStartDateTime, datetimeTimingTrigger) {
  if (id === 'end' && actualStartDateTime
  && (datetimeTimingTrigger.getTime() < new Date(actualStartDateTime).getTime())) {
    return true;
  }
  return false;
}

export function startTimingIsHigherThanStopTiming(id, actualEndDateTime, datetimeTimingTrigger) {
  if (id === 'start' && actualEndDateTime
  && (datetimeTimingTrigger > new Date(actualEndDateTime).getTime())) {
    return true;
  }
  return false;
}

export function progressBarBackgroundColor(task, taskStatusColor) {
  return task.actualEndDatetime && task.actualStartDatetime ? taskStatusColor : PROGRESS_BAR_DEFAULT_COLOR;
}
