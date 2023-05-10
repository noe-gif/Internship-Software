import exportCompleteTasks from 'src/utils/logic/report/extractCompleteTasks';

describe('Testing exportCompleteTasks function', () => {
  it('test with complete tasks List provide', () => {
    let result = exportCompleteTasks([
      { name: "Check-In", value: ['planned_start_datetime', 'actual_start_datetime'] },
      { name: "Boarding", value: [] },
      { name: "Agent At Gate", value: ['planned_start_datetime', 'actual_start_datetime'] }
    ]);

    expect(result).toStrictEqual([
      { name: "Check-In", value: ['planned_start_datetime', 'actual_start_datetime'] },
      { name: "Agent At Gate", value: ['planned_start_datetime', 'actual_start_datetime'] }
    ]);
  });

  it('test with undefined taskList provide', () => {
    let result = exportCompleteTasks();

    expect(result).toStrictEqual([]);
  });

  it('test with null provide', () => {
    let result = exportCompleteTasks(null);

    expect(result).toStrictEqual([]);
  });
});
