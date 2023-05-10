/**
 * @jest-environment jsdom
 */

import React from 'react';
import {getNodeText, render} from 'tests/renderTimezoneFilter';
import '@testing-library/jest-dom';

import TIMING_ACRONYMS from 'src/constants/timingAcronyms.json';

import ArrivalTime from 'src/components/flight/arrivalTime';

import { CANCELED, COMPLETED, IN_PROGRESS, INCOMING } from 'src/types/FlightStatus';

const arrivalFlight = {
  sta: '2021-12-20T14:03:00Z',
  std: '2021-12-20T10:00:00Z',
};

describe('Testing ArrivalTime component', () => {
  describe('Testing first part of the component', () => {
    it('should display an empty string when turnaroundData status is CANCELED', () => {
      render(
        <ArrivalTime
          arrivalFlight={arrivalFlight}
          turnaroundId={12345}
          turnaroundStatus={{ category: CANCELED }}
        />
      );

      expect(getNodeText(document.querySelector('#arrivalTimeText12345'))).toStrictEqual('');
    });

    describe('Testing with turnaroundData status IN_PROGRESS', () => {
      it('should display ATA text when actual_gate_arrival_datetime exist', () => {
        render(
          <ArrivalTime
            arrivalFlight={{ ...arrivalFlight, actual_gate_arrival_datetime: '2021-12-20T14:00:00Z' }}
            turnaroundId={12345}
            turnaroundStatus={{ category: IN_PROGRESS }}
          />
        );

        expect(getNodeText(document.querySelector('#arrivalTimeText12345')))
        .toStrictEqual(TIMING_ACRONYMS.arrival_text.actual_time_arrival);
      });
    });

    describe('Testing with turnaroundData status INCOMING', () => {
      it('should display empty string when estimated_gate_arrival_datetime is null', () => {
        render(
          <ArrivalTime
            arrivalFlight={arrivalFlight}
            turnaroundId={12345}
            turnaroundStatus={{ category: INCOMING }}
          />
        );
  
        expect(getNodeText(document.querySelector('#arrivalTimeText12345'))).toStrictEqual('');
      });

      it('should display ETA text when estimated_gate_arrival_datetime exist', () => {
        render(
          <ArrivalTime
            arrivalFlight={{ ...arrivalFlight, estimated_gate_arrival_datetime: '2021-12-20T14:00:00Z' }}
            turnaroundId={12345}
            turnaroundStatus={{ category: INCOMING }}
          />
        );

        expect(getNodeText(document.querySelector('#arrivalTimeText12345')))
        .toStrictEqual(TIMING_ACRONYMS.arrival_text.estimated_time_arrival);
      });
    });

    it('should display ATA text when turnaroundData status is COMPLETED', () => {
      render(
        <ArrivalTime
          arrivalFlight={{ ...arrivalFlight, actual_gate_arrival_datetime: '2021-12-20T14:06:00Z' }}
          turnaroundId={12345}
          turnaroundStatus={{ category: COMPLETED }}
        />
      );

      expect(getNodeText(document.querySelector('#arrivalTimeText12345')))
      .toStrictEqual(TIMING_ACRONYMS.arrival_text.actual_time_arrival);
    });
  });

  describe('Testing second part of the component', () => {
    describe('Testing with turnaroundData status IN_PROGRESS', () => {
      it('should display ATA value when actual_gate_arrival_datetime exist', () => {
        render(
          <ArrivalTime
            arrivalFlight={{ ...arrivalFlight, actual_gate_arrival_datetime: '2021-12-20T14:00:00Z' }}
            turnaroundId={12345}
            turnaroundStatus={{ category: IN_PROGRESS }}
          />
        );

        expect(getNodeText(document.querySelector('#arrivalTimeContent12345'))).toStrictEqual('11:00');
      });
    });

    describe('Testing with turnaroundData status INCOMING', () => {
      it('should display ETA value when estimated_gate_arrival_datetime exist', () => {
        render(
          <ArrivalTime
            arrivalFlight={{ ...arrivalFlight, estimated_gate_arrival_datetime: '2021-12-20T14:00:00Z' }}
            turnaroundId={12345}
            turnaroundStatus={{ category: INCOMING }}
          />
        );

        expect(getNodeText(document.querySelector('#arrivalTimeContent12345'))).toStrictEqual('11:00');
      });
    });

    it('should display ATA value when turnaroundData status is COMPLETED', () => {
      render(
        <ArrivalTime
          arrivalFlight={{ ...arrivalFlight, actual_gate_arrival_datetime: '2021-12-20T14:06:00Z' }}
          turnaroundId={12345}
          turnaroundStatus={{ category: COMPLETED }}
        />
      );

      expect(getNodeText(document.querySelector('#arrivalTimeContent12345'))).toStrictEqual('11:06');
    });
  });
});