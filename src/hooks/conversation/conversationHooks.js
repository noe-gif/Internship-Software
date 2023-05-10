import { useRef, useState } from 'react';

import { convertPxToVmax } from 'src/utils/logic/style/cssUnityCalculation';
import provideFormattedDateTiming from 'src/utils/logic/date/provideDateTiming';
import {
  convertImageToBase64,
  removeAlphaFromPicture,
} from 'src/utils/logic/conversation/imageConvertion';
import { bytesToMegaBytes } from 'src/utils/logic/conversation/dataUnitConvertion';

import {
  CONVERSATION_DECODE_FORMAT,
  CURRENT_UPLOAD,
  DISPLAY,
  EMPTY_CONVERSATION_INPUT_VALUE,
  EMPTY_CONVERSATION_TIMING,
  EMPTY_MESSAGE_BODY_OBJECT,
  FILE_EXTENSION_STRING_END,
  FILE_EXTENSION_STRING_START,
  HIDE,
  VALID_IMAGE_TYPE,
  MAX_IMAGE_FILE_SIZE,
  META_DATA_START_CHARACTER,
  NOT_IMAGE_TYPE,
  SIZE_ERROR_MESSAGE,
  TYPE_ERROR_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
} from 'src/constants/conversation/conversation';

import CONVERSATION_TEXT from 'src/constants/conversation/conversationText.json';
import useTimezoneFilter from 'src/hooks/filter/useTimezoneFilter';

export default function conversationHooks(
  conversationType,
  handleSend,
  conversationData,
  getConversationPicture,
  isDisabled,
  resetConversationResponseStatus,
) {
  const { state: { selectedTimezone } } = useTimezoneFilter();
  const conversationContentTextDynamicHeight = useRef(null);
  const conversationInputTextDynamicHeight = useRef(null);
  const conversationInputWrapperTextDynamicHeight = useRef(null);
  const inputPictureFileRaw = useRef(null);
  const imagePreviewDynamicPosition = useRef(null);
  const imageUploadErrorMessageDynamicPosition = useRef(null);
  const [conversationInputValue, setConversationInputValue] = useState(EMPTY_MESSAGE_BODY_OBJECT);
  const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);
  const [isDeleteConversationModalOpen, setIsDeleteConversationModalOpen] = useState(false);
  const [pictureIndex, setPictureIndex] = useState(0);
  const [conversationDataToDelete, setConversationDataToDelete] = useState(null);
  const [conversationContentClassName, setConversationContentClassName] = useState('conversationContent');
  const [displayClosePreview, setDisplayClosePreview] = useState(false);
  const [{ currentImagePreviewAlt, currentImagePreviewSrc }, setCurrentImagePreview] = useState({
    src: '',
    alt: 'Upload an image',
  });
  const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState('');

  const sendConversation = (event) => {
    setCurrentImagePreview({});
    handleSend(event, conversationInputValue);
    setConversationInputValue(EMPTY_MESSAGE_BODY_OBJECT);
  };

  const isConversationInputValueEmpty = () => (
    conversationInputValue.comment === EMPTY_CONVERSATION_INPUT_VALUE
    && conversationInputValue.picture === EMPTY_CONVERSATION_INPUT_VALUE
  );
  const isButtonDisabledOrInputEmpty = () => (isConversationInputValueEmpty() || isDisabled);

  const classnamesDisplay = (user) => {
    const classNamePrefix = `conversation${user}User`;

    return {
      wrapperConversationLine: `${classNamePrefix}Wrapper`,
      username: `${classNamePrefix}Username`,
      wrapperPicture: `${classNamePrefix}ImgWrapper`,
      picture: `${classNamePrefix}Img`,
      wrapperConversation: `${classNamePrefix}TextWrapper`,
      conversation: `${classNamePrefix}Text`,
      conversationContent: `${classNamePrefix}Content`,
    };
  };

  const whichPlaceHolderPut = () => (
    (conversationType === CONVERSATION_TEXT.conversation.conversationTypeMessage
      ? CONVERSATION_TEXT.conversation.inputMessagePlaceholder
      : CONVERSATION_TEXT.conversation.inputCommentPlaceholder)
  );

  const isNotSameDate = (index) => (
    (conversationData[index - 1]
      && (provideFormattedDateTiming(conversationData[index - 1].date, EMPTY_CONVERSATION_TIMING, selectedTimezone)
        !== provideFormattedDateTiming(conversationData[index].date, EMPTY_CONVERSATION_TIMING, selectedTimezone))
    )
  );

  const isPicture = (index) => (
    (conversationData[index].picture && conversationData[index].picture !== null)
  );

  const showModal = (index) => {
    setIsPictureModalOpen(!isPictureModalOpen);
    setPictureIndex(index);
  };

  const showDeleteConversationModal = (conversationToDelete) => {
    setIsDeleteConversationModalOpen(!isDeleteConversationModalOpen);
    setConversationDataToDelete(conversationToDelete);
    resetConversationResponseStatus();
  };

  const decodePictureFormat = (index) => (`${CONVERSATION_DECODE_FORMAT}${conversationData[index].picture}`);

  const isUserTypeLogged = (userType) => (
    userType === 'Logged'
  );

  const handleDataForModalPictureOpening = (index) => {
    showModal(index);
    getConversationPicture(conversationData[index].id);
  };

  const getScrollDynamicHeight = (scrollHeight) => { //eslint-disable-line
    const conversationContentHeight = 95.5;

    return `calc(${conversationContentHeight}% - ${scrollHeight}vmax)`;
  };

  const resizeConversationContentBasedOnConversationInputHeight = () => {
    const conversationInputWrapperPadding = 2;

    if (conversationInputTextDynamicHeight && conversationInputTextDynamicHeight.current) {
      conversationInputTextDynamicHeight.current.style.height = '0.2vmax';

      const scrollHeight = convertPxToVmax(conversationInputTextDynamicHeight.current.scrollHeight, 18.2);

      imageUploadErrorMessageDynamicPosition.current.style.marginTop = `-${scrollHeight}vmax`;
      imagePreviewDynamicPosition.current.style.marginTop = `-${scrollHeight}vmax`;
      conversationInputWrapperTextDynamicHeight.current.style.height = `${
        scrollHeight + conversationInputWrapperPadding}vmax`;
      conversationInputTextDynamicHeight.current.style.height = `${scrollHeight}vmax`;
      conversationContentTextDynamicHeight.current.style.height = getScrollDynamicHeight(scrollHeight);
    }
  };

  const handleFileSelectingInFileExplorer = () => {
    inputPictureFileRaw.current.click();
  };

  const createImagePreviewObject = (selectedInputFileRaw) => (
    {
      currentImagePreviewSrc: URL.createObjectURL(selectedInputFileRaw),
      currentImagePreviewAlt: selectedInputFileRaw.name,
    }
  );

  const uploadRawFileInBase64WithoutMetaData = (rawFileInBase64WithoutMetaData, selectedInputFileRaw) => {
    setConversationInputValue({ picture: rawFileInBase64WithoutMetaData, comment: conversationInputValue.comment });
    setCurrentImagePreview(createImagePreviewObject(selectedInputFileRaw));
    setImageUploadErrorMessage('');
  };

  const displayPictureFileInBase64Preview = () => {
    resizeConversationContentBasedOnConversationInputHeight();
    imagePreviewDynamicPosition.current.style.display = DISPLAY;
  };

  const uploadPictureInBase64 = async (selectedInputPictureRaw) => {
    try {
      const rawPictureWithoutAlpha = removeAlphaFromPicture(selectedInputPictureRaw);
      const rawPictureInBase64 = await convertImageToBase64(rawPictureWithoutAlpha);
      const rawPictureInBase64WithoutMetaData = rawPictureInBase64.toString().slice(
        META_DATA_START_CHARACTER,
        rawPictureInBase64.length,
      );
      uploadRawFileInBase64WithoutMetaData(rawPictureInBase64WithoutMetaData, selectedInputPictureRaw);
      displayPictureFileInBase64Preview();
    } catch (error) {
      setImageUploadErrorMessage(UNKNOWN_ERROR_MESSAGE);
    }
  };

  const isFileTypeInvalid = (imageFile) => (
    imageFile[CURRENT_UPLOAD].type.slice(FILE_EXTENSION_STRING_START, FILE_EXTENSION_STRING_END) !== VALID_IMAGE_TYPE
  );

  const isImageFileSizeAboveTheMaximumAuthorized = (size) => (
    bytesToMegaBytes(size) >= MAX_IMAGE_FILE_SIZE
  );

  const loadPictureFileFromFolder = (event) => {
    const selectedInputFileRaw = event.target.files[CURRENT_UPLOAD];

    if (isImageFileSizeAboveTheMaximumAuthorized(selectedInputFileRaw?.size)) {
      setImageUploadErrorMessage(SIZE_ERROR_MESSAGE);
    } else {
      uploadPictureInBase64(selectedInputFileRaw);
    }
  };

  const handleImageFileDragOver = (event) => {
    setConversationContentClassName('conversationContentOnDrag');
    event.preventDefault();
    event.stopPropagation();
  };

  const handleImageFileDragLeave = () => {
    setConversationContentClassName('conversationContent');
  };

  const isThereAnErrorWithUploadedImageFile = (imageFile) => {
    if (isFileTypeInvalid(imageFile)) {
      setImageUploadErrorMessage(TYPE_ERROR_MESSAGE);
      return true;
    } else if (isImageFileSizeAboveTheMaximumAuthorized(imageFile[CURRENT_UPLOAD]?.size)) {
      setImageUploadErrorMessage(SIZE_ERROR_MESSAGE);
      return true;
    }
    return false;
  };

  const handleImageFileDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setConversationContentClassName('conversationContent');

    const imageFile = event.dataTransfer.files;
    if (imageFile && imageFile.length && !isThereAnErrorWithUploadedImageFile(imageFile)) {
      const selectedInputFileRaw = imageFile[CURRENT_UPLOAD];

      uploadPictureInBase64(selectedInputFileRaw);
    }
  };

  const isPastedContentAnImage = (pastedContent) => (
    pastedContent.type.indexOf(VALID_IMAGE_TYPE) !== NOT_IMAGE_TYPE
  );

  const getOnlyImagesFromClipboard = (clipboardItems) => {
    const clipboardItemsContent = [];

    const imagesFromClipboard = clipboardItemsContent.slice.call(clipboardItems).filter((pastedContent) => (
      isPastedContentAnImage(pastedContent)
    ));

    return (imagesFromClipboard);
  };

  const handleImageFilePaste = (event) => {
    const clipboardItems = event.clipboardData.items;
    const onlyImagesClipboardContent = getOnlyImagesFromClipboard(clipboardItems);

    if (onlyImagesClipboardContent.length !== 0) {
      const pastedImage = onlyImagesClipboardContent[CURRENT_UPLOAD];
      const pastedImageBlob = pastedImage.getAsFile();

      if (isImageFileSizeAboveTheMaximumAuthorized(pastedImageBlob?.size)) {
        setImageUploadErrorMessage(SIZE_ERROR_MESSAGE);
      } else {
        uploadPictureInBase64(pastedImageBlob);
      }
    }
  };

  const removeCurrentImage = () => {
    setConversationInputValue({
      picture: '',
      comment: conversationInputValue.comment,
    });
    setCurrentImagePreview({
      currentImagePreviewSrc: '',
      currentImagePreviewAlt: 'Upload an image',
    });
    imagePreviewDynamicPosition.current.style.display = HIDE;
  };

  return {
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
  };
}
