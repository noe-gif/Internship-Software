import parseDictionaryToArray from 'src/utils/parsing/parseDictionaryToArray';

describe('Testing parseDictionaryToArray function', () => {
  it('test parser on basic dictionary (key: string/number/null)', () => {
    let result = parseDictionaryToArray(
      {
        "ARR-Jetbridge": "On time task",
        "DPT-Jetbridge-Nbr": 3,
        "Check-In": null,
      },
    );

    expect(result).toStrictEqual([
      {name: "ARR-Jetbridge", value: "On time task"},
      {name: "DPT-Jetbridge-Nbr", value: 3},
      {name: "Check-In", value: null},
    ]);
  });

  it('test parser on complex dictionary (key: Array)', () => {
    let result = parseDictionaryToArray(
      {
        "ARR-Jetbridge": ["planned_start_date"],
        "DPT-Jetbridge": ["planned_start_date", "planned_end_date"],
      },
    );

    expect(result).toStrictEqual([
      {name: "ARR-Jetbridge", value: ["planned_start_date"]},
      {name: "DPT-Jetbridge", value: ["planned_start_date", "planned_end_date"]},
    ]);
  });

  it('test parser with empty dictionary', () => {
    let result = parseDictionaryToArray({});

    expect(result).toStrictEqual([]);
  });

  it('test parser with null provide', () => {
    let result = parseDictionaryToArray(null);

    expect(result).toStrictEqual([]);
  });

  it('test parser with undefined provide', () => {
    let result = parseDictionaryToArray();

    expect(result).toStrictEqual([]);
  });
});
