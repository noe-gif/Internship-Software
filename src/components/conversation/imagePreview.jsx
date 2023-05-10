import React from 'react';

import CloseIcon from '@mui/icons-material/Close';

import {
  DISPLAY,
  HIDE,
  HIDE_PREVIEW_CLASSNAME,
  IMAGE_PREVIEW_CLASSNAME,
} from 'src/constants/conversation/conversation';

import 'src/styles/Conversation.css';

export default function ImagePreview(props) {
  const {
    currentImagePreviewAlt,
    currentImagePreviewSrc,
    displayClosePreview,
    imagePreviewDynamicPosition,
    removeCurrentImage,
    setDisplayClosePreview,
  } = props;

  return (
    <div
      className="currentImagePreviewWrapper"
      onMouseEnter={() => setDisplayClosePreview(currentImagePreviewSrc)}
      onMouseLeave={() => setDisplayClosePreview(false)}
      ref={imagePreviewDynamicPosition}
    >
      <div
        className={!currentImagePreviewSrc ? HIDE_PREVIEW_CLASSNAME : IMAGE_PREVIEW_CLASSNAME}
        onClick={removeCurrentImage}
        onKeyDown={removeCurrentImage}
        role="button"
        tabIndex={0}
        style={{ display: displayClosePreview ? DISPLAY : HIDE }}
      >
        <CloseIcon
          className="closeImagePreviewIcon"
        />
      </div>
      {currentImagePreviewSrc
        ? (
          <img
            src={currentImagePreviewSrc}
            alt={currentImagePreviewAlt}
            className="currentImagePreview"
            style={{ visibility: DISPLAY }}
          />
        )
        : (
          <></>
        )}
    </div>
  );
}
