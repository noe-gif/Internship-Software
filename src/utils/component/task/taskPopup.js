export const checkIfEndOnlyTask = (taskDescription) => {
  const endTask = { title: 'End', description: taskDescription?.end, id: 1 };
  const startTask = { title: 'Start', description: taskDescription?.start, id: 2 };

  const preparedTaskDescription = [];

  if (taskDescription?.start) {
    preparedTaskDescription.push(startTask);
  }
  preparedTaskDescription.push(endTask);
  return (preparedTaskDescription);
};

export const isDescriptionEmpty = (taskDescription) => {
  if (!taskDescription.start && !taskDescription.end) {
    return (true);
  }
  return (false);
};
