import { connect } from 'react-redux';

import AddInfoTypeNumber from 'src/components/tasks/addInfos/addInfoTypeNumber';

import { resetAddInfoStatus, updateAddInfos } from 'src/actions/taskActions';

const mapStateToProps = (state) => ({
  addInfoStatus: state.task.addInfoStatus,
});

const mapDispatchToProps = {
  resetAddInfoStatus,
  updateAddInfos,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddInfoTypeNumber);
