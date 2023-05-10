import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';

import {
  GET_TASK_COMMENTS,
  GET_TASK_DETAIL,
  GET_TASK_MESSAGES,
  REFRESH_TASK_DATA,
  UPDATE_ADD_INFOS,
  UPDATE_TASK_APPLICABLE_VALUE,
  UPDATE_TASK_TIMING,
  getTaskCommentsResponse,
  getTaskDetailResponse,
  getTaskDetailStatus,
  getTaskMessagesResponse,
  refreshTaskData,
  updateAddInfosResponse,
  updateTaskTimingResponse,
} from 'src/actions/taskActions';

import taskApi from 'src/api/taskApi';

import { checkIncomingDataType } from 'src/utils/parsing/updateTurnaroundData';

import { SUCCESS, FAIL } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';
import { UPDATE_ADDINFO_TYPE, UPDATE_TASK_TYPE } from 'src/constants/turnaroundDetail/updateTurnaroundDataConstant';

function* updateAddInfosFunction(action) {
  const {
    user: { token },
    turnaround: { selectedTurnaroundDetail },
  } = yield select();

  const { payload } = action;

  try {
    const { status, data } = yield call(taskApi.updateAddInfos, token, payload);

    if (status === 200) {
      checkIncomingDataType(selectedTurnaroundDetail, data, UPDATE_ADDINFO_TYPE);
      yield put(updateAddInfosResponse({ status: SUCCESS, statusCode: status, addInfoId: payload.addInfoId }));
    } else {
      yield put(updateAddInfosResponse({ status: FAIL, statusCode: status, addInfoId: payload.addInfoId }));
    }
  } catch (error) {
    yield put(updateAddInfosResponse({
      status: FAIL,
      statusCode: error.response.status,
      addInfoId: payload.addInfoId,
    }));
  }
}

export function* watchUpdateAddInfosSaga() {
  yield takeLatest(UPDATE_ADD_INFOS, updateAddInfosFunction);
}

function* getTaskDetailFunction(action) {
  const {
    user: { token },
    task: { taskDetailStatus },
  } = yield select();

  const { payload } = action;

  const taskDetailStatusCopy = [...taskDetailStatus];
  const filteredTaskDetailStatusCopy = taskDetailStatusCopy.filter((taskStatus) => taskStatus.taskId !== payload);

  try {
    const { data, status } = yield call(taskApi.getTaskDetail, token, payload);

    if (data) {
      yield put(refreshTaskData(data));

      filteredTaskDetailStatusCopy.push({ status: SUCCESS, statusCode: status, taskId: payload });
      yield put(getTaskDetailStatus(filteredTaskDetailStatusCopy));
    } else {
      filteredTaskDetailStatusCopy.push([{ status: FAIL, statusCode: status, taskId: payload }]);
      yield put(getTaskDetailStatus(filteredTaskDetailStatusCopy));
    }

    return data;
  } catch (error) {
    filteredTaskDetailStatusCopy.push({ status: FAIL, statusCode: error.response.status, taskId: payload });
    yield put(getTaskDetailStatus(filteredTaskDetailStatusCopy));
    return error.message;
  }
}

export function* watchGetTaskDetailsSaga() {
  yield takeLatest(GET_TASK_DETAIL, getTaskDetailFunction);
}

function* updateTaskApplicableValueFunction(action) {
  const {
    user: { token },
    task: { taskDetailStatus },
    turnaround: { selectedTurnaroundDetail },
  } = yield select();

  const { payload } = action;

  const taskDetailStatusCopy = [...taskDetailStatus];
  const filteredTaskDetailStatusCopy = taskDetailStatusCopy.filter((taskStatus) => taskStatus.taskId !== payload);

  try {
    const { data, status } = yield call(taskApi.updateTaskApplicable, token, payload);

    if (data) {
      yield put(refreshTaskData(data));
      checkIncomingDataType(selectedTurnaroundDetail, data, UPDATE_TASK_TYPE);

      filteredTaskDetailStatusCopy.push({ status: SUCCESS, statusCode: status, taskId: payload });
      yield put(getTaskDetailStatus(filteredTaskDetailStatusCopy));
    } else {
      filteredTaskDetailStatusCopy.push([{ status: FAIL, statusCode: status, taskId: payload }]);
      yield put(getTaskDetailStatus(filteredTaskDetailStatusCopy));
    }

    return data;
  } catch (error) {
    return error.message;
  }
}

export function* watchUpdateTaskApplicableValueFunctionSaga() {
  yield takeLatest(UPDATE_TASK_APPLICABLE_VALUE, updateTaskApplicableValueFunction);
}

function* refreshTaskDataFunction(action) {
  const {
    task: { selectedTasksDetails },
  } = yield select();

  const { payload } = action;

  const filteredSelectedTaskDetails = [...selectedTasksDetails].filter((task) => task.id !== payload.id);

  filteredSelectedTaskDetails.push(payload);

  yield put(getTaskDetailResponse(filteredSelectedTaskDetails));
}

export function* watchRefreshTaskDataSaga() {
  yield takeLatest(REFRESH_TASK_DATA, refreshTaskDataFunction);
}

function* updateTaskTimingFunction(action) {
  const {
    user: { token },
    task: { taskDetailStatus },
    turnaround: { selectedTurnaroundDetail },
  } = yield select();

  const { payload } = action;

  const taskDetailStatusCopy = [...taskDetailStatus];
  const filteredTaskDetailStatusCopy = taskDetailStatusCopy.filter((taskStatus) => taskStatus.taskId !== payload);

  try {
    const { data, status } = yield call(taskApi.updateTaskTiming, token, payload);

    if (data) {
      yield put(refreshTaskData(data));
      checkIncomingDataType(selectedTurnaroundDetail, data, UPDATE_TASK_TYPE);

      filteredTaskDetailStatusCopy.push({ status: SUCCESS, statusCode: status, taskId: payload });
      yield put(getTaskDetailStatus(filteredTaskDetailStatusCopy));
      yield put(updateTaskTimingResponse({ status: SUCCESS, statusCode: status }));
    } else {
      filteredTaskDetailStatusCopy.push([{ status: FAIL, statusCode: status, taskId: payload }]);
      yield put(getTaskDetailStatus(filteredTaskDetailStatusCopy));
      yield put(updateTaskTimingResponse({ status: FAIL, statusCode: status }));
    }
    return data;
  } catch (error) {
    yield put(updateTaskTimingResponse({ status: FAIL, statusCode: error.response.status }));
    return error.message;
  }
}

export function* watchUpdateTaskTimingFunctionSaga() {
  yield takeLatest(UPDATE_TASK_TIMING, updateTaskTimingFunction);
}

function* getTaskCommentsFunction(action) {
  const {
    user: { token },
    turnaround: { selectedTurnaroundDetail },
  } = yield select();

  const { payload } = action;

  try {
    const { data, status } = yield call(taskApi.getTaskComments, token, payload.id);

    if (data && status === 200) {
      const taskDetailWithComments = { ...payload, comments: data };

      yield put(refreshTaskData(taskDetailWithComments));
      checkIncomingDataType(selectedTurnaroundDetail, taskDetailWithComments, UPDATE_TASK_TYPE);

      yield put(getTaskCommentsResponse({ taskId: payload.id, status: SUCCESS }));
    } else {
      yield put(getTaskCommentsResponse({ taskId: payload.id, status: FAIL }));
    }
  } catch (error) {
    yield put(getTaskCommentsResponse({ taskId: payload.id, status: FAIL }));
  }
}

export function* watchGetTaskCommentsSaga() {
  yield takeLatest(GET_TASK_COMMENTS, getTaskCommentsFunction);
}

function* getTaskMessagesFunction(action) {
  const {
    user: { token },
    turnaround: { selectedTurnaroundDetail },
  } = yield select();

  const { payload } = action;

  try {
    const { data, status } = yield call(taskApi.getTaskMessages, token, payload.id);

    if (data && status === 200) {
      const taskDetailWithMessages = { ...payload, messages: data };

      yield put(refreshTaskData(taskDetailWithMessages));
      checkIncomingDataType(selectedTurnaroundDetail, taskDetailWithMessages, UPDATE_TASK_TYPE);

      yield put(getTaskMessagesResponse({ taskId: payload.id, status: SUCCESS }));
    } else {
      yield put(getTaskMessagesResponse({ taskId: payload.id, status: FAIL }));
    }
  } catch (error) {
    yield put(getTaskMessagesResponse({ taskId: payload.id, status: FAIL }));
  }
}

export function* watchGetTaskMessagesSaga() {
  yield takeLatest(GET_TASK_MESSAGES, getTaskMessagesFunction);
}
