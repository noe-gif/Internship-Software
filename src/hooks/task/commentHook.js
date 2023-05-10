import { useState } from 'react';

import { DEFAULT, LOADING } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';
import { EMPTY } from 'src/constants/conversation/conversation';

export default function commentHook(
  deleteComment,
  getTaskComments,
  selectedTasksDetails,
  sendTaskComment,
  task,
  taskCommentsRequestStatus,
  turnaround,
) {
  const [commentsStatus, setCommentsStatus] = useState(DEFAULT);
  const [filteredTask, setFilteredTask] = useState(task);

  const checkTasksCommentsStatus = (filteredTaskDetail) => {
    if (commentsStatus !== DEFAULT) {
      if (taskCommentsRequestStatus?.taskId === task.id && taskCommentsRequestStatus?.status !== commentsStatus) {
        setCommentsStatus(taskCommentsRequestStatus.status);
      }
    } else {
      getTaskComments(filteredTaskDetail);
      setCommentsStatus(LOADING);
    }
  };

  const checkTasksDetails = () => {
    const filteredTaskDetail = selectedTasksDetails.find((selectedTask) => selectedTask.id === task.id);

    if (filteredTaskDetail !== undefined) {
      setFilteredTask(filteredTaskDetail);

      checkTasksCommentsStatus(filteredTaskDetail);
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

  const handleSendComment = (event, conversationInputValue) => {
    event.preventDefault();

    const comment = conversationInputValue?.comment;
    const picture = conversationInputValue?.picture;
    const conversationInputValueData = picture !== EMPTY ? { comment, picture } : { comment };

    sendTaskComment({ taskId: task.id, data: conversationInputValueData });
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId);
  };

  return {
    checkTasksDetails,
    commentsStatus,
    filteredTask,
    handleDeleteComment,
    handleSendComment,
    updateTaskFromRefreshedTurnaround,
  };
}
