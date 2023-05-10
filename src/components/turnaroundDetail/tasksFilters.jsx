import React from 'react';
import tasksFiltersHooks from 'src/hooks/turnaroundDetail/tasksFiltersHooks';

import 'src/styles/TurnaroundDetailTaskList.css';

import TasksFilter from 'src/components/turnaroundDetail/tasksFilter';

export default function TasksFilters(props) {
  const {
    componentSize,
    setSelectedFilter,
  } = props;

  const {
    isFilterButtonCurrentlySelected,
    tasksFilterButtons,
    updateFilterSelection,
  } = tasksFiltersHooks(setSelectedFilter);

  return (
    <div className={`filtersWrapper-${componentSize}`}>
      <div className={`filterButtonsWrapper-${componentSize}`}>
        {tasksFilterButtons.map((tasksFilterButton) => (
          <TasksFilter
            componentSize={componentSize}
            tasksFilterButtonAction={tasksFilterButton.action}
            tasksFilterButtonName={tasksFilterButton.name}
            isFilterButtonCurrentlySelected={isFilterButtonCurrentlySelected}
            updateFilterSelection={updateFilterSelection}
          />
        ))}
      </div>
    </div>
  );
}
