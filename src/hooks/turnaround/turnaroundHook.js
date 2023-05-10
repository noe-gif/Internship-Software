import {
  TURNAROUND_LARGE_ICON_SIZE,
  TURNAROUND_SMALL_ICON_SIZE,
} from 'src/constants/turnaround/turnaroundContent/turnaroundContentConstant';

export default function turnaroundHook(props) {
  const {
    cardSize,
    closeDetailView,
    date,
    getTurnaroundDetailsRequest,
    isInDetailsView,
    selectedTurnarounds,
    turnaround,
  } = props;

  const isSmall = (cardSize === 'small' || isInDetailsView);
  const isSelected = (selectedTurnarounds.find((selected) => selected.id === turnaround.id));
  const selectedIndex = selectedTurnarounds.findIndex((selected) => selected.id === turnaround.id) + 1;

  const iconSize = isSmall ? TURNAROUND_SMALL_ICON_SIZE : TURNAROUND_LARGE_ICON_SIZE;

  const handleTurnaroundSelection = (event) => {
    event.preventDefault();

    const selectedTurnaroundsCopy = [...selectedTurnarounds];
    if (!isSelected) {
      selectedTurnaroundsCopy.push(turnaround);

      getTurnaroundDetailsRequest({ selectedTurnarounds: selectedTurnaroundsCopy, date });
    } else {
      selectedTurnaroundsCopy.splice(selectedIndex - 1, 1);

      closeDetailView(selectedTurnaroundsCopy);
    }
  };

  return {
    iconSize,
    isSelected,
    isSmall,
    handleTurnaroundSelection,
    selectedIndex,
  };
}
