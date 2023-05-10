import { connect } from 'react-redux';

import { requestUserAirportAction, turnaroundRequestAction } from 'src/actions/turnaroundActions';

import TurnaroundAirportPicker from 'src/components/filter/turnaroundAirportPicker';

const mapStateToProps = (state) => ({
  airportsAvailable: state.turnaround.airportsAvailable,
  airportPicked: state.turnaround.airportPicked,
  datePicked: state.turnaround.datePicked,
  userAccessToken: state.user.user.access_token,
});

const mapDispatchToProps = {
  requestUserAirportAction,
  turnaroundRequestAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TurnaroundAirportPicker);
