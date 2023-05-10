import task from 'src/reducers/task';

import {
  CLOSE_TASK,
  GET_TASK_DETAIL_RESPONSE,
  GET_TASK_DETAIL_STATUS,
  GET_TASK_COMMENTS,
  GET_TASK_COMMENTS_RESPONSE,
  GET_TASK_MESSAGES,
  GET_TASK_MESSAGES_RESPONSE,
  RESET_ADD_INFO_STATUS,
  RESET_TASK_APPLICABLE_STATUS,
  UPDATE_ADD_INFOS_RESPONSE,
  UPDATE_TASK_APPLICABLE_RESPONSE,
} from 'src/actions/taskActions';

import { DEFAULT, SUCCESS } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

describe('task Reducer', () => {
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

  describe('INITIAL_STATE', () => {
    test('Check correct initial state', () => {
      const action = { type: 'not_handle_action' };

      expect(task(undefined, action)).toEqual(initialState);
    });
  });

  describe('UPDATE_ADD_INFOS_RESPONSE', () => {
    test('Check correct state update', () => {
      const payload = { status: SUCCESS, statusCode: 200 };

      const action = { type: UPDATE_ADD_INFOS_RESPONSE, payload: payload };

      const stateResult = task(undefined, action);

      expect(stateResult.addInfoStatus).toEqual({ status: SUCCESS, statusCode: 200 });
    });
  });

  describe('RESET_ADD_INFO_STATUS', () => {
    test('Check correct status update', () => {
      const action = { type: RESET_ADD_INFO_STATUS };

      const stateResult = task(undefined, action);

      expect(stateResult.addInfoStatus).toStrictEqual({ status: DEFAULT, statusCode: 0 });
    });
  });

  describe('GET_TASK_DETAIL_RESPONSE', () => {
    test('Check correct status update', () => {
      const payload = [{ id: 12345, name: 'Test Get Task Detail Response Action' }];

      const action = { type: GET_TASK_DETAIL_RESPONSE, payload: payload };

      const stateResult = task(undefined, action);

      expect(stateResult.selectedTasksDetails).toStrictEqual(payload);
    });
  });

  describe('CLOSE_TASK', () => {
    test('Check correct status update', () => {
      const payload = [{ id: 12345, name: 'Test Close Task Card Action' }];

      const action = { type: CLOSE_TASK, payload: payload };

      const stateResult = task(undefined, action);

      expect(stateResult.selectedTasksDetails).toStrictEqual(payload);
    });
  });

  describe('GET_TASK_DETAIL_STATUS', () => {
    test('Check correct status update', () => {
      const payload = [{ taskId: 12345, statusCode: 200 }];

      const action = { type: GET_TASK_DETAIL_STATUS, payload: payload };

      const stateResult = task(undefined, action);

      expect(stateResult.taskDetailStatus).toStrictEqual(payload);
    });
  });

  describe('GET_TASK_COMMENTS', () => {
    test('Check correct state update', () => {
      const action = { type: GET_TASK_COMMENTS, payload: 12345 };

      const stateResult = task(undefined, action);

      expect(stateResult).toStrictEqual(initialState);
    });
  });

  describe('GET_TASK_COMMENTS_RESPONSE', () => {
    test('Check correct state update', () => {
      const action = { type: GET_TASK_COMMENTS_RESPONSE, payload: { taskId: 12345, status: SUCCESS }};

      const stateResult = task(undefined, action);

      expect(stateResult.taskCommentsRequestStatus).toStrictEqual({ taskId: 12345, status: SUCCESS });
    });
  });

  describe('GET_TASK_MESSAGES', () => {
    test('Check correct state update', () => {
      const action = { type: GET_TASK_MESSAGES, payload: 12345 };

      const stateResult = task(undefined, action);

      expect(stateResult).toStrictEqual(initialState);
    });
  });

  describe('GET_TASK_MESSAGES_RESPONSE', () => {
    test('Check correct state update', () => {
      const action = { type: GET_TASK_MESSAGES_RESPONSE, payload: { taskId: 12345, status: SUCCESS }};

      const stateResult = task(undefined, action);

      expect(stateResult.taskMessagesRequestStatus).toStrictEqual({ taskId: 12345, status: SUCCESS });
    });
  });
});
