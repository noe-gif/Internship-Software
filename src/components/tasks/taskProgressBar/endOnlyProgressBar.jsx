import React from 'react';

import {
  POSITIVE_DIFFERENCE_INDICATOR,
  AUTO_END_DATE_TIME_END_ONLY_BAR_CLASSNAME,
} from 'src/constants/tasks/tasksConstant';

import { getAutoTimingIfExists, getAutoTimingBackgroundColorIfExists } from 'src/utils/component/task/progressBar';

export default function EndOnlyProgressBar(props) {
  const {
    showDatePicker,
    taskId,
    taskStatusColor,
    taskTimings,
  } = props;

  const isPositiveDifference = () => (taskTimings.endDifference.includes(POSITIVE_DIFFERENCE_INDICATOR));

  const displayPositiveTimingDifference = () => (
    <p
      id={`task${taskId}PositiveDifferenceId`}
      className="fontSizeDefaultBold taskEndOnlyLineText"
      style={{ color: taskStatusColor }}
    >
      {taskTimings.endDifference}
    </p>
  );

  const displayNegativeTimingDifference = () => (
    <p
      id={`task${taskId}NegativeDifferenceId`}
      className="fontSizeDefaultBold taskEndOnlyLineText"
      style={{ color: taskStatusColor }}
    >
      {taskTimings.endDifference}
    </p>
  );

  return (
    <div className="taskEndOnlyProgressWrapper">
      <div className="fontSizeDefault taskEndOnlyTextWrapper">
        <p
          id={`taskActualEndTiming${taskId}`}
          style={{ color: taskStatusColor }}
          onClick={() => showDatePicker(
            'end',
            getAutoTimingIfExists(taskTimings.autoEndTiming, taskTimings.actualEndTiming),
          )}
          aria-hidden="true"
          className={`taskEndOnlyText 
          ${getAutoTimingBackgroundColorIfExists(
      taskTimings.autoEndTiming,
      AUTO_END_DATE_TIME_END_ONLY_BAR_CLASSNAME,
    )}`}
        >
          {getAutoTimingIfExists(taskTimings.autoEndTiming, taskTimings.actualEndTiming)}
        </p>
      </div>
      <div className="taskEndOnlyLineWrapper">
        <div className="taskEndOnlyLineTextWrapperLeft">
          {!isPositiveDifference() && displayNegativeTimingDifference()}
        </div>
        <div className="taskEndOnlyLineCenter" style={{ backgroundColor: taskStatusColor }} />
        <div className="taskEndOnlyLineTextWrapperRight">
          {isPositiveDifference() && displayPositiveTimingDifference()}
        </div>
      </div>
      <div className="taskEndOnlyTextWrapper">
        <p
          id={`taskPlannedEndTiming${taskId}`}
          className="fontSizeDefault taskPlannedTimingText"
        >
          {taskTimings.plannedEndTiming}
        </p>
      </div>
    </div>
  );
}
