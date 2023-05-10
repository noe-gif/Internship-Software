import { connect } from 'react-redux';

import { refreshTurnaroundsAction } from 'src/actions/turnaroundActions';

import CircularTimer from 'src/components/loader/circularTimer';

const mapStateToProps = (state) => ({
  accessToken: state.user.user.access_token,
  airportPicked: state.turnaround.airportPicked,
  datePicked: state.turnaround.datePicked,
  isCurrentlyLoading: state.turnaround.isCurrentlyLoading,
  username: state.user.username,
});

const mapDispatchToProps = {
  refreshTurnarounds: refreshTurnaroundsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CircularTimer);
