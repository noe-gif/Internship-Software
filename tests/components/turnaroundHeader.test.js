/**
 * @jest-environment jsdom
*/

import React from "react";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import TurnaroundHeader from 'src/components/header/turnaroundHeader';

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

const turnaroundArrival = {
  arrival_flight: {
    carrier_code: "KL",
    flight_number: "605",
  },
}

const turnaroundDeparture = {
  departure_flight : {
    carrier_code: "KL",
    flight_number: "606"
  }
}


describe('TurnaroundHeader', () => {
  describe('test component with arrival and departure data', () => {
    beforeEach(() => {
      render(<TurnaroundHeader
        turnaroundData={turnaround}
        closeTurnaround={() => {}}
        handleOpenReport={() => {}}
        userPermissions={[]}
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

    it('displays the Report text ', () => {
      expect(screen.getByText('REPORTS')).toBeInTheDocument();
    });
  });

  describe('test component with only arrival data', () => {
    beforeEach(() => {
      render(<TurnaroundHeader
        turnaroundData={turnaroundArrival}
        closeTurnaround={() => {}}
        handleOpenReport={() => {}}
        userPermissions={[]}
      />);
    });

    it('displays the arrival flight', () => {
      expect(screen.getByText('KL 605')).toBeInTheDocument();
    });

    it('displays the alt of landing plane', () => {
      expect(screen.getByAltText('landing plane icon')).toBeInTheDocument();
    });

    it('displays the alt of close icon ', () => {
      expect(screen.getByAltText('Close Icon')).toBeInTheDocument();
    });

    it('displays the Report text ', () => {
      expect(screen.getByText('REPORTS')).toBeInTheDocument();
    });
  });

  describe('test component with only departure data', () => {
    beforeEach(() => {
      render(<TurnaroundHeader
        turnaroundData={turnaroundDeparture}
        closeTurnaround={() => {}}
        handleOpenReport={() => {}}
        userPermissions={[]}
      />);
    });
  
    it('displays the departure flight', () => {
      expect(screen.getByText('KL 606')).toBeInTheDocument();
    });

    it('displays the alt of take off plane', () => {
      expect(screen.getByAltText('departure plane icon')).toBeInTheDocument();
    });

    it('displays the alt of close icon ', () => {
      expect(screen.getByAltText('Close Icon')).toBeInTheDocument();
    });

    it('displays the Report text ', () => {
      expect(screen.getByText('REPORTS')).toBeInTheDocument();
    });
  });
});