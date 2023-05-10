import { useState } from 'react';

import { DEFAULT, LOADING } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

export default function messageHook(
  getTaskMessages,
  selectedTasksDetails,
  task,
  taskMessagesRequestStatus,
  turnaround,
) {
  const [messagesStatus, setMessagesStatus] = useState(DEFAULT);
  const [filteredTask, setFilteredTask] = useState(task);

  const checkTasksMessagesStatus = (filteredTaskDetail) => {
    if (messagesStatus !== DEFAULT) {
      if (taskMessagesRequestStatus?.taskId === task.id && taskMessagesRequestStatus?.status !== messagesStatus) {
        setMessagesStatus(taskMessagesRequestStatus.status);
      }
    } else {
      getTaskMessages(filteredTaskDetail);
      setMessagesStatus(LOADING);
    }
  };

  const checkSelectedTaskDetails = () => {
    const filteredTaskDetail = selectedTasksDetails.find((selectedTask) => selectedTask.id === task.id);

    if (filteredTaskDetail !== undefined) {
      setFilteredTask(filteredTaskDetail);

      checkTasksMessagesStatus(filteredTaskDetail);
    }
  };

  const updateTaskFromRefreshedTurnaround = () => {
    const filteredTaskDetail = selectedTasksDetails.find((selectedTask) => selectedTask.id === task.id);

    if (filteredTaskDetail !== undefined) {
      const turnaroundTasks = turnaround.normal_tasks_above_wing
        .concat(turnaround.normal_tasks_below_wing);

      const taskFromTurnaround = turnaroundTasks.find(
        (positioningTask) => positioningTask.id === task.id,
      );

      setFilteredTask({ ...filteredTaskDetail, ...taskFromTurnaround });
    }
  };

  return {
    checkSelectedTaskDetails,
    filteredTask,
    messagesStatus,
    updateTaskFromRefreshedTurnaround,
  };
}
