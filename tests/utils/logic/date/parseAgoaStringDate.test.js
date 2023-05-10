import parseAgoaStringDate from '../../../../src/utils/logic/date/parseAgoaStringDate';

describe('Testing parseAgoaStringDate Function', function() {
  it('complete dateString provide', function() {
    let result = parseAgoaStringDate('2021-06-16T22:25:35Z');

    expect(result).toStrictEqual({
      year: 2021,
      month: 6,
      day: 16,
      hours: 22,
      minutes: 25,
      seconds: 35,
    });
  });

  it('wrong format dateString provide', function() {
    expect(() => {
      parseAgoaStringDate('2021-AA-16T22:25:00Z');
    }).toThrow('Date String doesn\'t match Agoa format');
  });

  it('null provide', function() {
    let result = parseAgoaStringDate(null);

    expect(result).toStrictEqual(null);
  });
})
