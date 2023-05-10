/**
 * @jest-environment jsdom
 */

import React from 'react';
import { getNodeText, render } from 'tests/renderTimezoneFilter';
import '@testing-library/jest-dom';

import TIMING_ACRONYMS from "src/constants/timingAcronyms.json";

import ScheduledDepartureTime from "src/components/flight/scheduledDepartureTime";

const departureFlightId = 112233;
const departureFlightRescheduledDatetime = '2021-12-20T14:00:00Z';
const departureFlightScheduledDatetime = '2021-12-20T14:00:00Z';

describe('Testing ScheduledDepartureTime Component', () => {
  describe('Testing first part of the component', () => {
    it('should display STD text when rescheduled_time_departure_datetime is null', () => {
      render(
        <ScheduledDepartureTime
          departureFlightId={departureFlightId}
          departureFlightRescheduledDatetime={null}
          departureFlightScheduledDatetime={departureFlightScheduledDatetime}
        />
      );

      expect(
        getNodeText(document.querySelector('#scheduledDepartureTimeText112233'))
      ).toStrictEqual(TIMING_ACRONYMS.departure_text.scheduled_time_departure);
    });

    it('should display STD text when rescheduled_time_departure_datetime and std are equal', () => {
      render(
        <ScheduledDepartureTime
          departureFlightId={departureFlightId}
          departureFlightRescheduledDatetime={
            departureFlightRescheduledDatetime
          }
          departureFlightScheduledDatetime={departureFlightScheduledDatetime}
        />
      );

      expect(
        getNodeText(document.querySelector('#scheduledDepartureTimeText112233'))
      ).toStrictEqual(TIMING_ACRONYMS.departure_text.scheduled_time_departure);
    });

    it('should display RTD text when rescheduled_time_departure_datetime and std are unequal', () => {
      render(
        <ScheduledDepartureTime
          departureFlightId={departureFlightId}
          departureFlightRescheduledDatetime='2021-12-20T14:10:00Z'
          departureFlightScheduledDatetime={departureFlightScheduledDatetime}
        />
      );

      expect(
        getNodeText(document.querySelector('#scheduledDepartureTimeText112233'))
      ).toStrictEqual(
        TIMING_ACRONYMS.departure_text.rescheduled_time_departure
      );
    });
  });

  describe('Testing second part of the component', () => {
    it('should display STD value when rescheduled_time_departure_datetime is null', () => {
      render(
        <ScheduledDepartureTime
          departureFlightId={departureFlightId}
          departureFlightRescheduledDatetime={null}
          departureFlightScheduledDatetime={departureFlightScheduledDatetime}
        />
      );

      expect(
        getNodeText(
          document.querySelector('#scheduledDepartureTimeContent112233')
        )
      ).toStrictEqual('11:00');
    });

    it('should display STD value when rescheduled_time_departure_datetime and std are equal', () => {
      render(
        <ScheduledDepartureTime
          departureFlightId={departureFlightId}
          departureFlightRescheduledDatetime={
            departureFlightRescheduledDatetime
          }
          departureFlightScheduledDatetime={departureFlightScheduledDatetime}
        />
      );

      expect(
        getNodeText(
          document.querySelector('#scheduledDepartureTimeContent112233')
        )
      ).toStrictEqual('11:00');
    });

    it('should display RTD value when rescheduled_time_departure_datetime and std are unequal', () => {
      render(
        <ScheduledDepartureTime
          departureFlightId={departureFlightId}
          departureFlightRescheduledDatetime='2021-12-20T14:10:00Z'
          departureFlightScheduledDatetime={departureFlightScheduledDatetime}
        />
      );

      expect(
        getNodeText(
          document.querySelector('#scheduledDepartureTimeContent112233')
        )
      ).toStrictEqual('11:10');
    });
  });
});
