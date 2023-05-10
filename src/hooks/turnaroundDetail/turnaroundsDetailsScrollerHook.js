import { useState } from 'react';

import { SCROLL_INTO_VIEW_PARAMETERS } from 'src/constants/scroller/scrollerConstant';

export default function turnaroundsDetailsScrollerHook(elementsToScrollOver) {
  const [minimumIndexInScreen, setMinimumIndexInScreen] = useState(0);

  const scrollToPreviousElement = () => {
    if (elementsToScrollOver[minimumIndexInScreen - 1]) {
      const elementToScrollTo = document.getElementById(
        `turnaroundDetails${elementsToScrollOver[minimumIndexInScreen - 1]}`,
      );
      elementToScrollTo.scrollIntoView(SCROLL_INTO_VIEW_PARAMETERS);
      setMinimumIndexInScreen(minimumIndexInScreen - 1);
    }
  };

  const scrollToNextElement = () => {
    if (elementsToScrollOver[minimumIndexInScreen + 2]) {
      const elementToScrollTo = document.getElementById(
        `turnaroundDetails${elementsToScrollOver[minimumIndexInScreen + 2]}`,
      );
      elementToScrollTo.scrollIntoView(SCROLL_INTO_VIEW_PARAMETERS);
      setMinimumIndexInScreen(minimumIndexInScreen + 1);
    }
  };

  const isPreviousScrollDisabled = () => (
    (!elementsToScrollOver[minimumIndexInScreen - 1])
  );

  const isNextScrollDisabled = () => (
    (!elementsToScrollOver[minimumIndexInScreen + 2])
  );

  return {
    isNextScrollDisabled,
    isPreviousScrollDisabled,
    scrollToNextElement,
    scrollToPreviousElement,
    setMinimumIndexInScreen,
  };
}
