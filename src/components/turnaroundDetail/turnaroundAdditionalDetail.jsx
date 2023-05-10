import React from 'react';

import Comment from 'src/containers/tasks/commentContainer';
import Message from 'src/containers/tasks/messageContainer';
import Report from 'src/containers/report/reportContainer';
import Task from 'src/containers/tasks/taskContainer';

export default function TurnaroundAdditionalDetail(props) {
  const {
    handleCloseTurnaround,
    turnaround,
    elementsFromHook,
  } = props;

  const {
    closeComments,
    closeMessages,
    closeReadOnlyComments,
    componentSizeSplit,
    handleOpenReport,
    handleTaskSelection,
    hasCommentsOpen,
    hasMessageOpen,
    hasReadOnlyCommentsOpen,
    hasReportOpen,
    hasSelectedTask,
    openComments,
    openMessages,
    selectedTask,
  } = elementsFromHook;

  const selectWhichAdditionalViewToOpen = () => {
    if (hasReportOpen) {
      return (
        <Report
          handleCloseReport={handleOpenReport}
          turnaroundData={turnaround}
          componentSize={componentSizeSplit}
          handleCloseTurnaround={handleCloseTurnaround}
        />
      );
    } else if (hasSelectedTask) {
      return (
        <Task
          task={selectedTask}
          turnaround={turnaround}
          handleTaskSelection={handleTaskSelection}
          openTaskCommentsFunction={openComments}
          openTaskMessagesFunction={openMessages}
          componentSize={componentSizeSplit}
          handleCloseTurnaround={handleCloseTurnaround}
        />
      );
    } else if (hasReadOnlyCommentsOpen) {
      return (
        <Comment
          task={selectedTask}
          closeComments={closeReadOnlyComments}
          componentSize={componentSizeSplit}
          handleCloseTurnaround={handleCloseTurnaround}
          turnaround={turnaround}
        />
      );
    } else if (hasCommentsOpen) {
      return (
        <Comment
          task={selectedTask}
          closeComments={closeComments}
          componentSize={componentSizeSplit}
          handleCloseTurnaround={handleCloseTurnaround}
          turnaround={turnaround}
        />
      );
    } else if (hasMessageOpen) {
      return (
        <Message
          task={selectedTask}
          closeMessages={closeMessages}
          componentSize={componentSizeSplit}
          handleCloseTurnaround={handleCloseTurnaround}
          turnaround={turnaround}
        />
      );
    } else {
      return null;
    }
  };

  return (
    selectWhichAdditionalViewToOpen()
  );
}
