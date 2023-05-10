import { connect } from 'react-redux';

import Tasks from 'src/components/turnaroundDetail/tasks';

const mapStateToProps = (state) => ({
  selectedTurnarounds: state.turnaround.selectedTurnaroundDetail,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
