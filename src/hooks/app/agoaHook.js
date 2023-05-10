import { useState } from 'react';

import { TARMAC_COOKIE_REFRESH, TARMAC_COOKIE_EXPIRY } from 'src/constants/cookies';

import { cookies } from 'src/sagas/userSaga';

export default function tarmacAppHook(tokenRequestAction) {
  const [isLoading, setIsLoading] = useState(true);

  const getRefreshedToken = async () => {
    await tokenRequestAction();
  };

  const applyRefreshTokenLifetime = (refreshTokenLifetime) => {
    setTimeout(() => getRefreshedToken(), refreshTokenLifetime);
  };

  const isTokenUsable = (tokenExpirationDate) => (tokenExpirationDate > 0);

  const updateUserAccessToken = () => {
    const accessTokenExpirationTimeout = localStorage.getItem(TARMAC_COOKIE_EXPIRY) - Date.now();
    const needConnection = cookies.get(TARMAC_COOKIE_REFRESH) && isTokenUsable(accessTokenExpirationTimeout);

    if (needConnection) {
      getRefreshedToken();
      applyRefreshTokenLifetime(accessTokenExpirationTimeout);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    updateUserAccessToken,
  };
}
