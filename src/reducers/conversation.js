import {
  DELETE_COMMENT_RESPONSE_STATUS,
  GET_COMMENT_PICTURE_REQUEST,
  GET_COMMENT_PICTURE_RESPONSE_SUCCESS,
  GET_COMMENT_PICTURE_RESPONSE_FAILURE,
  RESET_DELETE_COMMENT_RESPONSE_STATUS,
  SEND_TASK_COMMENT,
  SEND_TASK_COMMENT_RESPONSE,
} from 'src/actions/conversationActions';
import {
  DEFAULT,
  FAIL,
  LOADING,
  SUCCESS,
} from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

const initialState = {
  sendTaskCommentStatus: {
    status: DEFAULT,
    taskId: 0,
  },
  deleteCommentResponseStatus: { status: DEFAULT, statusCode: 0 },
  commentPicture: {},
  commentPictureErrorStatusCode: 0,
  commentPictureStatus: DEFAULT,
};

export default function conversation(state = initialState, action) {
  switch (action.type) {
  case DELETE_COMMENT_RESPONSE_STATUS:
    return {
      ...state,
      deleteCommentResponseStatus: action.payload,
    };
  case GET_COMMENT_PICTURE_REQUEST:
    return {
      ...state,
      commentPictureStatus: LOADING,
    };
  case GET_COMMENT_PICTURE_RESPONSE_SUCCESS:
    return {
      ...state,
      commentPicture: action.payload,
      commentPictureStatus: SUCCESS,
    };
  case GET_COMMENT_PICTURE_RESPONSE_FAILURE:
    return {
      ...state,
      commentPictureErrorStatusCode: action.payload,
      commentPictureStatus: FAIL,
    };
  case RESET_DELETE_COMMENT_RESPONSE_STATUS:
    return {
      ...state,
      deleteCommentResponseStatus: {
        status: DEFAULT,
        statusCode: 0,
      },
    };
  case SEND_TASK_COMMENT:
    return {
      ...state,
      sendTaskCommentStatus: { status: LOADING, taskId: action.payload.taskId },
    };
  case SEND_TASK_COMMENT_RESPONSE:
    return {
      ...state,
      sendTaskCommentStatus: action.payload,
    };
  default:
    return state;
  }
}
