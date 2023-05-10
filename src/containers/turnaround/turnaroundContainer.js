import { connect } from 'react-redux';

import { closeDetailView, getTurnaroundDetailsRequest } from 'src/actions/turnaroundDetailActions';

import Turnaround from 'src/components/turnaround/turnaround';

const mapStateToProps = (state) => ({
  isInDetailsView: state.turnaround.isInDetailsView,
  selectedTurnarounds: state.turnaround.selectedTurnarounds,
});

const mapDispatchToProps = {
  closeDetailView,
  getTurnaroundDetailsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Turnaround);
