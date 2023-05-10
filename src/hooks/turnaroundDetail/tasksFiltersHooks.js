import { useState } from 'react';
import {
  FILTER_BUTTON_DEFAULT,
  SELECTED,
  ALL_FILTER_BUTTON,
  ABOVE_FILTER_BUTTON,
  BELOW_FILTER_BUTTON,
  FILTER_NAME_BUTTON,
} from 'src/constants/turnaroundDetail/turnaroundDetail';

export default function tasksFiltersHooks(setSelectedFilter) {
  const [whichFilterButtonIsSelected, setWhichFilterButtonIsSelected] = useState(FILTER_BUTTON_DEFAULT);

  const isFilterButtonCurrentlySelected = (filterButton) => (
    whichFilterButtonIsSelected[filterButton]
  );

  const updateFilterSelection = (selectedFilterButton, selectedFilter) => {
    const updatedFilterButtonSelection = [false, false, false];

    updatedFilterButtonSelection[selectedFilterButton] = SELECTED;
    setWhichFilterButtonIsSelected(updatedFilterButtonSelection);
    setSelectedFilter(selectedFilter);
  };

  const tasksFilterButtons = [
    {
      action: ALL_FILTER_BUTTON,
      name: FILTER_NAME_BUTTON[ALL_FILTER_BUTTON],
    },
    {
      action: ABOVE_FILTER_BUTTON,
      name: FILTER_NAME_BUTTON[ABOVE_FILTER_BUTTON],
    },
    {
      action: BELOW_FILTER_BUTTON,
      name: FILTER_NAME_BUTTON[BELOW_FILTER_BUTTON],
    },
  ];

  return {
    isFilterButtonCurrentlySelected,
    tasksFilterButtons,
    updateFilterSelection,
  };
}
