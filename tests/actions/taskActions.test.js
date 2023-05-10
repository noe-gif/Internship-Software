import configureStore from 'redux-mock-store';

import { SUCCESS } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

import * as taskActions from 'src/actions/taskActions';

const mockStore = configureStore();
const store = mockStore();

describe('taskActions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('updateAddInfos', () => {
    test('Dispatch updateAddInfos action with correct type and payload', () => {
      const expectedUpdateAddInfosActions = [
        {
          type: taskActions.UPDATE_ADD_INFOS,
          payload: {
            addInfoId: 26832799,
            data: { value: true },
          },
        },
      ];
  
      store.dispatch(taskActions.updateAddInfos({
        addInfoId: 26832799,
        data: { value: true },
      }
      ));
  
      expect(store.getActions()).toStrictEqual(expectedUpdateAddInfosActions);
    });
  });

  describe('updateAddInfosResponse', () => {
    test('Dispatch updateAddInfosResponse action with correct type and payload', () => {
      const expectedUpdateAddInfosResponseActions = [
        {
          type: taskActions.UPDATE_ADD_INFOS_RESPONSE,
          payload: {
            status: 'success',
            statusCode: 200,
          },
        },
      ];
  
      store.dispatch(taskActions.updateAddInfosResponse({
        status: 'success',
        statusCode: 200,
      }
      ));
  
      expect(store.getActions()).toStrictEqual(expectedUpdateAddInfosResponseActions);
    });
  });

  describe('updateAddInfosResponse', () => {
    test('Dispatch updateAddInfosResponse action with correct type and payload', () => {
      const expectedUpdateAddInfosResponseActions = [
        {
          type: taskActions.UPDATE_ADD_INFOS_RESPONSE,
          payload: {
            status: 'success',
            statusCode: 200,
          },
        },
      ];
  
      store.dispatch(taskActions.updateAddInfosResponse({
        status: 'success',
        statusCode: 200,
      }
      ));
  
      expect(store.getActions()).toStrictEqual(expectedUpdateAddInfosResponseActions);
    });
  });

  describe('resetAddInfoStatus', () => {
    test('Dispatch resetAddInfoStatus action with correct type and payload', () => {
      const expectedResetAddInfoStatusActions = [
        {
          type: taskActions.RESET_ADD_INFO_STATUS,
        },
      ];
  
      store.dispatch(taskActions.resetAddInfoStatus());
  
      expect(store.getActions()).toStrictEqual(expectedResetAddInfoStatusActions);
    });
  });

  describe('getTaskDetail', () => {
    test('Dispatch getTaskDetail action with correct type and payload', () => {
      const expectedGetTaskDetailActions = [
        {
          type: taskActions.GET_TASK_DETAIL,
          payload: 543526,
        },
      ];
  
      store.dispatch(taskActions.getTaskDetail(543526));
  
      expect(store.getActions()).toStrictEqual(expectedGetTaskDetailActions);
    });
  });

  describe('getTaskDetailResponse', () => {
    test('Dispatch getTaskDetailResponse action with correct type and payload', () => {
      const expectedGetTaskDetailResponseActions = [
        {
          type: taskActions.GET_TASK_DETAIL_RESPONSE,
          payload: [],
        },
      ];
  
      store.dispatch(taskActions.getTaskDetailResponse([]));
  
      expect(store.getActions()).toStrictEqual(expectedGetTaskDetailResponseActions);
    });
  });

  describe('closeTask', () => {
    test('Dispatch closeTask action with correct type and payload', () => {
      const expectedCloseTaskActions = [
        {
          type: taskActions.CLOSE_TASK,
          payload: [],
        },
      ];
  
      store.dispatch(taskActions.closeTask([]));
  
      expect(store.getActions()).toStrictEqual(expectedCloseTaskActions);
    });
  });

  describe('getTaskDetailStatus', () => {
    test('Dispatch getTaskDetailStatus action with correct type and payload', () => {
      const expectedGetTaskDetailStatusActions = [
        {
          type: taskActions.GET_TASK_DETAIL_STATUS,
          payload: [{status: 'success', statusCode: 200, taskId: 12345}],
        },
      ];
  
      store.dispatch(taskActions.getTaskDetailStatus([{status: 'success', statusCode: 200, taskId: 12345}]));
  
      expect(store.getActions()).toStrictEqual(expectedGetTaskDetailStatusActions);
    });
  });

  describe('updateTaskApplicableValue', () => {
    test('Dispatch updateTaskApplicableValue action with correct type and payload', () => {
      const expectedUpdateTaskApplicableValueActions = [
        {
          type: taskActions.UPDATE_TASK_APPLICABLE_VALUE,
          payload: {
            taskId: 12345,
            data: { is_applicable: true }
          },
        },
      ];
  
      store.dispatch(taskActions.updateTaskApplicableValue({ taskId: 12345, data: { is_applicable: true } }));
  
      expect(store.getActions()).toStrictEqual(expectedUpdateTaskApplicableValueActions);
    });
  });

  describe('updateTaskTiming', () => {
    test('Dispatch updateTaskTiming action with correct type and payload', () => {
      const expectedUpdateTaskTimingActions = [
        {
          type: taskActions.UPDATE_TASK_TIMING,
          payload: {
            taskId: 12345,
            task: { actual_start_datetime: "2021-11-19T14:06Z" }
          },
        },
      ];
  
      store.dispatch(taskActions.updateTaskTiming({
        taskId: 12345,
        task: { actual_start_datetime: "2021-11-19T14:06Z" }
      }));
  
      expect(store.getActions()).toStrictEqual(expectedUpdateTaskTimingActions);
    });
  });

  describe('updateTaskTimingResponse', () => {
    test('Dispatch updateTaskTimingResponse action with correct type and payload', () => {
      const expectedUpdateTaskTimingResponseActions = [
        {
          type: taskActions.UPDATE_TASK_TIMING_RESPONSE,
          payload: { status: 'success', statusCode: 200 },
        },
      ];
  
      store.dispatch(taskActions.updateTaskTimingResponse({ status: 'success', statusCode: 200 }));
  
      expect(store.getActions()).toStrictEqual(expectedUpdateTaskTimingResponseActions);
    });
  });

  describe('resetTaskTimingStatus', () => {
    test('Dispatch resetTaskTimingStatus action with correct type and payload', () => {
      const expectedResetTaskTimingStatusActions = [
        {
          type: taskActions.RESET_TASK_TIMING_STATUS,
        },
      ];
  
      store.dispatch(taskActions.resetTaskTimingStatus());
  
      expect(store.getActions()).toStrictEqual(expectedResetTaskTimingStatusActions);
    });
  });

  describe('resetProgressBarTimingStatus', () => {
    test('Dispatch resetProgressBarTimingStatus action with correct type and payload', () => {
      const expectedResetProgressBarTimingStatusActions = [
        {
          type: taskActions.RESET_PROGRESS_BAR_TIMING_STATUS,
        },
      ];
  
      store.dispatch(taskActions.resetProgressBarTimingStatus());
  
      expect(store.getActions()).toStrictEqual(expectedResetProgressBarTimingStatusActions);
    });
  });

  describe('refreshTaskData', () => {
    test('Dispatch refreshTaskData action with correct type and payload', () => {
      const expectedRefreshTaskDataActions = [
        {
          type: taskActions.REFRESH_TASK_DATA,
          payload: {
            id: 12345,
            name: 'Test Refresh Task Data',
          }
        }
      ];

      store.dispatch(taskActions.refreshTaskData({ id: 12345, name: 'Test Refresh Task Data' }));

      expect(store.getActions()).toStrictEqual(expectedRefreshTaskDataActions);
    });
  });

  describe('getTaskComments', () => {
    test('Dispatch getTaskComments action with correct type and payload', () => {
      const expectedGetTaskCommentsActions = [
        {
          type: taskActions.GET_TASK_COMMENTS,
          payload: { id: 12345 },
        },
      ];

      store.dispatch(taskActions.getTaskComments({ id: 12345 }));

      expect(store.getActions()).toStrictEqual(expectedGetTaskCommentsActions);
    });
  });

  describe('getTaskCommentsResponse', () => {
    test('Dispatch getTasksCommentsResponse', () => {
      const expectedGetTaskCommentsResponseActions = [
        {
          type: taskActions.GET_TASK_COMMENTS_RESPONSE,
          payload: {
            taskId: 12345,
            status: SUCCESS,
          },
        },
      ];

      store.dispatch(taskActions.getTaskCommentsResponse({ taskId: 12345, status: SUCCESS }));

      expect(store.getActions()).toStrictEqual(expectedGetTaskCommentsResponseActions);
    });
  });

  describe('getTaskMessages', () => {
    test('Dispatch getTaskMessages action with correct type and payload', () => {
      const expectedGetTaskMessagesActions = [
        {
          type: taskActions.GET_TASK_MESSAGES,
          payload: { id: 12345 },
        },
      ];

      store.dispatch(taskActions.getTaskMessages({ id: 12345 }));

      expect(store.getActions()).toStrictEqual(expectedGetTaskMessagesActions);
    });
  });

  describe('getTaskMessagesResponse', () => {
    test('Dispatch getTasksMessagesResponse', () => {
      const expectedGetTaskMessagesResponseActions = [
        {
          type: taskActions.GET_TASK_MESSAGES_RESPONSE,
          payload: {
            taskId: 12345,
            status: SUCCESS,
          },
        },
      ];

      store.dispatch(taskActions.getTaskMessagesResponse({ taskId: 12345, status: SUCCESS }));

      expect(store.getActions()).toStrictEqual(expectedGetTaskMessagesResponseActions);
    });
  });
});
