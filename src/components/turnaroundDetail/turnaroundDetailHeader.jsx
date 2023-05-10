import React, { useEffect } from 'react';

import AirportLocation from 'src/components/modal/airportLocation';
import IconImage from 'src/components/fragment/iconImage';

import { componentSizeIsNotLarge } from 'src/utils/component/turnaroundDetailHeader';
import { ICON_IMAGE_PATH, TARMAC_STATIC_URL } from 'src/utils/urlAPIs';
import { formatDateToStringDDMMMYY } from 'src/utils/logic/date/formattedDate';

import turnaroundDetailHeaderHook from 'src/hooks/turnaroundDetail/turnaroundDetailHeaderHook';

import ICON_IMAGE_TEXT from 'src/constants/fragments/iconImageText.json';

import 'src/styles/TurnaroundDetailHeader.css';

const LANDING_PLANE_ICON = `${TARMAC_STATIC_URL}${ICON_IMAGE_PATH}LANDING_PLANE_ICON`;
const TAKEOFF_PLANE_ICON = `${TARMAC_STATIC_URL}${ICON_IMAGE_PATH}TAKEOFF_PLANE_ICON`;

export default function TurnaroundDetailHeader(props) {
  const {
    componentSize,
    parkingStandRequestStatus,
    resetParkingStandStatus,
    turnaroundData,
    updateParkingStand,
  } = props;

  const {
    arrivalIcon,
    departureIcon,
    handleParkingStandChangedThroughHook,
    isParkingStandModalOpen,
    isTurnaroundStatusCompleted,
    parkingStandArrival,
    parkingStandDeparture,
    parkingStandErrorMessage,
    parkingStandToSend,
    parkingStandType,
    parkingStandValue,
    selectedTimezone,
    showModal,
    turnaroundAirportIataCode,
    turnaroundDetailObject,
  } = turnaroundDetailHeaderHook(turnaroundData, resetParkingStandStatus, updateParkingStand);

  useEffect(() => {
    handleParkingStandChangedThroughHook(parkingStandRequestStatus.status);
  }, [parkingStandRequestStatus, turnaroundData]);

  const renderParkingStand = (parkingStandTriggerId, parkingStandTriggerValue) => (
    <div className={`turnaroundDetailHeaderParkingStandWrapper-${componentSize}`}>
      {turnaroundData[`${parkingStandTriggerId}_flight`] && (
        <div className="turnaroundDetailHeaderParkingStandContent">
          <p
            id={`turnaroundDetailHeaderParkingStand${parkingStandTriggerId}${turnaroundData.id}`}
            className="fontSizeDefault turnaroundDetailHeaderParkingStandText"
            onClick={() => showModal(parkingStandTriggerId, parkingStandTriggerValue)}
            aria-hidden="true"
          >
            {parkingStandTriggerValue}
          </p>
        </div>
      )}
    </div>
  );

  const renderTurnaroundGlobalInfos = () =>
    (
      <div className={`turnaroundDetailHeaderFlightAirport-${componentSize}`}>
        <div className={`turnaroundDetailHeaderAirportTextWrapper-${componentSize}`}>
          {turnaroundData.arrival_flight && (
            <>
              <p
                id={`turnaroundDetailHeaderSta${turnaroundData.id}`}
                className={`fontSizeDefault turnaroundDetailHeaderFlightDate-${componentSize}`}
              >
                {formatDateToStringDDMMMYY(turnaroundData.arrival_flight.sta, selectedTimezone)}
              </p>
              <p
                id={`turnaroundDetailHeaderDepartureAirportIataCode${turnaroundData.id}`}
                className={`fontSizeBig fontColorDefault turnaroundDetailHeaderAirportText-${componentSize}`}
              >
                {turnaroundData.arrival_flight.departure_airport.iata_code}
              </p>
            </>
          )}
        </div>
        <div className={`turnaroundDetailHeaderAirportCentralWrapper-${componentSize}`}>
          <p
            id={`turnaroundDetailHeaderHubAirportIataCode${turnaroundData.id}`}
            className={`fontSizeBigBold fontColorDefault turnaroundDetailHeaderAirportHubText-${componentSize}`}
          >
            {turnaroundAirportIataCode}
          </p>
        </div>
        <div className={`turnaroundDetailHeaderAirportTextWrapper-${componentSize}`}>
          {turnaroundData.departure_flight && (
            <>
              <p
                id={`turnaroundDetailHeaderStd${turnaroundData.id}`}
                className={`fontSizeDefault turnaroundDetailHeaderFlightDate-${componentSize}`}
              >
                {formatDateToStringDDMMMYY(turnaroundData.departure_flight.std, selectedTimezone)}
              </p>
              <p
                id={`turnaroundDetailHeaderArrivalAirportIataCode${turnaroundData.id}`}
                className={`fontSizeBig fontColorDefault turnaroundDetailHeaderAirportText-${componentSize}`}
              >
                {turnaroundData.departure_flight.arrival_airport.iata_code}
              </p>
            </>
          )}
        </div>
      </div>
    );

  const renderDelayCodeSpacer = () => (
    componentSizeIsNotLarge(componentSize) && (
      <div className="turnaroundDetailHeaderPlaneSpace" />
    )
  );

  const renderPlaneInformation = () => (
    <>
      <div className="turnaroundDetailHeaderPlaneContent">
        <p
          id={`turnaroundDetailHeaderTailNumber${turnaroundData.id}`}
          className="turnaroundDetailHeaderPlaneText"
        >
          {`${turnaroundDetailObject.tail_number}`}
        </p>
        <p
          id={`turnaroundDetailHeaderAircraft${turnaroundData.id}`}
          className="turnaroundDetailHeaderPlaneText"
        >
          {`${turnaroundDetailObject.aircraft}`}
        </p>
      </div>
    </>
  );

  const renderDelayCodeText = (delay, className) => (
    <div className={`turnaroundDetailHeaderDelayCodeTextWrapper-${componentSize}`} key={delay.id}>
      <p
        className={`${className}-${componentSize} fontSizeSmallBold fontColorLate`}
        id={`DelayId${delay.id}`}
      >
        {`${delay.code.toUpperCase()}`}
      </p>
      {!componentSizeIsNotLarge(componentSize)
      && (
        <p
          id={`turnaroundDetailHeaderDelayCodeAddText${delay.id}`}
          className={`fontSizeSmall fontColorLate ${className}-${componentSize}`}
        >
          {`(${delay.duration}min)`}
        </p>
      )}
    </div>
  );

  const renderDelayCode = () => (
    <div className="turnaroundDetailHeaderDelayCode">
      {turnaroundData.delays.map((delay, index) => {
        if (index < 3) {
          return (renderDelayCodeText(delay, 'turnaroundDetailHeaderDelayCodeText'));
        }
        return null;
      })}
    </div>
  );

  const renderTurnaroundSuppInfos = () => (
    <div className="turnaroundDetailHeaderDelayCodeContent">
      {renderParkingStand('arrival', parkingStandArrival)}
      {isTurnaroundStatusCompleted() && renderDelayCodeSpacer()}
      {componentSizeIsNotLarge(componentSize) && renderPlaneInformation()}
      {isTurnaroundStatusCompleted() && renderDelayCode()}
      {renderParkingStand('departure', parkingStandDeparture)}
    </div>
  );

  const renderHeaderFlightIcons = () =>
    (
      <div className={`turnaroundDetailHeaderFlightTimeline-${componentSize}`}>
        <div className="turnaroundDetailHeaderSpace" />
        <div className={`turnaroundDetailHeaderFlightIcon-${componentSize}`}>
          <IconImage
            iconInfos={{
              source: `${LANDING_PLANE_ICON}${arrivalIcon}.png`,
              alt: ICON_IMAGE_TEXT.alt.arrival_plane_status,
              className: `turnaroundHeaderIcon-${componentSize}`,
            }}
            isIconRender={turnaroundData.arrival_flight}
          />
        </div>
        <div className="turnaroundDetailHeaderDelayCodeContentWrapper">
          {renderTurnaroundSuppInfos()}
          <hr className={`turnaroundDetailHeaderLine-${componentSize}`} />
        </div>
        <div className={`turnaroundDetailHeaderFlightIcon-${componentSize}`}>
          <IconImage
            iconInfos={{
              source: `${TAKEOFF_PLANE_ICON}${departureIcon}.png`,
              alt: ICON_IMAGE_TEXT.alt.departure_plane_status,
              className: `turnaroundHeaderIcon-${componentSize}`,
            }}
            isIconRender={turnaroundData.departure_flight}
          />
        </div>
        <div className="turnaroundDetailHeaderSpace" />
      </div>
    );

  return (
    <div className="turnaroundDetailHeaderWrapper">
      {renderTurnaroundGlobalInfos()}
      {renderHeaderFlightIcons()}
      {isParkingStandModalOpen && (
        <AirportLocation
          textTriggerType={parkingStandType}
          errorMessage={parkingStandErrorMessage}
          initialTextValue={parkingStandValue}
          parkingStandToSend={parkingStandToSend}
          responseStatus={parkingStandRequestStatus}
          showModal={showModal}
        />
      )}
    </div>
  );
}
