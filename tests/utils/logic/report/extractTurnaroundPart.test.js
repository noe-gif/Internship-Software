import extractTurnaroundPart from 'src/utils/logic/report/extractTurnaroundPart';

describe('Testing extractTurnaroundPart function', () => {
  it('test extracting from complete format and complete infos', () => {
    let result = extractTurnaroundPart(
      [
        {name: 'ADO', value: 'any_door_opened_datetime'},
        {name: 'ATA', value: 'actual_gate_arrival_datetime'},
        {name: 'ATD', value: 'actual_gate_departure_datetime'},
      ],
      {
        any_door_opened_datetime: "2021-09-27T00:00:00Z",
        arrival_flight: {
          actual_gate_arrival_datetime: "2021-09-28T00:00:00Z",
          actual_gate_departure_datetime: "2021-09-28T00:10:00Z",
        },
        departure_flight: {
          actual_gate_departure_datetime: "2021-09-29T00:10:00Z",
          actual_gate_arrival_datetime: "2021-09-29T00:00:00Z"
        }
      });

    expect(result).toStrictEqual([
      { name: 'ADO', value: "21:00 (2021-09-26)" },
      { name: 'ATA', value: "21:00 (2021-09-27)" },
      { name: 'ATD', value: "21:10 (2021-09-28)" },
    ]);
  });

  it('test extracting from complete format and null infos', () => {
    let result = extractTurnaroundPart(
      [
        {name: 'ADO', value: 'any_door_opened_datetime'},
        {name: 'ATA', value: 'actual_gate_arrival_datetime'},
        {name: 'ATD', value: 'actual_gate_departure_datetime'},
      ],
      null,
    );

    expect(result).toStrictEqual([
      { name: 'ADO', value: ' ' },
      { name: 'ATA', value: ' ' },
      { name: 'ATD', value: ' ' },
    ])
  });

  it('test extracting from complete format and undefined info', () => {
    let result = extractTurnaroundPart(
      [
        {name: 'ADO', value: 'any_door_opened_datetime'},
        {name: 'ATA', value: 'actual_gate_arrival_datetime'},
        {name: 'ATD', value: 'actual_gate_departure_datetime'},
      ]
    );

    expect(result).toStrictEqual([
      { name: 'ADO', value: ' ' },
      { name: 'ATA', value: ' ' },
      { name: 'ATD', value: ' ' },
    ]);
  });

  it('test extract from empty format', () => {
    let result = extractTurnaroundPart([], {
      any_door_opened_datetime: "2021-09-27T00:00:00Z",
      arrival_flight: {
        actual_gate_arrival_datetime: "2021-09-28T00:00:00Z",
        actual_gate_departure_datetime: "2021-09-28T00:10:00Z",
      },
      departure_flight: {
        actual_gate_departure_datetime: "2021-09-29T00:10:00Z",
        actual_gate_arrival_datetime: "2021-09-29T00:00:00Z"
      }
    });

    expect(result).toStrictEqual([]);
  });

  it('test extracting with null provide', () => {
    let result = extractTurnaroundPart(null);

    expect(result).toStrictEqual([]);
  });

  it('test extracting with undefined provide', () => {
    let result = extractTurnaroundPart();

    expect(result).toStrictEqual([]);
  });
});
