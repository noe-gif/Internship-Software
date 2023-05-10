import React from 'react';

import IconImage from 'src/components/fragment/iconImage';

import { CLOSE_ICON } from 'src/constants/picturePath';

export default function displayCloseTurnaroundIcon(props) {
  const {
    altLabel,
    className,
    closeTurnaroundFunction,
    componentSize,
    turnaroundId,
  } = props;

  return (
    <div
      onClick={() => closeTurnaroundFunction(turnaroundId)}
      role="button"
      aria-hidden="true"
    >
      <IconImage
        iconInfos={{ source: CLOSE_ICON, alt: altLabel, className: `${className}-${componentSize}` }}
        isIconRender
      />
    </div>
  );
}
