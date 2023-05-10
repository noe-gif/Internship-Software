import React from 'react';

import TURNAROUND_DETAIL_TIMING_TEXT from 'src/constants/turnaroundDetail/turnaroundDetailTimingText.json';//eslint-disable-line

export default function TurnaroundDetailPlaneInformation(props) {
  const { componentSize, turnaroundDetailObject } = props;

  return (
    <div className={`turnaroundDetailTimingsInfos-${componentSize}`}>
      <div className={`turnaroundDetailTimingsPlaneCombined-${componentSize}`}>
        <p
          className={`fontColorDefault fontSizeDefault turnaroundDetailTimingsPLaneBoxText-${componentSize}`}
          id="aircraftPlaneInformationText"
        >
          {TURNAROUND_DETAIL_TIMING_TEXT.plane_information.aircraft}
        </p>
        <p
          className={`fontColorDefault fontSizeDefaultBold turnaroundDetailTimingsBoxTextBold-${componentSize}`}
          id="aircraftPlaneInformationValue"
        >
          {turnaroundDetailObject.aircraft}
        </p>
      </div>
      <div className={`turnaroundDetailTimingsPlaneCombined-${componentSize}`}>
        <p
          className={`fontColorDefault fontSizeDefault turnaroundDetailTimingsPLaneBoxText-${componentSize}`}
          id="tailNumberPlaneInformationText"
        >
          {TURNAROUND_DETAIL_TIMING_TEXT.plane_information.tail_number}
        </p>
        <p
          className={`fontColorDefault fontSizeDefaultBold turnaroundDetailTimingsBoxTextBold-${componentSize}`}
          id="tailNumberPlaneInformationValue"
        >
          {turnaroundDetailObject.tail_number}
        </p>
      </div>
      <div className={`turnaroundDetailTimingsPlaneCombined-${componentSize}`}>
        <p
          className={`fontColorDefault fontSizeDefault turnaroundDetailTimingsPLaneBoxText-${componentSize}`}
          id="mttPlaneInformationText"
        >
          {TURNAROUND_DETAIL_TIMING_TEXT.plane_information.mtt}
        </p>
        <p
          className={`fontColorDefault fontSizeDefaultBold turnaroundDetailTimingsBoxTextBold-${componentSize}`}
          id="mttPlaneInformationValue"
        >
          {turnaroundDetailObject.mtt}
        </p>
      </div>
    </div>
  );
}
