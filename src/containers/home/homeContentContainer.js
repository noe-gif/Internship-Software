import { connect } from 'react-redux';

import HomeContent from 'src/components/home/homeContent';

const mapStateToProps = (state) => ({
  airportPicked: state.turnaround.airportPicked,
  datePicked: state.turnaround.datePicked,
  searchBarValue: state.turnaround.searchBarValue,
  isCurrentlyLoading: state.turnaround.isCurrentlyLoading,
  isInDetailsView: state.turnaround.isInDetailsView,
  selectedTurnaroundDate: state.turnaround.selectedTurnaroundDate,
  turnarounds: state.turnaround.turnaround,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);
