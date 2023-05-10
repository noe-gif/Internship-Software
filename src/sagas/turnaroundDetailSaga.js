import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';

import {
  GET_TURNAROUND_ALL_INFOS_REQUEST,
  getTurnaroundAllInfosResponse,
  getTurnaroundDetailsResponse,
  UPDATE_FLIGHT_TIMING,
  updateFlightTimingResponse,
  REFRESH_SELECTED_TURNAROUND_DETAIL,
  UPDATE_PARKING_STAND,
  updateParkingStandResponse,
} from 'src/actions/turnaroundDetailActions';

import turnaroundApi from 'src/api/turnaroundApi';

import { checkIncomingDataType } from 'src/utils/parsing/updateTurnaroundData';
import {
  turnaroundCompleteInfoDictContainId,
  turnaroundDetailDictContainsId,
  updateDictInArray,
} from 'src/utils/parsing/updateDictInArray';

import { DEFAULT_ERROR_MESSAGE } from 'src/constants/errorMessage';
import { UPDATE_TURNAROUND_TYPE } from 'src/constants/turnaroundDetail/updateTurnaroundDataConstant';
import { SUCCESS, FAIL } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

function* getTurnaroundAllInfoRequestFunction(action) {
  const {
    user: { token },
    turnaround: { turnaroundCompleteInfos },
  } = yield select();

  const { payload } = action;

  try {
    const { data } = yield call(turnaroundApi.getTurnaroundCompleteInfos, token, payload);

    if (data) {
      const turnaroundCompleteInfosCopy = [...turnaroundCompleteInfos];

      turnaroundCompleteInfosCopy.push({ turnaroundId: payload, turnaroundInfos: data });

      yield put(getTurnaroundAllInfosResponse(turnaroundCompleteInfosCopy));
    }
  } catch (error) {
    alert(DEFAULT_ERROR_MESSAGE);
  }
}

export function* watchLastGetTurnaroundAllInfoRequestSaga() {
  yield takeLatest(GET_TURNAROUND_ALL_INFOS_REQUEST, getTurnaroundAllInfoRequestFunction);
}

function* updateFlightTimingFunction(action) {
  const {
    user: { token },
    turnaround: { selectedTurnaroundDetail },
  } = yield select();

  const { payload } = action;

  try {
    const { data, status } = yield call(turnaroundApi.updateFlightTiming, token, payload);

    if (status === 200) {
      if (data) {
        checkIncomingDataType(selectedTurnaroundDetail, data, UPDATE_TURNAROUND_TYPE);
      }
      yield put(updateFlightTimingResponse({ status: SUCCESS, statusCode: status }));
    } else {
      yield put(updateFlightTimingResponse({ status: FAIL, statusCode: status }));
    }
  } catch (error) {
    yield put(updateFlightTimingResponse({ status: FAIL, statusCode: error.response.status }));
  }
}

export function* watchLastUpdateFlightTimingSaga() {
  yield takeLatest(UPDATE_FLIGHT_TIMING, updateFlightTimingFunction);
}

function* refreshSelectedTurnaroundDetailFunction(action) {
  const {
    turnaround: { selectedTurnaroundDetail, turnaroundCompleteInfos },
  } = yield select();

  const { payload } = action;

  const updatedSelectedTurnaroundDetail = updateDictInArray(
    selectedTurnaroundDetail,
    turnaroundDetailDictContainsId,
    payload,
    'id',
  );

  yield put(getTurnaroundDetailsResponse(updatedSelectedTurnaroundDetail));

  const updatedTurnaroundCompleteInfo = { turnaroundId: payload.id, turnaroundInfos: payload };

  const updatedCompleteInfos = updateDictInArray(
    turnaroundCompleteInfos,
    turnaroundCompleteInfoDictContainId,
    updatedTurnaroundCompleteInfo,
    'turnaroundId',
  );

  yield put(getTurnaroundAllInfosResponse(updatedCompleteInfos));
}

export function* watchRefreshSelectedTurnaroundSaga() {
  yield takeLatest(REFRESH_SELECTED_TURNAROUND_DETAIL, refreshSelectedTurnaroundDetailFunction);
}

function* updateParkingStandFunction(action) {
  const {
    user: { token },
    turnaround: { selectedTurnaroundDetail },
  } = yield select();

  const { payload } = action;

  try {
    const { data, status } = yield call(turnaroundApi.updateParkingStand, token, payload);

    if (status === 200) {
      if (data) {
        checkIncomingDataType(selectedTurnaroundDetail, data, UPDATE_TURNAROUND_TYPE);
      }
      yield put(updateParkingStandResponse({ status: SUCCESS, statusCode: status }));
    } else {
      yield put(updateParkingStandResponse({ status: FAIL, statusCode: status }));
    }
  } catch (error) {
    yield put(updateParkingStandResponse({ status: FAIL, statusCode: error.response.status }));
  }
}

export function* watchUpdateParkingStandSaga() {
  yield takeLatest(UPDATE_PARKING_STAND, updateParkingStandFunction);
}
