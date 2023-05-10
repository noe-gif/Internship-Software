export function taskPopupHook(taskDescription) {
  const isEndOnlyTask = !taskDescription.start;

  const endOnlyTaskDescriptionContent = [
    { type: 'title', content: 'End', id: 1 },
    { type: 'content', content: taskDescription.end ? taskDescription.end : '', id: 2 },
  ];
  const startAndEndTaskDescriptionContent = [
    { type: 'title', content: 'Start', id: 1 },
    { type: 'content', content: taskDescription.start ? taskDescription.start : '', id: 2 },
    { type: 'title', content: 'End', id: 3 },
    { type: 'content', content: taskDescription.end ? taskDescription.end : '', id: 4 },
  ];

  const taskTitleAndDescription = {
    id: 0,
    title: '',
    descripiton: '',
  }
  return {
    endOnlyTaskDescriptionContent,
    isEndOnlyTask,
    startAndEndTaskDescriptionContent,
  };
}

export function prepareTaskDescription(taskDescription) {
  if (!taskDescription.start) {
    return ([
      { type: 'title', content: 'End', id: 1 },
      { type: 'content', content: taskDescription.end ? taskDescription.end : '', id: 2 },   
    ]);
  } else if (taskDescription.start && taskDescription.end) {
    return ([
      { type: 'title', content: 'Start', id: 1 },
      { type: 'content', content: taskDescription.start ? taskDescription.start : '', id: 2 },
      { type: 'title', content: 'End', id: 3 },
      { type: 'content', content: taskDescription.end ? taskDescription.end : '', id: 4 },  
    ]);
  }
  return (null);
}