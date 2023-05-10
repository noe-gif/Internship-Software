import {
  SEND_TURNAROUND_REPORT,
  SEND_TURNAROUND_REPORT_RESPONSE,
} from 'src/actions/reportActions';

import { LOADING } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

const initialState = {
  sendTurnaroundReportStatus: {
    status: 'default',
    turnaroundId: 0,
  },
};

export default function report(state = initialState, action) {
  switch (action.type) {
  case SEND_TURNAROUND_REPORT:
    return {
      ...state,
      sendTurnaroundReportStatus: { status: LOADING, turnaroundId: action.payload.turnaroundId },
    };
  case SEND_TURNAROUND_REPORT_RESPONSE:
    return {
      ...state,
      sendTurnaroundReportStatus: {
        status: action.payload.status,
        turnaroundId: action.payload.turnaroundId,
      },
    };
  default:
    return state;
  }
}
