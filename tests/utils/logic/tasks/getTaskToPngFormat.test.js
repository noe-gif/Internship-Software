import getTaskToPngFormat from 'src/utils/logic/tasks/getTaskToPngFormat';

import { TASK_IMAGE_PATH } from 'src/utils/urlAPIs';

describe('Testing getTaskToPngFormat function', () => {
  it('should return the task name using the right extension', () => {
    let result = getTaskToPngFormat('Boarding');

    expect(result).toStrictEqual(`${TASK_IMAGE_PATH}boarding@3x.png`);
  });

  it('should return the task name with _ instead of space using the right extension', () => {
    let result = getTaskToPngFormat('Disembark Pax');

    expect(result).toStrictEqual(`${TASK_IMAGE_PATH}disembark_pax@3x.png`);
  });

  it ('should return the task name with _ instead of - using the right extension', () => {
    let result = getTaskToPngFormat('Pre-Boarding');

    expect(result).toStrictEqual(`${TASK_IMAGE_PATH}pre_boarding@3x.png`);
  });

  it('should return the task name with _ instead of the 2 spaces using the right extension', () => {
    let result = getTaskToPngFormat('Sup Task 1');

    expect(result).toStrictEqual(`${TASK_IMAGE_PATH}sup_task_1@3x.png`);
  });

  it('should return the task name with _ instead space and - using the right extension', () => {
    let result = getTaskToPngFormat('Test-task space');

    expect(result).toStrictEqual(`${TASK_IMAGE_PATH}test_task_space@3x.png`);
  });

  it('should return null when providing no task name', () => {
    let result = getTaskToPngFormat(null);

    expect(result).toStrictEqual(null);
  });
});
