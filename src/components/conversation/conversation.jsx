import React, { useEffect } from 'react';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

import ConversationPicture from 'src/components/modal/conversationPicture';
import DeleteConversationModal from 'src/components/modal/deleteConversationModal';
import Loading from 'src/components/loading';
import TaskHeader from 'src/components/header/taskHeader';

import { ICON_COMPLETE_PATH } from 'src/utils/urlAPIs';
import { extractFlightsInformationFromTurnaround } from 'src/utils/parsing/extractFromTurnaround';
import { formatDateToStringDDMMMYY } from 'src/utils/logic/date/formattedDate';
import provideFormattedDateTiming from 'src/utils/logic/date/provideDateTiming';

import ImagePreview from 'src/components/conversation/imagePreview';

import conversationHooks from 'src/hooks/conversation/conversationHooks';

import {
  ACCEPTED_FILE_EXTENSIONS,
  CONVERSATION_LOAD_ERROR,
  EMPTY_TASK_TIMING,
  HIDE,
} from 'src/constants/conversation/conversation';
import { FAIL, LOADING, SUCCESS } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

import 'src/styles/Conversation.css';

const DELETE_ICON = `${ICON_COMPLETE_PATH}DELETE.png`;

export default function Conversation(props) {
  const {
    conversationPicture,
    conversationPictureErrorStatusCode,
    conversationPictureStatus,
    closeConversation,
    componentSize,
    conversationData,
    conversationDataStatus,
    conversationType,
    deleteConversation,
    deleteConversationResponseStatus,
    getConversationPicture,
    handleCloseTurnaround,
    handleSend,
    isDisabled,
    resetConversationResponseStatus,
    turnaround,
    username,
  } = props;

  const {
    classnamesDisplay,
    conversationContentClassName,
    conversationContentTextDynamicHeight,
    conversationInputTextDynamicHeight,
    conversationInputValue,
    conversationInputWrapperTextDynamicHeight,
    conversationDataToDelete,
    currentImagePreviewAlt,
    currentImagePreviewSrc,
    decodePictureFormat,
    displayClosePreview,
    handleDataForModalPictureOpening,
    handleImageFileDragLeave,
    handleImageFileDragOver,
    handleImageFileDrop,
    handleImageFilePaste,
    handleFileSelectingInFileExplorer,
    imagePreviewDynamicPosition,
    imageUploadErrorMessage,
    imageUploadErrorMessageDynamicPosition,
    inputPictureFileRaw,
    isButtonDisabledOrInputEmpty,
    isDeleteConversationModalOpen,
    isNotSameDate,
    isPicture,
    isPictureModalOpen,
    isUserTypeLogged,
    loadPictureFileFromFolder,
    pictureIndex,
    removeCurrentImage,
    resizeConversationContentBasedOnConversationInputHeight,
    selectedTimezone,
    sendConversation,
    setConversationInputValue,
    setDisplayClosePreview,
    showDeleteConversationModal,
    showModal,
    whichPlaceHolderPut,
  } = conversationHooks(
    conversationType,
    handleSend,
    conversationData,
    getConversationPicture,
    isDisabled,
    resetConversationResponseStatus,
    turnaround,
  );

  useEffect(() => {
    resizeConversationContentBasedOnConversationInputHeight();
  }, [conversationInputValue]);

  const renderConversationPicture = (index, className) => (
    <img
      aria-hidden="true"
      onClick={() => handleDataForModalPictureOpening(index)}
      className={className}
      src={decodePictureFormat(index)}
      alt=""
    />
  );

  const renderLoader = () => (
    <div className="conversationLoaderWrapper">
      <Loading />
    </div>
  );

  const renderDate = (index) => (
    ((isNotSameDate(index) || index === 0) && (
      <p id={`conversationDate${conversationData[index].id}`} className="fontSizeSmall conversationUserDate">
        {formatDateToStringDDMMMYY(conversationData[index].date, selectedTimezone)}
        &nbsp;
        {provideFormattedDateTiming(conversationData[index].date, EMPTY_TASK_TIMING, selectedTimezone)}
      </p>
    ))
  );

  const renderConversationCaptionContent = (conversationText, classnames, index, userType) => {
    if (conversationText) {
      return (
        <div className={classnames.conversationContent}>
          {isUserTypeLogged(userType) && (
            <img
              src={DELETE_ICON}
              alt="DELETE COMMENT ICON"
              className="conversationDeleteIcon"
              onClick={() => { showDeleteConversationModal(conversationData[index]); }}
              aria-hidden="true"
            />
          )}
          <div className={`${classnames.wrapperConversation} fontSizeDefault`}>
            <p
              id={`conversationText${conversationData[index].id}`}
              className={classnames.conversation}
            >
              {conversationText}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderConversationLineContent = (index, classnames, userType) => (
    <div className="conversationWrapper">
      {isUserTypeLogged(userType) && (
        <div className="conversationLoggedSpaceWrapper" />
      )}
      <div className={classnames.wrapperConversationLine}>
        <p
          id={`conversationUserName${conversationData[index].id}`}
          className={`${classnames.username} fontSizeSmall`}
        >
          {conversationData[index].username}
        </p>
        {isPicture(index) && (
          <div className={classnames.wrapperPicture}>
            {renderConversationPicture(index, classnames.picture)}
          </div>
        )}
        {conversationData[index].message ? (
          <>
            {renderConversationCaptionContent(conversationData[index].message, classnames, index, userType)}
          </>
        ) : (
          <>
            {renderConversationCaptionContent(conversationData[index].comment, classnames, index, userType)}
          </>
        )}
      </div>
    </div>
  );

  const renderConversations = () => (
    conversationData.map((conversationText, index) => (
      <div key={conversationText.id}>
        {renderDate(index)}
        {conversationText.username === username ? (
          renderConversationLineContent(index, classnamesDisplay('Logged'), 'Logged')
        ) : (
          renderConversationLineContent(index, classnamesDisplay('Other'), 'Other')
        )}
      </div>
    ))
  );

  const renderConversationError = () => (
    <div className="conversationLoaderWrapper">
      <p className="conversationErrorText">{CONVERSATION_LOAD_ERROR}</p>
    </div>
  );

  const displayFromStatus = () => {
    switch (conversationDataStatus) {
    case LOADING:
      return renderLoader();
    case SUCCESS:
      return renderConversations();
    case FAIL:
      return renderConversationError();
    default:
      return null;
    }
  };

  const closeTurnaround = () => {
    handleCloseTurnaround(turnaround);
  };

  return (
    <div className="taskWrapper">
      <TaskHeader
        backViewFunction={closeConversation}
        closeTurnaroundFunction={closeTurnaround}
        componentSize={componentSize}
        turnaroundId={turnaround.id}
        turnaroundFlights={extractFlightsInformationFromTurnaround(turnaround)}
      />
      <div
        className="conversationContentWrapper"
        onDragOver={handleImageFileDragOver}
        onDrop={handleImageFileDrop}
        onDragLeave={handleImageFileDragLeave}
        onDragEnd={handleImageFileDragLeave}
      >
        <div
          id={`scrollContainer${turnaround.id}`}
          className={conversationContentClassName}
          ref={conversationContentTextDynamicHeight}
        >
          {displayFromStatus()}
          <ImagePreview
            currentImagePreviewAlt={currentImagePreviewAlt}
            currentImagePreviewSrc={currentImagePreviewSrc}
            displayClosePreview={displayClosePreview}
            imagePreviewDynamicPosition={imagePreviewDynamicPosition}
            removeCurrentImage={removeCurrentImage}
            setDisplayClosePreview={setDisplayClosePreview}
          />
          <p
            className="imageUploadErrorMessageClassname"
            ref={imageUploadErrorMessageDynamicPosition}
          >
            {imageUploadErrorMessage}
          </p>
        </div>
        <form
          className="conversationInputWrapper"
          onSubmit={sendConversation}
          ref={conversationInputWrapperTextDynamicHeight}
        >
          <ImageOutlinedIcon
            className="openFileBrowserToSelectPictureFileButton"
            onClick={handleFileSelectingInFileExplorer}
          />
          <input
            type="file"
            ref={inputPictureFileRaw}
            onChange={loadPictureFileFromFolder}
            accept={ACCEPTED_FILE_EXTENSIONS}
            style={{ display: HIDE }}
          />
          <textarea
            className="fontSizeDefault conversationInput"
            placeholder={whichPlaceHolderPut()}
            name="conversationInput"
            autoComplete="off"
            value={conversationInputValue.comment}
            onChange={(event) =>
              setConversationInputValue(
                {
                  picture: conversationInputValue.picture,
                  comment: event.target.value,
                },
              )}
            onPaste={handleImageFilePaste}
            id={`commentTextArea${turnaround.id}`}
            ref={conversationInputTextDynamicHeight}
          />
          <button type="submit" disabled={isButtonDisabledOrInputEmpty()} className="conversationSendButton">
            <ArrowUpwardIcon
              className="conversationSendArrow"
            />
          </button>
        </form>
      </div>
      {isPictureModalOpen && (
        <ConversationPicture
          picture={conversationPicture}
          pictureIndex={pictureIndex}
          pictureResponseErrorStatusCode={conversationPictureErrorStatusCode}
          pictureRequestStatus={conversationPictureStatus}
          showModal={showModal}
        />
      )}
      {isDeleteConversationModalOpen && (
        <DeleteConversationModal
          conversationType="comment"
          deleteConversation={deleteConversation}
          responseStatus={deleteConversationResponseStatus}
          showModal={showDeleteConversationModal}
          conversation={conversationDataToDelete}
        />
      )}
    </div>
  );
}
