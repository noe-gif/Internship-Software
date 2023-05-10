/**
 * @jest-environment jsdom
 */

import React from 'react';
import { getNodeText, render, screen } from 'tests/renderTimezoneFilter';
import '@testing-library/jest-dom';

import TIMING_ACRONYMS from 'src/constants/timingAcronyms.json';

import DepartureTime from 'src/components/flight/departureTime';

import { CANCELED, COMPLETED, IN_PROGRESS, INCOMING } from 'src/types/FlightStatus';

const allDoorsClosedTargetDateTime = '2021-12-20T13:58:00Z';

const departureFlight = {
  sta: '2021-12-20T10:00:00Z',
  std: '2021-12-20T14:00:00Z',
};

const turnaroundId = 12345;

describe('Testing DepartureTime component', () => {
  describe('Testing first part of the component', () => {
    it('should display empty string when turnaroundData status is CANCELED', () => {
      render(
        <DepartureTime
          allDoorsClosedTargetDateTime={allDoorsClosedTargetDateTime}
          departureFlight={departureFlight}
          turnaroundId={turnaroundId}
          turnaroundStatus={{ category: CANCELED }}
        />
      );

      expect(getNodeText(document.querySelector('#departureTimeText12345'))).toStrictEqual('');
    });

    it('should display ADCT text when turnaroundData status is IN_PROGRESS', () => {
      render(
        <DepartureTime
          allDoorsClosedTargetDateTime={allDoorsClosedTargetDateTime}
          departureFlight={departureFlight}
          turnaroundId={turnaroundId}
          turnaroundStatus={{ category: IN_PROGRESS }}
        />
      );

      expect(getNodeText(document.querySelector('#departureTimeText12345')))
      .toStrictEqual(TIMING_ACRONYMS.departure_text.all_doors_closed_target);
    });

    describe('Testing with turnaroundData status INCOMING', () => {
      it('should display empty string when estimated_gate_departure_datetime is null', () => {
        render(
          <DepartureTime
            allDoorsClosedTargetDateTime={allDoorsClosedTargetDateTime}
            departureFlight={departureFlight}
            turnaroundId={turnaroundId}
            turnaroundStatus={{ category: INCOMING }}
          />
        );
  
        expect(getNodeText(document.querySelector('#departureTimeText12345'))).toStrictEqual('');
      });

      it('should display PTD text when estimated_gate_departure_datetime is provide', () => {
        render(
          <DepartureTime
            allDoorsClosedTargetDateTime={allDoorsClosedTargetDateTime}
            departureFlight={{ ...departureFlight, estimated_gate_departure_datetime: '2021-12-20T14:04:00Z' }}
            turnaroundId={turnaroundId}
            turnaroundStatus={{ category: INCOMING }}
          />
        );

        expect(getNodeText(document.querySelector('#departureTimeText12345')))
        .toStrictEqual(TIMING_ACRONYMS.departure_text.estimated_departure);
      });
    });

    it('should display ATD text when turnaroundData status is COMPLETED', () => {
      render(
        <DepartureTime
          allDoorsClosedTargetDateTime={allDoorsClosedTargetDateTime}
          departureFlight={{ ...departureFlight, actual_gate_departure_datetime: '2021-12-20T14:02:00Z' }}
          turnaroundId={turnaroundId}
          turnaroundStatus={{ category: COMPLETED }}
        />
      );

      expect(getNodeText(document.querySelector('#departureTimeText12345')))
      .toStrictEqual(TIMING_ACRONYMS.departure_text.actual_time_departure);
    });
  });

  describe('Testing second part of the component', () => {
    it('should display ADCT value when turnaroundData status is IN_PROGRESS', () => {
      render(
        <DepartureTime
          allDoorsClosedTargetDateTime={allDoorsClosedTargetDateTime}
          departureFlight={departureFlight}
          turnaroundId={turnaroundId}
          turnaroundStatus={{ category: IN_PROGRESS }}
        />
      );

      expect(getNodeText(document.querySelector('#departureTimeContent12345'))).toStrictEqual('10:58');
    });

    describe('Testing with turnaroundData status INCOMING', () => {
      it('should display PTD value when estimated_gate_departure_datetime is provide', () => {
        render(
          <DepartureTime
            allDoorsClosedTargetDateTime={allDoorsClosedTargetDateTime}
            departureFlight={{ ...departureFlight, estimated_gate_departure_datetime: '2021-12-20T14:04:00Z' }}
            turnaroundId={turnaroundId}
            turnaroundStatus={{ category: INCOMING }}
          />
        );

        expect(getNodeText(document.querySelector('#departureTimeContent12345'))).toStrictEqual('11:04');
      });
    });

    it('should display ATD value when turnaroundData status is COMPLETED', () => {
      render(
        <DepartureTime
          allDoorsClosedTargetDateTime={allDoorsClosedTargetDateTime}
          departureFlight={{ ...departureFlight, actual_gate_departure_datetime: '2021-12-20T14:02:00Z' }}
          turnaroundId={turnaroundId}
          turnaroundStatus={{ category: COMPLETED }}
        />
      );

      expect(getNodeText(document.querySelector('#departureTimeContent12345'))).toStrictEqual('11:02');
    });
  });
});