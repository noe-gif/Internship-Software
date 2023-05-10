import React from 'react';

import HorizontalScroller from 'src/components/scroller/horizontalScroller';

import turnaroundsDetailsScrollerHook from 'src/hooks/turnaroundDetail/turnaroundsDetailsScrollerHook';

export default function TurnaroundsDetailsScroller(props) {
  const {
    elementsToScrollOver,
    hasTurnaroundsDetails,
  } = props;

  const {
    isNextScrollDisabled,
    isPreviousScrollDisabled,
    scrollToNextElement,
    scrollToPreviousElement,
  } = turnaroundsDetailsScrollerHook(elementsToScrollOver);

  return (
    <HorizontalScroller
      id="turnaroundsDetailsScroller"
      hasLeftButton={hasTurnaroundsDetails}
      hasRightButton={hasTurnaroundsDetails}
      leftButtonClick={() => scrollToPreviousElement()}
      leftButtonDisabled={isPreviousScrollDisabled()}
      rightButtonClick={() => scrollToNextElement()}
      rightButtonDisabled={isNextScrollDisabled()}
    />
  );
}
