/**
 * @jest-environment jsdom
*/

import '@testing-library/jest-dom';

import { renderHook } from 'tests/renderTimezoneFilter'

import taskProgressBarHooks from 'src/hooks/task/taskProgressBarHooks';

import {
  TASK_EMPTY_TIMING,
} from 'src/constants/tasks/tasksConstant';

const task = {
  actual_end_datetime: "2021-11-29T16:02:00Z",
  actual_start_datetime: "2021-11-29T16:01:50Z",
  id: 695293,
  planned_end_datetime: "2021-11-26T20:38:00Z",
  planned_start_datetime: "2021-11-26T20:08:00Z",
};

describe('taskProgressBarHooks', () => {
  describe('hasStartTimingTask function', () => {
    it('should return true when planned_start_datetime exists', () => {
      const { result } = renderHook(() => taskProgressBarHooks(null, () => {}, task, () => {}));

      expect(result.current.hasStartTimingTask()).toBeTruthy();
    });

    it('should return false when planned_start_datetime is not provide', () => {
      const { result } = renderHook(() => taskProgressBarHooks(
        null,
        () => {},
        { ...task, planned_start_datetime: null },
        () => {},
      ));

      expect(result.current.hasStartTimingTask()).toBeFalsy();
    });
  });

  describe('isDatePickerModalOpen state', () => {
    it('should be initialized to false', () => {
      const { result } = renderHook(() => taskProgressBarHooks(null, () => {}, task, () => {}));

      expect(result.current.isDatePickerModalOpen).toBeFalsy();
    });
  });
});
