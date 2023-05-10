import { TARMAC_COOKIE_EXPIRY } from 'src/constants/cookies';

const logoutAGOA = () => {
  localStorage.removeItem(TARMAC_COOKIE_EXPIRY);
  localStorage.removeItem('date-start');
  localStorage.removeItem('date-end');
};

export default logoutAGOA;
