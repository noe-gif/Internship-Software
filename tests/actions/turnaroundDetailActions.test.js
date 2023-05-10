import configureStore from 'redux-mock-store';

import * as turnaroundDetailActions from 'src/actions/turnaroundDetailActions';

const mockStore = configureStore();
const store = mockStore();

describe('turnaroundDetailActions', () => {
  beforeEach(() => {
    store.clearActions();// Is used to remove all actions in store before each test
  });

  describe('getTurnaroundDetailsRequest', () => {
    test('Dispatch getTurnaroundDetailsRequest action with correct type and payload', () => {
      const expectedGetTurnaroundDetailsRequestActions = [
        {
          type: turnaroundDetailActions.GET_TURNAROUND_DETAILS_REQUEST,
          payload: [{
            selectedTurnarounds: { id: 1999 },
            date: "2021-09-22T00:00:00Z",
          }],
        },
      ];

      store.dispatch(turnaroundDetailActions.getTurnaroundDetailsRequest([{
        selectedTurnarounds: { id: 1999 },
        date: "2021-09-22T00:00:00Z",
      }]));

      expect(store.getActions()).toStrictEqual(expectedGetTurnaroundDetailsRequestActions);
    });
  });

  describe('getTurnaroundDetailsResponse', () => {
    test('Dispatch getTurnaroundDetailsResponse action with correct type and payload', () => {
      const expectedGetTurnaroundDetailsResponseActions = [
        {
          type: turnaroundDetailActions.GET_TURNAROUND_DETAILS_RESPONSE,
          payload: [{
            id: 1999
          }]
        }
      ];

      store.dispatch(turnaroundDetailActions.getTurnaroundDetailsResponse([{
        id: 1999,
      }]));

      expect(store.getActions()).toStrictEqual(expectedGetTurnaroundDetailsResponseActions);
    });
  });

  describe('quitTurnaroundView', () => {
    test('Dispatch quitTurnaroundView action with correct type', () => {
      const expectedQuitTurnaroundViewActions = [
        {
          type: turnaroundDetailActions.QUIT_TURNAROUND_VIEW,
        },
      ];

      store.dispatch(turnaroundDetailActions.quitTurnaroundView());

      expect(store.getActions()).toStrictEqual(expectedQuitTurnaroundViewActions);
    });
  });

  describe('closeDetailView', () => {
    test('Dispatch closeDetailView action with correct type and payload', () => {
      const expectedCloseDetailViewActions = [
        {
          type: turnaroundDetailActions.CLOSE_DETAIL_VIEW,
          payload: [{
            id: 1999,
          }],
        }
      ];

      store.dispatch(turnaroundDetailActions.closeDetailView([{ id: 1999 }]));
      
      expect(store.getActions()).toStrictEqual(expectedCloseDetailViewActions);
    });
  });

  describe('getTurnaroundReportRequest', () => {
    test('Dispatch getTurnaroundReportRequest action with correct type and payload', () => {
      const expectedGetTurnaroundReportRequestActions = [
        {
          type: turnaroundDetailActions.GET_TURNAROUND_REPORT_REQUEST,
          payload: 1999,
        },
      ];

      store.dispatch(turnaroundDetailActions.getTurnaroundReportRequest(1999));
      
      expect(store.getActions()).toStrictEqual(expectedGetTurnaroundReportRequestActions);
    });
  });

  describe('getTurnaroundReportResponse', () => {
    test('Dispatch getTurnaroundReportResponse action with correct type and payload', () => {
      const expectedGetTurnaroundReportResponseActions = [
        {
          type: turnaroundDetailActions.GET_TURNAROUND_REPORT_RESPONSE,
          payload: [
            {
              turnaroundId: 1999,
              turnaroundReportFormat: { id: 1 },
            },
          ],
        },
      ];

      store.dispatch(turnaroundDetailActions.getTurnaroundReportResponse([
        {
          turnaroundId: 1999,
          turnaroundReportFormat: { id: 1 },
        },
      ]));

      expect(store.getActions()).toStrictEqual(expectedGetTurnaroundReportResponseActions);
    });
  });

  describe('closeReportSubView', () => {
    test('Dispatch closeReportSubView action with correct type and payload', () => {
      const expectedCloseReportSubViewActions = [
        {
          type: turnaroundDetailActions.CLOSE_REPORT_SUB_VIEW,
          payload: {
            turnaroundReports: [{ id: 1999 }],
            turnaroundComplete: [{ id: 1999 }],
          },
        },
      ];

      store.dispatch(turnaroundDetailActions.closeReportSubView(
        [{ id: 1999 }],
        [{ id: 1999 }],
      ));

      expect(store.getActions()).toStrictEqual(expectedCloseReportSubViewActions);
    });
  });

  describe('getTurnaroundAllInfoRequest', () => {
    test('Dispatch getTurnaroundAllInfoRequest action with correct type and payload', () => {
      const expectedGetTurnaroundAllInfoRequestActions = [
        {
          type: turnaroundDetailActions.GET_TURNAROUND_ALL_INFOS_REQUEST,
          payload: 1999,
        },
      ];

      store.dispatch(turnaroundDetailActions.getTurnaroundAllInfoRequest(1999));

      expect(store.getActions()).toStrictEqual(expectedGetTurnaroundAllInfoRequestActions);
    });
  });

  describe('getTurnaroundAllInfosResponse', () => {
    test('Dispatch getTurnaroundAllInfosResponse action with correct type and payload', () => {
      const expectedGetTurnaroundAllInfosResponseActions = [
        {
          type: turnaroundDetailActions.GET_TURNAROUND_ALL_INFOS_RESPONSE,
          payload: [
            {
              turnaroundId: 1999,
              turnaroundInfos: { id: 1 },
            },
          ],
        },
      ];

      store.dispatch(turnaroundDetailActions.getTurnaroundAllInfosResponse([
        {
          turnaroundId: 1999,
          turnaroundInfos: { id: 1 },
        },
      ]));

      expect(store.getActions()).toStrictEqual(expectedGetTurnaroundAllInfosResponseActions);
    });
  });

  describe('updateFlightTiming', () => {
    test('Dispatch updateFlightTiming action with correct type and payload', () => {
      const expectedUpdateFlightTimingActions = [
        {
          type: turnaroundDetailActions.UPDATE_FLIGHT_TIMING,
          payload: {
            turnaroundId: 12345,
            turnaround: { "actual_gate_departure_datetime": "2021-10-16T21:31:00Z" },
          },
        },
      ];
  
      store.dispatch(turnaroundDetailActions.updateFlightTiming({
        turnaroundId: 12345,
        turnaround: { "actual_gate_departure_datetime": "2021-10-16T21:31:00Z" }
      }
      ));
  
      expect(store.getActions()).toStrictEqual(expectedUpdateFlightTimingActions);
    });
  });
  
  describe('updateFlightTimingResponse', () => {
    test('Dispatch updateFlightTimingResponse action with correct type and payload', () => {
      const expectedUpdateFlightTimingResponseActions = [
        {
          type: turnaroundDetailActions.UPDATE_FLIGHT_TIMING_RESPONSE,
          payload: {
            status: 'success',
            statusCode: 200,
          },
        },
      ];
  
      store.dispatch(turnaroundDetailActions.updateFlightTimingResponse({
        status: 'success',
        statusCode: 200,
      }
      ));
  
      expect(store.getActions()).toStrictEqual(expectedUpdateFlightTimingResponseActions);
    });
  });
  
  describe('resetFlightTimingStatus', () => {
    test('Dispatch resetFlightTimingStatus action with correct type and payload', () => {
      const expectedResetFlightTimingStatusActions = [
        {
          type: turnaroundDetailActions.RESET_FLIGHT_TIMING_STATUS,
        },
      ];
  
      store.dispatch(turnaroundDetailActions.resetFlightTimingStatus());
  
      expect(store.getActions()).toStrictEqual(expectedResetFlightTimingStatusActions);
    });
  });

  describe('refreshSelectedTurnaroundDetail', () => {
    test('Dispatch refreshSelectedTurnaroundDetail action with correct type and payload', () => {
      const expectedRefreshSelectedTurnaroundDetailActions = [
        {
          type: turnaroundDetailActions.REFRESH_SELECTED_TURNAROUND_DETAIL,
          payload: { id: 12345 },
        },
      ];

      store.dispatch(turnaroundDetailActions.refreshSelectedTurnaroundDetail({ id: 12345 }));

      expect(store.getActions()).toStrictEqual(expectedRefreshSelectedTurnaroundDetailActions);
    });
  });

  describe('updateParkingStand', () => {
    test('Dispatch updateParkingStand action with correct type and payload', () => {
      const expectedUpdateParkingStandActions = [
        {
          type: turnaroundDetailActions.UPDATE_PARKING_STAND,
          payload: {
            turnaround: { parking_stand_departure: 'TT34' },
            turnaroundId: 12344
           },
        },
      ];

      store.dispatch(turnaroundDetailActions.updateParkingStand({
        turnaround: { parking_stand_departure: 'TT34' },
        turnaroundId: 12344,
      }));

      expect(store.getActions()).toStrictEqual(expectedUpdateParkingStandActions);
    });
  });

  describe('updateParkingStandResponse', () => {
    test('Dispatch updateParkingStandResponse action with correct type and payload', () => {
      const expectedUpdateParkingStandResponseActions = [
        {
          type: turnaroundDetailActions.UPDATE_PARKING_STAND_RESPONSE,
          payload: {
            status: 'success',
            statusCode: 200,
           },
        },
      ];

      store.dispatch(turnaroundDetailActions.updateParkingStandResponse({
        status: 'success',
        statusCode: 200,
      }));

      expect(store.getActions()).toStrictEqual(expectedUpdateParkingStandResponseActions);
    });
  });

  describe('resetParkingStandStatus', () => {
    test('Dispatch resetParkingStandStatus action with correct type and payload', () => {
      const expectedResetParkingStandStatusActions = [
        {
          type: turnaroundDetailActions.RESET_PARKING_STAND_STATUS,
        }
      ];

      store.dispatch(turnaroundDetailActions.resetParkingStandStatus());

      expect(store.getActions()).toStrictEqual(expectedResetParkingStandStatusActions);
    });
  });
});

