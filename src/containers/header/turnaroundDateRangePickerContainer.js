import { connect } from 'react-redux';

import { turnaroundRequestAction } from 'src/actions/turnaroundActions';

import TurnaroundDateRangePicker from 'src/components/filter/turnaroundDateRangePicker';

const mapStateToProps = (state) => ({
  airportPicked: state.turnaround.airportPicked,
  datePicked: state.turnaround.datePicked,
  userAccessToken: state.user.user.access_token,
});

const mapDispatchToProps = {
  turnaroundRequestAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TurnaroundDateRangePicker);
