export const RECEIVE_TURNAROUNDS = 'RECEIVE_TURNAROUNDS';
export const REQUEST_TURNAROUNDS = 'REQUEST_TURNAROUNDS';
export const ADD_DATE_PICKED = 'ADD_DATE_PICKED';
export const REQUEST_USER_AIRPORTS = 'REQUEST_USER_AIRPORTS';
export const RECEIVE_AIRPORT_PICKED = 'RECEIVE_AIRPORT_PICKED';
export const RECEIVE_FLIGHT_NUMBER_PICKED = 'RECEIVE_FLIGHT_NUMBER_PICKED';
export const RECEIVE_USER_AIRPORTS = 'RECEIVE_USER_AIRPORTS';
export const UPDATE_FILTERS_ARRIVAL = 'UPDATE_FILTERS_ARRIVAL';
export const UPDATE_FILTERS_DEPARTURE = 'UPDATE_FILTERS_DEPARTURE';
export const REFRESH_TURNAROUNDS = 'REFRESH_TURNAROUNDS';
export const SET_AIRPORT_PICKED = 'SET_AIRPORT_PICKED';
export const SET_SEARCH_BAR_VALUE = 'SET_SEARCH_BAR_VALUE';

export const turnaroundRequestAction = (token, dateFilterRange, airportPicked) => ({
  type: REQUEST_TURNAROUNDS,
  payload: {
    token,
    dateFilterRange,
    airportPicked,
  },
});

export const receiveTurnarounds = (turnaround) => ({
  type: RECEIVE_TURNAROUNDS,
  payload: turnaround,
});

export const receiveDatePicked = (datePicked) => ({
  type: ADD_DATE_PICKED,
  payload: datePicked,
});

export const requestUserAirportAction = (accessToken) => ({
  type: REQUEST_USER_AIRPORTS,
  payload: accessToken,
});

export const receiveAirportPicked = (airportPicked) => ({
  type: RECEIVE_AIRPORT_PICKED,
  payload: airportPicked,
});

export const receiveUserAirports = (airportsAvailable) => ({
  type: RECEIVE_USER_AIRPORTS,
  payload: airportsAvailable,
});

export const updateArrivalAction = (arrivalChecked) => ({
  type: UPDATE_FILTERS_ARRIVAL,
  payload: arrivalChecked,
});

export const updateDepartureAction = (departureChecked) => ({
  type: UPDATE_FILTERS_DEPARTURE,
  payload: departureChecked,
});

export const refreshTurnaroundsAction = (token, dateFilterRange, airportPicked) => ({
  type: REFRESH_TURNAROUNDS,
  payload: {
    token,
    dateFilterRange,
    airportPicked,
  },
});

export const setAirportPickedAction = (airportPicked) => ({
  type: SET_AIRPORT_PICKED,
  payload: airportPicked,
});

export const setSearchBarValueAction = (searchBarValue) => ({
  type: SET_SEARCH_BAR_VALUE,
  payload: searchBarValue,
});
