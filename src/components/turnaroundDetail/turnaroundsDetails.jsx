import React, { useEffect } from 'react';

import TurnaroundDetailDisplayer from 'src/containers/turnaroundDetail/turnaroundDetailDisplayerContainer';

import TurnaroundsDetailsScroller from 'src/components/turnaroundDetail/turnaroundsDetailsScroller';

import turnaroundsDetailsHook from 'src/hooks/turnaroundDetail/turnaroundsDetailsHook';

import { dictionaryArrayToKeyArray } from 'src/utils/parsing/extractKeyFromDictionary';
import isListEmpty from 'src/utils/logic/isListEmpty';

import 'src/styles/TurnaroundDetail.css';
import {
  SCROLLER_KEY_TO_EXTRACT,
  TURNAROUNDS_DETAILS_COMPONENT_SIZE_LARGE,
  TURNAROUNDS_DETAILS_COMPONENT_SIZE_SMALL,
} from 'src/constants/turnaroundDetail/turnaroundsDetails';

export default function TurnaroundsDetails(props) {
  const { selectedTurnarounds, selectedTurnaroundDetail, closeDetailView } = props;

  const {
    componentSize,
    extractTurnaroundDetail,
    handleCloseDetailView,
    setComponentSize,
  } = turnaroundsDetailsHook(closeDetailView, selectedTurnaroundDetail, selectedTurnarounds);

  useEffect(() => {
    if (selectedTurnarounds.length > 1) {
      setComponentSize(TURNAROUNDS_DETAILS_COMPONENT_SIZE_SMALL);
    } else {
      setComponentSize(TURNAROUNDS_DETAILS_COMPONENT_SIZE_LARGE);
    }
  });

  const renderTurnaroundsDetails = () => (
    <div className={`turnaroundsDetailsWrapper-${componentSize}`}>
      {selectedTurnarounds.map((turnaround, index) => {
        const turnaroundDataToUsed = extractTurnaroundDetail(turnaround);

        return (
          <div
            key={turnaroundDataToUsed.id}
            className="turnaroundDetailWrapper"
          >
            <TurnaroundDetailDisplayer
              handleCloseTurnaround={handleCloseDetailView}
              turnaround={turnaroundDataToUsed}
              componentSize={componentSize}
              turnaroundIndex={index + 1}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <TurnaroundsDetailsScroller
        elementsToScrollOver={dictionaryArrayToKeyArray(selectedTurnarounds, SCROLLER_KEY_TO_EXTRACT)}
        hasTurnaroundsDetails={!isListEmpty(selectedTurnarounds)}
      />
      {renderTurnaroundsDetails()}
    </>
  );
}
