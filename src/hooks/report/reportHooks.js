import { useState } from 'react';

import extractTurnaroundReportFormat from 'src/utils/logic/report/extractTurnaroundReportFormat';

export default function reportHooks(
  handleCloseReport,
  closeReportSubView,
  sendTurnaroundReport,
  sendTurnaroundReportStatus,
  turnaroundCompleteInfos,
  turnaroundReports,
  turnaroundData,
) {
  const [reportDelays, setReportDelays] = useState([]);
  const [reportFreeForm, setReportFreeForm] = useState(null);
  const [reportRemarks, setReportRemarks] = useState('');

  const turnaroundExtractedReportFormat = extractTurnaroundReportFormat(turnaroundReports, turnaroundData.id);
  const turnaroundExtractedComplete = extractTurnaroundReportFormat(turnaroundCompleteInfos, turnaroundData.id);
  const hasLoadReport = (turnaroundExtractedReportFormat && turnaroundExtractedComplete);

  const handleBackButton = () => {
    handleCloseReport(false);
    closeReportSubView(
      turnaroundReports.filter((format) => format.turnaroundId !== turnaroundData.id),
      turnaroundCompleteInfos.filter((completeInfo) => completeInfo.turnaroundId !== turnaroundData.id),
    );
  };

  const areAnyCompulsoryAddInfosFilled = (reportFreeFormToCheck) => {
    const checker = [];
    if (turnaroundExtractedReportFormat && reportFreeFormToCheck) {
      turnaroundExtractedReportFormat.turnaroundReport.free_form_fields.forEach((element) => {
        if (element.is_compulsory && !reportFreeFormToCheck[element.field_name]) {
          checker.push(false);
        } else {
          checker.push(true);
        }
      });
    } else {
      return (false);
    }

    return !checker.includes(false);
  };

  const sendReport = (isOnlySaving = false) => {
    const reportDataSaved = { delay_codes: reportDelays };

    if (reportRemarks !== '') {
      reportDataSaved.comment = reportRemarks;
    }
    if (reportFreeForm !== null) {
      reportDataSaved.free_forms = reportFreeForm;
    }

    if (isOnlySaving) {
      sendTurnaroundReport({ turnaroundId: turnaroundData.id, reportData: reportDataSaved, onlySaving: isOnlySaving });
    } else if (areAnyCompulsoryAddInfosFilled({ ...reportFreeForm })) {
      sendTurnaroundReport({ turnaroundId: turnaroundData.id, reportData: reportDataSaved, onlySaving: isOnlySaving });
    }
  };

  const isReportSaveStatus = (status) => (
    sendTurnaroundReportStatus.turnaroundId === turnaroundData.id && sendTurnaroundReportStatus.status === status
  );

  const isReportAlreadySend = () => (turnaroundExtractedComplete?.turnaroundInfos?.is_close_report_sent);

  return {
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
  };
}
