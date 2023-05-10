import React from 'react';

import { isDepartureFlight } from 'src/utils/component/turnaroundDetailTimings';

import TIMING_ACRONYMS from 'src/constants/timingAcronyms.json';

export default function TurnaroundDetailDepartureTiming(props) {
  const {
    adcEditor,
    atdEditor,
    componentSize,
    rtdEditor,
    turnaroundData,
    turnaroundDetailObject,
  } = props;

  return (
    isDepartureFlight(turnaroundData) ? (
      <div className={`turnaroundDetailTimingsBoxWrapper-${componentSize}`}>
        <div className={`turnaroundDetailTimingsBox-${componentSize}`}>
          <div className={`turnaroundDetailTimingsBoxLeft-${componentSize}`}>
            <div className={`turnaroundDetailTimingsCombined-${componentSize}`}>
              <p
                className={`fontSizeDefault turnaroundDetailTimingsBoxTextSpecial-${componentSize}`}
                id="adctTimingText"
              >
                {TIMING_ACRONYMS.departure_text.all_doors_closed_target}
              </p>
              <p
                className={`fontSizeDefaultBold turnaroundDetailTimingsBoxTextSpecialBold-${componentSize}`}
                id="adctTimingValue"
              >
                {turnaroundDetailObject.adct}
              </p>
            </div>
            <div className={`turnaroundDetailTimingsCombined-${componentSize}`}>
              <p
                className={`fontSizeDefault fontColorDefault turnaroundDetailTimingsBoxText-${componentSize}`}
                id="adcTimingText"
              >
                {TIMING_ACRONYMS.departure_text.all_doors_closed}
              </p>
              {adcEditor()}
            </div>
            <div className={`turnaroundDetailTimingsCombined-${componentSize}`}>
              <p
                className={`fontSizeDefault fontColorDefault turnaroundDetailTimingsBoxText-${componentSize}`}
                id="atdTimingText"
              >
                {TIMING_ACRONYMS.departure_text.actual_time_departure}
              </p>
              {atdEditor()}
            </div>
          </div>
          <div className={`turnaroundDetailTimingsBoxRight-${componentSize}`}>
            <div className={`turnaroundDetailTimingsCombined-${componentSize}`}>
              <p
                className={`fontSizeDefault fontColorDefault turnaroundDetailTimingsBoxText-${componentSize}`}
                id="stdTimingText"
              >
                {TIMING_ACRONYMS.departure_text.scheduled_time_departure}
              </p>
              <p
                className={`fontSizeDefaultBold fontColorDefault turnaroundDetailTimingsBoxTextBold-${componentSize}`}
                id="stdTimingValue"
              >
                {turnaroundDetailObject.std}
              </p>
            </div>
            <div className={`turnaroundDetailTimingsCombined-${componentSize}`}>
              <p
                className={`fontSizeDefault fontColorDefault turnaroundDetailTimingsBoxText-${componentSize}`}
                id="rtdTimingText"
              >
                {TIMING_ACRONYMS.departure_text.rescheduled_time_departure}
              </p>
              {rtdEditor()}
            </div>
            <div className={`turnaroundDetailTimingsCombined-${componentSize}`}>
              <p
                className={`fontSizeDefault fontColorDefault turnaroundDetailTimingsBoxText-${componentSize}`}
                id="ptdTimingText"
              >
                {TIMING_ACRONYMS.departure_text.estimated_departure}
              </p>
              <p
                className={`fontSizeDefaultBold fontColorDefault turnaroundDetailTimingsBoxTextBold-${componentSize}`}
                id="ptdTimingValue"
              >
                {turnaroundDetailObject.ptd}
              </p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div />
    )
  );
}
