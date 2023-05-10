import React from 'react';

import { Switch } from '@mui/material';

import getTaskToPngFormat from 'src/utils/logic/tasks/getTaskToPngFormat';

import { useStyleToggle } from 'src/styles/muiToggleStyle';

import { isDescriptionEmpty } from 'src/utils/component/task/taskPopup';

import taskContentHeaderHook from 'src/hooks/task/taskContentHeaderHook';

import TaskPopup from 'src/components/tasks/taskContent/taskPopup';

export default function TaskContentHeader(props) {
  const {
    changeTaskIsApplicable,
    isApplicable,
    taskId,
    taskName,
    taskStatus,
    taskDescription,
  } = props;

  const {
    isOver,
    handlePopoverClose,
    handlePopoverOpen,
  } = taskContentHeaderHook();

  const classes = useStyleToggle();

  return (
    <div className="taskTitleWrapper">
      <img
        id={`${taskName}${taskId}Logo`}
        src={getTaskToPngFormat(taskName)}
        alt={`${taskName}${taskId}Logo`}
        className="taskLogo"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      />
      <TaskPopup
        isOver={isOver}
        open={isOver}
        isDescriptionEmpty={isDescriptionEmpty(taskDescription)}
        handlePopoverClose={handlePopoverClose}
        taskDescription={taskDescription}
      />
      <div className="taskTitle">
        <p
          id={`${taskName}${taskId}Name`}
          className="fontSizeDefault fontColorDefault taskTitleTypo"
        >
          {taskName}
        </p>
        <p
          id={`${taskName}${taskId}Status`}
          className="fontSizeDefault taskTitleTypo"
          style={{ color: taskStatus.statusColor }}
        >
          {taskStatus.status}
        </p>
      </div>
      <div className="taskHeaderRightPart">
        <Switch
          id={`${taskName}${taskId}Switch`}
          classes={classes}
          checked={isApplicable}
          onChange={changeTaskIsApplicable}
        />
      </div>
    </div>
  );
}
