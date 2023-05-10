import React, { useEffect } from 'react';

import Conversation from 'src/components/conversation/conversation';

import commentHook from 'src/hooks/task/commentHook';

import CONVERSATION_TEXT from 'src/constants/conversation/conversationText.json';

export default function Comment(props) {
  const {
    commentPicture,
    commentPictureErrorStatusCode,
    commentPictureStatus,
    closeComments,
    componentSize,
    deleteComment,
    deleteCommentResponseStatus,
    getCommentPictureRequest,
    getTaskComments,
    handleCloseTurnaround,
    resetDeleteCommentResponseStatus,
    sendTaskComment,
    selectedTasksDetails,
    task,
    taskCommentsRequestStatus,
    turnaround,
    username,
  } = props;

  const {
    checkTasksDetails,
    commentsStatus,
    filteredTask,
    handleDeleteComment,
    handleSendComment,
    updateTaskFromRefreshedTurnaround,
  } = commentHook(
    deleteComment,
    getTaskComments,
    selectedTasksDetails,
    sendTaskComment,
    task,
    taskCommentsRequestStatus,
    turnaround,
  );

  useEffect(() => {
    if (selectedTasksDetails) {
      checkTasksDetails();
    }
  }, [taskCommentsRequestStatus, selectedTasksDetails, commentsStatus]);

  useEffect(() => {
    updateTaskFromRefreshedTurnaround();
  }, [turnaround]);

  return (
    <Conversation
      conversationPicture={commentPicture}
      conversationPictureErrorStatusCode={commentPictureErrorStatusCode}
      conversationPictureStatus={commentPictureStatus}
      closeConversation={closeComments}
      componentSize={componentSize}
      conversationData={filteredTask.comments}
      conversationDataStatus={commentsStatus}
      conversationType={CONVERSATION_TEXT.conversation.conversationTypeComment}
      deleteConversation={handleDeleteComment}
      deleteConversationResponseStatus={deleteCommentResponseStatus}
      getConversationPicture={getCommentPictureRequest}
      handleCloseTurnaround={handleCloseTurnaround}
      handleSend={handleSendComment}
      resetConversationResponseStatus={resetDeleteCommentResponseStatus}
      turnaround={turnaround}
      username={username}
    />
  );
}
