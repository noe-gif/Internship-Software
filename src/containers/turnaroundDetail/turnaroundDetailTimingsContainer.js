import { connect } from 'react-redux';

import { updateFlightTiming, resetFlightTimingStatus } from 'src/actions/turnaroundDetailActions';

import TurnaroundDetailTimings from 'src/components/turnaroundDetail/turnaroundDetailTimings';

const mapStateToProps = (state) => ({
  updateFlightTimingStatus: state.turnaround.updateFlightTimingStatus,
});

const mapDispatchToProps = {
  updateFlightTiming,
  resetFlightTimingStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(TurnaroundDetailTimings);
