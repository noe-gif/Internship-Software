import { connect } from 'react-redux';

import turnaroundDetailDisplayer from 'src/components/turnaroundDetail/turnaroundDetailDisplayer';

import { closeTask } from 'src/actions/taskActions';

const mapStateToProps = (state) => ({
  selectedTasksDetails: state.task.selectedTasksDetails,
});

const mapDispatchToProps = {
  closeTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(turnaroundDetailDisplayer);
