import {
  ALL_TASK_ADDITIONNAL_INFORMATION_ARE_FILLED_COLOR,
  NOT_ALL_TASK_ADDITIONNAL_INFORMATION_ARE_FILLED_COLOR,
} from 'src/constants/tasks/tasksConstant';

export const isAddInfoCompleted = (addInfo) => (
  Boolean(addInfo && (addInfo.auto_value !== null || addInfo.value !== null))
);

export const areAllAddInfoCompleted = (allAddInfo) => {
  if (allAddInfo.length === 0) {
    return (false);
  }
  for (let allTaskAdditionalInformation = 0; allAddInfo[allTaskAdditionalInformation];
    allTaskAdditionalInformation += 1) {
    if (!isAddInfoCompleted(allAddInfo[allTaskAdditionalInformation])) {
      return (false);
    }
  }
  return (true);
};

export function getCompletionStatusColor(task) {
  const allAddInfo = task?.task_additional_information;

  if (allAddInfo && areAllAddInfoCompleted(allAddInfo)) {
    return (ALL_TASK_ADDITIONNAL_INFORMATION_ARE_FILLED_COLOR);
  } else {
    return (NOT_ALL_TASK_ADDITIONNAL_INFORMATION_ARE_FILLED_COLOR);
  }
}
