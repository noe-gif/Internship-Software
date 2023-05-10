import { connect } from 'react-redux';

import TurnaroundHeader from 'src/components/header/turnaroundHeader';

const mapStateToProps = (state) => ({
  userPermissions: state.user.userPermissions,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TurnaroundHeader);
