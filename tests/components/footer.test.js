/**
 * @jest-environment jsdom
*/

import React from "react";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from 'src/components/footer/footer';

const actualYear = new Date().getFullYear();

describe("Footer", () => {
  describe('tests rendering html element in Footer', () => {
    beforeEach(() => {
      render(<Footer />);
    });

    it("displays the title", () => {
      expect(screen.getByText(`© ${actualYear} - TarmacTechnologies - Privacy Policy`)).toBeInTheDocument();
    });

    it("displays the app store logo", () => {
      expect(screen.getByAltText("appStoreLogo")).toBeInTheDocument();
    });

    it("displays the play store logo", () => {
      expect(screen.getByAltText("playStoreLogo")).toBeInTheDocument();
    });
  })
});