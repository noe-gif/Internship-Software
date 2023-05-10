import axios from 'axios';

import { TARMAC_COOKIE_REFRESH } from 'src/constants/cookies';

import { BASE_URL } from 'src/utils/urlAPIs';
import { cookies } from 'src/sagas/sagas';

const refreshTokenAGOA = async () => {

  let refresh_token = cookies.get(TARMAC_COOKIE_REFRESH);

  const data = await axios.post(`${BASE_URL}/token/refresh`, { refresh: refresh_token, timeout: 6000 }, {
    headers: {
      'Authorization': 'Bearer ' + refresh_token
    }
  })
    .then(response => {
      return response.data;
    })

  return data
  
}

export default refreshTokenAGOA;
