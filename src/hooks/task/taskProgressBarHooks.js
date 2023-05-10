import { useState } from 'react';

import {
  TASK_EMPTY_DIFFERENCE_TIMING,
  TASK_EMPTY_TIMING,
  TASK_PROGRESS_BAR_TIMING_TARGET,
  acronymTaskTiming,
} from 'src/constants/tasks/tasksConstant';
import {
  DEFAULT,
  FAIL,
} from 'src/constants/turnaroundDetail/turnaroundDetailTimings';
import DATE_PICKER_TEXT from 'src/constants/datePicker/datePickerText.json';

import {
  formatDateToYYYYMMDD,
  formatDatePickerDateTime,
} from 'src/utils/logic/date/formattedDate';
import { convertFormattedDateToUTCDate, isDatetimeError } from 'src/utils/logic/datePicker/checkIsDateTimeError';
import {
  isActualEndDatetimeNotEmpty,
  isFormattedDateHasRealValue,
  startTimingIsHigherThanStopTiming,
  stopTimingIsLowerThanStartTiming,
} from 'src/utils/component/progressBar';
import provideDateTiming from 'src/utils/logic/date/provideDateTiming';
import provideTimeDifference from 'src/utils/logic/date/provideTimeDifference';
import useTimezoneFilter from 'src/hooks/filter/useTimezoneFilter';

export default function taskProgressBarHooks(
  progressBarTimingStatus,
  resetProgressBarTimingStatus,
  task,
  updateTaskTiming,
) {
  const { state: { selectedTimezone } } = useTimezoneFilter();
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);
  const [timingTriggerId, setTimingTriggerId] = useState('');
  const [initialTimingValue, setInitialTimingValue] = useState('');
  const [initialDateValue, setInitialDateValue] = useState('');
  const [errorMessageTiming, setErrorMessageTiming] = useState('');
  const [timingStatus, setTimingStatus] = useState(DEFAULT);

  const taskTimings = {
    plannedStartTiming: provideDateTiming(task.planned_start_datetime, TASK_EMPTY_TIMING, selectedTimezone),
    plannedEndTiming: provideDateTiming(task.planned_end_datetime, TASK_EMPTY_TIMING, selectedTimezone),
    actualStartTiming: provideDateTiming(task.actual_start_datetime, TASK_EMPTY_TIMING, selectedTimezone),
    actualEndTiming: provideDateTiming(task.actual_end_datetime, TASK_EMPTY_TIMING, selectedTimezone),
    endDifference: provideTimeDifference(
      task.planned_end_datetime,
      task.actual_end_datetime,
      TASK_EMPTY_DIFFERENCE_TIMING,
    ),
    autoStartTiming: provideDateTiming(task.auto_start_datetime, TASK_EMPTY_TIMING, selectedTimezone),
    autoEndTiming: provideDateTiming(task.auto_end_datetime, TASK_EMPTY_TIMING, selectedTimezone),
  };
  const timingBlock = ['start', 'end'];

  const hasStartTimingTask = () => (task.planned_start_datetime);

  const showDatePicker = (id, dateValue) => {
    setIsDatePickerModalOpen(!isDatePickerModalOpen);
    setTimingTriggerId(id);
    setInitialTimingValue(dateValue);
    if (id === 'start') {
      setInitialDateValue(formatDateToYYYYMMDD(task.actual_start_datetime, selectedTimezone));
    } else {
      setInitialDateValue(formatDateToYYYYMMDD(task.actual_end_datetime, selectedTimezone));
    }
    resetProgressBarTimingStatus();
    setErrorMessageTiming('');
  };

  const updateProgressBarTiming = (formattedDate, idTriggerValue) => {
    const postTask = {};
    const progressBarTiming = acronymTaskTiming[idTriggerValue];

    postTask[progressBarTiming] = formatDatePickerDateTime(formattedDate);
    updateTaskTiming({ task: postTask, taskId: task.id });
  };

  const progressBarError = (id, formattedDate) => {
    if (isActualEndDatetimeNotEmpty(id, task, formattedDate.timing)) {
      setErrorMessageTiming(DATE_PICKER_TEXT.error_messages.end_not_empty);
      return true;
    } else if (isFormattedDateHasRealValue(formattedDate)) {
      const formatDateChangeToUTC = convertFormattedDateToUTCDate(formattedDate);

      if (stopTimingIsLowerThanStartTiming(id, task.actual_start_datetime, formatDateChangeToUTC)) {
        setErrorMessageTiming(DATE_PICKER_TEXT.error_messages.end_lower_start);
        return true;
      } else if (startTimingIsHigherThanStopTiming(id, task.actual_end_datetime, formatDateChangeToUTC)) {
        setErrorMessageTiming(DATE_PICKER_TEXT.error_messages.start_higher_end);
        return true;
      }
    }
    setErrorMessageTiming('');
    return false;
  };

  const onChangeTimingToSend = (formattedDate, id) => {
    if (progressBarError(id, formattedDate)) {
      return null;
    } else if (isDatetimeError(
      formattedDate,
      id,
      setErrorMessageTiming,
      timingBlock,
      task,
      TASK_PROGRESS_BAR_TIMING_TARGET,
    )) {
      return null;
    }
    updateProgressBarTiming(formattedDate, id);
    return null;
  };

  const initializeValue = () => {
    if (progressBarTimingStatus.status !== timingStatus) {
      setTimingStatus(progressBarTimingStatus.status);
      if (progressBarTimingStatus.status !== FAIL) {
        resetProgressBarTimingStatus();
      }
    }
  };

  return {
    errorMessageTiming,
    hasStartTimingTask,
    initialDateValue,
    initializeValue,
    initialTimingValue,
    isDatePickerModalOpen,
    onChangeTimingToSend,
    showDatePicker,
    taskTimings,
    timingTriggerId,
  };
}
