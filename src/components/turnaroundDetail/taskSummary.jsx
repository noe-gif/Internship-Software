import React from 'react';

import AddInfoCompletionStatus from 'src/components/tasks/addInfos/AddInfoCompletionStatus';
import IconCounter from 'src/components/fragment/iconCounter';

import { COMMENT_ICON } from 'src/constants/picturePath';
import TURNAROUND_DETAIL_TEXT from 'src/constants/turnaroundDetail/turnaroundDetailText.json';
import {
  LATE_DIFFERENCE_TO_DISPLAY_VALUE_STYLE,
  NOT_APPLICABLE_TASK_BACKGROUND_COLOR,
  ON_TIME_DIFFERENCE_TO_DISPLAY_VALUE_STYLE,
} from 'src/constants/tasks/tasksConstant';

import getTaskToPngFormat from 'src/utils/logic/tasks/getTaskToPngFormat';
import provideDateTiming from 'src/utils/logic/date/provideDateTiming';
import provideTimeDifference from 'src/utils/logic/date/provideTimeDifference';
import secondsToHHMMFormat from 'src/utils/logic/date/secondsToHHMMFormat';

import { getTaskAutoValueIfExists } from 'src/utils/component/task';
import useTimezoneFilter from 'src/hooks/filter/useTimezoneFilter';

export default function TaskSummary(props) {
  const {
    componentSize,
    openReadOnlyComments,
    selectTaskFunction,
    task,
  } = props;

  const { state: { selectedTimezone } } = useTimezoneFilter();
  const cursor = 'pointer';
  const displayTimeDifferenceWithColorContext = (differenceToDisplay) => {
    if (differenceToDisplay.includes('+')) {
      return (
        <p
          id={`taskSummaryDifferenceTimingLate${task.id}`}
          className={LATE_DIFFERENCE_TO_DISPLAY_VALUE_STYLE}
        >
          {differenceToDisplay}
        </p>
      );
    } else {
      return (
        <p
          id={`taskSummaryDifferenceTimingOnTime${task.id}`}
          className={ON_TIME_DIFFERENCE_TO_DISPLAY_VALUE_STYLE}
        >
          {differenceToDisplay}
        </p>
      );
    }
  };

  const displayCommentsIcon = () => {
    if (task.number_of_comments !== 0) {
      return (
        <IconCounter
          counter={task.number_of_comments}
          handleIconClick={async () => { await selectTaskFunction(task, true); await openReadOnlyComments(); }}
          icon={COMMENT_ICON}
        />
      );
    } else {
      return null;
    }
  };

  const taskTiming = {
    startTiming: provideDateTiming(task.planned_start_datetime, '-', selectedTimezone),
    endTiming: provideDateTiming(task.planned_end_datetime, '-', selectedTimezone),
    processTime: secondsToHHMMFormat(task.duration),
    startDifference: provideTimeDifference(
      task.planned_start_datetime,
      getTaskAutoValueIfExists(task.auto_start_datetime, task.actual_start_datetime),
      '',
    ),
    endDifference: provideTimeDifference(
      task.planned_end_datetime,
      getTaskAutoValueIfExists(task.auto_end_datetime, task.actual_end_datetime),
      '',
    ),
  };

  const renderProcessTimeTaskLargeView = () => (
    componentSize === TURNAROUND_DETAIL_TEXT.componentSize.large && (
      <div className={`turnaroundTaskListHeaderCentralRight-${componentSize}`}>
        <p
          id={`turnaroundTaskLineProcessTime${task.id}`}
          className="fontSizeDefault fontColorDefault"
        >
          {taskTiming.processTime}
        </p>
      </div>
    )
  );

  const isTaskApplicable = () => (
    task.is_applicable ? null : NOT_APPLICABLE_TASK_BACKGROUND_COLOR
  );

  return (
    task ? (
      <div
        style={{ backgroundColor: isTaskApplicable() }}
        className={`turnaroundTaskLineWrapper-${componentSize}`}
      >
        <div
          className={`turnaroundTaskListHeaderLeftPart-${componentSize}`}
          onClick={() => { selectTaskFunction(task); }}
          role="button"
          aria-hidden="true"
          style={{ cursor }}
        >
          <div className={`turnaroundTaskLineLogoContainer-${componentSize}`}>
            <img
              src={getTaskToPngFormat(task.name)}
              alt=""
              className={`turnaroundTaskLineLogo-${componentSize}`}
            />
          </div>
          <div className={`turnaroundTaskLineTitleContainer-${componentSize}`}>
            <p
              id={`turnaroundTaskLineTitle${task.id}`}
              className={`fontSizeDefaultBold fontColorDefault turnaroundTaskTitle-${componentSize}`}
            >
              {task.name}
            </p>
          </div>
          <div className="addInfoCompletionStatusWrapper">
            <AddInfoCompletionStatus task={task} componentSize={componentSize} />
          </div>
        </div>
        <div
          className={`turnaroundTaskListHeaderCentralPart-${componentSize}`}
          onClick={() => { selectTaskFunction(task); }}
          role="button"
          aria-hidden="true"
          style={{ cursor }}
        >
          <div className={`turnaroundTaskListHeaderCentral-${componentSize}`}>
            <p
              id={`turnaroundTaskLineStartTiming${task.id}`}
              className={`fontSizeDefault fontColorDefault turnaroundTaskInfosText-${componentSize}`}
            >
              {taskTiming.startTiming}
            </p>
            {displayTimeDifferenceWithColorContext(taskTiming.startDifference)}
          </div>
          <div className={`turnaroundTaskListHeaderCentral-${componentSize}`}>
            <p
              id={`turnaroundTaskLineEndTiming${task.id}`}
              className={`fontSizeDefault fontColorDefault turnaroundTaskInfosText-${componentSize}`}
            >
              {taskTiming.endTiming}
            </p>
            {displayTimeDifferenceWithColorContext(taskTiming.endDifference)}
          </div>
          {renderProcessTimeTaskLargeView()}
        </div>
        <div className={`turnaroundTaskListHeaderRightPart-${componentSize}`}>
          <div
            className={`fontSizeDefault turnaroundTaskListStatus-${componentSize}`}
            onClick={() => { selectTaskFunction(task); }}
            role="button"
            aria-hidden="true"
            style={{ cursor }}
          >
            <p
              id={`turnaroundTaskLineStatus${task.id}`}
              className={`turnaroundTaskInfosText-${componentSize}`}
              style={{ color: task.status_color }}
            >
              {task.status}
            </p>
          </div>
          <div className={`turnaroundTaskListHeaderRightSpace-${componentSize}`}>
            {displayCommentsIcon()}
          </div>
        </div>
      </div>
    ) : null
  );
}
