import { connect } from 'react-redux';

import Turnarounds from 'src/components/turnaround/turnarounds';

const mapStateToProps = (state) => ({
  datePicked: state.turnaround.datePicked,
  isInDetailsView: state.turnaround.isInDetailsView,
  selectedTurnaroundDate: state.turnaround.selectedTurnaroundDate,
  turnarounds: state.turnaround.turnaround,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Turnarounds);
