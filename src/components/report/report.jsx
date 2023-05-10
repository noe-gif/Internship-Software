import React, { useEffect } from 'react';

import Loading from 'src/components/loading';
import ReportAddInfosPart from 'src/components/report/reportAddInfosPart';
import ReportDelayPart from 'src/components/report/reportDelaysPart';
import ReportRemarksPart from 'src/components/report/reportRemarksPart';
import ReportTasksPart from 'src/components/report/reportTasksPart';
import ReportTurnaroundPart from 'src/components/report/reportTurnaroundPart';
import TaskHeader from 'src/components/header/taskHeader';

import reportHooks from 'src/hooks/report/reportHooks';

import { extractFlightsInformationFromTurnaround } from 'src/utils/parsing/extractFromTurnaround';

import { FAIL, LOADING } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';
import REPORT_TEXT from 'src/constants/report/reportText.json';

import 'src/styles/Report.css';

export default function Report(props) {
  const {
    closeReportSubView,
    componentSize,
    getTurnaroundAllInfoRequest,
    getTurnaroundReportRequest,
    handleCloseTurnaround,
    handleCloseReport,
    sendTurnaroundReport,
    sendTurnaroundReportStatus,
    turnaroundCompleteInfos,
    turnaroundData,
    turnaroundReports,
  } = props;

  const {
    areAnyCompulsoryAddInfosFilled,
    handleBackButton,
    hasLoadReport,
    isReportAlreadySend,
    isReportSaveStatus,
    reportDelays,
    reportFreeForm,
    reportRemarks,
    sendReport,
    setReportDelays,
    setReportFreeForm,
    setReportRemarks,
    turnaroundExtractedComplete,
    turnaroundExtractedReportFormat,
  } = reportHooks(
    handleCloseReport,
    closeReportSubView,
    sendTurnaroundReport,
    sendTurnaroundReportStatus,
    turnaroundCompleteInfos,
    turnaroundReports,
    turnaroundData,
  );

  useEffect(() => {
    const fetchReport = async () => {
      await getTurnaroundReportRequest(turnaroundData.id);
      await getTurnaroundAllInfoRequest(turnaroundData.id);
    };
    fetchReport();
  }, []);

  const renderReportHeaderSaveButton = () => (
    <div className="reportHeaderSaveContainer">
      <p
        id="reportHeaderSave"
        aria-hidden="true"
        className="fontSizeDefaultBold fontColorDefault reportHeaderSave"
        onClick={() => sendReport(true)}
      >
        {REPORT_TEXT.header.save}
      </p>
    </div>
  );

  const renderReportHeaderSendButton = () => (
    <div
      className={areAnyCompulsoryAddInfosFilled(reportFreeForm)
        ? 'reportHeaderSendContainer'
        : 'reportHeaderSendDisableContainer'}
    >
      <p
        id="reportHeaderSend"
        aria-hidden="true"
        className={
          isReportAlreadySend()
            ? 'fontSizeDefaultBold reportHeaderSend'
            : 'fontColorLate fontSizeDefaultBold reportHeaderNotSend'
        }
        onClick={() => sendReport()}
      >
        {REPORT_TEXT.header.send}
      </p>
    </div>
  );

  const renderReportHeader = () => (
    <>
      <div className="reportHeaderContainer">
        {isReportSaveStatus(LOADING) ? (
          <div className="reportHeaderSaveContainer">
            <Loading />
          </div>
        ) : (
          renderReportHeaderSaveButton()
        )}
        <div className="reportHeaderTitleContainer">
          <p
            id="reportHeaderTitle"
            className="fontSizeBigBold fontColorDefault reportHeaderTitle"
          >
            {REPORT_TEXT.header.title}
          </p>
        </div>
        {isReportSaveStatus(LOADING) ? (
          <div className="reportHeaderSaveContainer">
            <Loading />
          </div>
        ) : (
          renderReportHeaderSendButton()
        )}
      </div>
      {isReportSaveStatus(FAIL) && (
        <div className="reportHeaderSaveErrorContainer">
          <p
            id="reportHeaderError"
            className="fontSizeDefaultBold fontColorLate"
          >
            {REPORT_TEXT.header.error}
          </p>
        </div>
      )}
    </>
  );

  return (
    <div className="taskWrapper">
      <TaskHeader
        backViewFunction={handleBackButton}
        closeTurnaroundFunction={handleCloseTurnaround}
        componentSize={componentSize}
        turnaroundId={turnaroundData.id}
        turnaroundFlights={extractFlightsInformationFromTurnaround(turnaroundData)}
      />
      {renderReportHeader()}
      <div className="reportContentWrapper">
        <ReportDelayPart
          turnaroundData={turnaroundData}
          reportDelays={reportDelays}
          setReportDelays={setReportDelays}
        />
        <ReportRemarksPart
          turnaroundData={turnaroundData}
          reportRemarks={reportRemarks}
          setReportRemarks={setReportRemarks}
        />
        <ReportAddInfosPart
          turnaroundReportFormat={turnaroundExtractedReportFormat}
          turnaroundCompleteInfos={turnaroundExtractedComplete}
          hasLoadReport={hasLoadReport}
          reportFreeForm={reportFreeForm}
          setReportFreeForm={setReportFreeForm}
        />
        <ReportTurnaroundPart
          turnaroundCompleteInfos={turnaroundExtractedComplete}
          turnaroundReportFormat={turnaroundExtractedReportFormat}
          hasLoadReport={hasLoadReport}
        />
        <ReportTasksPart
          turnaroundReportFormat={turnaroundExtractedReportFormat}
          turnaroundCompleteInfos={turnaroundExtractedComplete}
          hasLoadReport={hasLoadReport}
        />
      </div>
    </div>
  );
}
