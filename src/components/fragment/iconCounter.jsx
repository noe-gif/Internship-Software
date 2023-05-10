import React from 'react';

import Marker from 'src/components/fragment/marker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MARKER_COLOR_RGB_RED, MARKER_TOP_RIGHT_POSITION } from 'src/constants/fragments/markerParameters';
import { TARMAC_PRIMARY_COLOR } from 'src/constants/colors';

import 'src/styles/IconCounter.css';

export default function IconCounter(props) {
  const {
    counter,
    handleIconClick,
    icon,
    isFontIcon,
  } = props;

  const cursor = 'pointer';

  const renderCounter = () => (
    <Marker
      color={MARKER_COLOR_RGB_RED}
      position={MARKER_TOP_RIGHT_POSITION}
      size={1}
      label={counter}
      labelSize={0.7}
    />
  );

  const renderImageIcon = () => (
    <div
      className="iconCounterImageWrapper"
      onClick={() => { handleIconClick(); }}
      aria-hidden="true"
      role="button"
    >
      {renderCounter()}
      <img src={icon} alt="iconWithCounter" className="iconCounterImage" />
    </div>
  );

  const renderFontIcon = () => (
    <span
      className="fa-layers fa-2x fa-fw"
      style={{ color: TARMAC_PRIMARY_COLOR, cursor }}
      onClick={() => { handleIconClick(); }}
      aria-hidden="true"
      role="button"
    >
      <FontAwesomeIcon icon={icon} />
      <span className="fa-layers-counter">{counter}</span>
    </span>
  );

  return isFontIcon ? renderFontIcon() : renderImageIcon();
}
