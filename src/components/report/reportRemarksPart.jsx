import React, { useEffect } from 'react';

import stringFromArrayOfObject from 'src/utils/parsing/arrayToString';

import REPORT_TEXT from 'src/constants/report/reportText.json';

export default function ReportRemarksPart(props) {
  const {
    turnaroundData,
    reportRemarks,
    setReportRemarks,
  } = props;

  useEffect(() => {
    setReportRemarks(stringFromArrayOfObject(turnaroundData.comments, 'comment'));
  }, []);

  const changeTextarea = (event) => {
    event.preventDefault();

    setReportRemarks(event.target.value);
  };

  return (
    <>
      <div className="reportPartHeader">
        <p className="fontSizeBigBold fontColorDefault reportPartHeaderText">{REPORT_TEXT.remarks.title}</p>
      </div>
      <div className="reportRemarksWrapper">
        <textarea
          className="fontSizeDefault fontColorDefault reportRemarksInput"
          rows="5"
          value={reportRemarks}
          onChange={changeTextarea}
        />
      </div>
    </>
  );
}
