import axios from 'axios';

import { BASE_URL } from 'src/utils/urlAPIs';

import { formatDateToYYYYMMDD } from 'src/utils/logic/date/formattedDate';

const getUserTurnaround = (token, dateRange, airport) => {
  const formattedFromDate = formatDateToYYYYMMDD(dateRange[0]);
  const formattedToDate = formatDateToYYYYMMDD(dateRange[1]);

  return axios.get(
    `${BASE_URL}/turnarounds?from_date=${formattedFromDate}T00:00:00Z&to_date=${formattedToDate}T23:59:59Z&airports[]=${airport}&lightened=true`,//eslint-disable-line
    { headers: { Authorization: `Bearer ${token}` } },
  );// eslint-disable-line
};

const getTurnaroundDetail = (token, turnaroundId) =>
  axios.get(`${BASE_URL}/turnaround/${turnaroundId}?lightened=true`, { headers: { Authorization: `Bearer  ${token}` } });//eslint-disable-line

const getTurnaroundReport = (token, turnaroundId) =>
  axios.get(
    `${BASE_URL}/turnaround/${turnaroundId}/close_report_format`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

const getTurnaroundCompleteInfos = (token, turnaroundId) =>
  axios.get(`${BASE_URL}/turnaround/${turnaroundId}`, { headers: { Authorization: `Bearer ${token}` } });

const updateFlightTiming = (token, updateTurnaroundFlightTiming) =>
  axios.put(
    `${BASE_URL}/turnaround/${updateTurnaroundFlightTiming.turnaroundId}`,
    { turnaround: updateTurnaroundFlightTiming.turnaround },
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } },
  );

const saveTurnaroundReport = (token, turnaroundId, reportData) =>
  axios.post(
    `${BASE_URL}/turnaround/${turnaroundId}/close?only_saving=true`,
    reportData,
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } },
  );

const sendTurnaroundReport = (token, turnaroundId, reportData) =>
  axios.post(
    `${BASE_URL}/turnaround/${turnaroundId}/close`,
    reportData,
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } },
  );

const updateParkingStand = (token, parkingStandData) =>
  axios.put(
    `${BASE_URL}/turnaround/${parkingStandData.turnaroundId}`,
    { turnaround: parkingStandData.turnaround },
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } },
  );

export default {
  getTurnaroundDetail,
  getTurnaroundReport,
  getUserTurnaround,
  getTurnaroundCompleteInfos,
  updateFlightTiming,
  updateParkingStand,
  saveTurnaroundReport,
  sendTurnaroundReport,
};
