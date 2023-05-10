import conversation from 'src/reducers/conversation';

import {
  DELETE_COMMENT_RESPONSE_STATUS,
  GET_COMMENT_PICTURE_REQUEST,
  GET_COMMENT_PICTURE_RESPONSE_SUCCESS,
  GET_COMMENT_PICTURE_RESPONSE_FAILURE,
  RESET_DELETE_COMMENT_RESPONSE_STATUS,
  SEND_TASK_COMMENT,
  SEND_TASK_COMMENT_RESPONSE,
} from 'src/actions/conversationActions';

import { DEFAULT, FAIL, LOADING, SUCCESS } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

describe('conversation Reducer', () => {
  describe('INITIAL_STATE', () => {
    test('Check correct initial state', () => {
      const action = { type: 'not_handle_action' };
      const initialState = {
        commentPicture: {},
        commentPictureErrorStatusCode: 0,
        commentPictureStatus : DEFAULT,
        sendTaskCommentStatus: {
          status: DEFAULT,
          taskId: 0,
        },
        deleteCommentResponseStatus: { status: DEFAULT, statusCode: 0 },
      };

      expect(conversation(undefined, action)).toEqual(initialState);
    });
  });

  describe('SEND TASK COMMENT', () => {
    test('Check correct state update', () => {
      const payload = {
        taskId: 12345,
        data: { comment: 'TestingSendTaskComment' }, 
      };

      const action = { type: SEND_TASK_COMMENT, payload: payload };

      const stateResult = conversation(undefined, action);

      expect(stateResult.sendTaskCommentStatus).toEqual({ status: LOADING, taskId: 12345 });
    });
  });

  describe('SEND TASK COMMENT RESPONSE', () => {
    test('Check correct state update', () => {
      const payload = {
        taskId: 12345,
        status: SUCCESS,
      };

      const action = { type: SEND_TASK_COMMENT_RESPONSE, payload: payload };

      const stateResult = conversation(undefined, action);

      expect(stateResult.sendTaskCommentStatus).toEqual({ status: SUCCESS, taskId: 12345 });
    });
  });

  describe('DELETE_COMMENT_RESPONSE_STATUS', () => {
    test('Check correct state update', () => {
      const payload = {
        status: SUCCESS,
        statusCode: 200,
      };

      const action = { type: DELETE_COMMENT_RESPONSE_STATUS, payload: payload };

      const stateResult = conversation(undefined, action);

      expect(stateResult.deleteCommentResponseStatus).toEqual({ status: SUCCESS, statusCode: 200 });
    });
  });

  describe('RESET_DELETE_COMMENT_RESPONSE_STATUS', () => {
    test('Check correct state update', () => {

      const action = { type: RESET_DELETE_COMMENT_RESPONSE_STATUS };

      const stateResult = conversation(undefined, action);

      expect(stateResult.resetDeleteCommentResponseStatus).toEqual();
    });
  });

  describe('GET_COMMENT_PICTURE_REQUEST', () => {
    test('Check correct state update', () => {

      const action = { type: GET_COMMENT_PICTURE_REQUEST };

      const stateResult = conversation(undefined, action);

      expect(stateResult.commentPictureStatus).toEqual(LOADING);
    });
  });

  describe('GET_COMMENT_PICTURE_RESPONSE_SUCCESS', () => {
    test('Check correct state update', () => {
      const payload = {
        picture: '/9j/4AAQSkZJRgABAQAASABIAAD/4QBYRXhpZgAATU0AKgAAA',
      };

      const action = { type: GET_COMMENT_PICTURE_RESPONSE_SUCCESS , payload: payload };

      const stateResult = conversation(undefined, action);

      expect(stateResult.commentPictureStatus).toEqual(SUCCESS);
      expect(stateResult.commentPicture).toEqual({ picture: '/9j/4AAQSkZJRgABAQAASABIAAD/4QBYRXhpZgAATU0AKgAAA'});
    });
  });

  describe('GET_COMMENT_PICTURE_RESPONSE_FAILURE', () => {
    test('Check correct state update', () => {

      const action = { type: GET_COMMENT_PICTURE_RESPONSE_FAILURE , payload: 400 };

      const stateResult = conversation(undefined, action);

      expect(stateResult.commentPictureStatus).toEqual(FAIL);
      expect(stateResult.commentPictureErrorStatusCode).toEqual(400);
    });
  });
});
