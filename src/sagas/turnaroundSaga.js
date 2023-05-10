import {
  call, put, takeLatest, all, select,
} from 'redux-saga/effects';

import { SENDING_TURNAROUND_REQUEST } from 'src/actions/actions';

import {
  receiveAirportPicked,
  receiveDatePicked,
  receiveTurnarounds,
  REFRESH_TURNAROUNDS,
  REQUEST_TURNAROUNDS,
  setAirportPickedAction,
} from 'src/actions/turnaroundActions';

import {
  GET_TURNAROUND_DETAILS_REQUEST,
  getTurnaroundDetailsResponse,
  quitTurnaroundView,
} from 'src/actions/turnaroundDetailActions';

import turnaroundApi from 'src/api/turnaroundApi';
import userApi from 'src/api/userApi';

import { sortObjectsByIataCode } from 'src/utils/logic/sortObjectsByIataCode';
import getExtendedRangeDates from 'src/utils/logic/date/getExtendedRangeDates';

import { DEFAULT_ERROR_MESSAGE } from 'src/constants/errorMessage';
import { checkIncomingDataType } from 'src/utils/parsing/updateTurnaroundData';
import { UPDATE_TURNAROUND_TYPE } from 'src/constants/turnaroundDetail/updateTurnaroundDataConstant';

// Receive Turnarounds Data
function* getTurnaroundData(action) {
  const { payload: { airportPicked, token, dateFilterRange } } = action;

  yield all([
    put({ type: SENDING_TURNAROUND_REQUEST, sending: true }),
    put(quitTurnaroundView()),
  ]);

  try {
    let airportPickedCopy = airportPicked;

    if (airportPickedCopy === '') {
      const { data: userAuthorizedAirport } = yield call(userApi.userAccessAirports, token);
      const sortedAirports = userAuthorizedAirport.sort(sortObjectsByIataCode);

      if (sortedAirports.length !== 0) {
        airportPickedCopy = sortedAirports[0].iata_code;
        yield put(setAirportPickedAction(sortedAirports[0].iata_code));
      }
    }
    const { data } = yield call(
      turnaroundApi.getUserTurnaround,
      token,
      getExtendedRangeDates(dateFilterRange),
      airportPickedCopy,
    );

    if (data) {
      yield all([
        put(receiveTurnarounds(data)),
        put(receiveDatePicked(dateFilterRange)),
        put(receiveAirportPicked(airportPickedCopy)),
      ]);
    }

    return data;
  } catch (error) {
    alert(DEFAULT_ERROR_MESSAGE);

    return error.message;
  } finally {
    yield put({ type: SENDING_TURNAROUND_REQUEST, sending: false });
  }
}

export function* watchLastTurnaroundDataSaga() {
  yield takeLatest(REQUEST_TURNAROUNDS, getTurnaroundData);
}

function* refreshTurnaroundDetailFunction(turnaroundId, token) {
  const {
    turnaround: { selectedTurnaroundDetail },
  } = yield select();

  try {
    const { data } = yield call(turnaroundApi.getTurnaroundCompleteInfos, token, turnaroundId);

    if (data) {
      checkIncomingDataType(selectedTurnaroundDetail, data, UPDATE_TURNAROUND_TYPE);
      return data;
    }

    return null;
  } catch (error) {
    alert(DEFAULT_ERROR_MESSAGE);

    return error.message;
  }
}

function* refreshTurnaroundsFunction(action) {
  const {
    turnaround: { selectedTurnaroundDetail },
  } = yield select();

  const { payload } = action;

  try {
    const { data } = yield call(
      turnaroundApi.getUserTurnaround,
      payload.token,
      getExtendedRangeDates(payload.dateFilterRange),
      payload.airportPicked,
    );

    if (data) {
      yield all(selectedTurnaroundDetail.map(
        (turnaround) => call(refreshTurnaroundDetailFunction, turnaround.id, payload.token),
      ));

      yield all([
        put(receiveTurnarounds(data)),
      ]);
    }

    return data;
  } catch (error) {
    alert(DEFAULT_ERROR_MESSAGE);

    return error.message;
  } finally {
    yield put({ type: SENDING_TURNAROUND_REQUEST, sending: false });
  }
}

export function* watchLastRefreshTurnaroundSaga() {
  yield takeLatest(REFRESH_TURNAROUNDS, refreshTurnaroundsFunction);
}

function* getTurnaroundDetails(action) {
  const {
    user: { token },
    turnaround: { selectedTurnaroundDetail },
  } = yield select();

  const { selectedTurnarounds } = action.payload;

  try {
    const { data } = yield call(
      turnaroundApi.getTurnaroundDetail,
      token,
      selectedTurnarounds[selectedTurnarounds.length - 1].id,
    );

    if (data) {
      const selectedTurnaroundDetailCopy = [...selectedTurnaroundDetail];
      const filteredSelectedTurnaroundDetailCopy = selectedTurnaroundDetailCopy.filter(
        (selectedTurnaround) => selectedTurnaround.id !== data.id,
      );

      filteredSelectedTurnaroundDetailCopy.push(data);

      yield put(getTurnaroundDetailsResponse(filteredSelectedTurnaroundDetailCopy));

      return data;
    }

    return null;
  } catch (error) {
    alert(DEFAULT_ERROR_MESSAGE);

    return error.message;
  }
}

export function* watchLastGetTurnaroundDetailsSaga() {
  yield takeLatest(GET_TURNAROUND_DETAILS_REQUEST, getTurnaroundDetails);
}
