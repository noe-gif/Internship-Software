import { compareDates, sortArrivalsByTime, sortDeparturesByTime, sortTurnaroundsByTime } from '../../../../src/utils/logic/turnaround/sortTurnaroundByTime';

describe('Testing sortArrivalsByTime function', function() {
  it('test first arrival date sooner than last arrival', function() {
    let result = sortArrivalsByTime(
      { arrival_flight: { actual_gate_arrival_datetime: "2021-08-22T07:47:00Z" }},
      { arrival_flight: { actual_gate_arrival_datetime: "2021-08-22T07:48:00Z" }}
    );

    expect(result).toStrictEqual(-1);
  });

  it('test last arrival date sooner than first arrival', function() {
    let result = sortArrivalsByTime(
      { arrival_flight: { actual_gate_arrival_datetime: "2021-08-22T07:51:00Z" }},
      { arrival_flight: { actual_gate_arrival_datetime: "2021-08-22T07:50:00Z" }}
    );

    expect(result).toStrictEqual(1);
  });

  it('test with params null', function() {
    let result = sortArrivalsByTime(null, null);

    expect(result).toStrictEqual(0);
  });

  it('test with first arrival date === last arrival date', function() {
    let result = sortArrivalsByTime(
      { arrival_flight: { actual_gate_arrival_datetime: "2021-08-22T07:50:00Z" }},
      { arrival_flight: { actual_gate_arrival_datetime: "2021-08-22T07:50:00Z" }}
    );

    expect(result).toStrictEqual(0);
  });
});

describe('Testing sortDeparturesByTime function', function() {
  it('test first departure date sooner than last departure', function() {
    let result = sortDeparturesByTime(
      { departure_flight: { actual_gate_departure_datetime: "2021-08-22T07:49:00Z" }},
      { departure_flight: { actual_gate_departure_datetime: "2021-08-22T07:50:00Z" }}
    );

    expect(result).toStrictEqual(-1);
  });

  it('test last departure date sooner than first departure', function() {
    let result = sortDeparturesByTime(
      { departure_flight: { actual_gate_departure_datetime: "2021-08-22T07:51:00Z" }},
      { departure_flight: { actual_gate_departure_datetime: "2021-08-22T07:50:00Z" }}
    );

    expect(result).toStrictEqual(1);
  });

  it('test with params null', function() {
    let result = sortDeparturesByTime(null, null);

    expect(result).toStrictEqual(0);
  });

  it('test with first departure date === last departure date', function() {
    let result = sortDeparturesByTime(
      { departure_flight: { actual_gate_departure_datetime: "2021-08-22T07:50:00Z" }},
      { departure_flight: { actual_gate_departure_datetime: "2021-08-22T07:50:00Z" }}
    );

    expect(result).toStrictEqual(0);
  });
});

describe('Testing sortTurnaroundByTime function', function() {
  it('test with first turnaround date sooner than last turnaround', function() {
    let result = sortTurnaroundsByTime(
      { arrival_flight: { actual_gate_arrival_datetime: "2021-08-22T07:45:00Z" }, departure_flight: { actual_gate_departure_datetime: "2021-08-22T07:50:00Z" } },
      { arrival_flight: { actual_gate_arrival_datetime: "2021-08-22T07:46:00Z" }, departure_flight: { actual_gate_departure_datetime: "2021-08-22T07:51:00Z" } }
    );

    expect(result).toStrictEqual(-1);
  });

  it('test with last turnaround date sooner than last turnaround', function() {
    let result = sortTurnaroundsByTime(
      { arrival_flight: { actual_gate_arrival_datetime: "2021-08-22T07:45:00Z" }, departure_flight: { actual_gate_departure_datetime: "2021-08-22T07:50:00Z" } },
      { arrival_flight: { actual_gate_arrival_datetime: "2021-08-22T07:44:00Z" }, departure_flight: { actual_gate_departure_datetime: "2021-08-22T07:49:00Z" } }
    );

    expect(result).toStrictEqual(1);
  });

  it('test with null provide', function() {
    let result = sortTurnaroundsByTime(null, null);

    expect(result).toStrictEqual(0);
  });

  it('test with first turnaround date === last turnaround date', function() {
    let result = sortTurnaroundsByTime(
      { arrival_flight: { actual_gate_arrival_datetime: "2021-08-22T07:45:00Z" }, departure_flight: { actual_gate_departure_datetime: "2021-08-22T07:50:00Z" } },
      { arrival_flight: { actual_gate_arrival_datetime: "2021-08-22T07:45:00Z" }, departure_flight: { actual_gate_departure_datetime: "2021-08-22T07:50:00Z" } }
    );

    expect(result).toStrictEqual(0);
  });
});

describe('Testing compareDates function', function() {
  it('test with first date > second date', function() {
    let result = compareDates(new Date("2021-08-22T07:46:00Z"), new Date("2021-08-22T07:45:00Z"));

    expect(result).toStrictEqual(1);
  });

  it('test with first date < second date', function() {
    let result = compareDates(new Date("2021-08-22T07:45:00Z"), new Date("2021-08-22T07:46:00Z"));

    expect(result).toStrictEqual(-1);
  });

  it('test with null provide', function() {
    let result = compareDates(null, null);

    expect(result).toStrictEqual(0);
  });

  it('test with first date === second date', function() {
    let result = compareDates(new Date("2021-08-22T07:45:00Z"), new Date("2021-08-22T07:45:00Z"));

    expect(result).toStrictEqual(0);
  });
});
