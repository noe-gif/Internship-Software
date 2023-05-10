import React, { useEffect, useState } from 'react';

import Loading from 'src/components/loading';
import TaskContent from 'src/components/tasks/taskContent/taskContent';
import TaskHeader from 'src/components/header/taskHeader';

import { extractFlightsInformationFromTurnaround } from 'src/utils/parsing/extractFromTurnaround';
import useEffectTaskLogic from 'src/utils/logic/tasks/useEffectTaskLogic';

import { DEFAULT, FAIL } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

import taskHooks from 'src/hooks/task/taskHooks';

import 'src/styles/Task.css';

export default function Task(props) {
  const {
    closeTask,
    componentSize,
    getTaskDetail,
    handleCloseTurnaround,
    openTaskCommentsFunction,
    openTaskMessagesFunction,
    handleTaskSelection,
    progressBarTimingStatus,
    resetProgressBarTimingStatus,
    resetTaskTimingStatus,
    selectedTasksDetails,
    task,
    taskDetailStatus,
    taskTimingStatus,
    turnaround,
    updateTaskApplicableValue,
    updateTaskTiming,
  } = props;

  const {
    backToTurnaroundView,
    closeTaskContent,
    extractUpdatedTaskFromTurnaround,
    filteredTask,
    onClickTaskTiming,
    setFilteredTask,
    setInitialTaskTiming,
    switchOnChange,
  } = taskHooks(
    closeTask,
    handleCloseTurnaround,
    handleTaskSelection,
    updateTaskApplicableValue,
    updateTaskTiming,
    selectedTasksDetails,
    task,
  );

  const [timingStatus, setTimingStatus] = useState(DEFAULT);

  useEffect(() => {
    useEffectTaskLogic(taskDetailStatus, task, selectedTasksDetails, getTaskDetail, setFilteredTask);
    setInitialTaskTiming();
  }, [selectedTasksDetails, taskDetailStatus]);

  useEffect(() => {
    extractUpdatedTaskFromTurnaround(turnaround, taskDetailStatus);
  }, [turnaround]);

  useEffect(() => {
    if (taskTimingStatus.status !== timingStatus) {
      if (taskTimingStatus.status === FAIL) {
        setInitialTaskTiming();
      }
      resetTaskTimingStatus();
      setTimingStatus(taskTimingStatus.status);
    }
  }, [taskTimingStatus]);

  return (
    <div className="taskWrapper">
      <TaskHeader
        backViewFunction={backToTurnaroundView}
        closeTurnaroundFunction={closeTaskContent}
        componentSize={componentSize}
        turnaroundId={turnaround.id}
        turnaroundFlights={extractFlightsInformationFromTurnaround(turnaround)}
      />
      {filteredTask ? (
        <>
          <TaskContent
            changeTaskIsApplicable={switchOnChange}
            onClickTaskTiming={onClickTaskTiming}
            openTaskCommentsFunction={openTaskCommentsFunction}
            openTaskMessagesFunction={openTaskMessagesFunction}
            progressBarTimingStatus={progressBarTimingStatus}
            resetProgressBarTimingStatus={resetProgressBarTimingStatus}
            task={filteredTask}
            updateTaskTiming={updateTaskTiming}
          />
        </>
      ) : (
        <div className="taskLoader">
          <Loading />
        </div>
      )}
    </div>
  );
}
