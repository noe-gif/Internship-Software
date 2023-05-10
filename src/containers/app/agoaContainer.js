import { connect } from 'react-redux';

import { loginRequestAction, tokenRequestAction } from 'src/actions/userActions';

import Agoa from 'src/components/app/agoa';

const mapStateToProps = (state) => ({
  user: state.user,
  connectionError: state.user.connectionError,
});

const mapDispatchToProps = {
  loginRequestAction,
  tokenRequestAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Agoa);
