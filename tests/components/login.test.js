/**
 * @jest-environment jsdom
 */

import React from 'react';
import {getNodeText, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Login from 'src/components/login/login';

const connectionError = '';

const tokenRequestAction = () => {};
const loginRequestAction = () => {};

describe('Login', () => {
  describe('Testing common display case', () => {
    beforeEach(() => {
      render(
        <Login
          connectionError={connectionError}
          loginRequestAction={loginRequestAction}
          tokenRequestAction={tokenRequestAction}
        />
      );
    });

    it('should display tarmac logo', () => {
      expect(document.querySelector("#tarmacTechnologiesLogo")).toBeInTheDocument();
    });

    it('should display username login input', () => {
      const usernameInput = document.querySelector("#loginUsernameInput");
      expect(usernameInput.placeholder).toStrictEqual('Username');
    });

    it('should display password login input', () => {
      const passwordInput = document.querySelector("#loginPasswordInput");
      expect(passwordInput.placeholder).toStrictEqual('Password');
    });

    it('should display login submit button', () => {
      const submitLoginButton = document.querySelector("#loginSubmitButton");
      expect(submitLoginButton.value).toStrictEqual('Login');
    });

    it('should not display login error message', () => {
      expect(document.querySelector("#loginErrorMessage")).toBeNull();
    });
  });

  describe('Testing error cases', () => {
    it('should display error message when a connection error has occurred', () => {
      render(
        <Login
          connectionError="Error while trying to connect"
          loginRequestAction={loginRequestAction}
          tokenRequestAction={tokenRequestAction}
        />
      );

      expect(getNodeText(document.querySelector("#loginErrorMessage")))
      .toStrictEqual("Error while trying to connect");
    });
  });
});
