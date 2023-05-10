export const SEND_TURNAROUND_REPORT = 'SEND_TURNAROUND_REPORT';
export const SEND_TURNAROUND_REPORT_RESPONSE = 'SEND_TURNAROUND_REPORT_RESPONSE';

export const sendTurnaroundReport = (turnaroundReport) => ({
  type: SEND_TURNAROUND_REPORT,
  payload: turnaroundReport,
});

export const sendTurnaroundReportResponse = (response) => ({
  type: SEND_TURNAROUND_REPORT_RESPONSE,
  payload: response,
});
