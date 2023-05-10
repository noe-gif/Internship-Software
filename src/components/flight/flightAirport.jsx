import React from 'react';

import { ItalicTypography } from 'src/components/turnaround/styleTurnaround';

export default function flightAirport(props) {
  const {
    className,
    id,
    airportLabel,
  } = props;

  return (
    <ItalicTypography
      id={id}
      variant="body1"
      color="primary"
      component="p"
      className={className}
    >
      {airportLabel}
    </ItalicTypography>
  );
}
