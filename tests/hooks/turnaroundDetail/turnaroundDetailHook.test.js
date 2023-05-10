/**
 * @jest-environment jsdom
*/

import { renderHook, act } from '@testing-library/react-hooks'

import '@testing-library/jest-dom';

import turnaroundDetailHook from 'src/hooks/turnaroundDetail/turnaroundDetailHook';

const selectedTasksDetails = {
  name: "Crew at Counter",
  actual_end_datetime: "2021-12-05T16:53:00Z",
  actual_start_datetime: null,
  planned_end_datetime: "2021-12-05T22:02:00Z",
  planned_start_datetime: null,
  status: "Completed On Time",
  status_color: "#09af52",
};

describe('turnaroundDetailHooks', () => {
  describe('isViewSplit function', () => {
    it('should be a function', () => {
      const { result } = renderHook(
        () => turnaroundDetailHook(
          selectedTasksDetails,
          () => {},
          'large',
          () => {},
        )
      );

      expect(typeof result.current.isViewSplit).toBe('function');
    });
  });

  describe('hasSubViewActive function', () => {
    it('should be a function', () => {
      const { result } = renderHook(
        () => turnaroundDetailHook(
          selectedTasksDetails,
          () => {},
          'large',
          () => {},
        )
      );

      expect(typeof result.current.hasSubViewActive).toBe('function');
    });
  });

  describe('isDetailViewNotVisible', () => {
    it('should be a function', () => {
      const { result } = renderHook(
        () => turnaroundDetailHook(
          selectedTasksDetails,
          () => {},
          'large',
          () => {},
        )
      );

      expect(typeof result.current.isDetailViewNotVisible).toBe('function');
    });
  });

  describe('handleTaskSelection', () => {
    it('should be a function', () => {
      const { result } = renderHook(
        () => turnaroundDetailHook(
          selectedTasksDetails,
          () => {},
          'large',
          () => {},
        )
      );

      expect(typeof result.current.handleTaskSelection).toBe('function');
    });
  });

  describe('handleOpenReport', () => {
    it('should be a function', () => {
      const { result } = renderHook(
        () => turnaroundDetailHook(
          selectedTasksDetails,
          () => {},
          'large',
          () => {},
        )
      );

      expect(typeof result.current.handleOpenReport).toBe('function');
    });
  });

  describe('closeTurnaroundCompleteData', () => {
    it('should be a function', () => {
      const { result } = renderHook(
        () => turnaroundDetailHook(
          selectedTasksDetails,
          () => {},
          'large',
          () => {},
        )
      );

      expect(typeof result.current.closeTurnaroundCompleteData).toBe('function');
    });
  });
});