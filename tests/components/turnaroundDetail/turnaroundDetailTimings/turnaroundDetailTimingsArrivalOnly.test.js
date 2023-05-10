/**
 * @jest-environment jsdom
*/

import React from "react";
import {render, getNodeText} from 'tests/renderTimezoneFilter';
import '@testing-library/jest-dom';

import TurnaroundDetailTimings from 'src/components/turnaroundDetail/turnaroundDetailTimings';

const turnaroundArrivalOnly = {
  delays: [
    { code: "15D", duration: 20, id: 217771 },
    { code: "15B", duration: 11, id: 217770},
  ],
  arrival_flight: {
    departure_airport: { iata_code: 'FDF' },
    arrival_airport: { iata_code: 'ORY' },
    aircraft: { icao_code: "A35K", tail_number: "FHTOO" },
    sta: "2021-09-19T05:40:00Z",
    std: "2021-09-18T21:20:00Z",
    estimated_gate_arrival_datetime: "2021-09-19T05:36:00Z"
  },
};

describe('TurnaroundDetailTimings arrival only', () => {
  describe('arrival flight only with component size equal to small', () => {
    beforeEach(() => {
      render(<TurnaroundDetailTimings 
        componentSize="small" turnaroundData={turnaroundArrivalOnly}
        resetFlightTimingStatus={() => {}}
        updateFlightTimingStatus={{status: 'success', statusCode: 200}} 
      />);
    });

    it('should display STA but not STD', () => {
      expect(getNodeText(document.querySelector("#staTimingText"))).toStrictEqual('STA');
      expect(document.querySelector("#stdTimingText")).toBeNull();
    });

    it('should display ATA but not ATD', () => {
      expect(getNodeText(document.querySelector("#ataTimingText"))).toStrictEqual('ATA');
      expect(document.querySelector("#atdTimingText")).toBeNull();
    });

    it('should display RTA but not RTD', () => {
      expect(getNodeText(document.querySelector("#rtaTimingText"))).toStrictEqual('RTA');
      expect(document.querySelector("#rtdTimingText")).toBeNull();
    });

    it('should display ADO but not ADC', () => {
      expect(getNodeText(document.querySelector("#adoTimingText"))).toStrictEqual('ADO');
      expect(document.querySelector("#adcTimingText")).toBeNull();
    });

    it('should display ETA but not PTD and ADCT', () => {
      expect(getNodeText(document.querySelector("#etaTimingText"))).toStrictEqual('ETA');
      expect(document.querySelector("#ptdTimingText")).toBeNull();
      expect(document.querySelector("#adctTimingText")).toBeNull();
    });

    it('should display STA timing but not STD timing', () => {
      expect(getNodeText(document.querySelector("#staTimingValue"))).toStrictEqual('02:40');
      expect(document.querySelector("#stdTimingValue")).toBeNull();
    });

    it('should display ATA timing but not ATD timing', () => {
      expect(getNodeText(document.querySelector("#ataTimingValue"))).toStrictEqual('--:--');
      expect(document.querySelector("#atdTimingValue")).toBeNull();
    });

    it('should display RTA timing but not RTD timing', () => {
      expect(getNodeText(document.querySelector("#rtaTimingValue"))).toStrictEqual('--:--');
      expect(document.querySelector("#rtdTimingValue")).toBeNull();
    });

    it('should display ADO timing but not ADC timing', () => {
      expect(getNodeText(document.querySelector("#adoTimingValue"))).toStrictEqual('--:--');
      expect(document.querySelector("#adcTimingValue")).toBeNull();
    });

    it('should display ETA timing but not PTD timing and ADCT timing', () => {
      expect(getNodeText(document.querySelector("#etaTimingValue"))).toStrictEqual('02:36');
      expect(document.querySelector("#ptdTimingValue")).toBeNull();
      expect(document.querySelector("#adctTimingValue")).toBeNull();
    });
  });

  describe('arrival flight only with component size equal to large', () => {
    beforeEach(() => {
      render(<TurnaroundDetailTimings 
        componentSize="large" turnaroundData={turnaroundArrivalOnly}
        resetFlightTimingStatus={() => {}}
        updateFlightTimingStatus={{status: 'success', statusCode: 200}} 
      />);
    });

    it('should display STA but not STD', () => {
      expect(getNodeText(document.querySelector("#staTimingText"))).toStrictEqual('STA');
      expect(document.querySelector("#stdTimingText")).toBeNull();
    });

    it('should display ATA but not ATD', () => {
      expect(getNodeText(document.querySelector("#ataTimingText"))).toStrictEqual('ATA');
      expect(document.querySelector("#atdTimingText")).toBeNull();
    });

    it('should display RTA but not RTD', () => {
      expect(getNodeText(document.querySelector("#rtaTimingText"))).toStrictEqual('RTA');
      expect(document.querySelector("#rtdTimingText")).toBeNull();
    });

    it('should display ADO but not ADC', () => {
      expect(getNodeText(document.querySelector("#adoTimingText"))).toStrictEqual('ADO');
      expect(document.querySelector("#adcTimingText")).toBeNull();
    });

    it('should display ETA but not PTD and ADCT', () => {
      expect(getNodeText(document.querySelector("#etaTimingText"))).toStrictEqual('ETA');
      expect(document.querySelector("#ptdTimingText")).toBeNull();
      expect(document.querySelector("#adctTimingText")).toBeNull();
    });

    it('should display aircraft data', () => {
      expect(getNodeText(document.querySelector("#aircraftPlaneInformationText"))).toStrictEqual('Aircraft');
      expect(getNodeText(document.querySelector("#aircraftPlaneInformationValue"))).toStrictEqual('A35K');
    });

    it('should display tail number data', () => {
      expect(getNodeText(document.querySelector("#tailNumberPlaneInformationText"))).toStrictEqual('Tail n°');
      expect(getNodeText(document.querySelector("#tailNumberPlaneInformationValue"))).toStrictEqual('FHTOO');
    });

    it('should display MTT data', () => {
      expect(getNodeText(document.querySelector("#mttPlaneInformationText"))).toStrictEqual('MTT');
      expect(getNodeText(document.querySelector("#mttPlaneInformationValue"))).toStrictEqual('-');
    });

    it('should display STA timing but not STD timing', () => {
      expect(getNodeText(document.querySelector("#staTimingValue"))).toStrictEqual('02:40');
      expect(document.querySelector("#stdTimingValue")).toBeNull();
    });

    it('should display ATA timing but not ATD timing', () => {
      expect(getNodeText(document.querySelector("#ataTimingValue"))).toStrictEqual('--:--');
      expect(document.querySelector("#atdTimingValue")).toBeNull();
    });

    it('should display RTA timing but not RTD timing', () => {
      expect(getNodeText(document.querySelector("#rtaTimingValue"))).toStrictEqual('--:--');
      expect(document.querySelector("#rtdTimingValue")).toBeNull();
    });

    it('should display ADO timing but not ADC timing', () => {
      expect(getNodeText(document.querySelector("#adoTimingValue"))).toStrictEqual('--:--');
      expect(document.querySelector("#adcTimingValue")).toBeNull();
    });

    it('should display ETA timing but not PTD timing and ADCT timing', () => {
      expect(getNodeText(document.querySelector("#etaTimingValue"))).toStrictEqual('02:36');
      expect(document.querySelector("#ptdTimingValue")).toBeNull();
      expect(document.querySelector("#adctTimingValue")).toBeNull();
    });
  });
});