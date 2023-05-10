import React, { useEffect } from 'react';

import DatePicker from 'src/components/modal/datePicker';

import taskProgressBarHooks from 'src/hooks/task/taskProgressBarHooks';
import { extractTimingsFromTask } from 'src/utils/parsing/extractFromTask';

import CompleteProgressBar from './taskProgressBar/completeProgressBar';
import EndOnlyProgressBar from './taskProgressBar/endOnlyProgressBar';

export default function TaskProgressBar(props) {
  const {
    task,
    updateTaskTiming,
    resetProgressBarTimingStatus,
    progressBarTimingStatus,
  } = props;

  const {
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
  } = taskProgressBarHooks(
    progressBarTimingStatus,
    resetProgressBarTimingStatus,
    task,
    updateTaskTiming,
  );

  useEffect(() => {
    initializeValue();
  }, [task, progressBarTimingStatus]);

  const displayCompleteProgressBarLine = () => (
    <>
      <CompleteProgressBar
        showDatePicker={showDatePicker}
        taskDateTimes={extractTimingsFromTask(task)}
        taskId={task.id}
        taskStatusColor={task.status_color}
        taskTimings={taskTimings}
      />
      {isDatePickerModalOpen && (
        <DatePicker
          dateTimingTriggerId={timingTriggerId}
          errorMessage={errorMessageTiming}
          initialDateValue={initialDateValue}
          initialTimingValue={initialTimingValue}
          onChangeDateToSend={onChangeTimingToSend}
          responseStatus={progressBarTimingStatus}
          showModal={showDatePicker}
        />
      )}
    </>
  );

  const displayEndOnlyProgressBarLine = () => (
    <>
      <EndOnlyProgressBar
        showDatePicker={showDatePicker}
        taskId={task.id}
        taskStatusColor={task.status_color}
        taskTimings={taskTimings}
      />
      {isDatePickerModalOpen && (
        <DatePicker
          dateTimingTriggerId={timingTriggerId}
          errorMessage={errorMessageTiming}
          initialDateValue={initialDateValue}
          initialTimingValue={initialTimingValue}
          onChangeDateToSend={onChangeTimingToSend}
          responseStatus={progressBarTimingStatus}
          showModal={showDatePicker}
        />
      )}
    </>
  );

  return hasStartTimingTask() ? displayCompleteProgressBarLine() : displayEndOnlyProgressBarLine();
}
