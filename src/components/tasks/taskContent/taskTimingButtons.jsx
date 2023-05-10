import React from 'react';

import TaskTimingButton from 'src/components/tasks/taskContent/taskTimingButton';

import {
  classNameEnableButtonStart,
  classNameEnableButtonSingleEnd,
} from 'src/utils/component/task';
import { DID_NOT_START, IN_PROGRESS, NOT_APPLICABLE } from 'src/types/TaskStatus';

import TASKS_TEXT from 'src/constants/tasks/tasksText.json';

export default function TaskTimingButtons(props) {
  const {
    taskTimings,
    taskId,
    triggerTiming,
  } = props;

  return (
    <div className="taskStartEndButtonsWrapper">
      <div className="taskButtons">
        {taskTimings.plannedStartDatetime && (
          <TaskTimingButton
            taskId={taskId}
            className={classNameEnableButtonStart(
              NOT_APPLICABLE,
              IN_PROGRESS,
              taskTimings.status,
              taskTimings.actualStartDatetime,
            )}
            label={TASKS_TEXT.infos.start}
            onClick={() => triggerTiming('start')}
          />
        )}
        <TaskTimingButton
          taskId={taskId}
          className={classNameEnableButtonSingleEnd(
            NOT_APPLICABLE,
            DID_NOT_START,
            taskTimings,
          )}
          label={TASKS_TEXT.infos.finish}
          onClick={() => triggerTiming('end')}
        />
      </div>
    </div>
  );
}
