import React from 'react';

import AddInfos from 'src/components/tasks/addInfos/addInfos';
import OpenTaskComments from 'src/components/tasks/taskContent/openTaskComments';
import OpenTaskMessages from 'src/components/tasks/taskContent/openTaskMessages';
import TaskContentHeader from 'src/components/tasks/taskContent/taskContentHeader';
import TaskProgressBar from 'src/components/tasks/taskProgressBar';
import TaskTimingButtons from 'src/components/tasks/taskContent/taskTimingButtons';

import {
  extractStatusFromTask,
  extractTimingsFromTask,
} from 'src/utils/parsing/extractFromTask';

export default function TaskContent(props) {
  const {
    changeTaskIsApplicable,
    onClickTaskTiming,
    openTaskCommentsFunction,
    openTaskMessagesFunction,
    progressBarTimingStatus,
    resetProgressBarTimingStatus,
    task,
    updateTaskTiming,
  } = props;

  return (
    <>
      <TaskContentHeader
        changeTaskIsApplicable={changeTaskIsApplicable}
        isApplicable={task.is_applicable}
        taskId={task.id}
        taskName={task.name}
        taskDescription={{ start: task.start_description, end: task.end_description }}
        taskStatus={extractStatusFromTask(task)}
      />
      <TaskProgressBar
        task={task}
        updateTaskTiming={updateTaskTiming}
        resetProgressBarTimingStatus={resetProgressBarTimingStatus}
        progressBarTimingStatus={progressBarTimingStatus}
      />
      <TaskTimingButtons
        taskId={task.id}
        taskTimings={extractTimingsFromTask(task)}
        triggerTiming={onClickTaskTiming}
      />
      <AddInfos
        addInfos={task.task_additional_information}
        task={task}
      />
      <div className="taskBottomButtonWrapper">
        <div className="taskButtons">
          <OpenTaskComments
            numberOfComments={task.number_of_comments}
            openTaskCommentsFunction={openTaskCommentsFunction}
            taskId={task.id}
          />
          <OpenTaskMessages
            numberOfMessages={task.number_of_messages}
            openTaskMessagesFunction={openTaskMessagesFunction}
            taskId={task.id}
          />
        </div>
      </div>
    </>
  );
}
