import React from 'react';

import DisplayCloseTurnaroundIcon from 'src/components/header/displayCloseTurnaroundIcon';
import FlightHeader from 'src/components/header/flightHeader';
import IconImage from 'src/components/fragment/iconImage';

import taskHeaderHook from 'src/hooks/task/taskHeaderHook';

import { BACK_ICON, CLOSE_ICON } from 'src/constants/picturePath';
import TASK_TEXT from 'src/constants/header/headerText.json';

import 'src/styles/TaskHeader.css';

export default function TaskHeader(props) {
  const {
    backViewFunction,
    closeTurnaroundFunction,
    componentSize,
    turnaroundId,
    turnaroundFlights,
  } = props;

  const { isComponentSizeSmall } = taskHeaderHook(componentSize);

  const displayCloseViewIcon = (img, className, alt) => (
    <div
      onClick={() => backViewFunction()}
      role="button"
      aria-hidden="true"
    >
      <IconImage
        iconInfos={{ source: img, alt, className: `${className}-${componentSize}` }}
        isIconRender
      />
    </div>
  );

  return (
    <div className={`taskHeaderWrapper-${componentSize}`}>
      <div className={`taskHeaderTop-${componentSize}`}>
        <div className={`taskHeaderQuitWrapper-${componentSize}`}>
          {isComponentSizeSmall() && displayCloseViewIcon(BACK_ICON, 'taskHeaderBack', TASK_TEXT.alt.back_icon)}
        </div>
        <FlightHeader
          componentSize={componentSize}
          turnaroundFlights={turnaroundFlights}
          turnaroundId={turnaroundId}
        />
        <div className={`taskHeaderQuitWrapper-${componentSize}`}>
          {isComponentSizeSmall()
            ? (
              <DisplayCloseTurnaroundIcon
                altLabel={TASK_TEXT.alt.close_icon}
                className="taskHeaderQuit"
                closeTurnaroundFunction={closeTurnaroundFunction}
                componentSize={componentSize}
                turnaroundId={{ id: turnaroundId }}
              />
            ) : displayCloseViewIcon(CLOSE_ICON, 'taskHeaderQuit', TASK_TEXT.alt.close_icon)}
        </div>
      </div>
    </div>
  );
}
