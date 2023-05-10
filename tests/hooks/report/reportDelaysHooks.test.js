/**
 * @jest-environment jsdom
*/

import { renderHook, act } from "@testing-library/react-hooks";

import '@testing-library/jest-dom';

import reportDelaysHooks from 'src/hooks/report/reportDelaysHooks';

const setReportDelays = () => {};

const spySetReportDelays = jest.fn(setReportDelays);

describe('REPORT DELAYS HOOKS', () => {
  describe('onChangeDelayInput function', () => {
    test('onChangeDelayInput is function', () => {
      const { result } = renderHook(() => reportDelaysHooks(setReportDelays));

      expect(typeof result.current.onChangeDelayInput).toBe('function');
    });

    test('check if setReportDelays is called', () => {
      const { result } = renderHook(() => reportDelaysHooks(spySetReportDelays));

      act(() => {
        result.current.onChangeDelayInput({ target: { id: "Line1Duration", name: "Line1", value: "2" }, preventDefault: () => {}});
      });

      act(() => {
        result.current.onChangeDelayInput({ target: { id: "Line1", name: "Line1", value: "C23" }, preventDefault: () => {}});
      });

      expect(spySetReportDelays).toBeCalledWith([{ code: "C23", duration: 2 }]);
      spySetReportDelays.mockClear();
    });

    test('check result when a line is not complete', () => {
      const { result } = renderHook(() => reportDelaysHooks(spySetReportDelays));

      act(() => {
        result.current.onChangeDelayInput({ target: { id: "Line1Duration", name: "Line1", value: "2" }, preventDefault: () => {}});
      });

      expect(spySetReportDelays).toBeCalledWith([]);
      spySetReportDelays.mockClear();
    });
  });

  describe('setDelayLinesContent function', () => {
    test('setDelayLinesContent is function', () => {
      const { result } = renderHook(() => reportDelaysHooks(setReportDelays));

      expect(typeof result.current.setDelayLinesContent).toBe('function');
    });
  });
});
