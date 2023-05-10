import React from 'react';

import {
  FAIL, SUCCESS,
} from 'src/constants/turnaroundDetail/turnaroundDetailTimings';
import { deleteConversationResponseAcronym } from 'src/constants/conversation/conversation';
import CONVERSATION_TEXT from 'src/constants/conversation/conversationText.json';

export default function DeleteConversationModal(props) {
  const {
    conversation,
    conversationType,
    deleteConversation,
    responseStatus,
    showModal,
  } = props;

  return (
    <div className="modalEntitiesWrapper">
      <div className="contentModalWrapper">
        <div className="modalWrapper">
          <div className="modalContent">
            <p
              id={`deleteConversationModalTitle${conversation.id}`}
              className="fontSizeDefault modalName"
            >
              {`${CONVERSATION_TEXT.delete_conversation_modal.informative_message} ${conversationType}`}
            </p>
            {conversation[conversationType] && (
              <p
                id={`deleteConversationModalText${conversation.id}`}
                className="fontSizeSmall modalConversationText"
              >
                {conversation.comment}
              </p>
            )}
            {responseStatus.status === SUCCESS && showModal()}
            {responseStatus.status === FAIL && (
              <p
                id={`deleteConversationModalErrorStatusMessage${conversation.id}`}
                className="modalStatusFail"
              >
                {deleteConversationResponseAcronym[responseStatus.statusCode]}
              </p>
            )}
            <div className="modalButtonWrapper">
              <div
                onClick={() => showModal(conversation)}
                role="button"
                aria-hidden="true"
                className="modalButtonContent modalButtonMarginBottom"
              >
                <p
                  id={`deleteConversationModalCancelButton${conversation.id}`}
                  className="fontSizeDefault modalButton"
                >
                  {CONVERSATION_TEXT.delete_conversation_modal.cancel_button}
                </p>
              </div>
              <div
                onClick={() => deleteConversation(conversation.id)}
                role="button"
                aria-hidden="true"
                className="modalButtonContent modalButtonMarginBottom"
              >
                <p
                  id={`deleteConversationModalConfirmButton${conversation.id}`}
                  className="fontSizeDefault modalButton"
                >
                  {CONVERSATION_TEXT.delete_conversation_modal.confirm_button}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
