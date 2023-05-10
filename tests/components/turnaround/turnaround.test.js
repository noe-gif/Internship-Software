/**
 * @jest-environment jsdom
*/

import React from 'react';
import { getNodeText, render, fireEvent } from 'tests/renderTimezoneFilter';

import Turnaround from 'src/components/turnaround/turnaround';

const cardSize = 'large';
const date = new Date(2022, 4, 20, 23, 0, 0);
const isInDetailsView = true;

const flightAircraftInfo = {
  tail_number: 'FRBOD',
  icao_code: "A315",
};

const turnaround = {
  id: 12345,
  delays: [
    { code: "15D", duration: 20, id: 217771 },
    { code: "15B", duration: 11, id: 217770},
  ],
  arrival_flight: {
    id: 112233,
    carrier_code: "TT",
    flight_number: "282",
    departure_airport: { iata_code: 'BOD' },
    arrival_airport: { iata_code: 'ORY' },
    scheduled_time_arrival_datetime: "2021-09-19T05:40:00Z",
    actual_gate_arrival_datetime: "2021-09-19T05:36:00Z",
    aircraft: flightAircraftInfo,
    parking_stand_arrival: "B05",
  },
  departure_flight: {
    id: 445566,
    carrier_code: "TT",
    flight_number: "025",
    arrival_airport: { iata_code: 'BOD' },
    departure_airport: { iata_code: 'ORY' },
    scheduled_time_departure_datetime: "2021-09-20T10:20:00Z",
    parking_stand_departure: "J4",
    actual_gate_departure_datetime: "2021-09-20T10:51:00Z",
    aircraft: flightAircraftInfo,
  },
  status: { category: 'completed' }
};

const turnaroundWithAllParkingsStandNull = {
  id: 12345,
  delays: [
    { code: "15D", duration: 20, id: 217771 },
    { code: "15B", duration: 11, id: 217770},
  ],
  arrival_flight: {
    id: 112233,
    carrier_code: "TT",
    flight_number: "282",
    departure_airport: { iata_code: 'BOD' },
    arrival_airport: { iata_code: 'ORY' },
    scheduled_time_arrival_datetime: "2021-09-19T05:40:00Z",
    actual_gate_arrival_datetime: "2021-09-19T05:36:00Z",
    aircraft: flightAircraftInfo,
    parking_stand_arrival: null,
  },
  departure_flight: {
    id: 445566,
    carrier_code: "TT",
    flight_number: "025",
    arrival_airport: { iata_code: 'BOD' },
    departure_airport: { iata_code: 'ORY' },
    scheduled_time_departure_datetime: "2021-09-20T10:20:00Z",
    parking_stand_departure: null,
    actual_gate_departure_datetime: "2021-09-20T10:51:00Z",
    aircraft: flightAircraftInfo,
  },
  status: { category: 'completed' }
};

const selectedTurnarounds = [turnaround];

const closeDetailView = () => {};
const getTurnaroundDetailsRequest = () => {};

const spyCloseDetailView = jest.fn(closeDetailView);
const spyGetTurnaroundDetailsRequest = jest.fn(getTurnaroundDetailsRequest);

describe('Display turnaround parking stands', () => {
  describe('Arrival parking stand', () => {
    it('should display arrival parking stand when status is in_progress', () => {
      render(
        <Turnaround
          cardSize={cardSize}
          closeDetailView={spyCloseDetailView}
          date={date}
          getTurnaroundDetailsRequest={spyGetTurnaroundDetailsRequest}
          isInDetailsView={isInDetailsView}
          selectedTurnarounds={selectedTurnarounds}
          turnaround={{...turnaround, status: {category: 'in_progress' }}}
        />
      );
      expect(getNodeText(document.querySelector("#turnaroundArrivalFlightParkingStand12345")))
        .toStrictEqual("B05");
    });

    it('should display arrival parking stand when status is incoming', () => {
      render(
        <Turnaround
          cardSize={cardSize}
          closeDetailView={spyCloseDetailView}
          date={date}
          getTurnaroundDetailsRequest={spyGetTurnaroundDetailsRequest}
          isInDetailsView={isInDetailsView}
          selectedTurnarounds={selectedTurnarounds}
          turnaround={{...turnaround, status: {category: 'incoming' } }}
        />
      );
      expect(getNodeText(document.querySelector("#turnaroundArrivalFlightParkingStand12345")))
        .toStrictEqual("B05");
    });
  
    it('should not display arrival parking stand because status is completed', () => {
      render(
        <Turnaround
          cardSize={cardSize}
          closeDetailView={spyCloseDetailView}
          date={date}
          getTurnaroundDetailsRequest={spyGetTurnaroundDetailsRequest}
          isInDetailsView={isInDetailsView}
          selectedTurnarounds={selectedTurnarounds}
          turnaround={turnaround}
        />
      );
      expect(document.querySelector("#turnaroundArrivalFlightParkingStand12345")).toBeNull();
    });

    it('should not display arrival parking stand because status is cancelled', () => {
      render(
        <Turnaround
          cardSize={cardSize}
          closeDetailView={spyCloseDetailView}
          date={date}
          getTurnaroundDetailsRequest={spyGetTurnaroundDetailsRequest}
          isInDetailsView={isInDetailsView}
          selectedTurnarounds={selectedTurnarounds}
          turnaround={{...turnaround, status: {category: 'cancelled' } }}
        />
      );
      expect(document.querySelector("#turnaroundArrivalFlightParkingStand12345")).toBeNull();
    });

    it('should not display arrival parking stand because arrival_parking_stand is equal to null', () => {
      render(
        <Turnaround
          cardSize={cardSize}
          closeDetailView={spyCloseDetailView}
          date={date}
          getTurnaroundDetailsRequest={spyGetTurnaroundDetailsRequest}
          isInDetailsView={isInDetailsView}
          selectedTurnarounds={selectedTurnarounds}
          turnaround={turnaroundWithAllParkingsStandNull}
        />
      );
      expect(document.querySelector("#turnaroundArrivalFlightParkingStand12345")).toBeNull();
    });
  });

  describe('Departure parking stand', () => {
    it('should display departure parking stand when status is in_progress', () => {
      render(
        <Turnaround
          cardSize={cardSize}
          closeDetailView={spyCloseDetailView}
          date={date}
          getTurnaroundDetailsRequest={spyGetTurnaroundDetailsRequest}
          isInDetailsView={isInDetailsView}
          selectedTurnarounds={selectedTurnarounds}
          turnaround={{...turnaround, status: {category: 'in_progress' }}}
        />
      );
      expect(getNodeText(document.querySelector("#turnaroundDepartureFlightParkingStand12345")))
        .toStrictEqual("J4");
    });

    it('should display departure parking stand when status is incoming', () => {
      render(
        <Turnaround
          cardSize={cardSize}
          closeDetailView={spyCloseDetailView}
          date={date}
          getTurnaroundDetailsRequest={spyGetTurnaroundDetailsRequest}
          isInDetailsView={isInDetailsView}
          selectedTurnarounds={selectedTurnarounds}
          turnaround={{...turnaround, status: {category: 'incoming' } }}
        />
      );
      expect(getNodeText(document.querySelector("#turnaroundDepartureFlightParkingStand12345")))
        .toStrictEqual("J4");
    });
  
    it('should not display departure parking stand because status is completed', () => {
      render(
        <Turnaround
          cardSize={cardSize}
          closeDetailView={spyCloseDetailView}
          date={date}
          getTurnaroundDetailsRequest={spyGetTurnaroundDetailsRequest}
          isInDetailsView={isInDetailsView}
          selectedTurnarounds={selectedTurnarounds}
          turnaround={turnaround}
        />
      );
      expect(document.querySelector("#turnaroundDepartureFlightParkingStand12345")).toBeNull();
    });

    it('should not display departure parking stand because status is cancelled', () => {
      render(
        <Turnaround
          cardSize={cardSize}
          closeDetailView={spyCloseDetailView}
          date={date}
          getTurnaroundDetailsRequest={spyGetTurnaroundDetailsRequest}
          isInDetailsView={isInDetailsView}
          selectedTurnarounds={selectedTurnarounds}
          turnaround={{...turnaround, status: {category: 'cancelled' } }}
        />
      );
      expect(document.querySelector("#turnaroundDepartureFlightParkingStand12345")).toBeNull();
    });

    it('should not display departure parking stand because departure_parking_stand is equal to null', () => {
      render(
        <Turnaround
          cardSize={cardSize}
          closeDetailView={spyCloseDetailView}
          date={date}
          getTurnaroundDetailsRequest={spyGetTurnaroundDetailsRequest}
          isInDetailsView={isInDetailsView}
          selectedTurnarounds={selectedTurnarounds}
          turnaround={turnaroundWithAllParkingsStandNull}
        />
      );
      expect(document.querySelector("#turnaroundDepartureFlightParkingStand12345")).toBeNull();
    });
  });
});

describe('Turnaround Component display', () => {
  beforeEach(() => {
    render(
      <Turnaround
        cardSize={cardSize}
        closeDetailView={spyCloseDetailView}
        date={date}
        getTurnaroundDetailsRequest={spyGetTurnaroundDetailsRequest}
        isInDetailsView={isInDetailsView}
        selectedTurnarounds={selectedTurnarounds}
        turnaround={turnaround}
      />
    );
  });

  afterEach(() => {
    spyCloseDetailView.mockClear();
    spyGetTurnaroundDetailsRequest.mockClear();
  });

  it('should display selectedIndex when isSelected is true', () => {
    expect(getNodeText(document.querySelector("#turnaround12345Marker"))).toStrictEqual("1");
  });

  describe('Display turnaround arrival flight content', () => {
    it('should display arrival flight number', () => {
      expect(getNodeText(document.querySelector("#turnaroundArrivalFlightNumber12345")))
        .toStrictEqual("TT 282");
    });

    it('should display arrival airport code', () => {
      expect(getNodeText(document.querySelector("#turnaroundArrivalFlightAirport12345")))
        .toStrictEqual("BOD");
    });
  });

  describe('Display turnaround Content', () => {
    it('should display tail number', () => {
      expect(getNodeText(document.querySelector("#turnaroundTailNumber12345")))
        .toStrictEqual("FRBOD");
    });

    it('should display aircraft model', () => {
      expect(getNodeText(document.querySelector("#turnaroundAircraft12345")))
        .toStrictEqual("A315");
    });

    it('should display scheduled arrival timing', () => {
      expect(getNodeText(document.querySelector("#scheduledArrivalTimeText112233")))
        .toStrictEqual("STA");
      expect(getNodeText(document.querySelector("#scheduledArrivalTimeContent112233")))
        .toStrictEqual("02:40");
    });

    it('should display actual arrival timing', () => {
      expect(getNodeText(document.querySelector("#arrivalTimeText12345")))
        .toStrictEqual("ATA");
      expect(getNodeText(document.querySelector("#arrivalTimeContent12345")))
        .toStrictEqual("02:36");
    });

    it('should display scheduled departure timing', () => {
      expect(getNodeText(document.querySelector("#scheduledDepartureTimeText445566")))
        .toStrictEqual("STD");
      expect(getNodeText(document.querySelector("#scheduledDepartureTimeContent445566")))
        .toStrictEqual("07:20");
    });

    it('should display actual departure timing', () => {
      expect(getNodeText(document.querySelector("#departureTimeText12345")))
        .toStrictEqual("ATD");
      expect(getNodeText(document.querySelector("#departureTimeContent12345")))
        .toStrictEqual("07:51");
    });
  });

  describe('Display turnaround departure flight content', () => {
    it('should display departure flight number', () => {
      expect(getNodeText(document.querySelector("#turnaroundDepartureFlightNumber12345")))
        .toStrictEqual("TT 025");
    });

    it('should display departure airport code', () => {
      expect(getNodeText(document.querySelector("#turnaroundDepartureFlightAirport12345")))
        .toStrictEqual("BOD");
    });
  });
});

describe('Turnaround Component functional', () => {
  it('should close turnaroundDetail view when clicking on turnaround and selectedTurnarounds contains turnaround', () => {
    render(
      <Turnaround
        cardSize={cardSize}
        closeDetailView={spyCloseDetailView}
        date={date}
        getTurnaroundDetailsRequest={spyGetTurnaroundDetailsRequest}
        isInDetailsView={isInDetailsView}
        selectedTurnarounds={selectedTurnarounds}
        turnaround={turnaround}
      />
    );

    fireEvent.click(document.querySelector("#turnaround12345"));
    
    expect(spyCloseDetailView).toHaveBeenCalledWith([]);
  });

  it('should open turnaroundDetail view when clicking on turnaround and selectedTurnarounds does not contains turnaround', () => {
    render(
      <Turnaround
        cardSize={cardSize}
        closeDetailView={spyCloseDetailView}
        date={date}
        getTurnaroundDetailsRequest={spyGetTurnaroundDetailsRequest}
        isInDetailsView={false}
        selectedTurnarounds={[]}
        turnaround={turnaround}
      />
    );

    fireEvent.click(document.querySelector("#turnaround12345"));

    expect(spyGetTurnaroundDetailsRequest).toHaveBeenCalledWith({
      date: date,
      selectedTurnarounds: [turnaround],
    });
  });
});