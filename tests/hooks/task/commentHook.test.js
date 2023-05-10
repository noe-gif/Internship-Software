/**
 * @jest-environment jsdom
*/

import { renderHook, act } from '@testing-library/react-hooks'

import '@testing-library/jest-dom';

import commentHook from 'src/hooks/task/commentHook';

import { DEFAULT, LOADING, SUCCESS } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

const getTaskComments = () => {};
const sendTaskComment = () => {};
const deleteComment = () => {};

const selectedTasksDetails = [
  { id: 12345, comments: [{ taskId: 12345, comment: 'Testing hook' }] },
];
const task = { id: 12345, comments: [] };
const tasksCommentsStatus = { taskId: 12345, status: SUCCESS };

const turnaround = {
  id: 12345,
  normal_tasks_above_wing: [
    task,
  ],
  normal_tasks_below_wing: [],
};

const spyGetTaskComments = jest.fn(getTaskComments);
const spySendTaskComment = jest.fn(sendTaskComment);
const spyDeleteComment = jest.fn(deleteComment);

describe('COMMENT HOOK', () => {
  describe('commentsStatus state', () => {
    it('should initialize commentStatus with DEFAULT', () => {
      const { result } = renderHook(
        () => commentHook(
          deleteComment,
          getTaskComments,
          selectedTasksDetails,
          sendTaskComment,
          task,
          tasksCommentsStatus,
          turnaround,
        )
      );

      expect(result.current.commentsStatus).toStrictEqual(DEFAULT);
    });
  });

  describe('filteredTask state', () => {
    it('should initialize with task data', () => {
      const { result } = renderHook(
        () => commentHook(
          deleteComment,
          getTaskComments,
          selectedTasksDetails,
          sendTaskComment,
          task,
          tasksCommentsStatus,
          turnaround,
        )
      );

      expect(result.current.filteredTask).toStrictEqual(task);
    });
  });

  describe('checkTasksDetails function', () => {
    it('should be equal to task when selectedTasksDetails does not contain specific task', () => {
      const { result } = renderHook(
        () => commentHook(
          deleteComment,
          getTaskComments,
          [],
          sendTaskComment,
          task,
          tasksCommentsStatus,
          turnaround,
        )
      );

      act(() => {
        result.current.checkTasksDetails();
      });

      expect(result.current.filteredTask).toStrictEqual(task);
    });

    it('should equal to a new comment when selectedTasksDetails contain specific task', () => {
      const { result } = renderHook(
        () => commentHook(
          deleteComment,
          getTaskComments,
          selectedTasksDetails,
          sendTaskComment,
          task,
          tasksCommentsStatus,
          turnaround,
        )
      );

      act(() => {
        result.current.checkTasksDetails();
      });

      expect(result.current.filteredTask).toStrictEqual({ id: 12345, comments: [{ taskId: 12345, comment: 'Testing hook' }] });
    });

    it('should have called getTaskComment function when tasksCommentsStatus is null', () => {
      const { result } = renderHook(
        () => commentHook(
          deleteComment,
          spyGetTaskComments,
          selectedTasksDetails,
          sendTaskComment,
          task,
          null,
          turnaround,
        )
      );

      act(() => {
        result.current.checkTasksDetails();
      });

      expect(result.current.commentsStatus).toStrictEqual(LOADING);
      expect(spyGetTaskComments).toHaveBeenCalled();

      spyGetTaskComments.mockClear();
    });

    it('should have called getTaskComment function when tasksCommentsStatus does not contain specific task', () => {
      const { result } = renderHook(
        () => commentHook(
          deleteComment,
          spyGetTaskComments,
          selectedTasksDetails,
          sendTaskComment,
          task,
          { taskId: 56733, status: SUCCESS },
          turnaround,
        )
      );

      act(() => {
        result.current.checkTasksDetails();
      });

      expect(result.current.commentsStatus).toStrictEqual(LOADING);
      expect(spyGetTaskComments).toHaveBeenCalled();

      spyGetTaskComments.mockClear();
    });

    test('should have called getTaskComment function when tasksCommentsStatus contain specific task', () => {
      const { result } = renderHook(
        () => commentHook(
          deleteComment,
          spyGetTaskComments,
          selectedTasksDetails,
          sendTaskComment,
          task,
          tasksCommentsStatus,
          turnaround,
        )
      );

      act(() => {
        result.current.checkTasksDetails();
      });

      spyGetTaskComments.mockClear();

      act(() => {
        result.current.checkTasksDetails();
      });

      expect(result.current.commentsStatus).toStrictEqual(SUCCESS);
      expect(spyGetTaskComments).not.toHaveBeenCalled();

      spyGetTaskComments.mockClear();
    });
  });

  describe('handleSendComment function', () => {
    it('should have called sendTaskComment function only with comment content set', () => {
      const { result } = renderHook(
        () => commentHook(
          deleteComment,
          getTaskComments,
          selectedTasksDetails,
          spySendTaskComment,
          task,
          tasksCommentsStatus,
          turnaround,
        )
      );

      act(() => {
        result.current.handleSendComment({
          preventDefault: () => {}},
          { comment: 'Testing handleSendComment hook' },
        );
      });

      expect(spySendTaskComment).toHaveBeenCalledWith({
        taskId: 12345,
        data: { comment: 'Testing handleSendComment hook' },
      });

      spySendTaskComment.mockClear();
    });

    it('should have called sendTaskComment function only with picture content set', () => {
      const { result } = renderHook(
        () => commentHook(
          deleteComment,
          getTaskComments,
          selectedTasksDetails,
          spySendTaskComment,
          task,
          tasksCommentsStatus,
          turnaround,
        )
      );

      act(() => {
        result.current.handleSendComment({
          preventDefault: () => {}},
          { comment: '', picture: 'SGVsbG8gV29ybGQ=SGVsbG8gV29ybGQ' },
        );
      });

      expect(spySendTaskComment).toHaveBeenCalledWith({
        taskId: 12345,
        data: { comment: '', picture: 'SGVsbG8gV29ybGQ=SGVsbG8gV29ybGQ' },
      });

      spySendTaskComment.mockClear();
    });

    it('should have called sendTaskComment function with both comment and picture content set', () => {
      const { result } = renderHook(
        () => commentHook(
          deleteComment,
          getTaskComments,
          selectedTasksDetails,
          spySendTaskComment,
          task,
          tasksCommentsStatus,
          turnaround,
        )
      );

      act(() => {
        result.current.handleSendComment({
          preventDefault: () => {}},
          { comment: 'Testing handleSendComment hook', picture: 'SGVsbG8gV29ybGQ=SGVsbG8gV29ybGQ' },
        );
      });

      expect(spySendTaskComment).toHaveBeenCalledWith({
        taskId: 12345,
        data: { comment: 'Testing handleSendComment hook', picture: 'SGVsbG8gV29ybGQ=SGVsbG8gV29ybGQ' },
      });

      spySendTaskComment.mockClear();
    });
  });

  describe('handleDeleteComment function', () => {
    it('should have called deleteComment function with the commentId: 12344', () => {
      const { result } = renderHook(
        () => commentHook(
          spyDeleteComment,
          getTaskComments,
          selectedTasksDetails,
          spySendTaskComment,
          task,
          tasksCommentsStatus,
          turnaround,
        )
      );

      act(() => {
        result.current.handleDeleteComment(12344);
      });

      expect(spyDeleteComment).toHaveBeenCalledWith(12344);

      spyDeleteComment.mockClear();
    });
  });
});
