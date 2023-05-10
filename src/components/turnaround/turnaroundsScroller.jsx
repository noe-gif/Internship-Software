import React, { useEffect } from 'react';

import HorizontalScroller from 'src/components/scroller/horizontalScroller';

import turnaroundsScrollerHook from 'src/hooks/turnaround/turnaroundsScrollerHook';

export default function TurnaroundsScroller(props) {
  const {
    isInDetailsView,
    selectedTurnaroundDate,
    elementsToScrollOver,
    hasTurnaround,
  } = props;

  const {
    initializedState,
    isButtonDisabled,
    scrollToElement,
  } = turnaroundsScrollerHook(isInDetailsView, selectedTurnaroundDate, elementsToScrollOver, hasTurnaround);

  useEffect(() => {
    initializedState();
  }, [selectedTurnaroundDate, elementsToScrollOver, isInDetailsView]);

  return (
    <>
      <HorizontalScroller
        id="turnaroundsScroller"
        hasLeftButton={hasTurnaround}
        hasRightButton={hasTurnaround}
        leftButtonClick={() => scrollToElement(true, 0)}
        leftButtonDisabled={!isButtonDisabled(true, 0)}
        rightButtonClick={() => scrollToElement(false, 1)}
        rightButtonDisabled={!isButtonDisabled(false, 1)}
      />
    </>
  );
}
