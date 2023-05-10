import { useState } from 'react';

import { formatDateToDDMMYYYY } from 'src/utils/logic/date/formattedDate';

import { EMPTY_CONTENT_CLASS, TIMEOUT_DEFAULT_TIME } from 'src/constants/home/homeContentConstant';
import { SCROLL_INTO_VIEW_PARAMETERS } from 'src/constants/scroller/scrollerConstant';
import useTimezoneFilter from 'src/hooks/filter/useTimezoneFilter';

export default function homeContentHook(
  isInDetailsView,
  selectedTurnaroundDate,
) {
  const [contentClass, setContentClass] = useState(EMPTY_CONTENT_CLASS);
  const [detailViewVisibility, setDetailViewVisibility] = useState('detailsViewWrapper');
  const [isFocusOnSelectedDate, setIsFocusOnSelectedDate] = useState(false);
  const { state: { selectedTimezone } } = useTimezoneFilter();

  const resetHomeContentParameters = () => {
    setContentClass(EMPTY_CONTENT_CLASS);
    setIsFocusOnSelectedDate(false);
    setDetailViewVisibility('detailsViewWrapper');
  };

  const scrollToSelectedTurnaround = () => {
    setTimeout(() => {
      const selectedDateElement = document.getElementById(`${formatDateToDDMMYYYY(selectedTurnaroundDate)}Id`);
      if (selectedDateElement) {
        selectedDateElement.scrollIntoView(SCROLL_INTO_VIEW_PARAMETERS);
      } else {
        const firstTurnaroundsPerDateElement = document.getElementById('turnaroundsStartRef');
        firstTurnaroundsPerDateElement.scrollIntoView(SCROLL_INTO_VIEW_PARAMETERS);
      }
    }, TIMEOUT_DEFAULT_TIME);
    setIsFocusOnSelectedDate(true);
  };

  const handleAutoScrollPosition = () => {
    if (isInDetailsView) {
      setContentClass('homeContentDetailsView');
      setDetailViewVisibility('detailsViewVisible');

      if (!isFocusOnSelectedDate) {
        scrollToSelectedTurnaround();
      }
    } else {
      resetHomeContentParameters();
    }
  };

  return {
    contentClass,
    detailViewVisibility,
    handleAutoScrollPosition,
    selectedTimezone,
  };
}
