import React from 'react';

import TaskSummary from 'src/components/turnaroundDetail/taskSummary';
import Loading from 'src/components/loading';
import TasksFilters from 'src/components/turnaroundDetail/tasksFilters';

import sortTaskByTime from 'src/utils/logic/tasks/sortTaskByTime';

import {
  filterTaskCompletedStatus,
  filterTaskDidNotStartStatus,
  filterTaskInProgressStatus,
  filterTaskNotApplicableStatus,
} from 'src/utils/logic/tasks/taskFilters';

import TURNAROUND_DETAIL_TEXT from 'src/constants/turnaroundDetail/turnaroundDetailText.json';

import 'src/styles/TurnaroundDetailTaskList.css';
import tasksHooks from 'src/hooks/turnaroundDetail/tasksHooks';

export default function Tasks(props) {
  const {
    componentSize,
    openReadOnlyComments,
    selectTaskFunction,
    selectedTurnarounds,
    turnaroundId,
  } = props;

  const {
    getTurnaroundTasksBasedOnFilter,
    setSelectedFilter,
  } = tasksHooks();

  const turnaroundDetail = selectedTurnarounds.find((turnaround) => turnaround.id === turnaroundId);
  let turnaroundTasks = [];
  let orderedTurnaroundTasks = [];

  if (turnaroundDetail) {
    turnaroundTasks = getTurnaroundTasksBasedOnFilter(turnaroundDetail);
    orderedTurnaroundTasks = turnaroundTasks.sort((taskA, taskB) => sortTaskByTime(taskA, taskB));
  }

  const tasksByStatus = filterTaskInProgressStatus(orderedTurnaroundTasks)
    .concat(filterTaskDidNotStartStatus(orderedTurnaroundTasks))
    .concat(filterTaskCompletedStatus(orderedTurnaroundTasks))
    .concat(filterTaskNotApplicableStatus(orderedTurnaroundTasks));

  const renderProcessTimeHeaderLargeView = () => (
    componentSize === TURNAROUND_DETAIL_TEXT.componentSize.large && (
      <div className={`turnaroundTaskListHeaderCentral-${componentSize}`}>
        <p
          id={`taskLineHeaderProcessTime${turnaroundId}`}
          className="fontSizeSmall fontColorDefault"
        >
          {TURNAROUND_DETAIL_TEXT.task_list.process_time}
        </p>
      </div>
    )
  );

  const renderTaskListHeader = () => (
    <div className={`turnaroundTaskListHeader-${componentSize}`}>
      <div className={`turnaroundTaskListHeaderLeftPart-${componentSize}`} />
      <div className={`turnaroundTaskListHeaderCentralPart-${componentSize}`}>
        <div className={`turnaroundTaskListHeaderCentral-${componentSize}`}>
          <p
            id={`taskLineHeaderStartTiming${turnaroundId}`}
            className="fontSizeSmall fontColorDefault"
          >
            {TURNAROUND_DETAIL_TEXT.task_list.start}
          </p>
        </div>
        <div className={`turnaroundTaskListHeaderCentral-${componentSize}`}>
          <p
            id={`taskLineHeaderEndTiming${turnaroundId}`}
            className="fontSizeSmall fontColorDefault"
          >
            {TURNAROUND_DETAIL_TEXT.task_list.end}
          </p>
        </div>
        {renderProcessTimeHeaderLargeView()}
      </div>
      <div className={`turnaroundTaskListHeaderRightPart-${componentSize}`}>
        <div className={`turnaroundTaskListHeaderRightContent-${componentSize}`}>
          <p
            id={`taskLineHeaderStatus${turnaroundId}`}
            className="fontSizeSmall fontColorDefault"
          >
            {TURNAROUND_DETAIL_TEXT.task_list.status}
          </p>
        </div>
        <div className={`turnaroundTaskListHeaderRightSpace-${componentSize}`} />
      </div>
    </div>
  );

  return (
    <>
      <TasksFilters
        componentSize={componentSize}
        setSelectedFilter={setSelectedFilter}
      />
      {renderTaskListHeader()}
      <hr className={`turnaroundTaskListLineHeader-${componentSize}`} />
      <div
        className={`turnaroundTaskListHeaderWrapper-${componentSize}`}
      >
        <div className={`turnaroundTaskListWrapper-${componentSize}`}>
          {turnaroundDetail
            ? tasksByStatus.map((task) => (
              <div key={task.id}>
                <TaskSummary
                  task={task}
                  componentSize={componentSize}
                  selectTaskFunction={selectTaskFunction}
                  openReadOnlyComments={openReadOnlyComments}
                />
              </div>
            ))
            : (
              <div className="turnaroundDetailSpinner">
                <Loading />
              </div>
            )}
        </div>
      </div>
    </>
  );
}
