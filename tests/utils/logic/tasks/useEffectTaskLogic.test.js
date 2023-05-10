import taskLogic from 'src/utils/logic/tasks/useEffectTaskLogic';

const taskDetailStatusSuccess = [{
  status: 'success',
  statusCode: 200,
  taskId: 12345,
}];

const taskDetailStatusFailure = [{
  status: 'fail',
  statusCode: 400,
  taskId: 12345,
}];

const task = {
  id: 12345,
  name: "Test de la machine",
};

const mockGetTaskDetail = () => {
  return "getTaskDetail";
};

const mockSetFilteredTask= () => {
  return "setFilteredTask";
};

describe('taskLogic', () => {
  it('call with task not fetch ', () => {
    let result = taskLogic([], task, [], mockGetTaskDetail, mockSetFilteredTask);

    expect(result).toEqual("getTaskDetail");
  });

  it('call with taskStatus fail', () => {
    let result = taskLogic(taskDetailStatusFailure, task, [], mockGetTaskDetail, mockSetFilteredTask);

    expect(result).toEqual("setFilteredTask");
  });

  it('call with taskStatus success and selectedTaskDetails without task', () => {
    let result = taskLogic(taskDetailStatusSuccess, task, [], mockGetTaskDetail, mockSetFilteredTask);

    expect(result).toEqual("getTaskDetail");
  });

  it('call with taskStatus success and selectedTaskDetails task id did not match', () => {
    let result = taskLogic(taskDetailStatusSuccess, task, [{ name: "eeeee", id: 56778 }], mockGetTaskDetail, mockSetFilteredTask);

    expect(result).toEqual("getTaskDetail");
  });

  it('call with taskStatus success and selectedTaskDetails task id match', () => {
    let result = taskLogic(taskDetailStatusSuccess, task, [task], mockGetTaskDetail, mockSetFilteredTask);

    expect(result).toEqual("setFilteredTask");
  });
});