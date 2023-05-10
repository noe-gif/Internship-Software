import timingDifferenceInMinutes from 'src/utils/logic/tasks/extractActualTiming';

describe('Testing timingDifferenceInMinutes function', function() {
  it('test with actual timing < planned timing', function() {
    let result = timingDifferenceInMinutes("2021-08-01T10:30:00Z", "2021-08-01T10:20:00Z");

    expect(result).toEqual('-10min');
  });

  it('test with actual timing > planned timing', function() {
    let result = timingDifferenceInMinutes("2021-08-02T15:00:00Z", "2021-08-02T15:25:00Z");

    expect(result).toStrictEqual('+25min');
  });

  it('null provide', function() {
    let result = timingDifferenceInMinutes(null);

    expect(result).toStrictEqual(null);
  });
});
