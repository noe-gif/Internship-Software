import { connect } from 'react-redux';

import AddInfoTypeDatetime from 'src/components/tasks/addInfos/addInfoTypeDatetime';

import { resetAddInfoStatus, updateAddInfos } from 'src/actions/taskActions';

const mapStateToProps = (state) => ({
  addInfoStatus: state.task.addInfoStatus,
});

const mapDispatchToProps = {
  resetAddInfoStatus,
  updateAddInfos,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddInfoTypeDatetime);
