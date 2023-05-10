import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';

import {
  SEND_TURNAROUND_REPORT,
  sendTurnaroundReportResponse,
} from 'src/actions/reportActions';

import {
  GET_TURNAROUND_REPORT_REQUEST,
  getTurnaroundReportResponse,
} from 'src/actions/turnaroundDetailActions';

import turnaroundApi from 'src/api/turnaroundApi';

import { DEFAULT_ERROR_MESSAGE } from 'src/constants/errorMessage';
import { SUCCESS, FAIL } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';
import { UPDATE_TURNAROUND_TYPE } from 'src/constants/turnaroundDetail/updateTurnaroundDataConstant';

import { checkIncomingDataType } from 'src/utils/parsing/updateTurnaroundData';
import parseReportFormat from 'src/utils/parsing/parseReportFormat';

function* getTurnaroundReport(action) {
  const {
    user: { token },
    turnaround: { turnaroundReports },
  } = yield select();

  const { payload } = action;

  try {
    const { data } = yield call(turnaroundApi.getTurnaroundReport, token, payload);

    if (data) {
      const turnaroundReportsCopy = [...turnaroundReports];
      const parsedReportFormat = parseReportFormat(data);

      if (!turnaroundReportsCopy.includes({ turnaroundId: payload, turnaroundReport: parsedReportFormat })) {
        turnaroundReportsCopy.push({ turnaroundId: payload, turnaroundReport: parsedReportFormat });
      }

      yield put(getTurnaroundReportResponse(turnaroundReportsCopy));
    }
  } catch (error) {
    alert(DEFAULT_ERROR_MESSAGE);
  }
}

export function* watchLastGetTurnaroundReportSaga() {
  yield takeLatest(GET_TURNAROUND_REPORT_REQUEST, getTurnaroundReport);
}

function* sendTurnaroundReportFunction(action) {
  const {
    user: { token },
    turnaround: { selectedTurnaroundDetail },
  } = yield select();

  const { payload } = action;

  try {
    const { data, status } = yield call(
      (payload.onlySaving ? turnaroundApi.saveTurnaroundReport : turnaroundApi.sendTurnaroundReport),
      token,
      payload.turnaroundId,
      payload.reportData,
    );

    if (status === 200 && data) {
      checkIncomingDataType(selectedTurnaroundDetail, data, UPDATE_TURNAROUND_TYPE);
      yield put(sendTurnaroundReportResponse({ status: SUCCESS, turnaroundId: payload.turnaroundId }));
    } else {
      yield put(sendTurnaroundReportResponse({ status: FAIL, turnaroundId: payload.turnaroundId }));
    }
  } catch (error) {
    yield put(sendTurnaroundReportResponse({ status: FAIL, turnaroundId: payload.turnaroundId }));
  }
}

export function* watchSendTurnaroundReportSaga() {
  yield takeLatest(SEND_TURNAROUND_REPORT, sendTurnaroundReportFunction);
}
