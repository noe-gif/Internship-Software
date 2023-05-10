import { connect } from 'react-redux';

import { updateParkingStand, resetParkingStandStatus } from 'src/actions/turnaroundDetailActions';

import TurnaroundDetailHeader from 'src/components/turnaroundDetail/turnaroundDetailHeader';

const mapStateToProps = (state) => ({
  parkingStandRequestStatus: state.turnaround.parkingStandRequestStatus,
});

const mapDispatchToProps = {
  updateParkingStand,
  resetParkingStandStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(TurnaroundDetailHeader);
