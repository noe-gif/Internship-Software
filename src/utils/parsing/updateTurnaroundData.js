import { REFRESH_SELECTED_TURNAROUND_DETAIL } from 'src/actions/turnaroundDetailActions';
import store from 'src/store';

import {
  UPDATE_ADDINFO_TYPE,
  UPDATE_TASK_TYPE,
  UPDATE_TURNAROUND_TYPE,
} from 'src/constants/turnaroundDetail/updateTurnaroundDataConstant';

const turnaroundHasTaskId = (turnaround, taskPositioning, taskId) => turnaround[taskPositioning].find(
  (task) => task.id === taskId,
);

export const filterAndCheckTaskAddInfo = (task, updatedAddInfoId) => {
  if (task.task_additional_information.length > 0) {
    const filteredAddInfos = task.task_additional_information.filter(
      (addInfo) => addInfo.id === updatedAddInfoId,
    );

    return filteredAddInfos.length > 0;
  } else {
    return false;
  }
};

export const cleanUpdatedTask = (updatedTask = {}) => {
  const updatedTaskCopy = { ...updatedTask };

  delete updatedTaskCopy.above_below_wing;
  delete updatedTaskCopy.is_reduced;

  return updatedTaskCopy;
};

export const extractTaskPositionAndIndex = (turnaroundToCheck, taskId) => {
  let updatedTaskIndex = turnaroundToCheck.normal_tasks_above_wing.findIndex(
    (taskChecked) => taskChecked.id === taskId,
  );

  if (updatedTaskIndex !== -1) {
    return { isTaskAbove: true, updatedTaskIndex };
  } else {
    updatedTaskIndex = turnaroundToCheck.normal_tasks_below_wing.findIndex(
      (taskChecked) => taskChecked.id === taskId,
    );

    return { isTaskAbove: false, updatedTaskIndex };
  }
};

export const extractTurnaroundFromAddInfo = (selectedTurnaroundDetail, updatedAddInfo) => {
  const matchingTask = [];
  const filteredSelectedTurnaroundDetail = selectedTurnaroundDetail.filter(
    (turnaroundDetail) => {
      const completeTurnaroundTaskList = turnaroundDetail.normal_tasks_above_wing.concat(
        turnaroundDetail.normal_tasks_below_wing,
      );

      const filteredTurnaroundTask = completeTurnaroundTaskList.filter(
        (task) => filterAndCheckTaskAddInfo(task, updatedAddInfo.id),
      );

      if (filteredTurnaroundTask.length > 0) {
        matchingTask.push(filteredTurnaroundTask[0]);
        return true;
      } else {
        return false;
      }
    },
  );

  if (filteredSelectedTurnaroundDetail.length > 0 && matchingTask.length > 0) {
    return { matchingTurnaround: filteredSelectedTurnaroundDetail[0], matchingTask: matchingTask[0] };
  } else {
    return null;
  }
};

export const extractTurnaroundFromTask = (selectedTurnaroundDetail, task, taskPositioning) => {
  const filteredSelectedTurnaroundDetail = selectedTurnaroundDetail.filter(
    (turnaroundDetail) => turnaroundHasTaskId(turnaroundDetail, taskPositioning, task.id),
  );

  if (filteredSelectedTurnaroundDetail.length > 0) {
    return filteredSelectedTurnaroundDetail[0];
  }

  return null;
};

export const updateTurnaroundFromAddInfo = (selectedTurnaroundDetail, dataUpdated) => {
  const extractedTurnaroundAndTask = extractTurnaroundFromAddInfo(selectedTurnaroundDetail, dataUpdated);

  if (!extractedTurnaroundAndTask) {
    return null;
  }

  const updatedAddInfoIndex = extractedTurnaroundAndTask.matchingTask.task_additional_information.findIndex(
    (checkedAddInfo) => checkedAddInfo.id === dataUpdated.id,
  );

  extractedTurnaroundAndTask.matchingTask.task_additional_information[updatedAddInfoIndex] = dataUpdated;

  const taskPositionInfos = extractTaskPositionAndIndex(
    extractedTurnaroundAndTask.matchingTurnaround,
    extractedTurnaroundAndTask.matchingTask.id,
  );

  if (taskPositionInfos.isTaskAbove) {
    extractedTurnaroundAndTask
      .matchingTurnaround
      .normal_tasks_above_wing[taskPositionInfos.updatedTaskIndex] = extractedTurnaroundAndTask.matchingTask;
  } else {
    extractedTurnaroundAndTask
      .matchingTurnaround
      .normal_tasks_below_wing[taskPositionInfos.updatedTaskIndex] = extractedTurnaroundAndTask.matchingTask;
  }

  store.dispatch({ type: REFRESH_SELECTED_TURNAROUND_DETAIL, payload: extractedTurnaroundAndTask.matchingTurnaround });

  return extractedTurnaroundAndTask.matchingTurnaround;
};

export const updateTurnaroundFromTask = (selectedTurnaroundDetail, dataUpdated) => {
  const taskPositioning = (dataUpdated.above_below_wing === 'ABOVE_WING')
    ? 'normal_tasks_above_wing'
    : 'normal_tasks_below_wing';

  const extractedTurnaround = extractTurnaroundFromTask(selectedTurnaroundDetail, dataUpdated, taskPositioning);

  if (!extractedTurnaround) {
    return null;
  }

  const cleanedTask = cleanUpdatedTask(dataUpdated);

  const positioningTaskArray = extractedTurnaround[taskPositioning];

  const updatedTaskIndex = positioningTaskArray.findIndex((task) => task.id === cleanedTask.id);

  positioningTaskArray[updatedTaskIndex] = cleanedTask;

  extractedTurnaround[taskPositioning] = positioningTaskArray;

  store.dispatch({ type: REFRESH_SELECTED_TURNAROUND_DETAIL, payload: extractedTurnaround });

  return extractedTurnaround;
};

export const checkIncomingDataType = (selectedTurnaroundDetail = [], dataUpdated = null, dataType = '') => {
  if (!dataUpdated || !selectedTurnaroundDetail) {
    return null;
  }

  const selectedTurnaroundCopy = [...selectedTurnaroundDetail];

  switch (dataType) {
  case UPDATE_TURNAROUND_TYPE:
    store.dispatch({ type: REFRESH_SELECTED_TURNAROUND_DETAIL, payload: dataUpdated });
    return UPDATE_TURNAROUND_TYPE;
  case UPDATE_TASK_TYPE:
    updateTurnaroundFromTask(selectedTurnaroundCopy, dataUpdated);
    return UPDATE_TASK_TYPE;
  case UPDATE_ADDINFO_TYPE:
    updateTurnaroundFromAddInfo(selectedTurnaroundCopy, dataUpdated);
    return UPDATE_ADDINFO_TYPE;
  default:
    return null;
  }
};
