import React from 'react';

import DisplayCloseTurnaroundIcon from 'src/components/header/displayCloseTurnaroundIcon';
import FlightHeader from 'src/components/header/flightHeader';

import TURNAROUND_TEXT from 'src/constants/header/headerText.json';

import { extractFlightsInformationFromTurnaround } from 'src/utils/parsing/extractFromTurnaround';
import { isUserAllowedToOpenReport } from 'src/utils/logic/permission/reportPermissions';

import 'src/styles/TurnaroundHeader.css';

export default function TurnaroundHeader(props) {
  const {
    closeTurnaround,
    componentSize,
    handleOpenReport,
    turnaroundData,
    userPermissions,
  } = props;

  const setReportClassName = () => (
    isUserAllowedToOpenReport(userPermissions)
      ? `turnaroundHeaderReport-${componentSize}`
      : `turnaroundHeaderDisableReport-${componentSize}`
  );

  const setReportOnClickAction = () => (
    isUserAllowedToOpenReport(userPermissions) ? () => handleOpenReport(true) : () => {}
  );

  const openReport = () =>
    handleOpenReport && (
      <>
        <p
          onClick={setReportOnClickAction()}
          aria-hidden="true"
          className={`fontSizeSmall ${setReportClassName()}`}
        >
          {TURNAROUND_TEXT.report}
        </p>
      </>
    );

  return (
    <div className={`turnaroundHeaderWrapper-${componentSize}`}>
      <div className={`turnaroundHeaderTop-${componentSize}`}>
        <div className={`turnaroundHeaderQuitWrapper-${componentSize}`}>
          {openReport()}
        </div>
        <FlightHeader
          componentSize={componentSize}
          turnaroundFlights={extractFlightsInformationFromTurnaround(turnaroundData)}
          turnaroundId={turnaroundData.id}
        />
        <div className={`turnaroundHeaderQuitWrapper-${componentSize}`}>
          <DisplayCloseTurnaroundIcon
            altLabel={TURNAROUND_TEXT.alt.close_icon}
            className="turnaroundHeaderQuit"
            closeTurnaroundFunction={closeTurnaround}
            componentSize={componentSize}
            turnaroundId={{ id: turnaroundData.id }}
          />
        </div>
      </div>
    </div>
  );
}
