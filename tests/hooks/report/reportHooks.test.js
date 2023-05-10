/**
 * @jest-environment jsdom
*/

import { renderHook, act } from "@testing-library/react-hooks";

import '@testing-library/jest-dom';

import reportHooks from 'src/hooks/report/reportHooks';

const handleCloseReport = () => {};
const closeReportSubView = () => {};
const sendTurnaroundReport = () => {};

const free_form_fields = [
  { is_compulsory: false, field_name: 'test1' }
];

const free_form_fields_compulsory = [
  { is_compulsory: true, field_name: 'test1' }
];

const turnaroundCompleteInfos = [{ turnaroundId: 12345, turnaroundInfos: { id: 12345, is_close_report_sent: true }}];
const turnaroundCompleteInfosCloseReportTest = [{ turnaroundId: 12345, turnaroundInfos: { id: 12345, is_close_report_sent: false }}];
const turnaroundReports = [{ turnaroundId: 12345, turnaroundReport: { free_form_fields: free_form_fields } }];
const turnaroundReportsCompulsoryTest = [{ turnaroundId: 12345, turnaroundReport: { free_form_fields: free_form_fields_compulsory } }];
const turnaroundData = { id: 12345 };

const sendTurnaroundReportStatus = { turnaroundId: 12345, status: 'success' };
const sendTurnaroundReportStatusTestWrongId = { turnaroundId: 6789, status: 'success' };

const spyHandleCloseReport = jest.fn(handleCloseReport);
const spyCloseReportSubView = jest.fn(closeReportSubView);
const spySendTurnaroundReport = jest.fn(sendTurnaroundReport);

describe('REPORT HOOKS', () => { 
  describe('HandleBackButton function', () => {
    test('handleBackButton is function', () => {
      const { result } = renderHook(
        () => reportHooks(
          handleCloseReport,
          closeReportSubView,
          sendTurnaroundReport,
          sendTurnaroundReportStatus,
          turnaroundCompleteInfos,
          turnaroundReports,
          turnaroundData,
        )
      );

      expect(typeof result.current.handleBackButton).toBe('function');
    });

    test('check if handleCloseReport & closeReportSubView are called', () => {
      const { result } = renderHook(
        () => reportHooks(
          spyHandleCloseReport,
          spyCloseReportSubView,
          sendTurnaroundReport,
          sendTurnaroundReportStatus,
          turnaroundCompleteInfos,
          turnaroundReports,
          turnaroundData,
        )
      );

      act(() => {
        result.current.handleBackButton();
      });

      expect(spyHandleCloseReport).toBeCalledWith(false);
      expect(spyCloseReportSubView).toBeCalledWith([], []);

      spyHandleCloseReport.mockClear();
      spyCloseReportSubView.mockClear();
    });
  });

  describe('SendReport function', () => {
    test('sendReport is function', () => {
      const { result } = renderHook(
        () => reportHooks(
          handleCloseReport,
          closeReportSubView,
          sendTurnaroundReport,
          sendTurnaroundReportStatus,
          turnaroundCompleteInfos,
          turnaroundReports,
          turnaroundData,
        )
      );

      expect(typeof result.current.sendReport).toBe('function');
    });

    test('when param isOnlySaving is true', () => {
      const { result } = renderHook(
        () => reportHooks(
          handleCloseReport,
          closeReportSubView,
          spySendTurnaroundReport,
          sendTurnaroundReportStatus,
          turnaroundCompleteInfos,
          turnaroundReports,
          turnaroundData,
        )
      );

      act(() => {
        result.current.sendReport(true);
      });

      expect(spySendTurnaroundReport).toBeCalledWith({ turnaroundId: 12345, reportData: { delay_codes: [] }, onlySaving: true });

      spySendTurnaroundReport.mockClear();
    });

    test('when param isOnlySaving is false', () => {
      const { result } = renderHook(
        () => reportHooks(
          handleCloseReport,
          closeReportSubView,
          spySendTurnaroundReport,
          sendTurnaroundReportStatus,
          turnaroundCompleteInfos,
          turnaroundReports,
          turnaroundData,
        )
      );

      act(() => {
        result.current.sendReport(false);
      });

      expect(spySendTurnaroundReport).toBeCalledWith({ turnaroundId: 12345, reportData: { delay_codes: [] }, onlySaving: false });

      spySendTurnaroundReport.mockClear();
    });

    test('when compulsory field not entered', () => {
      const { result } = renderHook(
        () => reportHooks(
          handleCloseReport,
          closeReportSubView,
          spySendTurnaroundReport,
          sendTurnaroundReportStatus,
          turnaroundCompleteInfos,
          turnaroundReportsCompulsoryTest,
          turnaroundData,
        )
      );

      act(() => {
        result.current.sendReport(false);
      });

      expect(spySendTurnaroundReport).not.toHaveBeenCalled();

      spySendTurnaroundReport.mockClear();
    });
  });

  describe('isReportSaveStatus function', () => {
    test('isReportSaveStatus is function', () => {
      const { result } = renderHook(
        () => reportHooks(
          handleCloseReport,
          closeReportSubView,
          sendTurnaroundReport,
          sendTurnaroundReportStatus,
          turnaroundCompleteInfos,
          turnaroundReports,
          turnaroundData,
        )
      );

      expect(typeof result.current.isReportSaveStatus).toBe('function');
    });
    test('when status in argument match status in StatusData', () => {
      const { result } = renderHook(
        () => reportHooks(
          handleCloseReport,
          closeReportSubView,
          sendTurnaroundReport,
          sendTurnaroundReportStatus,
          turnaroundCompleteInfos,
          turnaroundReports,
          turnaroundData,
        )
      );

      const functionResult = result.current.isReportSaveStatus('success');

      expect(functionResult).toBeTruthy();
    });

    test('when status in argument does not match status in StatusData', () => {
      const { result } = renderHook(
        () => reportHooks(
          handleCloseReport,
          closeReportSubView,
          sendTurnaroundReport,
          sendTurnaroundReportStatus,
          turnaroundCompleteInfos,
          turnaroundReports,
          turnaroundData,
        )
      );

      const functionResult = result.current.isReportSaveStatus('false');

      expect(functionResult).toBeFalsy();
    });

    test('when id does not match turnaroundId in StatusData', () => {
      const { result } = renderHook(
        () => reportHooks(
          handleCloseReport,
          closeReportSubView,
          sendTurnaroundReport,
          sendTurnaroundReportStatusTestWrongId,
          turnaroundCompleteInfos,
          turnaroundReports,
          turnaroundData,
        )
      );

      const functionResult = result.current.isReportSaveStatus('success');

      expect(functionResult).toBeFalsy();
    });
  });

  describe('isReportAlreadySend function', () => {
    test('isReportAlreadySend is function', () => {
      const { result } = renderHook(
        () => reportHooks(
          handleCloseReport,
          closeReportSubView,
          sendTurnaroundReport,
          sendTurnaroundReportStatus,
          turnaroundCompleteInfos,
          turnaroundReports,
          turnaroundData,
        )
      );

      expect(typeof result.current.isReportAlreadySend).toBe('function');
    });

    test('when report is already send', () => {
      const { result } = renderHook(
        () => reportHooks(
          handleCloseReport,
          closeReportSubView,
          sendTurnaroundReport,
          sendTurnaroundReportStatus,
          turnaroundCompleteInfos,
          turnaroundReports,
          turnaroundData,
        )
      );

      const functionResult = result.current.isReportAlreadySend();

      expect(functionResult).toBeTruthy();
    });

    test('when report is not already send', () => {
      const { result } = renderHook(
        () => reportHooks(
          handleCloseReport,
          closeReportSubView,
          sendTurnaroundReport,
          sendTurnaroundReportStatus,
          turnaroundCompleteInfosCloseReportTest,
          turnaroundReports,
          turnaroundData,
        )
      );

      const functionResult = result.current.isReportAlreadySend();

      expect(functionResult).toBeFalsy();
    });
  });

  describe('areAnyCompulsoryAddInfosFilled function', () => {
    test('areAnyCompulsoryAddInfosFilled is function', () => {
      const { result } = renderHook(
        () => reportHooks(
          handleCloseReport,
          closeReportSubView,
          sendTurnaroundReport,
          sendTurnaroundReportStatus,
          turnaroundCompleteInfos,
          turnaroundReports,
          turnaroundData,
        )
      );

      expect(typeof result.current.areAnyCompulsoryAddInfosFilled).toBe('function');
    });

    test('when all compulsory fields are filled', () => {
      const { result } = renderHook(
        () => reportHooks(
          handleCloseReport,
          closeReportSubView,
          sendTurnaroundReport,
          sendTurnaroundReportStatus,
          turnaroundCompleteInfos,
          turnaroundReportsCompulsoryTest,
          turnaroundData,
        )
      );

      const resultFunction = result.current.areAnyCompulsoryAddInfosFilled({ test1: "Success" });

      expect(resultFunction).toBeTruthy();
    });

    test('when all compulsory fields are not filled', () => {
      const { result } = renderHook(
        () => reportHooks(
          handleCloseReport,
          closeReportSubView,
          sendTurnaroundReport,
          sendTurnaroundReportStatus,
          turnaroundCompleteInfos,
          turnaroundReportsCompulsoryTest,
          turnaroundData,
        )
      );

      const resultFunction = result.current.areAnyCompulsoryAddInfosFilled({});

      expect(resultFunction).toBeFalsy();
    });
  });
});
