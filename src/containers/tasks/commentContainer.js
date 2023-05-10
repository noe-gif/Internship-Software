import { connect } from 'react-redux';

import Comment from 'src/components/tasks/comment';

import {
  deleteComment,
  getCommentPictureRequest,
  resetDeleteCommentResponseStatus,
  sendTaskComment,
} from 'src/actions/conversationActions';
import { getTaskComments } from 'src/actions/taskActions';

const mapStateToProps = (state) => ({
  commentPicture: state.conversation.commentPicture,
  commentPictureErrorStatusCode: state.conversation.commentPictureErrorStatusCode,
  commentPictureStatus: state.conversation.commentPictureStatus,
  deleteCommentResponseStatus: state.conversation.deleteCommentResponseStatus,
  selectedTasksDetails: state.task.selectedTasksDetails,
  taskCommentsRequestStatus: state.task.taskCommentsRequestStatus,
  username: state.user.username,
});

const mapDispatchToProps = {
  deleteComment,
  getCommentPictureRequest,
  getTaskComments,
  resetDeleteCommentResponseStatus,
  sendTaskComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
