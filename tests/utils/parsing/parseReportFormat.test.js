import parseReportFormat from 'src/utils/parsing/parseReportFormat';

describe('Testing parseReportFormat function', () => {
  it('test parser with complete report format', () => {
    let result = parseReportFormat({
      free_form_fields: [],
      turnaround_fields: { ADC: "all_doors_close_datetime", ADO: "any_door_open_datetime" },
      turnaround_task_fields: { "Check-In": ["planned_start_datetime"] },
    });

    expect(result).toStrictEqual({
      free_form_fields: [],
      turnaround_fields: [
        { name: "ADC", value: "all_doors_close_datetime" },
        { name: "ADO", value: "any_door_open_datetime" }
      ],
      turnaround_task_fields: [
        { name: "Check-In", value: ["planned_start_datetime"]},
      ]
    })
  });

  it('test parser with null provide', () => {
    let result = parseReportFormat(null);

    expect(result).toStrictEqual({
      free_form_fields: [],
      turnaround_fields: [],
      turnaround_task_fields: [],
    });
  });

  it('test parser with undefined provide', () => {
    let result = parseReportFormat();

    expect(result).toStrictEqual({
      free_form_fields: [],
      turnaround_fields: [],
      turnaround_task_fields: [],
    });
  });
});
