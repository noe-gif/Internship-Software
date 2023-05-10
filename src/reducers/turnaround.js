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

import compareArrayByKeyAndRemoveDeletedElement from 'src/utils/parsing/compareArrayByKeyAndRemoveDeletedElement';
import { DEFAULT } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

const startDate = new Date();
startDate.setMilliseconds(0);

const endDate = new Date();
endDate.setMilliseconds(0);

const initialState = {
  turnaround: undefined,
  datePicked: [
    startDate,
    endDate,
  ],
  isCurrentlyLoading: false,
  airportPicked: '',
  searchBarValue: '',
  airportsAvailable: [],
  arrivalChecked: true,
  departureChecked: true,
  isInDetailsView: false,
  selectedTurnarounds: [],
  selectedTurnaroundDate: startDate,
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

function turnaround(state = initialState, action) {
  switch (action.type) {
  case RECEIVE_TURNAROUNDS:
    return {
      ...state,
      turnaround: action.payload,
    };
  case ADD_DATE_PICKED:
    return {
      ...state,
      datePicked: action.payload,
    };
  case SENDING_TURNAROUND_REQUEST:
    return {
      ...state,
      isCurrentlyLoading: action.sending,
    };
  case RECEIVE_AIRPORT_PICKED:
    return {
      ...state,
      airportPicked: action.payload,
    };
  case RECEIVE_USER_AIRPORTS:
    return {
      ...state,
      airportsAvailable: action.payload,
    };
  case UPDATE_FILTERS_ARRIVAL:
    return {
      ...state,
      arrivalChecked: action.payload,
    };
  case UPDATE_FILTERS_DEPARTURE:
    return {
      ...state,
      departureChecked: action.payload,
    };
  case REFRESH_TURNAROUNDS:
    return {
      ...state,
    };
  case GET_TURNAROUND_DETAILS_REQUEST:
    return {
      ...state,
      isInDetailsView: true,
      selectedTurnarounds: action.payload.selectedTurnarounds,
      selectedTurnaroundDate: action.payload.date,
    };
  case GET_TURNAROUND_DETAILS_RESPONSE:
    return {
      ...state,
      selectedTurnaroundDetail: action.payload,
    };
  case QUIT_TURNAROUND_VIEW:
    return {
      ...state,
      isInDetailsView: false,
      selectedTurnarounds: [],
    };
  case CLOSE_DETAIL_VIEW:
    return {
      ...state,
      selectedTurnarounds: action.payload,
      selectedTurnaroundDetail: compareArrayByKeyAndRemoveDeletedElement(state.selectedTurnaroundDetail, action.payload, 'id'),// eslint-disable-line
      isInDetailsView: (action.payload.length > 0),
    };
  case GET_TURNAROUND_REPORT_REQUEST:
    return {
      ...state,
    };
  case GET_TURNAROUND_REPORT_RESPONSE:
    return {
      ...state,
      turnaroundReports: action.payload,
    };
  case CLOSE_REPORT_SUB_VIEW:
    return {
      ...state,
      turnaroundReports: action.payload.turnaroundReports,
      turnaroundCompleteInfos: action.payload.turnaroundComplete,
    };
  case GET_TURNAROUND_ALL_INFOS_REQUEST:
    return {
      ...state,
      getTurnaroundCompleteInfosId: action.payload,
    };
  case GET_TURNAROUND_ALL_INFOS_RESPONSE:
    return {
      ...state,
      turnaroundCompleteInfos: action.payload,
    };
  case SET_AIRPORT_PICKED:
    return {
      ...state,
      airportPicked: action.payload,
    };
  case SET_SEARCH_BAR_VALUE:
    return {
      ...state,
      searchBarValue: action.payload,
    };
  case UPDATE_FLIGHT_TIMING_RESPONSE:
    return {
      ...state,
      updateFlightTimingStatus: action.payload,
    };
  case RESET_FLIGHT_TIMING_STATUS:
    return {
      ...state,
      updateFlightTimingStatus: {
        status: DEFAULT,
        statusCode: 0,
      },
    };
  case UPDATE_PARKING_STAND_RESPONSE:
    return {
      ...state,
      parkingStandRequestStatus: action.payload,
    };
  case RESET_PARKING_STAND_STATUS:
    return {
      ...state,
      parkingStandRequestStatus: {
        status: DEFAULT,
        statusCode: 0,
      },
    };
  default:
    return state;
  }
}

export default turnaround;
