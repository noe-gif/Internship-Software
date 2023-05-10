import { connect } from 'react-redux';

import { setSearchBarValueAction } from 'src/actions/turnaroundActions';

import TurnaroundSearchBarFilter from 'src/components/filter/turnaroundSearchBarFilter';

const mapStateToProps = (state) => ({
  searchBarValue: state.turnaround.searchBarValue,
});

const mapDispatchToProps = {
  setSearchBarValueAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TurnaroundSearchBarFilter);
