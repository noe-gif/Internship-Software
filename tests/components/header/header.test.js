/**
 * @jest-environment jsdom
*/

import React from "react";
import { render, getNodeText , screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from 'src/components/header/header';

describe('Header component', () => {
  beforeEach(() => {
    render(<Header 
      userName="heloise.tronche"
      logoutRequestAction={() => {}}
    />);
  });

  it('should display the userName', () => {
    expect(getNodeText(document.querySelector("#userNameHeader"))).toStrictEqual('heloise.tronche');
  });

  it('should display logo alt', () => {
    expect(screen.getByAltText('logo-tarmac')).toBeInTheDocument();
  });

  it('should display logout alt', () => {
    expect(screen.getByAltText('Logout button')).toBeInTheDocument();
  });

});