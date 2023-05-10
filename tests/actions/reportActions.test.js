import configureStore from 'redux-mock-store';

import * as reportActions from 'src/actions/reportActions';

const mockStore = configureStore();
const store = mockStore();

describe('reportActions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('sendTurnaroundReport', () => {
    test('Dispatch sendTurnaroundReport action with correct type and payload', () => {
      const expectedSendTurnaroundReportActions = [
        {
          type: reportActions.SEND_TURNAROUND_REPORT,
          payload: {
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
            onlySaving: false,
          },
        },
      ];

      store.dispatch(reportActions.sendTurnaroundReport({
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
        onlySaving: false,
      }
      ));

      expect(store.getActions()).toStrictEqual(expectedSendTurnaroundReportActions);
    });

    test('Dispatch sendTurnaroundReport action with correct type and payload + only_saving', () => {
      const expectedSendTurnaroundReportActions = [
        {
          type: reportActions.SEND_TURNAROUND_REPORT,
          payload: {
            turnaroundId: 12345,
            reportData: {
              comment: "New comment on report",
              delay_codes: [
                { code: "36B", duration: "15" }
              ],
              free_forms: {
                "Devs working on bugs": "3"
              }
            },
            onlySaving: true,
          },
        },
      ];

      store.dispatch(reportActions.sendTurnaroundReport({
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
        onlySaving: true,
      }
      ));

      expect(store.getActions()).toStrictEqual(expectedSendTurnaroundReportActions);
    });
  });

  describe('sendTurnaroundReportResponse', () => {
    test('Dispatch sendTurnaroundReportResponse action with correct type and payload', () => {
      const expectedSendTurnaroundReportResponseActions = [
        {
          type: reportActions.SEND_TURNAROUND_REPORT_RESPONSE,
          payload: {
            status: 'success',
            turnaroundId: 12345,
          },
        },
      ];

      store.dispatch(reportActions.sendTurnaroundReportResponse({
        status: 'success',
        turnaroundId: 12345,
      }
      ));

      expect(store.getActions()).toStrictEqual(expectedSendTurnaroundReportResponseActions);
    });
  });
});
