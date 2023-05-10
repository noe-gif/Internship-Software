import axios from 'axios';

import { BASE_URL } from '../utils/urlAPIs';

const login = (credentials) =>
  axios.post(`${BASE_URL}/login`, {}, {
    auth: {
      username: (credentials.username),
      password: (credentials.password),
    },
  });

const refreshTokenAGOA = (refreshToken) =>
  axios.post(`${BASE_URL}/token/refresh`, { refresh: refreshToken });

const userDataAGOA = (token) =>
  axios.get(`${BASE_URL}/user`, { headers: { 'Authorization': 'Bearer ' + token } });//eslint-disable-line

const userAccessAirports = (token) =>
  axios.get(`${BASE_URL}/airports`, { headers: { 'Authorization': 'Bearer ' + token } });//eslint-disable-line

export default {
  login,
  refreshTokenAGOA,
  userDataAGOA,
  userAccessAirports,
};
