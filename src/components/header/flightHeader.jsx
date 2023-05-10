import React from 'react';

import AirlineLogo from 'src/components/turnaround/airlineLogo';
import IconImage from 'src/components/fragment/iconImage';

import { extractCarrierCodesFromTurnaround } from 'src/utils/parsing/extractFromTurnaround';
import formatFlightNumber from 'src/utils/logic/turnaround/formatFlightNumber';

import { LANDING_PLANE_WHITE_ICON, TAKEOFF_WHITE_ICON } from 'src/constants/picturePath';
import ICON_IMAGE from 'src/constants/fragments/iconImageText.json';

import 'src/styles/FlightHeader.css';

export default function FlightHeader(props) {
  const {
    componentSize,
    turnaroundFlights,
    turnaroundId,
  } = props;

  return (
    <div className="flightHeaderContentWrapper">
      <div className="flightHeaderContentFlight">
        <IconImage
          iconInfos={{
            source: LANDING_PLANE_WHITE_ICON,
            alt: ICON_IMAGE.alt.landing_plane,
            className: `flightHeaderIcon-${componentSize}`,
          }}
          isIconRender={formatFlightNumber(turnaroundFlights?.arrival_flight)}
        />
        <p
          id={`flightHeaderArrivalTitle${turnaroundId}`}
          className={`fontSizeBig flightHeaderTitle-${componentSize}`}
        >
          {formatFlightNumber(turnaroundFlights?.arrival_flight)}
        </p>
      </div>
      <div className={`flightHeaderLogo-${componentSize}`}>
        <AirlineLogo
          className="turnaroundHeaderLogo"
          turnaroundCarrierCodes={extractCarrierCodesFromTurnaround(turnaroundFlights)}
          turnaroundId={turnaroundId}
        />
      </div>
      <div className="flightHeaderContentFlight">
        <p
          id={`flightHeaderDepartureTitle${turnaroundId}`}
          className={`fontSizeBig flightHeaderTitle-${componentSize}`}
        >
          {formatFlightNumber(turnaroundFlights?.departure_flight)}
        </p>
        <IconImage
          iconInfos={{
            source: TAKEOFF_WHITE_ICON,
            alt: ICON_IMAGE.alt.departure_plane,
            className: `flightHeaderIcon-${componentSize}`,
          }}
          isIconRender={formatFlightNumber(turnaroundFlights?.departure_flight)}
        />
      </div>
    </div>
  );
}
