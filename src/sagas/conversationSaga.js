import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';

import {
  DELETE_COMMENT,
  deleteCommentResponseStatus,
  GET_COMMENT_PICTURE_REQUEST,
  getCommentPictureResponseSuccess,
  getCommentPictureResponseFailure,
  SEND_TASK_COMMENT,
  sendTaskCommentResponse,
} from 'src/actions/conversationActions';

import {
  refreshTaskData,
} from 'src/actions/taskActions';

import taskApi from 'src/api/taskApi';

import { checkIncomingDataType } from 'src/utils/parsing/updateTurnaroundData';

import { SUCCESS, FAIL } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';
import { UPDATE_TASK_TYPE } from 'src/constants/turnaroundDetail/updateTurnaroundDataConstant';

function* sendTaskCommentFunction(action) {
  const {
    user: { token },
    turnaround: { selectedTurnaroundDetail },
  } = yield select();

  const { payload } = action;

  try {
    const { data } = yield call(taskApi.sendTaskComment, token, payload);

    if (data) {
      yield put(sendTaskCommentResponse({ taskId: data.id, status: SUCCESS }));
      yield put(refreshTaskData(data));
      checkIncomingDataType(selectedTurnaroundDetail, data, UPDATE_TASK_TYPE);
    } else {
      yield put(sendTaskCommentResponse({ taskId: payload.taskId, status: FAIL }));
    }
  } catch (error) {
    yield put(sendTaskCommentResponse({ taskId: payload.taskId, status: FAIL }));
  }
}

export function* watchSendTaskCommentSaga() { // eslint-disable-line
  yield takeLatest(SEND_TASK_COMMENT, sendTaskCommentFunction);
}

function* deleteCommentFunction(action) {
  const {
    user: { token },
    turnaround: { selectedTurnaroundDetail },
  } = yield select();

  const { payload } = action;

  try {
    const { data, status } = yield call(taskApi.deleteComment, token, payload);

    if (data) {
      yield put(deleteCommentResponseStatus({ status: SUCCESS, statusCode: status }));
      yield put(refreshTaskData(data));
      checkIncomingDataType(selectedTurnaroundDetail, data, UPDATE_TASK_TYPE);
    } else {
      yield put(deleteCommentResponseStatus({ status: FAIL, statusCode: status }));
    }
  } catch (error) {
    yield put(deleteCommentResponseStatus({ status: FAIL, statusCode: error.response.status }));
  }
}

export function* watchDeleteCommentSaga() { // eslint-disable-line
  yield takeLatest(DELETE_COMMENT, deleteCommentFunction);
}

function* getCommentPictureFunction(action) {
  const {
    user: { token },
  } = yield select();

  const { payload } = action;

  try {
    const { data, status } = yield call(taskApi.getCommentPicture, token, payload);

    if (data && status === 200) {
      yield put(getCommentPictureResponseSuccess(data));
    } else {
      yield put(getCommentPictureResponseFailure(status));
    }
  } catch (error) {
    yield put(getCommentPictureResponseFailure(error.response.status));
  }
}

export function* watchGetCommentPictureSaga() { // eslint-disable-line
  yield takeLatest(GET_COMMENT_PICTURE_REQUEST, getCommentPictureFunction);
}
