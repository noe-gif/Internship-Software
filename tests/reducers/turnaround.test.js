import turnaround from 'src/reducers/turnaround';

import { SENDING_TURNAROUND_REQUEST } from 'src/actions/actions';
import {
  RECEIVE_TURNAROUNDS,
  ADD_DATE_PICKED,
  RECEIVE_AIRPORT_PICKED,
  RECEIVE_USER_AIRPORTS,
  UPDATE_FILTERS_ARRIVAL,
  UPDATE_FILTERS_DEPARTURE,
  REFRESH_TURNAROUNDS,
  SET_AIRPORT_PICKED,
  SET_SEARCH_BAR_VALUE,
} from 'src/actions/turnaroundActions';
import {
  GET_TURNAROUND_DETAILS_REQUEST,
  QUIT_TURNAROUND_VIEW, CLOSE_DETAIL_VIEW,
  GET_TURNAROUND_DETAILS_RESPONSE,
  GET_TURNAROUND_REPORT_REQUEST,
  GET_TURNAROUND_REPORT_RESPONSE,
  CLOSE_REPORT_SUB_VIEW,
  GET_TURNAROUND_ALL_INFOS_REQUEST,
  GET_TURNAROUND_ALL_INFOS_RESPONSE,
  UPDATE_FLIGHT_TIMING_RESPONSE,
  RESET_FLIGHT_TIMING_STATUS,
  UPDATE_PARKING_STAND_RESPONSE,
  RESET_PARKING_STAND_STATUS,
} from 'src/actions/turnaroundDetailActions';

import { DEFAULT, SUCCESS } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

const date = new Date();
date.setMilliseconds(0);

const initialState = {
  turnaround: undefined,
  datePicked: [
    date,
    date,
  ],
  isCurrentlyLoading: false,
  airportPicked: '',
  searchBarValue: '',
  airportsAvailable: [],
  arrivalChecked: true,
  departureChecked: true,
  isInDetailsView: false,
  selectedTurnarounds: [],
  selectedTurnaroundDate: date,
  selectedTurnaroundDetail: [],
  turnaroundReports: [],
  turnaroundCompleteInfos: [],
  getTurnaroundCompleteInfosId: null,
  updateFlightTimingStatus: {
    status: DEFAULT,
    statusCode: 0,
  },
  parkingStandRequestStatus: {
    status: DEFAULT,
    statusCode: 0,
  },
};

const turnaroundData = {
  delays: [
    { code: "15D", duration: 20, id: 217771 },
    { code: "15B", duration: 11, id: 217770},
  ],
  arrival_flight: {
    departure_airport: { iata_code: 'FDF' },
    arrival_airport: { iata_code: 'ORY' },
    aircraft: { icao_code: "A35K", tail_number: "FHTOO" },
    sta: "2021-09-19T05:40:00Z",
    std: "2021-09-18T21:20:00Z",
    parking_stand_arrival: null,
  },
  departure_flight: {
    arrival_airport: { iata_code: 'SFO' },
    departure_airport: { iata_code: 'ORY' },
    aircraft: { icao_code: "A35K", tail_number: "FHTOO" },
    sta: "2021-09-20T19:05:00Z",
    std: "2021-09-20T10:20:00Z",
    parking_stand_departure: 'TT34',
  }
};

describe('turnaround Reducer', () => {
  describe('INITIAL_STATE', () => {
    test('Check correct initial state', () => {
      const action = { type: 'not_handle_action' };

      expect(turnaround(undefined, action)).toEqual(initialState);
    });
  });

  describe('RECEIVE_TURNAROUNDS', () => {
    test('Check correct state update', () => {
      const payload = turnaroundData;

      const action = { type: RECEIVE_TURNAROUNDS, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.turnaround).toEqual(turnaroundData);
    });
  });

  describe('ADD_DATE_PICKED', () => {
    test('Check correct state update', () => {
      const payload = ["2021-09-18T21:20:00Z", "2021-09-18T22:22:00Z"];

      const action = { type: ADD_DATE_PICKED, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.datePicked).toEqual(["2021-09-18T21:20:00Z", "2021-09-18T22:22:00Z"]);
    });
  });

  describe('SENDING_TURNAROUND_REQUEST', () => {
    test('Check correct state update', () => {
      const payload = true;

      const action = { type: SENDING_TURNAROUND_REQUEST, sending: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.isCurrentlyLoading).toEqual(true);
    });
  });

  describe('RECEIVE_AIRPORT_PICKED', () => {
    test('Check correct state update', () => {
      const payload = 'ORY';

      const action = { type: RECEIVE_AIRPORT_PICKED, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.airportPicked).toEqual('ORY');
    });
  });

  describe('RECEIVE_USER_AIRPORTS', () => {
    test('Check correct state update', () => {
      const payload = ['ORY', 'TTT', 'SFO'];

      const action = { type: RECEIVE_USER_AIRPORTS, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.airportsAvailable).toEqual(['ORY', 'TTT', 'SFO']);
    });
  });

  describe('UPDATE_FILTERS_ARRIVAL', () => {
    test('Check correct state update', () => {
      const payload = true;

      const action = { type: UPDATE_FILTERS_ARRIVAL, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.arrivalChecked).toEqual(true);
    });
  });

  describe('UPDATE_FILTERS_DEPARTURE', () => {
    test('Check correct state update', () => {
      const payload = false;

      const action = { type: UPDATE_FILTERS_DEPARTURE, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.departureChecked).toEqual(false);
    });
  });

  describe('REFRESH_TURNAROUNDS', () => {
    test('Check correct state update', () => {

      const action = { type: REFRESH_TURNAROUNDS };

      const stateResult = turnaround(undefined, action);

      expect(stateResult).toEqual(initialState);
    });
  });

  describe('GET_TURNAROUND_DETAILS_REQUEST', () => {
    test('Check correct state update', () => {
      const payload = { selectedTurnarounds: [], date: "2021-09-20T19:05:00Z" };

      const action = { type: GET_TURNAROUND_DETAILS_REQUEST, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.selectedTurnarounds).toEqual([]);
      expect(stateResult.selectedTurnaroundDate).toEqual("2021-09-20T19:05:00Z");
    });
  });

  describe('GET_TURNAROUND_DETAILS_RESPONSE', () => {
    test('Check correct state update', () => {
      const payload = [turnaroundData];

      const action = { type: GET_TURNAROUND_DETAILS_RESPONSE, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.selectedTurnaroundDetail).toEqual([turnaroundData]);
    });
  });

  describe('GET_TURNAROUND_DETAILS_RESPONSE', () => {
    test('Check correct state update', () => {
      const payload = [turnaroundData];

      const action = { type: GET_TURNAROUND_DETAILS_RESPONSE, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.selectedTurnaroundDetail).toEqual([turnaroundData]);
    });
  });  
  
  describe('QUIT_TURNAROUND_VIEW', () => {
    test('Check correct state update', () => {
      const action = { type: QUIT_TURNAROUND_VIEW};

      const stateResult = turnaround(undefined, action);

      expect(stateResult.isInDetailsView).toEqual(false);
      expect(stateResult.selectedTurnarounds).toEqual([]);
    });
  });

  describe('CLOSE_DETAIL_VIEW', () => {
    test('Check correct state update', () => {
      const payload = [turnaroundData];

      const action = { type: CLOSE_DETAIL_VIEW, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.selectedTurnarounds).toEqual([turnaroundData]);
      expect(stateResult.isInDetailsView).toEqual(true);
    });
  });

  describe('GET_TURNAROUND_REPORT_REQUEST', () => {
    test('Check correct state update', () => {
      const action = { type: GET_TURNAROUND_REPORT_REQUEST};

      const stateResult = turnaround(undefined, action);

      expect(stateResult).toEqual(initialState);
    });
  });

  describe('GET_TURNAROUND_REPORT_RESPONSE', () => {
    test('Check correct state update', () => {
      const payload = [];

      const action = { type: GET_TURNAROUND_REPORT_RESPONSE, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.turnaroundReports).toEqual([]);
    });
  });

  describe('CLOSE_REPORT_SUB_VIEW', () => {
    test('Check correct state update', () => {
      const payload = { turnaroundReports: [], turnaroundComplete: turnaroundData };

      const action = { type: CLOSE_REPORT_SUB_VIEW, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.turnaroundReports).toEqual([]);
      expect(stateResult.turnaroundCompleteInfos).toEqual(turnaroundData);
    });
  });

  describe('GET_TURNAROUND_ALL_INFOS_REQUEST', () => {
    test('Check correct state update', () => {
      const payload = 12345;

      const action = { type: GET_TURNAROUND_ALL_INFOS_REQUEST, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.getTurnaroundCompleteInfosId).toEqual(12345);
    });
  });

  describe('GET_TURNAROUND_ALL_INFOS_RESPONSE', () => {
    test('Check correct state update', () => {
      const payload = turnaroundData;

      const action = { type: GET_TURNAROUND_ALL_INFOS_RESPONSE, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.turnaroundCompleteInfos).toEqual(turnaroundData);
    });
  });

  describe('SET_AIRPORT_PICKED', () => {
    test('Check correct state update', () => {
      const payload = 'ORY';

      const action = { type: SET_AIRPORT_PICKED, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.airportPicked).toEqual('ORY');
    });
  });

  describe('SET_SEARCH_BAR_VALUE', () => {
    test('Check correct state update', () => {
      const payload = '320';

      const action = { type: SET_SEARCH_BAR_VALUE, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.searchBarValue).toEqual('320');
    });
  });


  describe('UPDATE_FLIGHT_TIMING_RESPONSE', () => {
    test('Check correct state update', () => {
      const payload = { status: SUCCESS, statusCode: 200 };

      const action = { type: UPDATE_FLIGHT_TIMING_RESPONSE, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.updateFlightTimingStatus).toEqual({ status: SUCCESS, statusCode: 200 });
    });
  });

  describe('RESET_FLIGHT_TIMING_STATUS', () => {
    test('Check correct state update', () => {
      const action = { type: RESET_FLIGHT_TIMING_STATUS};

      const stateResult = turnaround(undefined, action);

      expect(stateResult.updateFlightTimingStatus).toEqual({ status: DEFAULT, statusCode: 0 });
    });
  });

  describe('UPDATE_PARKING_STAND_RESPONSE', () => {
    test('Check correct state update', () => {
      const payload = { status: SUCCESS, statusCode: 200 };

      const action = { type: UPDATE_PARKING_STAND_RESPONSE, payload: payload };

      const stateResult = turnaround(undefined, action);

      expect(stateResult.parkingStandRequestStatus).toEqual({ status: SUCCESS, statusCode: 200 });
    });
  });

  describe('RESET_PARKING_STAND_STATUS', () => {
    test('Check correct state update', () => {
      const action = { type: RESET_PARKING_STAND_STATUS};

      const stateResult = turnaround(undefined, action);

      expect(stateResult.parkingStandRequestStatus).toEqual({ status: DEFAULT, statusCode: 0 });
    });
  });
});