import { connect } from 'react-redux';

import {
  closeReportSubView,
  getTurnaroundAllInfoRequest,
  getTurnaroundReportRequest,
} from 'src/actions/turnaroundDetailActions';

import {
  sendTurnaroundReport,
} from 'src/actions/reportActions';

import Report from 'src/components/report/report';

const mapStateToProps = (state) => ({
  turnaroundReports: state.turnaround.turnaroundReports,
  turnaroundCompleteInfos: state.turnaround.turnaroundCompleteInfos,
  sendTurnaroundReportStatus: state.report.sendTurnaroundReportStatus,
});

const mapDispatchToProps = {
  closeReportSubView,
  getTurnaroundAllInfoRequest,
  getTurnaroundReportRequest,
  sendTurnaroundReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
