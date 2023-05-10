import configureStore from 'redux-mock-store';

import * as conversationActions from 'src/actions/conversationActions';

import { SUCCESS } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

const mockStore = configureStore();
const store = mockStore();

describe('conversationActions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('sendTaskComment',  () => {
    test('Dispatch sendTaskComment action with correct type and payload', () => {
      const expectedSendTaskCommentActions = [
        {
          type: conversationActions.SEND_TASK_COMMENT,
          payload: {
            taskId: 12345,
            data: {
              comment: 'TestingSendTaskComment',
            }
          }
        }
      ];

      store.dispatch(conversationActions.sendTaskComment({
        taskId: 12345,
        data: { comment: 'TestingSendTaskComment' },
      }));

      expect(store.getActions()).toStrictEqual(expectedSendTaskCommentActions);
    });
  });

  describe('sendTaskCommentResponse', () => {
    test('Dispatch sendTaskCommentResponse action with correct type and payload', () => {
      const expectedSendTaskCommentResponseActions = [
        {
          type: conversationActions.SEND_TASK_COMMENT_RESPONSE,
          payload: {
            taskId: 12345,
            status: SUCCESS,
          }
        }
      ];

      store.dispatch(conversationActions.sendTaskCommentResponse({
        taskId: 12345,
        status: SUCCESS,
      }));

      expect(store.getActions()).toStrictEqual(expectedSendTaskCommentResponseActions);
    });
  });

  describe('deleteComment', () => {
    test('Dispatch deleteComment action with correct type and payload', () => {
      const expectedDeleteCommentActions = [
        {
          type: conversationActions.DELETE_COMMENT,
          payload: 12345,
        }
      ];

      store.dispatch(conversationActions.deleteComment(12345));

      expect(store.getActions()).toStrictEqual(expectedDeleteCommentActions);
    });
  });

  describe('deleteCommentResponseStatus', () => {
    test('Dispatch deleteCommentResponseStatus action with correct type and payload', () => {
      const expectedDeleteCommentResponseStatusActions = [
        {
          type: conversationActions.DELETE_COMMENT_RESPONSE_STATUS,
          payload: {
            status: SUCCESS,
            statusCode: 200,
          },
        }
      ];

      store.dispatch(conversationActions.deleteCommentResponseStatus({
        status: SUCCESS,
        statusCode: 200,
      }));

      expect(store.getActions()).toStrictEqual(expectedDeleteCommentResponseStatusActions);
    });
  });

  describe('resetDeleteCommentResponseStatus', () => {
    test('Dispatch resetDeleteCommentResponseStatus action with correct type and payload', () => {
      const expectedResetDeleteCommentResponseStatusActions = [
        {
          type: conversationActions.RESET_DELETE_COMMENT_RESPONSE_STATUS,
        }
      ];

      store.dispatch(conversationActions.resetDeleteCommentResponseStatus());

      expect(store.getActions()).toStrictEqual(expectedResetDeleteCommentResponseStatusActions);
    });
  });

  describe('getCommentPictureRequest', () => {
    test('Dispatch getCommentPictureRequest action with correct type and payload', () => {
      const expectedGetCommentPictureRequestActions = [
        {
          type: conversationActions.GET_COMMENT_PICTURE_REQUEST,
          payload: 123455,
        }
      ];

      store.dispatch(conversationActions.getCommentPictureRequest(123455));

      expect(store.getActions()).toStrictEqual(expectedGetCommentPictureRequestActions);
    });
  });

  describe('getCommentPictureResponseSuccess', () => {
    test('Dispatch getCommentPictureResponseSuccess action with correct type and payload', () => {
      const expectedGetCommentPictureResponseSuccessActions = [
        {
          type: conversationActions.GET_COMMENT_PICTURE_RESPONSE_SUCCESS,
          payload: { picture: '/9j/4AAQSkZJRgABAQAASABIAAD/4QBYRXhpZgAATU0AKgAAA'},
        }
      ];

      store.dispatch(conversationActions.getCommentPictureResponseSuccess(
        { picture: '/9j/4AAQSkZJRgABAQAASABIAAD/4QBYRXhpZgAATU0AKgAAA'},
      ));

      expect(store.getActions()).toStrictEqual(expectedGetCommentPictureResponseSuccessActions);
    });
  });

  describe('getCommentPictureResponseFailure', () => {
    test('Dispatch getCommentPictureResponseFailure action with correct type and payload', () => {
      const expectedGetCommentPictureResponseFailureActions = [
        {
          type: conversationActions.GET_COMMENT_PICTURE_RESPONSE_FAILURE,
          payload: 400,
        }
      ];

      store.dispatch(conversationActions.getCommentPictureResponseFailure(400));

      expect(store.getActions()).toStrictEqual(expectedGetCommentPictureResponseFailureActions);
    });
  });
});
