export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA';
export const RECEIVE_USER_TOKEN = 'RECEIVE_USER_TOKEN';
export const LOGOUT = 'LOGOUT';
export const SET_AUTH = 'SET_AUTH';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';

export const loginRequestAction = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const receiveUserData = (data) => ({
  type: RECEIVE_USER_DATA,
  payload: data,
});

export const receiveUserToken = (data) => ({
  type: RECEIVE_USER_TOKEN,
  payload: data,
});

export const tokenRequestAction = () => ({
  type: TOKEN_REQUEST,
});

export const setAuthState = (newAuthState) => ({
  type: SET_AUTH,
  payload: newAuthState,
});

export const logoutRequestAction = () => ({
  type: LOGOUT,
});
