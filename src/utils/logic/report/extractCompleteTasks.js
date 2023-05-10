export default function extractCompleteTasks(taskList = []) {
  if (!taskList) {
    return [];
  }

  const filteredTaskList = taskList.filter((task) => task.value.length > 0);

  return filteredTaskList;
}
