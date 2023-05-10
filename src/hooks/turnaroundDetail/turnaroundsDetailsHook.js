import { useState } from 'react';
import { TURNAROUNDS_DETAILS_COMPONENT_SIZE_LARGE } from 'src/constants/turnaroundDetail/turnaroundsDetails';

export default function turnaroundsDetailsHook(
  closeDetailView,
  selectedTurnaroundDetail,
  selectedTurnarounds,
) {
  const [componentSize, setComponentSize] = useState(TURNAROUNDS_DETAILS_COMPONENT_SIZE_LARGE);

  const handleCloseDetailView = (turnaround) => {
    const selectedTurnaroundsCopy = [...selectedTurnarounds];
    const turnaroundToQuitIndex = selectedTurnaroundsCopy.findIndex(
      (turnaroundToCheck) => turnaroundToCheck.id === turnaround.id,
    );

    if (turnaroundToQuitIndex !== -1) {
      selectedTurnaroundsCopy.splice(turnaroundToQuitIndex, 1);

      closeDetailView(selectedTurnaroundsCopy);
    }
  };

  const extractTurnaroundDetail = (turnaround) => {
    let turnaroundDataToUsed = turnaround;

    const filteredSelectedTurnaroundDetail = selectedTurnaroundDetail.filter(
      (turnaroundToCheck) => turnaroundToCheck.id === turnaround.id,
    );

    if (filteredSelectedTurnaroundDetail.length > 0) {
      const lookedTurnaround = filteredSelectedTurnaroundDetail[0];
      turnaroundDataToUsed = lookedTurnaround;
    }

    return turnaroundDataToUsed;
  };

  return {
    componentSize,
    extractTurnaroundDetail,
    handleCloseDetailView,
    setComponentSize,
  };
}
