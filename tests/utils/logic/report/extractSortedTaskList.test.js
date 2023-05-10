import extractSortedTaskList from 'src/utils/logic/report/extractSortedTaskList';

describe('Testing extractSortedTaskList function', () => {
  it('test sorting with complete Task Info List and complete task Field List', () => {
    let result = extractSortedTaskList([
      { name: 'Onboarding', planned_start_datetime: "2021-09-29T09:10:00Z" },
      { name: 'Check-In', planned_start_datetime: "2021-09-29T09:00:00Z" }
    ],
    [
      { name: 'Check-In', value: ['planned_start_datetime'] },
      { name: 'Onboarding', value: ['planned_start_datetime'] },
      { name: 'Jetbridge', value: ['planned_start_datetime'] }
    ],
    );

    expect(result).toStrictEqual([
      { name: 'Check-In', taskTimings: ["2021-09-29T09:00:00Z"] },
      { name: 'Onboarding', taskTimings: ["2021-09-29T09:10:00Z"] },
    ]);
  });

  it('test undefined provide', () => {
    let result = extractSortedTaskList();

    expect(result).toStrictEqual([]);
  });

  it('test null, provide', () => {
    let result = extractSortedTaskList(null, null);

    expect(result).toStrictEqual([]);
  });
});
