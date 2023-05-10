import { FAIL } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

export default function taskLogic(taskDetailStatus, task, selectedTasksDetails, getTaskDetail, setFilteredTask) {
  const filteredTaskStatus = taskDetailStatus.filter((taskStatus) => taskStatus.taskId === task.id);

  if (filteredTaskStatus.length > 0) {
    if (filteredTaskStatus[0].status !== FAIL) {
      const filteredTaskDetail = selectedTasksDetails.filter((selectedTask) => selectedTask.id === task.id);
      if (filteredTaskDetail.length > 0) {
        return setFilteredTask(filteredTaskDetail[0]);
      } else {
        return getTaskDetail(task.id);
      }
    } else {
      return setFilteredTask(task);
    }
  } else {
    return getTaskDetail(task.id);
  }
}
