import { useState } from 'react';

import { isPostTaskTimingPossible } from 'src/utils/component/task';

import { acronymTaskTiming } from 'src/constants/tasks/tasksConstant';
import { SUCCESS } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

export default function taskHooks(
  closeTask,
  handleCloseTurnaround,
  handleTaskSelection,
  updateTaskApplicableValue,
  updateTaskTiming,
  selectedTasksDetails,
  task,
) {
  const [endTaskTiming, setEndTaskTiming] = useState(null);
  const [filteredTask, setFilteredTask] = useState(null);
  const [startTaskTiming, setStartTaskTiming] = useState(null);

  const setInitialTaskTiming = () => {
    const filteredTaskDetail = selectedTasksDetails.filter((selectedTask) => selectedTask.id === task.id);

    if (filteredTaskDetail.length > 0) {
      if (filteredTaskDetail[0].actual_start_datetime !== startTaskTiming) {
        setStartTaskTiming(filteredTaskDetail[0].actual_start_datetime);
      } else if (filteredTaskDetail[0].actual_end_datetime !== endTaskTiming) {
        setEndTaskTiming(filteredTaskDetail[0].actual_end_datetime);
      }
    }
  };

  const handleTaskClose = () => {
    const selectedTasksCopy = [...selectedTasksDetails];
    const filteredSelectedTasksCopy = selectedTasksCopy.filter((selectedTask) => selectedTask.id !== task.id);

    closeTask(filteredSelectedTasksCopy);
  };

  const backToTurnaroundView = () => {
    handleTaskSelection(null);
    handleTaskClose();
  };

  const closeTaskContent = (turnaroundData) => {
    handleCloseTurnaround(turnaroundData);
    handleTaskClose();
  };

  const switchOnChange = (event) => {
    if (event.target.checked != null && event.target.checked !== '') {
      updateTaskApplicableValue({ data: { is_applicable: event.target.checked }, taskId: filteredTask.id });
    }
    return null;
  };

  const onClickTaskTiming = (dictKey) => {
    const actualDate = new Date();
    const postTask = {};
    const taskTiming = acronymTaskTiming[dictKey];

    if (isPostTaskTimingPossible(dictKey, filteredTask)) {
      postTask[taskTiming] = actualDate;
      updateTaskTiming({ task: postTask, taskId: filteredTask.id });
    }
  };

  const extractUpdatedTaskFromTurnaround = (updatedTurnaroundData, taskDetailStatus) => {
    const actualTaskStatus = taskDetailStatus.find((taskStatus) => taskStatus.taskId === task.id);

    if (actualTaskStatus?.status === SUCCESS) {
      const turnaroundTasks = updatedTurnaroundData.normal_tasks_above_wing
        .concat(updatedTurnaroundData.normal_tasks_below_wing);

      const taskFromTurnaround = turnaroundTasks.find(
        (positioningTask) => positioningTask.id === task.id,
      );

      const updatedTask = { ...filteredTask, ...taskFromTurnaround };

      if (updatedTask && filteredTask) {
        setFilteredTask(updatedTask);
      }
    }
  };

  return {
    backToTurnaroundView,
    closeTaskContent,
    extractUpdatedTaskFromTurnaround,
    filteredTask,
    onClickTaskTiming,
    setFilteredTask,
    setInitialTaskTiming,
    switchOnChange,
  };
}
