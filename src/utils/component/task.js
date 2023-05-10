import { EMPTY_CLASSNAME } from 'src/constants/tasks/tasksConstant';

export function classNameEnableButtonStart(firstStatus, secondStatus, filteredTaskStatus, filteredTaskTiming) {
  return filteredTaskStatus === firstStatus || filteredTaskStatus === secondStatus || filteredTaskTiming
    ? 'taskButton-disabled'
    : 'taskButton';
}

export function classNameEnableButtonSingleEnd(firstStatus, secondStatus, filteredTask) {
  if (filteredTask.status === firstStatus
    || (filteredTask.status === secondStatus && filteredTask.plannedStartDatetime)
    || filteredTask.actualEndDatetime) {
    return 'taskButton-disabled';
  }
  return 'taskButton';
}

export function isPostTaskTimingPossible(dictKey, filteredTask) {
  if ((dictKey === 'start' && !filteredTask.actual_start_datetime && filteredTask.is_applicable)
    || (dictKey === 'end' && !filteredTask.actual_end_datetime && filteredTask.is_applicable)) {
    return true;
  }
  return false;
}

export const getTaskBackgroundColorIfAutoValue = (autoValue, className) => (
  autoValue ? className : EMPTY_CLASSNAME
);

export function getTaskAutoValueIfExists(autoValue, actualValue) {
  return autoValue || actualValue;
}
