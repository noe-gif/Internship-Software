/**
 * @jest-environment jsdom
 */

import React from 'react';
import {getNodeText, render} from 'tests/renderTimezoneFilter';
import '@testing-library/jest-dom';

import TIMING_ACRONYMS from 'src/constants/timingAcronyms.json';

import ScheduledArrivalTime from 'src/components/flight/scheduledArrivalTime';

const arrivalFlight = {
  id: 223344,
  sta: "2021-12-20T14:00:00Z",
  std: "2021-12-20T10:00:00Z",
};

const arrivalFlightId = 223344;
const arrivalFlightRescheduledDatetime = "2021-12-20T14:00:00Z";
const arrivalFlightScheduledDatetime = "2021-12-20T14:00:00Z";

describe("Testing ScheduledArrivalTime Component", () => {
  describe("Testing first part of the component", () => {
    it("should display STA text when rescheduled_time_arrival_datetime is null", () => {
      render(
        <ScheduledArrivalTime
          arrivalFlightId={arrivalFlightId}
          arrivalFlightRescheduledDatetime={null}
          arrivalFlightScheduledDatetime={arrivalFlightScheduledDatetime}
        />
      );

      expect(getNodeText(document.querySelector("#scheduledArrivalTimeText223344")))
      .toStrictEqual(TIMING_ACRONYMS.arrival_text.scheduled_time_arrival);
    });

    it("should display STA text when rescheduled_time_arrival_datetime is equal to sta", () => {
      render(
        <ScheduledArrivalTime
          arrivalFlightId={arrivalFlightId}
          arrivalFlightRescheduledDatetime={arrivalFlightRescheduledDatetime}
          arrivalFlightScheduledDatetime={arrivalFlightScheduledDatetime}
        />
      );

      expect(getNodeText(document.querySelector("#scheduledArrivalTimeText223344")))
      .toStrictEqual(TIMING_ACRONYMS.arrival_text.scheduled_time_arrival);
    });

    it("should display RTA text when rescheduled_time_arrival_datetime is unequal to sta", () => {
      render(
        <ScheduledArrivalTime
          arrivalFlightId={arrivalFlightId}
          arrivalFlightRescheduledDatetime={"2021-12-20T14:10:00Z"}
          arrivalFlightScheduledDatetime={arrivalFlightScheduledDatetime}
        />
      );

      expect(getNodeText(document.querySelector("#scheduledArrivalTimeText223344")))
      .toStrictEqual(TIMING_ACRONYMS.arrival_text.rescheduled_time_arrival);
    });
  });

  describe("Testing second part of the component", () => {
    it("should display STA value when rescheduled_time_arrival_datetime is null", () => {
      render(
        <ScheduledArrivalTime
          arrivalFlightId={arrivalFlightId}
          arrivalFlightRescheduledDatetime={null}
          arrivalFlightScheduledDatetime={arrivalFlightScheduledDatetime}
        />
      );

      expect(getNodeText(document.querySelector("#scheduledArrivalTimeContent223344"))).toStrictEqual("11:00");
    });

    it("should display STA value when rescheduled_time_arrival_datetime is equal to sta", () => {
      render(
        <ScheduledArrivalTime
          arrivalFlightId={arrivalFlightId}
          arrivalFlightRescheduledDatetime={arrivalFlightRescheduledDatetime}
          arrivalFlightScheduledDatetime={arrivalFlightScheduledDatetime}
        />
      );

      expect(getNodeText(document.querySelector("#scheduledArrivalTimeContent223344"))).toStrictEqual("11:00");
    });

    it("should display RTA value when rescheduled_time_arrival_datetime is unequal to sta", () => {
      render(
        <ScheduledArrivalTime
          arrivalFlightId={arrivalFlightId}
          arrivalFlightRescheduledDatetime={"2021-12-20T14:10:00Z"}
          arrivalFlightScheduledDatetime={arrivalFlightScheduledDatetime}
        />
      );

      expect(getNodeText(document.querySelector("#scheduledArrivalTimeContent223344"))).toStrictEqual("11:10");
    });
  });
});