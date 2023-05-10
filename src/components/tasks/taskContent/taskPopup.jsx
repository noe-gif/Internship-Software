import * as React from 'react';

import { checkIfEndOnlyTask } from 'src/utils/component/task/taskPopup';

import {
  SHOW_TASK_POPUP_DESCRIPTION,
  HIDE_TASK_POPUP_DESCRIPTION,
} from 'src/constants/tasks/tasksConstant';

import TaskPopupDescription from 'src/components/tasks/taskContent/taskPopupDescription';

export default function TaskPopup(props) {
  const {
    handlePopoverClose,
    open,
    taskDescription,
    isDescriptionEmpty,
  } = props;

  return (
    isDescriptionEmpty
      ? (
        <></>
      )
      : (
        <div
          onClose={handlePopoverClose}
          className="taskPopupDescription"
          style={{
            display: open
              ? HIDE_TASK_POPUP_DESCRIPTION
              : SHOW_TASK_POPUP_DESCRIPTION,
          }}
        >
          <div className="taskPopupDescriptionContentWrapper fontSizeSmall">
            {checkIfEndOnlyTask(taskDescription).map((taskDescriptionSplit) => (
              <TaskPopupDescription
                key={taskDescriptionSplit.id}
                title={taskDescriptionSplit.title}
                description={taskDescriptionSplit.description}
              />
            ))}
          </div>
        </div>
      )
  );
}
