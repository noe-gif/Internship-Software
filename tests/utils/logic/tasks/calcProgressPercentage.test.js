import calcProgressPercentage from 'src/utils/logic/tasks/calcProgressPercentage';

describe('calcProgressPercentage utils', () => {
  it('should return 50 when actual time is in middle of start timing and end timing', () => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(Date.UTC(2021, 7, 1, 10, 35)));
    const result = calcProgressPercentage("2021-08-01T10:30:00Z", "2021-08-01T10:40:00Z");

    expect(result).toStrictEqual(50);

    jest.useRealTimers();
  });

  it('should return 100 when actual timing has passed planned end', () => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(Date.UTC(2022, 0, 2, 20, 39)));

    const result = calcProgressPercentage("2022-01-02T20:08:00Z", "2022-01-02T20:38:00Z");

    expect(result).toStrictEqual(100);

    jest.useRealTimers();
  });

  it('should return 100 when actual timing is before planned start', () => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(Date.UTC(2022, 0, 2, 20, 37)));

    const result = calcProgressPercentage("2022-01-02T20:38:00Z", "2022-01-02T20:48:00Z");

    expect(result).toStrictEqual(100);

    jest.useRealTimers();
  });
});
