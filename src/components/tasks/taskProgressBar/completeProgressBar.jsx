import React from 'react';

import { progressBarBackgroundColor } from 'src/utils/component/progressBar';

import calcProgressPercentage from 'src/utils/logic/tasks/calcProgressPercentage';

import { getAutoTimingIfExists, getAutoTimingBackgroundColorIfExists } from 'src/utils/component/task/progressBar';

import { AUTO_DATE_TIME_COMPLETE_BAR_CLASSNAME } from 'src/constants/tasks/tasksConstant';

export default function CompleteProgressBar(props) {
  const {
    showDatePicker,
    taskDateTimes,
    taskId,
    taskStatusColor,
    taskTimings,
  } = props;

  const percentageProgress = calcProgressPercentage(
    taskDateTimes.plannedStartDatetime,
    taskDateTimes.plannedEndDatetime,
  );

  const displayCompletePlannedTiming = () =>
    (
      <div className="taskPlannedTimingWrapper">
        <div className="taskPlannedTimingLeft">
          <p
            id={`taskPlannedStartTiming${taskId}`}
            className="taskPlannedTimingStartText"
          >
            {taskTimings.plannedStartTiming}
          </p>
        </div>
        <div className="taskPlannedTimingSpace" />
        <div className="taskPlannedTimingRight">
          <p
            id={`taskPlannedEndTiming${taskId}`}
            className="taskPlannedTimingEndText"
          >
            {taskTimings.plannedEndTiming}
          </p>
        </div>
      </div>
    );

  return (
    <>
      <div className="taskProgressWrapper">
        <div className="taskProgressBarTimeWrapper">
          <p
            id={`taskActualStartTiming${taskId}`}
            style={{ color: taskStatusColor }}
            onClick={() => showDatePicker(
              'start',
              getAutoTimingIfExists(
                taskTimings.autoStartTiming,
                taskTimings.actualStartTiming,
              ),
            )}
            className={`completeProgressBarActualStartDateTimeText 
            ${getAutoTimingBackgroundColorIfExists(taskTimings.autoStartTiming, AUTO_DATE_TIME_COMPLETE_BAR_CLASSNAME)}`} // eslint-disable-line
            aria-hidden="true"
          >
            {getAutoTimingIfExists(taskTimings.autoStartTiming, taskTimings.actualStartTiming)}
          </p>
        </div>
        <div className="taskProgressBarWrapper">
          <div
            className="taskProgressBar"
            style={{
              backgroundColor: progressBarBackgroundColor(taskDateTimes, taskStatusColor),
              width: `${percentageProgress}%`,
            }}
          >
            <span
              id={`taskEndDifferenceTiming${taskId}`}
              className="fontSizeDefaultBold taskProgressBarLabel"
            >
              {taskTimings.endDifference}
            </span>
          </div>
        </div>
        <div className="taskProgressBarTimeWrapper">
          <p
            id={`taskActualEndTiming${taskId}`}
            style={{ color: taskStatusColor }}
            onClick={() => showDatePicker(
              'end',
              getAutoTimingIfExists(taskTimings.autoEndTiming, taskTimings.actualEndTiming),
            )}
            className={`completeProgressBarActualEndDateTimeText 
            ${getAutoTimingBackgroundColorIfExists(taskTimings.autoEndTiming, AUTO_DATE_TIME_COMPLETE_BAR_CLASSNAME)}`} // eslint-disable-line
            aria-hidden="true"
          >
            {getAutoTimingIfExists(taskTimings.autoEndTiming, taskTimings.actualEndTiming)}
          </p>
        </div>
      </div>
      {displayCompletePlannedTiming()}
    </>
  );
}
