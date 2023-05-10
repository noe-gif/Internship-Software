import React from 'react';

import HOME_TEXT from 'src/constants/home/homeText.json';

export default function NoTurnaroundMessage() {
  return (
    <div className="homeCenteredElements">
      <p className="fontSizeDefault fontColorDefault">
        {HOME_TEXT.messages.turnaround}
      </p>
    </div>
  );
}
