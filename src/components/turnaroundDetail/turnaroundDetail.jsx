import React from 'react';

import Marker from 'src/components/fragment/marker';
import TurnaroundHeader from 'src/containers/header/turnaroundHeaderContainer';

import TurnaroundDetailHeader from 'src/containers/turnaroundDetail/turnaroundDetailHeaderContainer';
import Tasks from 'src/containers/turnaroundDetail/tasksContainer';
import TurnaroundDetailTimings from 'src/containers/turnaroundDetail/turnaroundDetailTimingsContainer';

import { MARKER_SIZE_BIG, MARKER_TOP_LEFT_POSITION } from 'src/constants/fragments/markerParameters';
import { TARMAC_SECONDARY_COLOR } from 'src/constants/colors';

export default function TurnaroundDetail(props) {
  const {
    componentSize,
    elementsFromHook,
    turnaround,
    turnaroundIndex,
  } = props;

  const {
    closeTurnaroundCompleteData,
    componentSizeSplit,
    handleOpenReport,
    handleTaskSelection,
    isDetailViewNotVisible,
    isViewSplit,
    openReadOnlyComments,
  } = elementsFromHook;

  return (
    <div
      id={`turnaroundDetails${turnaround.id}`}
      className={isViewSplit() ? 'turnaroundDetailViewSplit' : `turnaroundDetailView-${componentSize}`}
    >
      <Marker
        color={TARMAC_SECONDARY_COLOR}
        position={MARKER_TOP_LEFT_POSITION}
        size={MARKER_SIZE_BIG}
        label={turnaroundIndex}
      />
      <div className={isDetailViewNotVisible() ? 'turnaroundInfosNotVisible' : 'turnaroundInfosVisible'}>
        <TurnaroundHeader
          componentSize={componentSizeSplit}
          turnaroundData={turnaround}
          closeTurnaround={closeTurnaroundCompleteData}
          handleOpenReport={handleOpenReport}
        />
        <TurnaroundDetailHeader
          componentSize={componentSizeSplit}
          turnaroundData={turnaround}
        />
        <TurnaroundDetailTimings
          componentSize={componentSizeSplit}
          turnaroundData={turnaround}
        />
        <Tasks
          componentSize={componentSizeSplit}
          selectTaskFunction={handleTaskSelection}
          openReadOnlyComments={openReadOnlyComments}
          turnaroundId={turnaround.id}
        />
      </div>
    </div>
  );
}
