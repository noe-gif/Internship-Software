import { useState } from 'react';
import {
  FILTER_NAME_BUTTON,
  ALL_FILTER_BUTTON,
  ABOVE_FILTER_BUTTON,
  BELOW_FILTER_BUTTON,
} from 'src/constants/turnaroundDetail/turnaroundDetail';

export default function tasksHooks() {
  const [selectedFilter, setSelectedFilter] = useState(FILTER_NAME_BUTTON[ALL_FILTER_BUTTON]);

  const getTurnaroundTasksBasedOnFilter = (turnaroundDetail) => {
    const filtredTasks = [];

    if (selectedFilter === FILTER_NAME_BUTTON[ABOVE_FILTER_BUTTON]) {
      filtredTasks.push(...turnaroundDetail.normal_tasks_above_wing);
    } else if (selectedFilter === FILTER_NAME_BUTTON[BELOW_FILTER_BUTTON]) {
      filtredTasks.push(...turnaroundDetail.normal_tasks_below_wing);
    } else {
      filtredTasks.push(...turnaroundDetail.normal_tasks_above_wing.concat(turnaroundDetail.normal_tasks_below_wing));
    }
    return filtredTasks;
  };

  return {
    getTurnaroundTasksBasedOnFilter,
    setSelectedFilter,
  };
}
