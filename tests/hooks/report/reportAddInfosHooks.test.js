/** 
 * @jest-environment jsdom
*/

import { renderHook, act } from "@testing-library/react-hooks";

import '@testing-library/jest-dom';

import reportAddInfosHooks from 'src/hooks/report/reportAddInfosHooks';

const free_form_fields = [
  { is_compulsory: true, field_name: 'checkbox1', field_type: 'checkbox' },
  { is_compulsory: false, field_name: 'checkbox2', field_type: 'checkbox' }
];

const turnaroundCompleteInfos = { turnaroundId: 12345, turnaroundInfos: { id: 12345 } };
const turnaroundCompleteInfosTestCloseInformation = { turnaroundId: 12345, turnaroundInfos: { id: 12345, close_information: { text1: "Test1" } } };
const turnaroundReports = { turnaroundId: 12345, turnaroundReport: { free_form_fields: free_form_fields } };

const dataToCheckTestComplete = { Text1: "Test1", Checkbox1: 'true' };
const dataToCheckNotMatching = { Text1: "Test1", Number1: "2" };

const setReportFreeForm = () => {};
const preventDefault = () => {};

const spySetReportFreeForm = jest.fn(setReportFreeForm);
const spyPreventDefault = jest.fn(preventDefault);

describe('REPORT ADD INFOS HOOKS', () => {
  describe('fillCheckBoxField function', () => {
    test('fillCheckBoxField is function', () => {
      const { result } = renderHook(
        () => reportAddInfosHooks(
          {},
          setReportFreeForm,
          turnaroundReports,
          turnaroundCompleteInfos,
        )
      );

      expect(typeof result.current.fillCheckBoxField).toBe('function');
    });

    test('setReportFreeForm is called', () => {
      const { result } = renderHook(
        () => reportAddInfosHooks(
          {},
          spySetReportFreeForm,
          turnaroundReports,
          turnaroundCompleteInfos,
        )
      );

      act(() => {
        result.current.fillCheckBoxField();
      });

      expect(spySetReportFreeForm).toBeCalledWith({ checkbox1: "false", checkbox2: "false" });

      spySetReportFreeForm.mockClear();
    });

    test('when turnaroundInfo already has close_information', () => {
      const { result } = renderHook(
        () => reportAddInfosHooks(
          {},
          spySetReportFreeForm,
          turnaroundReports,
          turnaroundCompleteInfosTestCloseInformation,
        )
      );

      act(() => { result.current.fillCheckBoxField(); });

      expect(spySetReportFreeForm).toBeCalledWith({ checkbox1: "false", checkbox2: "false", text1: "Test1" });
      spySetReportFreeForm.mockClear();
    });
  });

  describe('changeReportFreeFormCheckbox function', () => {
    test('changeReportFreeFormCheckbox is function', () => {
      const { result } = renderHook(
        () => reportAddInfosHooks(
          {},
          setReportFreeForm,
          turnaroundReports,
          turnaroundCompleteInfosTestCloseInformation,
        )
      );

      expect(typeof result.current.changeReportFreeFormCheckbox).toBe('function');
    });

    test('check setReportFreeForm has been called', () => {
      const { result } = renderHook(
        () => reportAddInfosHooks(
          {},
          spySetReportFreeForm,
          turnaroundReports,
          turnaroundCompleteInfosTestCloseInformation,
        )
      );

      act(() => { result.current.changeReportFreeFormCheckbox({target: { checked: true }, preventDefault: preventDefault}, 'checkbox1') });

      expect(spySetReportFreeForm).toBeCalledWith({ checkbox1: "true" });

      spySetReportFreeForm.mockClear();
    });

    test('check preventDefault has been called', () => {
      const { result } = renderHook(
        () => reportAddInfosHooks(
          {},
          setReportFreeForm,
          turnaroundReports,
          turnaroundCompleteInfosTestCloseInformation,
        )
      );

      act(() => { result.current.changeReportFreeFormCheckbox({ target: { checked: true }, preventDefault: spyPreventDefault }, 'checkbox1') });

      expect(spyPreventDefault).toBeCalled();

      spyPreventDefault.mockClear();
    });
  });

  describe('changeReportFreeForm function', () => {
    test('changeReportFreeForm is function', () => {
      const { result } = renderHook(
        () => reportAddInfosHooks(
          {},
          setReportFreeForm,
          turnaroundReports,
          turnaroundCompleteInfos,
        )
      );

      expect(typeof result.current.changeReportFreeForm).toBe('function');
    });

    test('check setReportFreeForm has been called', () => {
      const { result } = renderHook(
        () => reportAddInfosHooks(
          {},
          spySetReportFreeForm,
          turnaroundReports,
          turnaroundCompleteInfos,
        )
      );

      act(() => { result.current.changeReportFreeForm({target: { value: "Test1" }, preventDefault: preventDefault}, 'Text1') });

      expect(spySetReportFreeForm).toBeCalledWith({ Text1: "Test1" });

      spySetReportFreeForm.mockClear();
    });

    test('check preventDefault has been called', () => {
      const { result } = renderHook(
        () => reportAddInfosHooks(
          {},
          setReportFreeForm,
          turnaroundReports,
          turnaroundCompleteInfos,
        )
      );

      act(() => { result.current.changeReportFreeForm({ target: { value: "Test2" }, preventDefault: spyPreventDefault }, 'Text2') });

      expect(spyPreventDefault).toBeCalled();

      spyPreventDefault.mockClear();
    });
  });

  describe('checkAlreadyCompletedReport function', () => {
    test('checkAlreadyCompletedReport is function', () => {
      const { result } = renderHook(
        () => reportAddInfosHooks(
          {},
          setReportFreeForm,
          turnaroundReports,
          turnaroundCompleteInfos,
        )
      );

      expect(typeof result.current.checkAlreadyCompletedReport).toBe('function');
    });

    test('when dataToCheck exist', () => {
      const { result } = renderHook(
        () => reportAddInfosHooks(
          {},
          setReportFreeForm,
          turnaroundReports,
          turnaroundCompleteInfos,
        )
      );

      const resultFunction = result.current.checkAlreadyCompletedReport(dataToCheckTestComplete, "Text1", "empty");

      expect(resultFunction).toStrictEqual("Test1");
    });

    test('when dataToCheck does not match fieldTitle', () => {
      const { result } = renderHook(
        () => reportAddInfosHooks(
          {},
          setReportFreeForm,
          turnaroundReports,
          turnaroundCompleteInfos,
        )
      );

      const resultFunction = result.current.checkAlreadyCompletedReport(dataToCheckNotMatching, "Text3", "empty");

      expect(resultFunction).toStrictEqual(undefined);
    });

    test('when dataToCheck is null', () => {
      const { result } = renderHook(
        () => reportAddInfosHooks(
          {},
          setReportFreeForm,
          turnaroundReports,
          turnaroundCompleteInfos,
        )
      );

      const resultFunction = result.current.checkAlreadyCompletedReport(null, "Text1", "empty");

      expect(resultFunction).toStrictEqual("empty");
    });
  });

  describe('checkAlreadyCompletedReportCheckbox function', () => {
    test('checkAlreadyCompletedReportCheckbox is function', () => {
      const { result } = renderHook(
        () => reportAddInfosHooks(
          {},
          setReportFreeForm,
          turnaroundReports,
          turnaroundCompleteInfos,
        )
      );

      expect(typeof result.current.checkAlreadyCompletedReportCheckbox).toBe('function');
    });

    test('when dataToCheck exist', () => {
      const { result } = renderHook(
        () => reportAddInfosHooks(
          {},
          setReportFreeForm,
          turnaroundReports,
          turnaroundCompleteInfos,
        )
      );

      const resultFunction = result.current.checkAlreadyCompletedReportCheckbox(dataToCheckTestComplete, "Checkbox1");

      expect(resultFunction).toBeTruthy();
    });

    test('when dataToCheck does not match fieldTitle', () => {
      const { result } = renderHook(
        () => reportAddInfosHooks(
          {},
          setReportFreeForm,
          turnaroundReports,
          turnaroundCompleteInfos,
        )
      );

      const resultFunction = result.current.checkAlreadyCompletedReportCheckbox(dataToCheckNotMatching, "Checkbox1");

      expect(resultFunction).toBeFalsy();
    });

    test('when dataToCheck is null', () => {
      const { result } = renderHook(
        () => reportAddInfosHooks(
          {},
          setReportFreeForm,
          turnaroundReports,
          turnaroundCompleteInfos,
        )
      );

      const resultFunction = result.current.checkAlreadyCompletedReportCheckbox(null, "Checkbox1");

      expect(resultFunction).toBeFalsy();
    });
  });
});
