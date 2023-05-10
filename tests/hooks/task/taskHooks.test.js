/**
 * @jest-environment jsdom
*/

import { renderHook, act } from "@testing-library/react-hooks";

import '@testing-library/jest-dom';

import taskHooks from 'src/hooks/task/taskHooks';

import { SUCCESS } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

const closeTask = () => {};
const handleCloseTurnaround = () => {};
const handleTaskSelection = () => {};
const updateTaskApplicableValue = () => {};
const updateTaskTiming = () => {};

const spyHandleTaskSelection = jest.fn(handleTaskSelection);

const updatedTurnaround = {
  id: 12345,
  normal_tasks_above_wing: [
    {
      id: 334455,
      name: 'Jetbridge',
      actual_start_datetime: "2022-01-24T15:10:00Z",
    },
  ],
};

const taskToUpdate = {
  above_below_wing: "ABOVE_WING",
  id: 334455,
  name: 'Jetbridge',
  planned_start_datetime: "2022-01-24T15:20:00Z",
};

const updatedTask = {
  above_below_wing: "ABOVE_WING",
  actual_start_datetime: "2022-01-24T15:10:00Z",
  id: 334455,
  name: 'Jetbridge',
  planned_start_datetime: "2022-01-24T15:20:00Z",
};

const task = {
  actual_end_datetime: "2021-11-29T16:02:00Z",
  actual_start_datetime: "2021-11-29T16:01:50Z",
  id: 695293,
  planned_end_datetime: "2021-11-26T20:38:00Z",
  planned_start_datetime: "2021-11-26T20:08:00Z",
};

const selectedTasksDetails = [
  {
    actual_end_datetime: "2021-11-29T16:02:00Z",
    actual_start_datetime: "2021-11-29T15:01:50Z",
    id: 695293,
    planned_end_datetime: "2021-11-26T20:38:00Z",
    planned_start_datetime: "2021-11-26T20:08:00Z",
  }
];

describe('taskHooks', () => {
  describe('backTask function', () => {
    it('check is handleTaskSelection is called', () => {
      const { result } = renderHook(() => taskHooks(
        closeTask,
        handleCloseTurnaround,
        spyHandleTaskSelection,
        updateTaskApplicableValue,
        updateTaskTiming,
        selectedTasksDetails,
        task,
      ));

      act(() => {
        result.current.backToTurnaroundView();
      });

      expect(spyHandleTaskSelection).toHaveBeenCalled();
      spyHandleTaskSelection.mockClear();
    });
  });

  describe('extractUpdatedTaskFromTurnaround', () => {
    it('should set filteredTask when turnaroundTask has been updated and status is SUCCESS', () => {
      const { result } = renderHook(() => taskHooks(
        closeTask,
        handleCloseTurnaround,
        handleTaskSelection,
        updateTaskApplicableValue,
        updateTaskTiming,
        taskToUpdate,
        taskToUpdate,
      ));
      
      act(() => result.current.setFilteredTask(taskToUpdate));

      act(() => result.current.extractUpdatedTaskFromTurnaround(updatedTurnaround, [{ status: SUCCESS, taskId: taskToUpdate.id }]));

      expect(result.current.filteredTask).toStrictEqual(updatedTask);
    });

    it('should not set filteredTask when status is not SUCCESS', () => {
      const { result } = renderHook(() => taskHooks(
        closeTask,
        handleCloseTurnaround,
        handleTaskSelection,
        updateTaskApplicableValue,
        updateTaskTiming,
        taskToUpdate,
        taskToUpdate,
      ));
      
      act(() => result.current.setFilteredTask(taskToUpdate));

      act(() => result.current.extractUpdatedTaskFromTurnaround(updatedTurnaround, [{ status: 'not SUCCESS', taskId: taskToUpdate.id }]));

      expect(result.current.filteredTask).toStrictEqual(taskToUpdate);
    });
  });
});