import hasAgoaStringDateFormat from '../../../../src/utils/logic/date/hasAgoaStringDateFormat';

describe('Testing hasAgoaStringDateFormat Function', function() {
  it('string has correct format', function() {
    let result = hasAgoaStringDateFormat('2021-06-16T22:25:00Z');

    expect(result).toBeTruthy();
  });

  it('string without correct format - Missing Z at the end of the dateString', function() {
    expect(() => {
      hasAgoaStringDateFormat('2021-06-16T22:25:00')}).toThrow('Date String doesn\'t match Agoa format');
  });

  it('string without correct format - Impossible Month', function() {
    expect(() => {
      hasAgoaStringDateFormat('2021-AA-16T22:25:00Z')}).toThrow('Date String doesn\'t match Agoa format');
    expect(() => {
      hasAgoaStringDateFormat('2021-43-16T22:25:00Z')}).toThrow('Date String doesn\'t match Agoa format');
  });

  it('string without correct format - Impossible Day', function() {
    expect(() => {
      hasAgoaStringDateFormat('2021-06-A4T22:25:00Z')}).toThrow('Date String doesn\'t match Agoa format');
    expect(() => {
      hasAgoaStringDateFormat('2021-06-40T22:25:00Z')}).toThrow('Date String doesn\'t match Agoa format');
  });

  it('string without correct format - Missing Time Infos', function() {
    expect(() => {
      hasAgoaStringDateFormat('2021-06-16-22:25:00Z')}).toThrow('Date String doesn\'t match Agoa format');
    expect(() => {
      hasAgoaStringDateFormat('2021-06-16T25:00Z')}).toThrow('Date String doesn\'t match Agoa format');
    expect(() => {
        hasAgoaStringDateFormat('2021-06-16TA2:2A5:00Z')}).toThrow('Date String doesn\'t match Agoa format');
  });

  it('string without correct format - Wrong order', function() {
    expect(() => {
      hasAgoaStringDateFormat('06-29-2021T22:25:00Z');
    }).toThrow('Date String doesn\'t match Agoa format');
  });

  it('null provide', function() {
    expect(() => {
      hasAgoaStringDateFormat(null)}).toThrow('Date String doesn\'t match Agoa format');
  });
})
