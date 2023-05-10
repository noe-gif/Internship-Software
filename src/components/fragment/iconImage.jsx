import React from 'react';

export default function IconImage(props) {
  const {
    iconInfos,
    isIconRender,
  } = props;

  return (
    isIconRender && (
      <img
        src={iconInfos.source}
        alt={iconInfos.alt}
        className={iconInfos.className}
      />
    )
  );
}
