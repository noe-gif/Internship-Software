import { useState } from 'react';

import { areArraysEquals } from 'src/utils/logic/areArraysEquals';
import { formatDateToDDMMYYYY } from 'src/utils/logic/date/formattedDate';

import { SCROLL_INTO_VIEW_PARAMETERS } from 'src/constants/scroller/scrollerConstant';

export default function turnaroundsScrollerHook(
  isInDetailsView,
  selectedTurnaroundDate,
  elementsToScrollOver,
  hasTurnaround,
) {
  const [dateOnFocus, setDateOnFocus] = useState(selectedTurnaroundDate);
  const [datesBorder, setDatesBorder] = useState([]);
  const [selectedDatesData, setSelectedDatesData] = useState([]);

  const extractNewDate = (isPrevious, dateToScroll) => (
    (isPrevious) ? dateToScroll.getDate() - 1 : dateToScroll.getDate() + 1
  );

  const setNewDatesBorder = (isPrevious, dateToScroll) => {
    if (isPrevious) {
      const nextBorder = new Date(datesBorder[1]);
      nextBorder.setDate(nextBorder.getDate() - 1);
      setDatesBorder([dateToScroll, nextBorder]);
    } else {
      const previousBorder = new Date(datesBorder[0]);
      previousBorder.setDate(previousBorder.getDate() + 1);
      setDatesBorder([previousBorder, dateToScroll]);
    }
  };

  const scrollToElement = (isPrevious, dateIndex) => {
    const dateToScroll = isInDetailsView ? new Date(dateOnFocus) : new Date(datesBorder[dateIndex]);
    dateToScroll.setDate(extractNewDate(isPrevious, dateToScroll));

    const dayElement = document.getElementById(`${formatDateToDDMMYYYY(dateToScroll)}Id`);

    if (dayElement) {
      dayElement.scrollIntoView(SCROLL_INTO_VIEW_PARAMETERS);
      if (isInDetailsView) {
        setDateOnFocus(dateToScroll);
      } else {
        setNewDatesBorder(isPrevious, dateToScroll);
      }
    }
  };

  const initializeDateOnFocus = () => {
    if (dateOnFocus !== selectedTurnaroundDate) {
      setDateOnFocus(selectedTurnaroundDate);
    }
  };

  const initializeDatesBorder = () => {
    if (!isInDetailsView && elementsToScrollOver.length > 2) {
      setDatesBorder([elementsToScrollOver[0], elementsToScrollOver[2]]);
    }
  };

  const initializedState = () => {
    initializeDateOnFocus();
    if (!areArraysEquals(selectedDatesData, elementsToScrollOver)) {
      setSelectedDatesData(elementsToScrollOver);
      initializeDatesBorder();
    }
  };

  const isButtonDisabled = (isPrevious, dateIndex) => {
    if (!hasTurnaround) {
      return false;
    }

    const dateToCheck = isInDetailsView ? new Date(dateOnFocus) : new Date(datesBorder[dateIndex]);
    if (Number.isNaN(dateToCheck.getTime())) {
      return false;
    }

    const actualElementToScrollOverIndex = elementsToScrollOver.findIndex(
      (element) => element.getTime() === dateToCheck.getTime(),
    );

    if (actualElementToScrollOverIndex === -1) {
      return false;
    }

    if (isPrevious) {
      return actualElementToScrollOverIndex > 0;
    } else {
      return actualElementToScrollOverIndex < elementsToScrollOver.length - 1;
    }
  };

  return {
    initializedState,
    isButtonDisabled,
    scrollToElement,
  };
}
