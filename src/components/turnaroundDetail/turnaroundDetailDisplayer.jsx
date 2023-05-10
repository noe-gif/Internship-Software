import React from 'react';

import Marker from 'src/components/fragment/marker';
import TurnaroundAdditionalDetail from 'src/components/turnaroundDetail/turnaroundAdditionalDetail';
import TurnaroundDetail from 'src/components/turnaroundDetail/turnaroundDetail';

import turnaroundDetailHook from 'src/hooks/turnaroundDetail/turnaroundDetailHook';

import { MARKER_SIZE_BIG, MARKER_TOP_LEFT_POSITION } from 'src/constants/fragments/markerParameters';
import { TARMAC_SECONDARY_COLOR } from 'src/constants/colors';

export default function TurnaroundDetailDisplayer(props) {
  const {
    handleCloseTurnaround,
    turnaround,
    componentSize,
    turnaroundIndex,
    selectedTasksDetails,
    closeTask,
  } = props;

  const elementsFromHook = turnaroundDetailHook(selectedTasksDetails, closeTask, componentSize, handleCloseTurnaround);

  const {
    componentSizeSplit,
    hasSubViewActive,
    isDetailViewNotVisible,
  } = elementsFromHook;

  return (
    <>
      {!isDetailViewNotVisible() && (
        <TurnaroundDetail
          componentSize={componentSize}
          elementsFromHook={elementsFromHook}
          turnaround={turnaround}
          turnaroundIndex={turnaroundIndex}
        />
      )}
      {hasSubViewActive() && (
        <div
          id={`turnaroundDetails${turnaround.id}`}
          className={`turnaroundTaskView-${componentSizeSplit}`}
        >
          {isDetailViewNotVisible() && (
            <Marker
              color={TARMAC_SECONDARY_COLOR}
              position={MARKER_TOP_LEFT_POSITION}
              size={MARKER_SIZE_BIG}
              label={turnaroundIndex}
            />
          )}
          <TurnaroundAdditionalDetail
            handleCloseTurnaround={handleCloseTurnaround}
            turnaround={turnaround}
            elementsFromHook={elementsFromHook}
          />
        </div>
      )}
    </>
  );
}
