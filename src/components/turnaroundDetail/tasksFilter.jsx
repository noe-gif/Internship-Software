import React from 'react';

import 'src/styles/TurnaroundDetailTaskList.css';
import {
  TRANSPARENT_BACKGROUND,
  WHITE_BACKGROUND,
} from 'src/constants/turnaroundDetail/turnaroundDetail';

export default function TasksFilter(props) {
  const {
    componentSize,
    isFilterButtonCurrentlySelected,
    tasksFilterButtonAction,
    tasksFilterButtonName,
    updateFilterSelection,
  } = props;

  return (
    <div
      className={`fontSizeDefault filterButton-${componentSize} ${
        isFilterButtonCurrentlySelected(tasksFilterButtonAction) ? WHITE_BACKGROUND : TRANSPARENT_BACKGROUND
      }`}
      onClick={() => updateFilterSelection(tasksFilterButtonAction, tasksFilterButtonName)}
      onKeyDown={() => updateFilterSelection(tasksFilterButtonAction, tasksFilterButtonName)}
      role="button"
      tabIndex={0}
    >
      {tasksFilterButtonName}
    </div>
  );
}
