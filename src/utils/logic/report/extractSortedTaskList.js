const getTaskEarlyTiming = (taskTimings) => {
  const sortedTaskTimings = taskTimings.sort(
    (timingA, timingB) => new Date(timingA) - new Date(timingB),
  ).filter((timing) => timing !== null);

  return sortedTaskTimings[0];
};

const sortTaskListByTime = (taskList) =>
  (
    taskList.sort((taskA, taskB) =>
      new Date(getTaskEarlyTiming(taskA.taskTimings)) - new Date(getTaskEarlyTiming(taskB.taskTimings)))
  );

const getTaskInfo = (taskName, taskInfoList) => {
  const taskFilter = taskInfoList.filter((taskInfo) => taskInfo.name === taskName);

  return taskFilter[0];
};

const extractTaskTiming = (taskField, completeTaskInfo) => {
  const taskTimings = [];

  taskField.value.forEach((timing) => taskTimings.push(completeTaskInfo[timing]));

  return { name: taskField.name, taskTimings };
};

const extractListTimings = (filteredTasks, completeTaskInfoList) => {
  const taskListTiming = [];

  filteredTasks.forEach((task) =>
    taskListTiming.push(extractTaskTiming(task, getTaskInfo(task.name, completeTaskInfoList))));

  return taskListTiming;
};

const removeUnavailableTaskFromList = (completeTaskInfoList, taskList) => {
  const turnaroundTasks = [];
  completeTaskInfoList.forEach((task) => turnaroundTasks.push(task.name));

  return taskList.filter((taskField) => turnaroundTasks.includes(taskField.name));
};

export default function extractSortedTaskList(completeTaskInfoList = [], taskFieldList = []) {
  if (!completeTaskInfoList || !taskFieldList) {
    return [];
  }

  const filteredTasks = removeUnavailableTaskFromList(completeTaskInfoList, taskFieldList);
  const taskListExtractedTimings = extractListTimings(filteredTasks, completeTaskInfoList);

  return sortTaskListByTime(taskListExtractedTimings);
}
