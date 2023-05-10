import React from 'react';

import { LOGOUT_IMAGE_URL, TARMAC_LOGO_IMAGE_URL } from 'src/constants/picturePath';

import 'src/styles/Header.css';

export default function Header(props) {
  const { logoutRequestAction, userName } = props;

  const handleLogout = () => {
    logoutRequestAction();
  };

  return (
    <div className="headerContainer">
      <div className="headerLogoContainer">
        <img className="headerLogo" alt="logo-tarmac" src={TARMAC_LOGO_IMAGE_URL} />
      </div>
      <div className="headerLogoutContainer fontSizeDefault">
        <div className="headerUsernameContainer">
          <p id="userNameHeader" className="headerUsername">
            {userName}
          </p>
        </div>
        <img
          onClick={() => handleLogout()}
          className="headerLogoutImg"
          src={LOGOUT_IMAGE_URL}
          alt="Logout button"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
