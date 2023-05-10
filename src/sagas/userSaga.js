import {
  call, put, takeLatest,
} from 'redux-saga/effects';

import Cookies from 'universal-cookie';

import { USER_TOKEN_LIFETIME } from 'src/constants/globals';
import { DEFAULT_ERROR_MESSAGE, INVALID_CREDENTIALS } from 'src/constants/errorMessage';
import { TARMAC_COOKIE_REFRESH, TARMAC_COOKIE_EXPIRY } from 'src/constants/cookies';

import { SENDING_REQUEST } from 'src/actions/actions';
import {
  receiveUserAirports,
  REQUEST_USER_AIRPORTS,
  setAirportPickedAction,
} from 'src/actions/turnaroundActions';
import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGOUT,
  receiveUserData,
  receiveUserToken,
  setAuthState,
  TOKEN_REQUEST,
} from 'src/actions/userActions';

import userApi from 'src/api/userApi';

import hasTokenNotExpired from 'src/utils/userSaga';
import logoutAGOA from 'src/utils/api/logoutAGOA';
import { sortObjectsByIataCode } from 'src/utils/logic/sortObjectsByIataCode';

export const cookies = new Cookies();

// login
function* authorizationSaga(action) {
  const { payload } = action;

  yield put({ type: SENDING_REQUEST, sending: true });

  try {
    const { data } = yield call(userApi.login, payload);

    if (Date.parse(data.access_token_expiry) > Date.now()) {
      yield put(receiveUserData(data));
      yield put(setAuthState(true));

      // Set expiry_date refresh token at 59 days
      cookies.set(TARMAC_COOKIE_REFRESH, data.refresh_token);
      localStorage.setItem(TARMAC_COOKIE_EXPIRY, Date.now() + USER_TOKEN_LIFETIME);
    }

    const { data: userAuthorizedAirport } = yield call(userApi.userAccessAirports, data.access_token);
    const sortedAirports = userAuthorizedAirport.sort(sortObjectsByIataCode);

    if (sortedAirports.length !== 0) {
      yield put(setAirportPickedAction(sortedAirports[0].iata_code));
    }

    return false;
  } catch (error) {
    if (error.response) {
      yield put({ type: LOGIN_FAILED, payload: INVALID_CREDENTIALS });
    } else {
      alert(DEFAULT_ERROR_MESSAGE);
    }

    return false;
  } finally {
    yield put({ type: SENDING_REQUEST, sending: false });
  }
}

export function* watchLastAuthorizationSaga() {
  yield takeLatest(LOGIN_REQUEST, authorizationSaga);
}

// logout
function* logoutSaga() {
  yield put({ type: SENDING_REQUEST, sending: true });

  try {
    yield call(logoutAGOA);
    cookies.remove(TARMAC_COOKIE_REFRESH);
    yield put(setAuthState(false));
    yield put({ type: SENDING_REQUEST, sending: false });
  } catch (error) {
    alert(DEFAULT_ERROR_MESSAGE);
  }
}

export function* watchLastLogoutSaga() {
  yield takeLatest(LOGOUT, logoutSaga);
}

// refresh token
function* authenticationSaga() {
  yield put({ type: SENDING_REQUEST, sending: true });

  try {
    const refreshToken = yield cookies.get(TARMAC_COOKIE_REFRESH);

    const { data } = yield call(userApi.refreshTokenAGOA, refreshToken);

    if (hasTokenNotExpired(data)) {
      const { data: userData } = yield call(userApi.userDataAGOA, data.access_token);

      yield put(receiveUserToken({ ...userData, access_token: data.access_token }));
      yield put(setAuthState(true));
      yield put({ type: SENDING_REQUEST, sending: false });
    } else {
      yield put(setAuthState(false));
    }
  } catch (error) {
    if (error.response) {
      yield put(setAuthState(false));
    } else if (error.message === 'Network Error') {
      alert('You are disconnected');
    } else {
      yield put(setAuthState(false));
    }
  } finally {
    yield put({ type: SENDING_REQUEST, sending: false });
  }
}

export function* watchLastAuthenticationSaga() {
  yield takeLatest(TOKEN_REQUEST, authenticationSaga);
}

// Business Groups Access
function* userDataSaga(action) {
  try {
    const { data: userAuthorizedAirport } = yield call(userApi.userAccessAirports, action.payload);

    if (userAuthorizedAirport.length !== 0) {
      yield put(receiveUserAirports(userAuthorizedAirport));
    }

    return userAuthorizedAirport;
  } catch (error) {
    if (error.response) {
      alert(DEFAULT_ERROR_MESSAGE);
    } else {
      alert(DEFAULT_ERROR_MESSAGE);
    }

    return false;
  }
}

export function* watchLastUserDataSaga() {
  yield takeLatest(REQUEST_USER_AIRPORTS, userDataSaga);
}
