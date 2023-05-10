import React from 'react';

import { CardMedia } from '@mui/material';

import { ICON_IMAGE_PATH, TARMAC_STATIC_URL } from 'src/utils/urlAPIs';

import { useStyles } from 'src/components/turnaround/styleTurnaround';

import { ICON_MEDIA_SIZE_LARGE, ICON_MEDIA_SIZE_SMALL } from 'src/constants/fragments/iconMediaParameters';

export default function IconMedia(props) {
  const {
    isSmall,
    iconToDisplay,
  } = props;

  const classes = useStyles();

  const warningIconSize = isSmall ? ICON_MEDIA_SIZE_SMALL : ICON_MEDIA_SIZE_LARGE;

  return (
    <CardMedia
      component="img"
      alt={`${iconToDisplay}_ICON`}
      className={classes.icons}
      style={{ height: warningIconSize, width: warningIconSize }}
      image={`${TARMAC_STATIC_URL}${ICON_IMAGE_PATH}${iconToDisplay}_ICON.png`}
    />
  );
}
