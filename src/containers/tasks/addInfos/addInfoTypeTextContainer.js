import { connect } from 'react-redux';

import AddInfoTypeText from 'src/components/tasks/addInfos/addInfoTypeText';

import { resetAddInfoStatus, updateAddInfos } from 'src/actions/taskActions';

const mapStateToProps = (state) => ({
  addInfoStatus: state.task.addInfoStatus,
});

const mapDispatchToProps = {
  resetAddInfoStatus,
  updateAddInfos,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddInfoTypeText);
