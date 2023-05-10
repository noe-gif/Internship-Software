import {
  filterTaskInProgressStatus,
  filterTaskDidNotStartStatus,
  filterTaskCompletedStatus,
  filterTaskNotApplicableStatus,
} from '../../../../src/utils/logic/tasks/taskFilters';

describe('Testing task filter functions', function() {
  it('test filterTaskInProgressStatus', function() {
    const expectedFilteredTasks = [
      { status: 'In progress' }
    ];

    let result = filterTaskInProgressStatus([
      { status: 'Completed' },
      { status: 'Completed' },
      { status: 'In progress' }
    ]);

    expect(result).toStrictEqual(expectedFilteredTasks);
  });

  it('test filterTaskDidNotStartStatus', function() {
    const expectedFilteredTasks = [
      { status: 'Did not start' }
    ];

    let result = filterTaskDidNotStartStatus([
      { status: 'Completed' },
      { status: 'Did not start' },
      { status: 'In progress' }
    ]);

    expect(result).toStrictEqual(expectedFilteredTasks);
  });

  it('test filterTaskCompletedStatus', function() {
    const expectedFilteredTasks = [
      { status: 'Completed' }
    ];

    let result = filterTaskCompletedStatus([
      { status: 'Completed' },
      { status: 'Did not start' },
      { status: 'In progress' }
    ]);

    expect(result).toStrictEqual(expectedFilteredTasks);
  });

  it('test filterTaskNotApplicableStatus', function() {
    const expectedFilteredTasks = [];

    let result = filterTaskNotApplicableStatus([
      { status: 'Completed' },
      { status: 'Completed' },
      { status: 'In progress' }
    ]);

    expect(result).toStrictEqual(expectedFilteredTasks);
  });

  it('test each status filter function with null', function() {
    let filteredInProgressTasks = filterTaskInProgressStatus(null);
    let filteredDidNotStartTasks = filterTaskDidNotStartStatus(null);
    let filteredCompletedTasks = filterTaskCompletedStatus(null);
    let filteredNotApplicableTasks = filterTaskNotApplicableStatus(null);

    expect(filteredInProgressTasks.length).toStrictEqual(0);
    expect(filteredDidNotStartTasks.length).toStrictEqual(0);
    expect(filteredCompletedTasks.length).toStrictEqual(0);
    expect(filteredNotApplicableTasks.length).toStrictEqual(0);
  });
})
