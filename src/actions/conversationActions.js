export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_COMMENT_RESPONSE_STATUS = 'DELETE_COMMENT_RESPONSE_STATUS';
export const GET_COMMENT_PICTURE_REQUEST = 'GET_COMMENT_PICTURE_REQUEST';
export const GET_COMMENT_PICTURE_RESPONSE_SUCCESS = 'GET_COMMENT_PICTURE_RESPONSE_SUCCESS';
export const GET_COMMENT_PICTURE_RESPONSE_FAILURE = 'GET_COMMENT_PICTURE_RESPONSE_FAILURE';
export const RESET_DELETE_COMMENT_RESPONSE_STATUS = 'RESET_DELETE_COMMENT_RESPONSE_STATUS';
export const SEND_TASK_COMMENT = 'SEND_TASK_COMMENT';
export const SEND_TASK_COMMENT_RESPONSE = 'SEND_TASK_COMMENT_RESPONSE';

export const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,
});

export const deleteCommentResponseStatus = (responseStatus) => ({
  type: DELETE_COMMENT_RESPONSE_STATUS,
  payload: responseStatus,
});

export const getCommentPictureRequest = (commentId) => ({
  type: GET_COMMENT_PICTURE_REQUEST,
  payload: commentId,
});

export const getCommentPictureResponseSuccess = (encodedPicture) => ({
  type: GET_COMMENT_PICTURE_RESPONSE_SUCCESS,
  payload: encodedPicture,
});

export const getCommentPictureResponseFailure = (errorMessage) => ({
  type: GET_COMMENT_PICTURE_RESPONSE_FAILURE,
  payload: errorMessage,
});

export const resetDeleteCommentResponseStatus = () => ({
  type: RESET_DELETE_COMMENT_RESPONSE_STATUS,
});

export const sendTaskComment = (sendTaskCommentData) => ({
  type: SEND_TASK_COMMENT,
  payload: sendTaskCommentData,
});

export const sendTaskCommentResponse = (sendTaskCommentResponseData) => ({
  type: SEND_TASK_COMMENT_RESPONSE,
  payload: sendTaskCommentResponseData,
});
