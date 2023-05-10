/**
 * @jest-environment jsdom
*/

import { renderHook, act } from '@testing-library/react-hooks'

import '@testing-library/jest-dom';

import messageHook from 'src/hooks/task/messageHook';

import { DEFAULT, LOADING, SUCCESS } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

const getTaskMessages = () => {};

const spyGetTaskMessages = jest.fn(getTaskMessages);

const selectedTasksDetails = [
  { id: 12345, messages: [{ taskId: 12345, message: 'Testing hook' }] },
];

const task = { id: 12345, messages: [] };

const tasksMessagesStatus = { taskId: 12345, status: SUCCESS };

const turnaround = {
  id: 12345,
  normal_tasks_above_wing: [
    task,
  ],
  normal_tasks_below_wing: [],
};

describe('MESSAGE HOOK', () => {
  describe('messagesStatus state', () => {
    it('should be initialized', () => {
      const { result } = renderHook(
        () => messageHook(
          getTaskMessages,
          selectedTasksDetails,
          task,
          tasksMessagesStatus,
          turnaround,
        )
      );

      expect(result.current.messagesStatus).toStrictEqual(DEFAULT);
    });
  });

  describe('filteredTask state', () => {
    it('should be initialized', () => {
      const { result } = renderHook(
        () => messageHook(
          getTaskMessages,
          selectedTasksDetails,
          task,
          tasksMessagesStatus,
          turnaround,
        )
      );

      expect(result.current.filteredTask).toStrictEqual(task);
    });
  });

  describe('checkSelectedTaskDetails function', () => {
    test('checkSelectedTaskDetails is function', () => {
      const { result } = renderHook(
        () => messageHook(
          getTaskMessages,
          selectedTasksDetails,
          task,
          tasksMessagesStatus,
          turnaround,
        )
      );
  
      expect(typeof result.current.checkSelectedTaskDetails).toBe('function');
    });

    test('when selectedTaskDetails does not contain specific task', () => {
      const { result } = renderHook(
        () => messageHook(
          getTaskMessages,
          [],
          task,
          tasksMessagesStatus,
          turnaround,
        )
      );

      act(() => {
        result.current.checkSelectedTaskDetails();
      });

      expect(result.current.filteredTask).toStrictEqual(task);
    });

    test('when selectedTaskDetails contain specific task', () => {
      const { result } = renderHook(
        () => messageHook(
          getTaskMessages,
          selectedTasksDetails,
          task,
          tasksMessagesStatus,
          turnaround,
        )
      );

      act(() => {
        result.current.checkSelectedTaskDetails();
      });

      expect(result.current.filteredTask).toStrictEqual({ id: 12345, messages: [{ taskId: 12345, message: 'Testing hook' }] });
    });

    test('when tasksMessagesStatus is null', () => {
      const { result } = renderHook(
        () => messageHook(
          spyGetTaskMessages,
          selectedTasksDetails,
          task,
          null,
          turnaround,
        )
      );

      act(() => {
        result.current.checkSelectedTaskDetails();
      });

      expect(result.current.messagesStatus).toStrictEqual(LOADING);
      expect(spyGetTaskMessages).toHaveBeenCalled();

      spyGetTaskMessages.mockClear();
    });

    test('when messagesStatus is DEFAULT', () => {
      const { result } = renderHook(
        () => messageHook(
          spyGetTaskMessages,
          selectedTasksDetails,
          task,
          tasksMessagesStatus,
          turnaround,
        )
      );

      act(() => {
        result.current.checkSelectedTaskDetails();
      });

      expect(spyGetTaskMessages).toHaveBeenCalledWith({ id: 12345, messages: [{ taskId: 12345, message: 'Testing hook' }] });
      expect(result.current.messagesStatus).toStrictEqual(LOADING);

      spyGetTaskMessages.mockClear();
    });

    test('when tasksMessagesStatus does not contain specific task', () => {
      const { result } = renderHook(
        () => messageHook(
          spyGetTaskMessages,
          selectedTasksDetails,
          task,
          { taskId: 56789, status: SUCCESS },
          turnaround,
        )
      );

      act(() => {
        result.current.checkSelectedTaskDetails();
      });

      expect(result.current.messagesStatus).toStrictEqual(LOADING);

      spyGetTaskMessages.mockClear();
    });

    test('when tasksMessagesStatus contain specific task', () => {
      const { result } = renderHook(
        () => messageHook(
          spyGetTaskMessages,
          selectedTasksDetails,
          task,
          tasksMessagesStatus,
          turnaround,
        )
      );

      act(() => {
        result.current.checkSelectedTaskDetails();
      });

      spyGetTaskMessages.mockClear();

      act(() => {
        result.current.checkSelectedTaskDetails();
      });

      expect(spyGetTaskMessages).not.toHaveBeenCalled();
      expect(result.current.messagesStatus).toStrictEqual(SUCCESS);

      spyGetTaskMessages.mockClear();
    });
  });
});
