import report from 'src/reducers/report';

import {
  SEND_TURNAROUND_REPORT,
  SEND_TURNAROUND_REPORT_RESPONSE,
} from 'src/actions/reportActions';

import { LOADING, SUCCESS } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

describe('report Reducer', () => {
  describe('INITIAL_STATE', () => {
    test('Check correct initial state', () => {
      const action = { type: 'not_handle_action' };
      const initialState = {
        sendTurnaroundReportStatus: {
          status: 'default',
          turnaroundId: 0,
        },
      };

      expect(report(undefined, action)).toEqual(initialState);
    });
  });

  describe('SEND TURNAROUND REPORT', () => {
    test('Check correct state update', () => {
      const payload = {
        turnaroundId: 12345,
        reportData: {
          comment: "New comment on report",
          delay_codes: [
            { code: "36B", duration: "15" }
          ],
          free_forms: {
            "Devs working on bugs": "3"
          },
        },
      };
      const action = { type: SEND_TURNAROUND_REPORT, payload: payload };

      const stateResult = report(undefined, action);

      expect(stateResult.sendTurnaroundReportStatus).toEqual({ status: LOADING, turnaroundId: 12345 });
    });
  });

  describe('SEND TURNAROUND REPORT RESPONSE', () => {
    test('Check correct state update', () => {
      const payload = {
        status: SUCCESS,
        turnaroundId: 12345,
      };
      const action = { type: SEND_TURNAROUND_REPORT_RESPONSE, payload: payload };

      const stateResult = report(undefined, action);

      expect(stateResult.sendTurnaroundReportStatus).toEqual({ status: SUCCESS, turnaroundId: 12345 });
    });
  });
});
