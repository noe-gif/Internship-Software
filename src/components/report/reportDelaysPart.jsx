import React, { useEffect } from 'react';

import { checkIndexAndExtractFromArray } from 'src/utils/parsing/extractKeyFromDictionary';

import {
  REPORT_DELAY_LINES_NUMBER,
  REPORT_DELAY_COMPONENT_NAME,
} from 'src/constants/report/reportConstant';
import REPORT_TEXT from 'src/constants/report/reportText.json';
import reportDelaysHooks from 'src/hooks/report/reportDelaysHooks';

export default function ReportDelayPart(props) {
  const {
    turnaroundData,
    reportDelays,
    setReportDelays,
  } = props;

  const { setDelayLinesContent, onChangeDelayInput } = reportDelaysHooks(setReportDelays);

  useEffect(() => {
    let turnaroundDelays = [];
    const linesContent = [];

    turnaroundData.delays.forEach((delay, index) => {
      if (turnaroundDelays.some((registeredDelay) => registeredDelay.code === delay.code)) {
        const sameDelay = turnaroundDelays.find((registeredDelay) => registeredDelay.code === delay.code);
        const completeDuration = delay.duration + sameDelay.duration;

        turnaroundDelays = turnaroundDelays.filter((registeredDelay) => registeredDelay.code !== delay.code);
        turnaroundDelays.push({ code: delay.code, duration: completeDuration });
        linesContent.push(
          { lineName: `${REPORT_DELAY_COMPONENT_NAME}${index}`, code: delay.code, duration: completeDuration },
        );
      } else {
        turnaroundDelays.push({ code: delay.code, duration: delay.duration });
        linesContent.push(
          { lineName: `${REPORT_DELAY_COMPONENT_NAME}${index}`, code: delay.code, duration: delay.duration },
        );
      }
    });

    setReportDelays(turnaroundDelays);
    setDelayLinesContent(linesContent);
  }, []);

  const renderDelayLine = (title, delay, name) =>
    (
      <div className="reportDelayLine" key={name}>
        <div className="reportDelayLeftPart">
          <p className="fontSizeDefaultBold fontColorDefault reportDelayLeftText">{title}</p>
        </div>
        <div className="reportDelayCentralPart">
          <input
            id={`${name}Code`}
            className="fontSizeDefault fontColorDefault reportDelayInput"
            autoComplete="off"
            placeholder={REPORT_TEXT.delay.placeholder_code}
            defaultValue={delay.code}
            name={name}
            onChange={onChangeDelayInput}
          />
        </div>
        <div className="reportDelayRightPart">
          <input
            id={`${name}Duration`}
            className="reportDelayInput"
            autoComplete="off"
            type="number"
            min={0}
            placeholder={REPORT_TEXT.delay.placeholder_duration}
            defaultValue={delay.duration}
            name={name}
            onChange={onChangeDelayInput}
          />
        </div>
      </div>
    );

  const renderDelaysLoop = () => (
    <div className="reportDelaysList">
      {[...Array(REPORT_DELAY_LINES_NUMBER)].map((emptyElement, delayIndex) =>
        renderDelayLine(
          `${REPORT_TEXT.delay.line_title}${delayIndex + 1}`,
          checkIndexAndExtractFromArray(reportDelays, delayIndex, { code: null, duration: null }),
          `delayInput${delayIndex}`,
        ))}
    </div>
  );

  return (
    <>
      <div className="reportPartHeader">
        <p className="fontSizeBigBold fontColorDefault reportPartHeaderText">{REPORT_TEXT.delay.title}</p>
      </div>
      {renderDelaysLoop()}
    </>
  );
}
