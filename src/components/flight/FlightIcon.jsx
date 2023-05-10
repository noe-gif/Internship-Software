import React from 'react';
import { Box, CardMedia } from '@mui/material';

import { ICON_IMAGE_PATH, TARMAC_STATIC_URL } from 'src/utils/urlAPIs';

const TAKEOFF_PLANE_ICON = `${TARMAC_STATIC_URL}${ICON_IMAGE_PATH}TAKEOFF_PLANE_ICON`;

export default function FlightIcon(props) {
  const {
    departureIcon,
    classes,
    marginBottomIcon,
    iconSize,
  } = props;

  return (
    <Box className={classes.flightIcon} style={{ marginBottom: marginBottomIcon }}>
      <CardMedia
        component="img"
        alt="icon_takeoff"
        className={classes.icons}
        style={{ height: iconSize, width: iconSize }}
        image={`${TAKEOFF_PLANE_ICON}${departureIcon}.png`}
      />
    </Box>
  );
}
