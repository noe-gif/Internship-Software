import React from 'react';

import Marker from 'src/components/fragment/marker';

import {
  MARKER_COLOR_RGB_RED,
  MARKER_TOP_RIGHT_POSITION,
} from 'src/constants/fragments/markerParameters';

export default function LabeledButtonWithMarker(props) {
  const {
    id,
    imgSrc,
    label,
    numberToDisplay,
    onClick,
  } = props;

  const renderNumberElementsOnButton = (numberOf) => (
    (numberOf > 0 && (
      <Marker
        color={MARKER_COLOR_RGB_RED}
        position={MARKER_TOP_RIGHT_POSITION}
        size={1.1}
        label={numberOf}
        labelSize={0.7}
      />
    ))
  );

  return (
    <div className="taskButtonWrapper">
      <div
        id={id}
        className="taskOptionButton"
        onClick={onClick}
        role="button"
        aria-hidden="true"
      >
        {renderNumberElementsOnButton(numberToDisplay)}
        <img src={imgSrc} alt="task-bottom-icon" className="taskBottomButtonIcon" />
        <p className="fontSizeDefaultBold taskButtonLabel labeledButtonWithMarker">{label}</p>
      </div>
    </div>
  );
}
