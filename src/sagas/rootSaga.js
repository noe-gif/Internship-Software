import { fork } from 'redux-saga/effects';

import {
  watchGetTaskCommentsSaga,
  watchGetTaskDetailsSaga,
  watchGetTaskMessagesSaga,
  watchRefreshTaskDataSaga,
  watchUpdateAddInfosSaga,
  watchUpdateTaskApplicableValueFunctionSaga,
  watchUpdateTaskTimingFunctionSaga,
} from 'src/sagas/taskSaga';

import {
  watchDeleteCommentSaga,
  watchGetCommentPictureSaga,
  watchSendTaskCommentSaga,
} from 'src/sagas/conversationSaga';

import {
  watchLastGetTurnaroundReportSaga,
  watchSendTurnaroundReportSaga,
} from 'src/sagas/reportSaga';

import {
  watchLastGetTurnaroundAllInfoRequestSaga,
  watchLastUpdateFlightTimingSaga,
  watchRefreshSelectedTurnaroundSaga,
  watchUpdateParkingStandSaga,
} from 'src/sagas/turnaroundDetailSaga';

import {
  watchLastGetTurnaroundDetailsSaga,
  watchLastRefreshTurnaroundSaga,
  watchLastTurnaroundDataSaga,
} from 'src/sagas/turnaroundSaga';

import {
  watchLastAuthenticationSaga,
  watchLastAuthorizationSaga,
  watchLastLogoutSaga,
  watchLastUserDataSaga,
} from 'src/sagas/userSaga';

export default function* rootSaga() {
  yield fork(watchGetTaskCommentsSaga);
  yield fork(watchGetTaskDetailsSaga);
  yield fork(watchGetTaskMessagesSaga);
  yield fork(watchLastAuthenticationSaga);
  yield fork(watchLastAuthorizationSaga);
  yield fork(watchLastGetTurnaroundAllInfoRequestSaga);
  yield fork(watchLastGetTurnaroundDetailsSaga);
  yield fork(watchLastGetTurnaroundReportSaga);
  yield fork(watchLastLogoutSaga);
  yield fork(watchLastRefreshTurnaroundSaga);
  yield fork(watchLastTurnaroundDataSaga);
  yield fork(watchLastUpdateFlightTimingSaga);
  yield fork(watchLastUserDataSaga);
  yield fork(watchRefreshSelectedTurnaroundSaga);
  yield fork(watchRefreshTaskDataSaga);
  yield fork(watchSendTaskCommentSaga);
  yield fork(watchSendTurnaroundReportSaga);
  yield fork(watchUpdateAddInfosSaga);
  yield fork(watchUpdateTaskApplicableValueFunctionSaga);
  yield fork(watchUpdateTaskTimingFunctionSaga);
  yield fork(watchUpdateParkingStandSaga);
  yield fork(watchDeleteCommentSaga);
  yield fork(watchGetCommentPictureSaga);
}
