import {
  CLOSE_TASK,
  GET_TASK_DETAIL_RESPONSE,
  GET_TASK_DETAIL_STATUS,
  GET_TASK_COMMENTS_RESPONSE,
  GET_TASK_MESSAGES_RESPONSE,
  RESET_ADD_INFO_STATUS,
  RESET_PROGRESS_BAR_TIMING_STATUS,
  RESET_TASK_TIMING_STATUS,
  UPDATE_ADD_INFOS_RESPONSE,
  UPDATE_TASK_TIMING_RESPONSE,
} from 'src/actions/taskActions';

const initialState = {
  addInfoStatus: {
    status: 'default',
    statusCode: 0,
  },
  progressBarTimingStatus: {
    status: 'default',
    statusCode: 0,
  },
  selectedTasksDetails: [],
  taskApplicableStatus: {
    status: 'default',
    statusCode: 0,
  },
  taskDetailStatus: [],
  taskTimingStatus: {
    status: 'default',
    statusCode: 0,
  },
  taskCommentsRequestStatus: null,
  taskMessagesRequestStatus: null,
};

export default function task(state = initialState, action) {
  switch (action.type) {
  case UPDATE_ADD_INFOS_RESPONSE:
    return {
      ...state,
      addInfoStatus: action.payload,
    };
  case RESET_ADD_INFO_STATUS:
    return {
      ...state,
      addInfoStatus: {
        ...state.addInfoStatus,
        status: 'default',
        statusCode: 0,
      },
    };
  case GET_TASK_DETAIL_RESPONSE:
  case CLOSE_TASK:
    return {
      ...state,
      selectedTasksDetails: action.payload,
    };
  case GET_TASK_DETAIL_STATUS:
    return {
      ...state,
      taskDetailStatus: action.payload,
    };
  case UPDATE_TASK_TIMING_RESPONSE:
    return {
      ...state,
      taskTimingStatus: action.payload,
      progressBarTimingStatus: action.payload,

    };
  case RESET_TASK_TIMING_STATUS:
    return {
      ...state,
      taskTimingStatus: {
        status: 'default',
        statusCode: 0,
      },
    };
  case RESET_PROGRESS_BAR_TIMING_STATUS:
    return {
      ...state,
      progressBarTimingStatus: {
        status: 'default',
        statusCode: 0,
      },
    };
  case GET_TASK_COMMENTS_RESPONSE:
    return {
      ...state,
      taskCommentsRequestStatus: action.payload,
    };
  case GET_TASK_MESSAGES_RESPONSE:
    return {
      ...state,
      taskMessagesRequestStatus: action.payload,
    };
  default:
    return state;
  }
}
