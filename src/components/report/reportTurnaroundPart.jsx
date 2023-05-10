import React from 'react';

import extractTurnaroundPart from 'src/utils/logic/report/extractTurnaroundPart';

import REPORT_TEXT from 'src/constants/report/reportText.json';
import useTimezoneFilter from 'src/hooks/filter/useTimezoneFilter';

export default function ReportTurnaroundPart(props) {
  const {
    hasLoadReport,
    turnaroundCompleteInfos,
    turnaroundReportFormat,
  } = props;

  const { state: { selectedTimezone } } = useTimezoneFilter();

  const renderTurnaroundInfoLine = (turnaroundInfoLineTitle, turnaroundInfoLineValue) =>
    (
      <div className="reportTurnaroundInfoLine" key={turnaroundInfoLineTitle}>
        <div className="reportTurnaroundInfoLeftPart">
          <p className="fontSizeDefaultBold fontColorDefault reportTurnaroundInfoTitle">{turnaroundInfoLineTitle}</p>
        </div>
        <div className="reportTurnaroundInfoRightPart">
          <p className="fontSizeDefault fontColorDefault reportTurnaroundInfoValue">{turnaroundInfoLineValue}</p>
        </div>
      </div>
    );

  const renderTurnaroundInfosLoad = (completeTurnaroundFields) => (
    completeTurnaroundFields.map((field) =>
      renderTurnaroundInfoLine(field.name, field.value))
  );

  const renderTurnaroundInfosList = () => {
    if (hasLoadReport) {
      return (
        renderTurnaroundInfosLoad(
          extractTurnaroundPart(
            turnaroundReportFormat.turnaroundReport.turnaround_fields,
            turnaroundCompleteInfos.turnaroundInfos,
            selectedTimezone,
          ),
        )
      );
    }

    return null;
  };

  return (
    <>
      <div className="reportPartHeader">
        <p className="fontSizeBigBold fontColorDefault reportPartHeaderText">{REPORT_TEXT.turnaround.title}</p>
      </div>
      <div className="reportTurnaroundWrapper">
        {renderTurnaroundInfosList()}
      </div>
    </>
  );
}
