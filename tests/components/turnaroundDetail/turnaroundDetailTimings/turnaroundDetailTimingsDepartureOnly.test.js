/**
 * @jest-environment jsdom
*/

import React from "react";
import {render, getNodeText} from 'tests/renderTimezoneFilter';
import '@testing-library/jest-dom';

import TurnaroundDetailTimings from 'src/components/turnaroundDetail/turnaroundDetailTimings';

const turnaroundDepartureOnly = {
  delays: [
    { code: "15D", duration: 20, id: 217771 },
    { code: "15B", duration: 11, id: 217770},
  ],
  departure_flight: {
    arrival_airport: { iata_code: 'SFO' },
    departure_airport: { iata_code: 'ORY' },
    aircraft: { icao_code: "A35K", tail_number: "FHTOO" },
    sta: "2021-09-20T19:05:00Z",
    std: "2021-09-20T10:20:00Z",
    actual_gate_departure_datetime: "2021-09-20T10:51:00Z"
  }
};

describe('TurnaroundDetailTimings departure only', () => {
  describe('departure flight only with component size equal to small', () => {
    beforeEach(() => {
      render(<TurnaroundDetailTimings 
        componentSize="small" turnaroundData={turnaroundDepartureOnly}
        resetFlightTimingStatus={() => {}}
        updateFlightTimingStatus={{status: 'success', statusCode: 200}} 
      />);
    });

    it('should display STD but not STA', () => {
      expect(getNodeText(document.querySelector("#stdTimingText"))).toStrictEqual('STD');
      expect(document.querySelector("#staTimingText")).toBeNull();
    });

    it('should display ATD but not ATA', () => {
      expect(getNodeText(document.querySelector("#atdTimingText"))).toStrictEqual('ATD');
      expect(document.querySelector("#ataTimingText")).toBeNull();
    });

    it('should display RTD but not RTA', () => {
      expect(getNodeText(document.querySelector("#rtdTimingText"))).toStrictEqual('RTD');
      expect(document.querySelector("#rtaTimingText")).toBeNull();
    });

    it('should display ADC but not ADO', () => {
      expect(getNodeText(document.querySelector("#adcTimingText"))).toStrictEqual('ADC');
      expect(document.querySelector("#adoTimingText")).toBeNull();
    });

    it('should display PTD and ADCT but not ETA', () => {
      expect(getNodeText(document.querySelector("#ptdTimingText"))).toStrictEqual('PTD');
      expect(getNodeText(document.querySelector("#adctTimingText"))).toStrictEqual('ADCT');
      expect(document.querySelector("#etaTimingText")).toBeNull();
    });

    it('should display STD timing  but not STA timing', () => {
      expect(getNodeText(document.querySelector("#stdTimingValue"))).toStrictEqual('07:20');
      expect(document.querySelector("#staTimingValue")).toBeNull();
    });

    it('should display ATD timing but not ATA timing', () => {
      expect(getNodeText(document.querySelector("#atdTimingValue"))).toStrictEqual('07:51');
      expect(document.querySelector("#ataTimingValue")).toBeNull();
    });

    it('should display RTD timing but not RTA timing', () => {
      expect(getNodeText(document.querySelector("#rtdTimingValue"))).toStrictEqual('--:--');
      expect(document.querySelector("#rtaTimingValue")).toBeNull();
    });

    it('should display ADC timing but not ADO timing', () => {
      expect(getNodeText(document.querySelector("#adcTimingValue"))).toStrictEqual('--:--');
      expect(document.querySelector("#adoTimingValue")).toBeNull();
    });

    it('should display PTD timing and ADCT timing but not ETA timing', () => {
      expect(getNodeText(document.querySelector("#ptdTimingValue"))).toStrictEqual('--:--');
      expect(getNodeText(document.querySelector("#adctTimingValue"))).toStrictEqual('--:--');
      expect(document.querySelector("#etaTimingValue")).toBeNull();
    });
  });
  
  describe('departure flight only with component size equal to large', () => {
    beforeEach(() => {
      render(<TurnaroundDetailTimings 
        componentSize="large" turnaroundData={turnaroundDepartureOnly}
        resetFlightTimingStatus={() => {}}
        updateFlightTimingStatus={{status: 'success', statusCode: 200}} 
      />);
    });

    it('should display STD but not STA', () => {
      expect(getNodeText(document.querySelector("#stdTimingText"))).toStrictEqual('STD');
      expect(document.querySelector("#staTimingText")).toBeNull();
    });

    it('should display ATD but not ATA', () => {
      expect(getNodeText(document.querySelector("#atdTimingText"))).toStrictEqual('ATD');
      expect(document.querySelector("#ataTimingText")).toBeNull();
    });

    it('should display RTD but not RTA', () => {
      expect(getNodeText(document.querySelector("#rtdTimingText"))).toStrictEqual('RTD');
      expect(document.querySelector("#rtaTimingText")).toBeNull();
    });

    it('should display ADC but not ADO', () => {
      expect(getNodeText(document.querySelector("#adcTimingText"))).toStrictEqual('ADC');
      expect(document.querySelector("#adoTimingText")).toBeNull();
    });

    it('should display  PTD and ADCT but not ETA', () => {
      expect(getNodeText(document.querySelector("#ptdTimingText"))).toStrictEqual('PTD');
      expect(getNodeText(document.querySelector("#adctTimingText"))).toStrictEqual('ADCT');
      expect(document.querySelector("#etaTimingText")).toBeNull();
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

    it('should display STD timing  but not STA timing', () => {
      expect(getNodeText(document.querySelector("#stdTimingValue"))).toStrictEqual('07:20');
      expect(document.querySelector("#staTimingValue")).toBeNull();
    });

    it('should display ATD timing but not ATA timing', () => {
      expect(getNodeText(document.querySelector("#atdTimingValue"))).toStrictEqual('07:51');
      expect(document.querySelector("#ataTimingValue")).toBeNull();
    });

    it('should display RTD timing but not RTA timing', () => {
      expect(getNodeText(document.querySelector("#rtdTimingValue"))).toStrictEqual('--:--');
      expect(document.querySelector("#rtaTimingValue")).toBeNull();
    });

    it('should display ADC timing but not ADO timing', () => {
      expect(getNodeText(document.querySelector("#adcTimingValue"))).toStrictEqual('--:--');
      expect(document.querySelector("#adoTimingValue")).toBeNull();
    });

    it('should display PTD timing and ADCT timing but not ETA timing', () => {
      expect(getNodeText(document.querySelector("#ptdTimingValue"))).toStrictEqual('--:--');
      expect(getNodeText(document.querySelector("#adctTimingValue"))).toStrictEqual('--:--');
      expect(document.querySelector("#etaTimingValue")).toBeNull();
    });
  });
});