import { connect } from 'react-redux';

import { logoutRequestAction } from 'src/actions/userActions';

import Header from 'src/components/header/header';

const mapStateToProps = (state) => ({
  userName: state.user.username,
});

const mapDispatchToProps = {
  logoutRequestAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
