import React from 'react';

import { TARMAC_LOGO_IMAGE_URL } from 'src/constants/picturePath';

import loginHook from 'src/hooks/login/loginHook';

import RevealButton from 'src/components/login/revealButton';

export default function Login(props) {
  const {
    connectionError,
    loginRequestAction,
  } = props;

  const {
    handleSubmitLogin,
    password,
    revealPassword,
    setPassword,
    setRevealPassword,
    setUsername,
    username,
  } = loginHook(loginRequestAction);

  return (
    <div className="loginContainer">
      <div className="loginLogo">
        <img
          id="tarmacTechnologiesLogo"
          alt="logo-tarmac"
          className="loginImg"
          src={`${TARMAC_LOGO_IMAGE_URL}`}
        />
        <p className="loginTitle">
          TARMAC
          <br />
          TECHNOLOGIES
        </p>
      </div>
      {connectionError !== '' && (
        <p id="loginErrorMessage" className="loginTextError">
          {connectionError}
        </p>
      )}
      <form
        className="loginForm"
        onSubmit={(event) => { event.preventDefault(); handleSubmitLogin(); }}
      >
        <div className="inputsForm">
          <input
            id="loginUsernameInput"
            className="inputUsername fontSizeDefault"
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            required
            type="text"
            value={username}
          />
          <div className="inputPasswordWrapper">
            <input
              id="loginPasswordInput"
              className="inputPassword fontSizeDefault"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
              type={revealPassword ? 'text' : 'password'}
              value={password}
            />
            <RevealButton
              isRevealed={revealPassword}
              password={password}
              revealPassword={revealPassword}
              setRevealPassword={setRevealPassword}
            />
          </div>
        </div>
        <input
          id="loginSubmitButton"
          className="inputSubmit fontSizeDefault"
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
}
