import getTurnaroundAlertIcons from 'src/utils/logic/turnaround/getTurnaroundAlertIcons';

const departureFlight = {
  estimated_gate_departure_datetime: "2022-01-10T13:00:00Z",
  scheduled_time_departure_datetime: "2022-01-10T13:05:00Z",
};

const turnaroundStatus = "in_progress";

describe('Testing getTurnaroundAlertIcons function', () => {
  it('should return both icons when turnaround with late task and estimatedDeparture > scheduledDeparture', () => {
    const expectedIcons = ['DELAY'];

    let iconsArray = getTurnaroundAlertIcons(
      { ...departureFlight, estimated_gate_departure_datetime: "2022-01-10T13:10:00Z" },
      turnaroundStatus,
    );

    expect(iconsArray).toStrictEqual(expectedIcons);
  });

  it('should return empty array when turnaround status !== in_progress', () => {
    const expectedIcons = [];

    let iconsArray = getTurnaroundAlertIcons(
      departureFlight,
      "completed",
    );

    expect(iconsArray).toStrictEqual(expectedIcons);
  });

  it('should return empty array when departureFlight is null', () => {
    const expectedIcons = [];

    let iconsArray = getTurnaroundAlertIcons(
      null,
      turnaroundStatus,
    );

    expect(iconsArray).toStrictEqual(expectedIcons);
  });
});
