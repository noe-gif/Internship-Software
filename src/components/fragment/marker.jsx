import React from 'react';

import 'src/styles/Marker.css';

export default function Marker(props) {
  const {
    id,
    color,
    position,
    size,
    label,
    labelSize,
  } = props;

  const styleFromProps = {
    ...position,
    backgroundColor: color,
    width: `${size}vmax`,
    height: `${size}vmax`,
  };

  const textStyleFromProps = {
    fontSize: `${labelSize}vmax`,
  };

  return (
    <div style={styleFromProps} className="markerWrapper">
      <p
        id={id}
        className="markerLabel"
        style={textStyleFromProps}
      >
        {label}
      </p>
    </div>
  );
}
