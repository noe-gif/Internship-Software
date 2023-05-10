import React, { useCallback, useEffect } from 'react';

import Loading from 'src/components/loading';

import { CLOSE_ICON } from 'src/constants/picturePath';
import {
  CONVERSATION_DECODE_FORMAT,
  displayConversationPictureAcronym,
} from 'src/constants/conversation/conversation';
import { FAIL, LOADING, SUCCESS } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';
import { ESC_KEY_CODE } from 'src/constants/keyCodeConstant';
import TURNAROUND_TEXT from 'src/constants/header/headerText.json';

export default function ConversationPicture(props) {
  const {
    picture,
    pictureIndex,
    pictureRequestStatus,
    pictureResponseErrorStatusCode,
    showModal,
  } = props;

  const closeModalESCKeyBoard = useCallback((event) => {
    if (event.key === ESC_KEY_CODE) {
      showModal(pictureIndex);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', closeModalESCKeyBoard, false);

    return () => {
      document.removeEventListener('keydown', closeModalESCKeyBoard, false);
    };
  }, []);

  const renderLoader = () => (
    <div className="conversationModalLoader">
      <Loading />
    </div>
  );

  const renderConversationPicture = () => (
    <img
      id={`conversationPictureImg${pictureIndex}`}
      className="conversationModalPicture"
      src={`${CONVERSATION_DECODE_FORMAT}${picture.picture}`}
      alt={`Conversation ${pictureIndex}`}
    />
  );

  const renderErrorMessage = () => (
    <div className="conversationModalErrorContent">
      <p
        id={`conversationPictureErrorMessage${pictureIndex}`}
        className="fontColorLate fontSizeDefault conversationModalErrorMessage"
      >
        {displayConversationPictureAcronym[pictureResponseErrorStatusCode]}
      </p>
    </div>
  );

  const handleConversationPictureDisplayThroughRequestStatus = () => {
    switch (pictureRequestStatus) {
    case LOADING:
      return renderLoader();
    case SUCCESS:
      return renderConversationPicture();
    case FAIL:
      return renderErrorMessage();
    default:
      return null;
    }
  };

  return (
    <div className="conversationModalWrapper" aria-hidden="true" onClick={() => showModal(pictureIndex)}>
      <div className="contentModalWrapper">
        <div className="conversationModalHeaderWrapper">
          <div className="conversationModalHeaderSpace" />
          <div className="conversationModalCloseWrapper">
            <img
              id={`conversationPictureCloseIcon${pictureIndex}`}
              src={CLOSE_ICON}
              alt={TURNAROUND_TEXT.alt.close_icon}
              className="conversationModalClose"
              onClick={() => showModal(pictureIndex)}
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="conversationModalPictureWrapper">
          <div className="conversationModalPictureContent">
            {handleConversationPictureDisplayThroughRequestStatus()}
          </div>
        </div>
      </div>
    </div>
  );
}
