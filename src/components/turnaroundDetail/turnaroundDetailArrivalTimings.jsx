import React from 'react';

import { isArrivalFlight } from 'src/utils/component/turnaroundDetailTimings';

import TIMING_ACRONYMS from 'src/constants/timingAcronyms.json';

export default function TurnaroundDetailArrivalTimings(props) {
  const {
    adoEditor,
    ataEditor,
    componentSize,
    rtaEditor,
    turnaroundData,
    turnaroundDetailObject,
  } = props;

  return (
    isArrivalFlight(turnaroundData) ? (
      <div className={`turnaroundDetailTimingsBoxWrapper-${componentSize}`}>
        <div className={`turnaroundDetailTimingsBox-${componentSize}`}>
          <div className={`turnaroundDetailTimingsBoxLeft-${componentSize}`}>
            <div className={`turnaroundDetailTimingsCombined-${componentSize}`}>
              <p
                className={`fontSizeDefault fontColorDefault turnaroundDetailTimingsBoxText-${componentSize}`}
                id="staTimingText"
              >
                {TIMING_ACRONYMS.arrival_text.scheduled_time_arrival}
              </p>
              <p
                className={`fontSizeDefaultBold fontColorDefault turnaroundDetailTimingsBoxTextBold-${componentSize}`}
                id="staTimingValue"
              >
                {turnaroundDetailObject.sta}
              </p>
            </div>
            <div className={`turnaroundDetailTimingsCombined-${componentSize}`}>
              <p
                className={` fontSizeDefault fontColorDefault turnaroundDetailTimingsBoxText-${componentSize}`}
                id="rtaTimingText"
              >
                {TIMING_ACRONYMS.arrival_text.rescheduled_time_arrival}
              </p>
              {rtaEditor()}
            </div>
            <div className={`turnaroundDetailTimingsCombined-${componentSize}`}>
              <p
                className={`fontSizeDefault fontColorDefault turnaroundDetailTimingsBoxText-${componentSize}`}
                id="etaTimingText"
              >
                {TIMING_ACRONYMS.arrival_text.estimated_time_arrival}
              </p>
              <p
                className={`fontSizeDefaultBold fontColorDefault turnaroundDetailTimingsBoxTextBold-${componentSize}`}
                id="etaTimingValue"
              >
                {turnaroundDetailObject.eta}
              </p>
            </div>
          </div>
          <div className={`turnaroundDetailTimingsBoxRight-${componentSize}`}>
            <div className={`turnaroundDetailTimingsCombined-${componentSize}`}>
              <p
                className={`fontSizeDefault fontColorDefault turnaroundDetailTimingsBoxText-${componentSize}`}
                id="ataTimingText"
              >
                {TIMING_ACRONYMS.arrival_text.actual_time_arrival}
              </p>
              {ataEditor()}
            </div>
            <div className={`turnaroundDetailTimingsCombined-${componentSize}`}>
              <p
                className={`fontSizeDefault fontColorDefault turnaroundDetailTimingsBoxText-${componentSize}`}
                id="adoTimingText"
              >
                {TIMING_ACRONYMS.arrival_text.any_door_open}
              </p>
              {adoEditor()}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className={`turnaroundDetailTimingsBoxWrapper-${componentSize}`} />
    )
  );
}
