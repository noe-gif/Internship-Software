import { combineReducers } from 'redux';
import conversation from 'src/reducers/conversation';
import report from 'src/reducers/report';
import task from 'src/reducers/task';
import turnaround from 'src/reducers/turnaround';
import user from 'src/reducers/user';

const rootReducer = combineReducers({
  conversation,
  task,
  turnaround,
  report,
  user,
});

export default rootReducer;
