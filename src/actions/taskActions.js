export const UPDATE_ADD_INFOS = 'UPDATE_ADD_INFOS';
export const UPDATE_ADD_INFOS_RESPONSE = 'UPDATE_ADD_INFOS_RESPONSE';
export const RESET_ADD_INFO_STATUS = 'RESET_ADD_INFO_STATUS';
export const GET_TASK_DETAIL = 'GET_TASK_DETAIL';
export const GET_TASK_DETAIL_RESPONSE = 'GET_TASK_DETAIL_RESPONSE';
export const CLOSE_TASK = 'CLOSE_TASK';
export const GET_TASK_DETAIL_STATUS = 'GET_TASK_DETAIL_STATUS';
export const UPDATE_TASK_APPLICABLE_VALUE = 'UPDATE_TASK_APPLICABLE_VALUE';
export const REFRESH_TASK_DATA = 'REFRESH_TASK_DATA';
export const UPDATE_TASK_TIMING = 'UPDATE_TASK_TIMING';
export const UPDATE_TASK_TIMING_RESPONSE = 'UPDATE_TASK_TIMING_RESPONSE';
export const RESET_TASK_TIMING_STATUS = 'RESET_TASK_TIMING_STATUS';
export const RESET_PROGRESS_BAR_TIMING_STATUS = 'RESET_PROGRESS_BAR_TIMING_STATUS';
export const GET_TASK_COMMENTS = 'GET_TASKS_COMMENTS';
export const GET_TASK_COMMENTS_RESPONSE = 'GET_TASKS_COMMENTS_RESPONSE';
export const GET_TASK_MESSAGES = 'GET_TASKS_MESSAGES';
export const GET_TASK_MESSAGES_RESPONSE = 'GET_TASKS_MESSAGES_RESPONSE';
export const GET_TASK_FRAGMENT = 'GET_TASK_FRAGMENT';

export const updateAddInfos = (updatedAddInfo) => ({
  type: UPDATE_ADD_INFOS,
  payload: {
    addInfoId: updatedAddInfo.addInfoId,
    data: updatedAddInfo.data,
  },
});

export const updateAddInfosResponse = (addInfoStatus) => ({
  type: UPDATE_ADD_INFOS_RESPONSE,
  payload: addInfoStatus,
});

export const resetAddInfoStatus = () => ({
  type: RESET_ADD_INFO_STATUS,
});

export const getTaskDetail = (taskId) => ({
  type: GET_TASK_DETAIL,
  payload: taskId,
});

export const getTaskDetailResponse = (selectedTaskDetails) => ({
  type: GET_TASK_DETAIL_RESPONSE,
  payload: selectedTaskDetails,
});

export const closeTask = (updatedTasksDetails) => ({
  type: CLOSE_TASK,
  payload: updatedTasksDetails,
});

export const getTaskDetailStatus = (status) => ({
  type: GET_TASK_DETAIL_STATUS,
  payload: status,
});

export const updateTaskApplicableValue = (updateTaskApplicableData) => ({
  type: UPDATE_TASK_APPLICABLE_VALUE,
  payload: {
    taskId: updateTaskApplicableData.taskId,
    data: updateTaskApplicableData.data,
  },
});

export const refreshTaskData = (taskUpdated) => ({
  type: REFRESH_TASK_DATA,
  payload: taskUpdated,
});

export const updateTaskTiming = (updateTaskTimingData) => ({
  type: UPDATE_TASK_TIMING,
  payload: {
    taskId: updateTaskTimingData.taskId,
    task: updateTaskTimingData.task,
  },
});

export const updateTaskTimingResponse = (status) => ({
  type: UPDATE_TASK_TIMING_RESPONSE,
  payload: status,
});

export const resetTaskTimingStatus = () => ({
  type: RESET_TASK_TIMING_STATUS,
});

export const resetProgressBarTimingStatus = () => ({
  type: RESET_PROGRESS_BAR_TIMING_STATUS,
});

export const getTaskComments = (taskId) => ({
  type: GET_TASK_COMMENTS,
  payload: taskId,
});

export const getTaskCommentsResponse = (tasksCommentsData) => ({
  type: GET_TASK_COMMENTS_RESPONSE,
  payload: tasksCommentsData,
});

export const getTaskMessages = (taskId) => ({
  type: GET_TASK_MESSAGES,
  payload: taskId,
});

export const getTaskMessagesResponse = (tasksMessagesData) => ({
  type: GET_TASK_MESSAGES_RESPONSE,
  payload: tasksMessagesData,
});
