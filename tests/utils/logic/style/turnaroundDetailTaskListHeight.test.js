import taskListHeightSetting from 'src/utils/logic/style/taskListHeight';

describe('taskListHeightSetting', () => {
  it('test with parameter equal to true', () => {
    let result = taskListHeightSetting(true);

    expect(result).toStrictEqual(null);
  });

  it('test with parameter equal to false', () => {
    let result = taskListHeightSetting(false);

    expect(result).toStrictEqual('48%');
  });
});