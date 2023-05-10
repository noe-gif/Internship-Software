/**
 * @jest-environment jsdom
*/

import { renderHook, act } from '@testing-library/react-hooks'

import '@testing-library/jest-dom';

import turnaroundsDetailsHook from 'src/hooks/turnaroundDetail/turnaroundsDetailsHook';

const closeDetailView = () => {};

const spyCloseDetailView = jest.fn(closeDetailView);

describe('turnaroundsDetailsHook', () => {
  describe('handleCloseDetailView function', () => {
    it('should be a function', () => {
      const { result } = renderHook(
        () => turnaroundsDetailsHook(
          closeDetailView,
          [],
          [],
        ),
      );

      expect(typeof result.current.handleCloseDetailView).toBe('function');
    });

    it('should call closeDetailView', () => {
      const { result } = renderHook(
        () => turnaroundsDetailsHook(
          spyCloseDetailView,
          [],
          [{ id: 12345, name: 'Test from hooks' }, { id: 5678, name: "Last one In array" }],
        ),
      );

      act(() => {
        result.current.handleCloseDetailView({ id: 12345 });
      });

      expect(spyCloseDetailView).toBeCalledWith([{ id: 5678, name: "Last one In array" }]);

      spyCloseDetailView.mockClear();
    });

    test('when turnaround in param does not match selectedTurnarounds', () => {
      const { result } = renderHook(
        () => turnaroundsDetailsHook(
          spyCloseDetailView,
          [],
          [{ id: 12345, name: 'Test from hooks' }],
        ),
      );

      act(() => {
        result.current.handleCloseDetailView({ id: 54321 });
      });

      expect(spyCloseDetailView).not.toHaveBeenCalled();

      spyCloseDetailView.mockClear();
    });
  });

  describe('Testing extractTurnaroundDetail function', () => {
    it('should be a function', () => {
      const { result } = renderHook(
        () => turnaroundsDetailsHook(
          closeDetailView,
          [],
          [],
        ),
      );

      expect(typeof result.current.extractTurnaroundDetail).toBe('function');
    });

    test('when selectedTurnaroundDetail match turnaround in param', () => {
      const { result } = renderHook(
        () => turnaroundsDetailsHook(
          closeDetailView,
          [{ id: 12345, name: "Complete Turnaround", status: "Incoming" }],
          [],
        ),
      );

      const functionResult = result.current.extractTurnaroundDetail({ id: 12345 });

      expect(functionResult).toStrictEqual({ id: 12345, name: "Complete Turnaround", status: "Incoming" });
    });

    test('when selectedTurnaroundDetail does not match turnaround in params', () => {
      const { result } = renderHook(
        () => turnaroundsDetailsHook(
          closeDetailView,
          [{ id: 12345, name: "Complete Turnaround", status: "Incoming" }],
          [],
        ),
      );

      const functionResult = result.current.extractTurnaroundDetail({ id: 67890 });

      expect(functionResult).toStrictEqual({ id: 67890 });
    });
  });

  describe('Testing componentSize state', () => {
    test('useState assignment', () => {
      const { result } = renderHook(
        () => turnaroundsDetailsHook(
          closeDetailView,
          [],
          [],
        ),
      );

      expect(result.current.componentSize).toStrictEqual('large');
    });
  });
});
