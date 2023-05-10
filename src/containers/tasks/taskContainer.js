import { connect } from 'react-redux';

import Task from 'src/components/tasks/task';

import {
  getTaskDetail,
  closeTask,
  updateTaskApplicableValue,
  updateTaskTiming,
  resetTaskTimingStatus,
  resetProgressBarTimingStatus,
} from 'src/actions/taskActions';

const mapStateToProps = (state) => ({
  selectedTasksDetails: state.task.selectedTasksDetails,
  taskDetailStatus: state.task.taskDetailStatus,
  taskTimingStatus: state.task.taskTimingStatus,
  progressBarTimingStatus: state.task.progressBarTimingStatus,
});

const mapDispatchToProps = {
  getTaskDetail,
  closeTask,
  updateTaskApplicableValue,
  updateTaskTiming,
  resetTaskTimingStatus,
  resetProgressBarTimingStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
