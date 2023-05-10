import { connect } from 'react-redux';

import AddInfoTypeCheckbox from 'src/components/tasks/addInfos/addInfoTypeCheckbox';

import { resetAddInfoStatus, updateAddInfos } from 'src/actions/taskActions';

const mapStateToProps = (state) => ({
  addInfoStatus: state.task.addInfoStatus,
});

const mapDispatchToProps = {
  resetAddInfoStatus,
  updateAddInfos,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddInfoTypeCheckbox);
