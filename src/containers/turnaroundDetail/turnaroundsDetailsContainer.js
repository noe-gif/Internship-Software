import { connect } from 'react-redux';

import TurnaroundsDetails from 'src/components/turnaroundDetail/turnaroundsDetails';

import { closeDetailView } from 'src/actions/turnaroundDetailActions';

const mapStateToProps = (state) => ({
  selectedTurnarounds: state.turnaround.selectedTurnarounds,
  selectedTurnaroundDetail: state.turnaround.selectedTurnaroundDetail,
});

const mapDispatchToProps = {
  closeDetailView,
};

export default connect(mapStateToProps, mapDispatchToProps)(TurnaroundsDetails);
