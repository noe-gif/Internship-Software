import React, { useEffect } from 'react';

import Conversation from 'src/components/conversation/conversation';

import messageHook from 'src/hooks/task/messageHook';

import CONVERSATION_TEXT from 'src/constants/conversation/conversationText.json';

export default function Message(props) {
  const {
    componentSize,
    getTaskMessages,
    handleCloseTurnaround,
    closeMessages,
    selectedTasksDetails,
    task,
    taskMessagesRequestStatus,
    turnaround,
    username,
  } = props;

  const {
    checkSelectedTaskDetails,
    filteredTask,
    messagesStatus,
    updateTaskFromRefreshedTurnaround,
  } = messageHook(
    getTaskMessages,
    selectedTasksDetails,
    task,
    taskMessagesRequestStatus,
    turnaround,
  );

  useEffect(() => {
    if (selectedTasksDetails) {
      checkSelectedTaskDetails();
    }
  }, [taskMessagesRequestStatus, selectedTasksDetails, messagesStatus]);

  useEffect(() => {
    updateTaskFromRefreshedTurnaround();
  }, [turnaround]);

  return (
    <Conversation
      componentSize={componentSize}
      conversationData={filteredTask.messages}
      conversationDataStatus={messagesStatus}
      conversationType={CONVERSATION_TEXT.conversation.conversationTypeMessage}
      closeConversation={closeMessages}
      handleSend={() => {}}
      handleCloseTurnaround={handleCloseTurnaround}
      isDisabled
      turnaround={turnaround}
      username={username}
    />
  );
}
