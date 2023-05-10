import {
  RECEIVE_USER_DATA,
  RECEIVE_USER_TOKEN,
  SET_AUTH,
  LOGIN_FAILED,
  LOGIN_REQUEST,
} from '../actions/userActions';
import { SENDING_REQUEST } from '../actions/actions';

const initialState = {
  isCurrentlyLoading: false,
  loggedIn: false,
  token: '',
  connectionError: '',
  username: '',
  userPermissions: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case LOGIN_REQUEST:
    return {
      ...state,
      connectionError: '',
    };
  case LOGIN_FAILED:
    return {
      ...state,
      isCurrentlyLoading: false,
      connectionError: action.payload,
    };
  case RECEIVE_USER_DATA:
    return {
      ...state,
      user: action.payload,
      token: action.payload.access_token,
      username: action.payload.user.username,
      userPermissions: action.payload.user.permissions,
    };
  case RECEIVE_USER_TOKEN:
    return {
      ...state,
      token: action.payload.access_token,
      user: action.payload,
      username: action.payload.username,
      userPermissions: action.payload.permissions,
    };
  case SET_AUTH:
    return {
      ...state,
      loggedIn: action.payload,
    };
  case SENDING_REQUEST:
    return {
      ...state,
      isCurrentlyLoading: action.sending,
    };
  default:
    return state;
  }
}
