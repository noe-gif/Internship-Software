/**
 * @jest-environment jsdom
*/

import React from "react";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';

import TurnaroundsScroller from 'src/components/turnaround/turnaroundsScroller';

describe('TurnaroundsScroller', () => {
  it('should display complete scroller', () => {
    render(
      <TurnaroundsScroller
        elementsToScrollOver={['not empty']}
        hasTurnaround
      />
    );

    const leftButton = document.querySelector('.horizontalScrollButtonLeft');
    expect(leftButton).not.toBeNull();

    const rightButton = document.querySelector('.horizontalScrollButtonRight');
    expect(rightButton).not.toBeNull();
  });

  it('should not display scroller buttons when there is no turnaround display', () => {
    render(
      <TurnaroundsScroller
        elementsToScrollOver={[new Date()]}
        hasTurnaround={false}
      />
    );

    const leftButton = document.querySelector('.horizontalScrollButtonLeft');
    expect(leftButton).toBeNull();

    const rightButton = document.querySelector('.horizontalScrollButtonRight');
    expect(rightButton).toBeNull();
  });
});
