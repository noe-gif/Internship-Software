import React from 'react';

import IconImage from 'src/components/fragment/iconImage';

import { BACK_ICON } from 'src/constants/picturePath';

import 'src/styles/HorizontalScroller.css';

export default function HorizontalScroller(props) {
  const {
    hasLeftButton,
    hasRightButton,
    id,
    leftButtonClick,
    leftButtonDisabled,
    rightButtonClick,
    rightButtonDisabled,
  } = props;

  const renderLeftButton = () => (
    <div
      id={`${id}Left`}
      className="horizontalScrollButtonLeft"
      onClick={leftButtonClick}
      aria-hidden="true"
      aria-disabled={leftButtonDisabled}
    >
      <IconImage
        iconInfos={{
          source: BACK_ICON,
          alt: 'Horizontal scroll back icon',
          className: 'horizontalScrollBackButtonImage',
        }}
        isIconRender
      />
    </div>
  );

  const renderRightButton = () => (
    <div
      id={`${id}Right`}
      className="horizontalScrollButtonRight"
      onClick={rightButtonClick}
      aria-hidden="true"
      aria-disabled={rightButtonDisabled}
    >
      <IconImage
        iconInfos={{
          source: BACK_ICON,
          alt: 'Horizontal scroll next icon',
          className: 'horizontalScrollNextButtonImage',
        }}
        isIconRender
      />
    </div>
  );

  return (
    <>
      <div className="HorizontalScrollerWrapper">
        {hasLeftButton && renderLeftButton()}
        {hasRightButton && renderRightButton()}
      </div>
    </>
  );
}
