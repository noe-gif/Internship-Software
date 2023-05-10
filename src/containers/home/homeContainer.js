import { connect } from 'react-redux';

import { turnaroundRequestAction } from 'src/actions/turnaroundActions';
import { logoutRequestAction } from 'src/actions/userActions';

import Home from 'src/components/home/home';

const mapStateToProps = (state) => ({
  accessToken: state.user.user.access_token,
  airportPicked: state.turnaround.airportPicked,
});

const mapDispatchToProps = {
  logoutRequestAction,
  turnaroundRequestAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
