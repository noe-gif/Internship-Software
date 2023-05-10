export const GET_TURNAROUND_DETAILS_REQUEST = 'GET_TURNAROUND_DETAILS_REQUEST';
export const GET_TURNAROUND_DETAILS_RESPONSE = 'GET_TURNAROUND_DETAILS_RESPONSE';
export const QUIT_TURNAROUND_VIEW = 'QUIT_TURNAROUND_VIEW';
export const CLOSE_DETAIL_VIEW = 'CLOSE_DETAIL_VIEW';
export const GET_TURNAROUND_REPORT_REQUEST = 'GET_TURNAROUND_REPORT_REQUEST';
export const GET_TURNAROUND_REPORT_RESPONSE = 'GET_TURNAROUND_REPORT_RESPONSE';
export const CLOSE_REPORT_SUB_VIEW = 'CLOSE_REPORT_SUB_VIEW';
export const GET_TURNAROUND_ALL_INFOS_REQUEST = 'GET_TURNAROUND_ALL_INFOS_REQUEST';
export const GET_TURNAROUND_ALL_INFOS_RESPONSE = 'GET_TURNAROUND_ALL_INFOS_RESPONSE';
export const UPDATE_FLIGHT_TIMING = 'UPDATE_FLIGHT_TIMING';
export const UPDATE_FLIGHT_TIMING_RESPONSE = 'UPDATE_FLIGHT_TIMING_RESPONSE';
export const RESET_FLIGHT_TIMING_STATUS = 'RESET_FLIGHT_TIMING_STATUS';
export const REFRESH_SELECTED_TURNAROUND_DETAIL = 'REFRESH_SELECTED_TURNAROUND_DETAIL';
export const UPDATE_PARKING_STAND = 'UPDATE_PARKING_STAND';
export const UPDATE_PARKING_STAND_RESPONSE = 'UPDATE_PARKING_STAND_RESPONSE';
export const RESET_PARKING_STAND_STATUS = 'RESET_PARKING_STAND_STATUS';

export const getTurnaroundDetailsRequest = (turnaroundsSelected) => ({
  type: GET_TURNAROUND_DETAILS_REQUEST,
  payload: turnaroundsSelected,
});

export const getTurnaroundDetailsResponse = (turnaroundDetail) => ({
  type: GET_TURNAROUND_DETAILS_RESPONSE,
  payload: turnaroundDetail,
});

export const quitTurnaroundView = () => ({
  type: QUIT_TURNAROUND_VIEW,
});

export const closeDetailView = (turnaroundsSelected) => ({
  type: CLOSE_DETAIL_VIEW,
  payload: turnaroundsSelected,
});

export const getTurnaroundReportRequest = (selectedTurnaround) => ({
  type: GET_TURNAROUND_REPORT_REQUEST,
  payload: selectedTurnaround,
});

export const getTurnaroundReportResponse = (turnaroundReports) => ({
  type: GET_TURNAROUND_REPORT_RESPONSE,
  payload: turnaroundReports,
});

export const closeReportSubView = (turnaroundReportFormats, turnaroundCompleteInfos) => ({
  type: CLOSE_REPORT_SUB_VIEW,
  payload: {
    turnaroundReports: turnaroundReportFormats,
    turnaroundComplete: turnaroundCompleteInfos,
  },
});

export const getTurnaroundAllInfoRequest = (turnaroundId) => ({
  type: GET_TURNAROUND_ALL_INFOS_REQUEST,
  payload: turnaroundId,
});

export const getTurnaroundAllInfosResponse = (turnaroundCompleteInfos) => ({
  type: GET_TURNAROUND_ALL_INFOS_RESPONSE,
  payload: turnaroundCompleteInfos,
});

export const updateFlightTiming = (updateTurnaroundFlightTiming) => ({
  type: UPDATE_FLIGHT_TIMING,
  payload: {
    turnaroundId: updateTurnaroundFlightTiming.turnaroundId,
    turnaround: updateTurnaroundFlightTiming.turnaround,
  },
});

export const updateFlightTimingResponse = (updateFlightTimingStatus) => ({
  type: UPDATE_FLIGHT_TIMING_RESPONSE,
  payload: updateFlightTimingStatus,
});

export const resetFlightTimingStatus = () => ({
  type: RESET_FLIGHT_TIMING_STATUS,
});

export const refreshSelectedTurnaroundDetail = (selectedTurnaroundDetail) => ({
  type: REFRESH_SELECTED_TURNAROUND_DETAIL,
  payload: selectedTurnaroundDetail,
});

export const updateParkingStand = (parkingStandData) => ({
  type: UPDATE_PARKING_STAND,
  payload: {
    turnaround: parkingStandData.turnaround,
    turnaroundId: parkingStandData.turnaroundId,
  },
});

export const updateParkingStandResponse = (parkingStandRequestStatus) => ({
  type: UPDATE_PARKING_STAND_RESPONSE,
  payload: parkingStandRequestStatus,
});

export const resetParkingStandStatus = () => ({
  type: RESET_PARKING_STAND_STATUS,
});
