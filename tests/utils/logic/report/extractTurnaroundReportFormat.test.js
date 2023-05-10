import extractTurnaroundReportFormat from 'src/utils/logic/report/extractTurnaroundReportFormat';

describe('Testing extractTurnaroundReportFormat function', () => {
  it('test with turnaroundId found in turnaroundReportsArray', () => {
    let result = extractTurnaroundReportFormat([
      {turnaroundId: 103, turnaroundReport: {}},
      {turnaroundId: 104, turnaroundReport: {}},
    ], 103);

    expect(result).toStrictEqual({turnaroundId: 103, turnaroundReport: {}});
  });

  it('test with turnaroundId not in turnaroundReportsArray', () => {
    let result = extractTurnaroundReportFormat([
      {turnaroundReport: 103, turnaroundReport: {}},
      {turnaroundReport: 104, turnaroundReport: {}},
    ], 105);

    expect(result).toStrictEqual(null);
  });

  it('null provide', () => {
    let result = extractTurnaroundReportFormat(null, null);

    expect(result).toStrictEqual(null);
  });
});
