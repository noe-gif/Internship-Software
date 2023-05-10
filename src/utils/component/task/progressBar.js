import { TASK_EMPTY_TIMING, EMPTY_CLASSNAME } from 'src/constants/tasks/tasksConstant';

export const getAutoTimingIfExists = (autoTiming, actualTiming) => (
  autoTiming !== TASK_EMPTY_TIMING ? autoTiming : actualTiming
);

export const getAutoTimingBackgroundColorIfExists = (autoTiming, className) => (
  autoTiming !== TASK_EMPTY_TIMING ? className : EMPTY_CLASSNAME
);
