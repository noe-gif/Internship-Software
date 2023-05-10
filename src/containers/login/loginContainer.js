import { connect } from 'react-redux';

import { loginRequestAction } from 'src/actions/userActions';

import Login from 'src/components/login/login';

const mapStateToProps = (state) => ({
  connectionError: state.user.connectionError,
});

const mapDispatchToProps = {
  loginRequestAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
