import React from 'react';

import Marker from 'src/components/fragment/marker';

import { MARKER_SIZE_BIG, MARKER_TOP_LEFT_POSITION } from 'src/constants/fragments/markerParameters';
import { TARMAC_SECONDARY_COLOR } from 'src/constants/colors';

export default function TurnaroundMarker(props) {
  const {
    turnaroundId,
    label,
  } = props;

  return (
    <Marker
      id={`turnaround${turnaroundId}Marker`}
      color={TARMAC_SECONDARY_COLOR}
      position={MARKER_TOP_LEFT_POSITION}
      size={MARKER_SIZE_BIG}
      label={label}
    />
  );
}
