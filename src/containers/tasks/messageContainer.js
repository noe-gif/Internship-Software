import { connect } from 'react-redux';

import Message from 'src/components/tasks/message';

import { getTaskMessages } from 'src/actions/taskActions';

const mapStateToProps = (state) => ({
  username: state.user.username,
  selectedTasksDetails: state.task.selectedTasksDetails,
  taskMessagesRequestStatus: state.task.taskMessagesRequestStatus,
});

const mapDispatchToProps = {
  getTaskMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
