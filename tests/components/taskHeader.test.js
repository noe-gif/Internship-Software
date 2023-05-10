/**
 * @jest-environment jsdom
*/

import React from "react";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import TaskHeader from 'src/components/header/taskHeader';

const turnaround = {
  arrival_flight: {
    carrier_code: "KL",
    flight_number: "605",
  },
  departure_flight : {
    carrier_code: "KL",
    flight_number: "606"
  }
}

describe('TaskHeader', () => {
  describe('when component size is equal to large or large.splitView', () => {
    beforeEach(() => {
      render(<TaskHeader
        backViewFunction={() => {}}
        closeTurnaroundFunction={() => {}}
        componentSize={"large"}
        turnaroundId={12345}
        turnaroundFlights={turnaround}
      />);
    });

    it('displays the arrival flight', () => {
      expect(screen.getByText('KL 605')).toBeInTheDocument();
    });

    it('displays the departure flight', () => {
      expect(screen.getByText('KL 606')).toBeInTheDocument();
    });

    it('displays the alt of landing plane', () => {
      expect(screen.getByAltText('landing plane icon')).toBeInTheDocument();
    });

    it('displays the alt of take off plane', () => {
      expect(screen.getByAltText('departure plane icon')).toBeInTheDocument();
    });

    it('displays the alt of close icon ', () => {
      expect(screen.getByAltText('Close Icon')).toBeInTheDocument();
    });
  });

  describe('when component size is equal to small', () => {
    beforeEach(() => {
      render(<TaskHeader
        backViewFunction={() => {}}
        closeTurnaroundFunction={() => {}}
        componentSize={"small"}
        turnaroundId={12345}
        turnaroundFlights={turnaround}
      />);
    });

    it('displays the arrival flight', () => {
      expect(screen.getByText('KL 605')).toBeInTheDocument();
    });

    it('displays the departure flight', () => {
      expect(screen.getByText('KL 606')).toBeInTheDocument();
    });

    it('displays the alt of landing plane', () => {
      expect(screen.getByAltText('landing plane icon')).toBeInTheDocument();
    });

    it('displays the alt of take off plane', () => {
      expect(screen.getByAltText('departure plane icon')).toBeInTheDocument();
    });

    it('displays the alt of close icon ', () => {
      expect(screen.getByAltText('Close Icon')).toBeInTheDocument();
    });

    it('displays the alt of back icon ', () => {
      expect(screen.getByAltText('Back Icon')).toBeInTheDocument();
    });    
  });
});