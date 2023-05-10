import { connect } from 'react-redux';

import turnaroundCategory from '../../components/turnaround/turnaroundCategory';

const mapStateToProps = (state) => ({
  userData: state.user,
  turnaroundsData: state.turnaround,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(turnaroundCategory);
