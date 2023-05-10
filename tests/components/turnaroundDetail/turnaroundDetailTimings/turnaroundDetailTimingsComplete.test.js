/**
 * @jest-environment jsdom
*/

import React from "react";
import {render, getNodeText} from 'tests/renderTimezoneFilter';
import '@testing-library/jest-dom';

import TurnaroundDetailTimings from 'src/components/turnaroundDetail/turnaroundDetailTimings';

const turnaround = {
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
  departure_flight: {
    arrival_airport: { iata_code: 'SFO' },
    departure_airport: { iata_code: 'ORY' },
    aircraft: { icao_code: "A35K", tail_number: "FHTOO" },
    sta: "2021-09-20T19:05:00Z",
    std: "2021-09-20T10:20:00Z",
    actual_gate_departure_datetime: "2021-09-20T10:51:00Z"
  }
};

describe('TurnaroundDetailTimings complete turnaround', () => {
  describe('complete turnaround with component size equal to small', () => {
    beforeEach(() => {
      render(<TurnaroundDetailTimings 
        componentSize="small" turnaroundData={turnaround}
        resetFlightTimingStatus={() => {}}
        updateFlightTimingStatus={{status: 'success', statusCode: 200}} 
      />);
    });

    it('should display STD and STA', () => {
      expect(getNodeText(document.querySelector("#stdTimingText"))).toStrictEqual('STD');
      expect(getNodeText(document.querySelector("#staTimingText"))).toStrictEqual('STA');
    });

    it('should display ATD and ATA', () => {
      expect(getNodeText(document.querySelector("#atdTimingText"))).toStrictEqual('ATD');
      expect(getNodeText(document.querySelector("#ataTimingText"))).toStrictEqual('ATA');
    });

    it('should display RTD and RTA', () => {
      expect(getNodeText(document.querySelector("#rtdTimingText"))).toStrictEqual('RTD');
      expect(getNodeText(document.querySelector("#rtaTimingText"))).toStrictEqual('RTA');
    });

    it('should display ADC and ADO', () => {
      expect(getNodeText(document.querySelector("#adcTimingText"))).toStrictEqual('ADC');
      expect(getNodeText(document.querySelector("#adoTimingText"))).toStrictEqual('ADO');
    });

    it('should display PTD and ADCT but not ETA', () => {
      expect(getNodeText(document.querySelector("#ptdTimingText"))).toStrictEqual('PTD');
      expect(getNodeText(document.querySelector("#adctTimingText"))).toStrictEqual('ADCT');
      expect(getNodeText(document.querySelector("#etaTimingText"))).toStrictEqual('ETA');
    });

    it('should display STD timing and STA timing', () => {
      expect(getNodeText(document.querySelector("#stdTimingValue"))).toStrictEqual('07:20');
      expect(getNodeText(document.querySelector("#staTimingValue"))).toStrictEqual('02:40');

    });

    it('should display ATD timing and ATA timing', () => {
      expect(getNodeText(document.querySelector("#atdTimingValue"))).toStrictEqual('07:51');
    });

    it('should display RTD timing and RTA timing', () => {
      expect(getNodeText(document.querySelector("#rtdTimingValue"))).toStrictEqual('--:--');
      expect(getNodeText(document.querySelector("#rtaTimingValue"))).toStrictEqual('--:--');
    });

    it('should display ADC timing and ADO timing', () => {
      expect(getNodeText(document.querySelector("#adcTimingValue"))).toStrictEqual('--:--');
      expect(getNodeText(document.querySelector("#adoTimingValue"))).toStrictEqual('--:--');
    });

    it('should display PTD timing and ADCT timing and ETA timing', () => {
      expect(getNodeText(document.querySelector("#ptdTimingValue"))).toStrictEqual('--:--');
      expect(getNodeText(document.querySelector("#adctTimingValue"))).toStrictEqual('--:--');
      expect(getNodeText(document.querySelector("#etaTimingValue"))).toStrictEqual('02:36');
    });
  });
  
  describe('complete turnaround only with component size equal to large', () => {
    beforeEach(() => {
      render(<TurnaroundDetailTimings 
        componentSize="large" turnaroundData={turnaround}
        resetFlightTimingStatus={() => {}}
        updateFlightTimingStatus={{status: 'success', statusCode: 200}} 
      />);
    });

    it('should display STD and STA', () => {
      expect(getNodeText(document.querySelector("#stdTimingText"))).toStrictEqual('STD');
      expect(getNodeText(document.querySelector("#staTimingText"))).toStrictEqual('STA');
    });

    it('should display ATD and ATA', () => {
      expect(getNodeText(document.querySelector("#atdTimingText"))).toStrictEqual('ATD');
      expect(getNodeText(document.querySelector("#ataTimingText"))).toStrictEqual('ATA');
    });

    it('should display RTD and RTA', () => {
      expect(getNodeText(document.querySelector("#rtdTimingText"))).toStrictEqual('RTD');
      expect(getNodeText(document.querySelector("#rtaTimingText"))).toStrictEqual('RTA');
    });

    it('should display ADC and ADO', () => {
      expect(getNodeText(document.querySelector("#adcTimingText"))).toStrictEqual('ADC');
      expect(getNodeText(document.querySelector("#adoTimingText"))).toStrictEqual('ADO');
    });

    it('should display PTD and ADCT but not ETA', () => {
      expect(getNodeText(document.querySelector("#ptdTimingText"))).toStrictEqual('PTD');
      expect(getNodeText(document.querySelector("#adctTimingText"))).toStrictEqual('ADCT');
      expect(getNodeText(document.querySelector("#etaTimingText"))).toStrictEqual('ETA');
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

    it('should display STD timing and STA timing', () => {
      expect(getNodeText(document.querySelector("#stdTimingValue"))).toStrictEqual('07:20');
      expect(getNodeText(document.querySelector("#staTimingValue"))).toStrictEqual('02:40');

    });

    it('should display ATD timing and ATA timing', () => {
      expect(getNodeText(document.querySelector("#atdTimingValue"))).toStrictEqual('07:51');
    });

    it('should display RTD timing and RTA timing', () => {
      expect(getNodeText(document.querySelector("#rtdTimingValue"))).toStrictEqual('--:--');
      expect(getNodeText(document.querySelector("#rtaTimingValue"))).toStrictEqual('--:--');
    });

    it('should display ADC timing and ADO timing', () => {
      expect(getNodeText(document.querySelector("#adcTimingValue"))).toStrictEqual('--:--');
      expect(getNodeText(document.querySelector("#adoTimingValue"))).toStrictEqual('--:--');
    });

    it('should display PTD timing and ADCT timing and ETA timing', () => {
      expect(getNodeText(document.querySelector("#ptdTimingValue"))).toStrictEqual('--:--');
      expect(getNodeText(document.querySelector("#adctTimingValue"))).toStrictEqual('--:--');
      expect(getNodeText(document.querySelector("#etaTimingValue"))).toStrictEqual('02:36');
    });
  });
});