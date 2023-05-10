import React from 'react';

import extractCompleteTasks from 'src/utils/logic/report/extractCompleteTasks';

import extractSortedTaskList from 'src/utils/logic/report/extractSortedTaskList';
import provideDateTiming from 'src/utils/logic/date/provideDateTiming';

import { REPORT_TURNAROUND_INFO_EMPTY } from 'src/constants/report/reportConstant';
import REPORT_TEXT from 'src/constants/report/reportText.json';
import useTimezoneFilter from 'src/hooks/filter/useTimezoneFilter';

export default function ReportTasksPart(props) {
  const {
    turnaroundReportFormat,
    turnaroundCompleteInfos,
    hasLoadReport,
  } = props;

  const filteredTaskList = extractCompleteTasks(turnaroundReportFormat?.turnaroundReport?.turnaround_task_fields);
  const { state: { selectedTimezone } } = useTimezoneFilter();

  const concatTurnaroundTasks = () => {
    const {
      turnaroundInfos: {
        normal_tasks_above_wing: normalTasksAboveWing,
        normal_tasks_below_wing: normalTasksBelowWing,
      },
    } = turnaroundCompleteInfos;

    return (normalTasksAboveWing.concat(normalTasksBelowWing));
  };

  const renderTaskTiming = (timing, keyIndex) =>
    (
      <div className="reportTaskLineTimingWrapper" key={keyIndex}>
        <p className="fontSizeDefault fontColorDefault reportTaskLineTiming">
          {timing}
        </p>
      </div>
    );

  const renderTaskTimingList = (taskInfo) =>
    (
      taskInfo.taskTimings.map((timing, index) =>
        renderTaskTiming(
          provideDateTiming(timing, REPORT_TURNAROUND_INFO_EMPTY, selectedTimezone),
          `${taskInfo.name}${index}`,
        ))
    );

  const renderTaskLine = (taskInfo) =>
    (
      <div className="reportTaskLine" key={taskInfo.name}>
        <div className="reportTaskLineLeftPart">
          <p className="fontSizeDefaultBold fontColorDefault reportTaskLineTitle">{taskInfo.name}</p>
        </div>
        <div className="reportTaskLineRightPart">
          {renderTaskTimingList(taskInfo)}
        </div>
      </div>
    );

  const renderTaskListLoad = () =>
    (
      extractSortedTaskList(concatTurnaroundTasks(), filteredTaskList).map((task) => (
        renderTaskLine(task)
      ))
    );

  const renderTaskList = () => ((hasLoadReport) ? renderTaskListLoad() : null);

  return (
    <>
      <div className="reportPartHeader">
        <p className="fontSizeBigBold fontColorDefault reportPartHeaderText">{REPORT_TEXT.tasks.title}</p>
      </div>
      <div className="reportTasksWrapper">
        {renderTaskList()}
      </div>
    </>
  );
}
