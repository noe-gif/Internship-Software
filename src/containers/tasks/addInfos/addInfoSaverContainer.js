import { connect } from 'react-redux';

import AddInfoSaver from 'src/components/tasks/addInfos/addInfoSaver';

import { updateAddInfos } from 'src/actions/taskActions';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updateAddInfos,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddInfoSaver);
