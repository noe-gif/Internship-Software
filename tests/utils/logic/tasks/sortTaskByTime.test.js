import sortTaskByTime from '../../../../src/utils/logic/tasks/sortTaskByTime';

describe('Testing sortTaskByTime function', function() {
  it('test first task time sooner than next task time (start/start)', function() {
    let result = sortTaskByTime(
      { planned_start_datetime: "2021-09-06T11:05:00Z"},
      { planned_start_datetime: "2021-09-06T11:06:00Z" }
    );

    expect(result).toStrictEqual(-1);
  });

  it('test next task time sooner than first task time (start/start)', function() {
    let result = sortTaskByTime(
      { planned_start_datetime: "2021-09-06T11:07:00Z"},
      { planned_start_datetime: "2021-09-06T11:06:00Z" }
    );

    expect(result).toStrictEqual(1);
  });

  it('test first task time sooner than next task time (end/start)', function() {
    let result = sortTaskByTime(
      { planned_end_datetime: "2021-09-06T11:05:00Z"},
      { planned_start_datetime: "2021-09-06T11:06:00Z" }
    );

    expect(result).toStrictEqual(-1);
  });

  it('test first task time === next task time (start/end)', function() {
    let result = sortTaskByTime(
      { planned_start_datetime: "2021-09-06T11:05:00Z"},
      { planned_end_datetime: "2021-09-06T11:05:00Z" }
    );

    expect(result).toStrictEqual(0);
  });

  it('test with params null', function() {
    let result = sortTaskByTime(null, null);

    expect(result).toStrictEqual(0);
  });
});
