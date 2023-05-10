/**
 * @jest-environment jsdom
*/

import React from "react";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import TurnaroundsDetailsScroller from 'src/components/turnaroundDetail/turnaroundsDetailsScroller';

describe('TurnaroundsDetailsScroller', () => {
  it('should display complete scroller when hadTurnaroundsDetails is true', () => {
    render(
      <TurnaroundsDetailsScroller
        elementsToScrollOver={['not empty']}
        hasTurnaroundsDetails
      />
    );

    const leftButton = document.querySelector('#turnaroundsDetailsScrollerLeft');
    const rightButton = document.querySelector('#turnaroundsDetailsScrollerRight');

    expect(leftButton).toHaveAttribute('aria-disabled');
    expect(rightButton).toHaveAttribute('aria-disabled');
  });

  it('should not display scroller when hadTurnaroundsDetails is false', () => {
    render(
      <TurnaroundsDetailsScroller
        elementsToScrollOver={[]}
        hasTurnaroundsDetails={false}
      />
    );

    const leftButton = document.querySelector('#turnaroundsDetailsScrollerLeft');
    const rightButton = document.querySelector('#turnaroundsDetailsScrollerRight');

    expect(leftButton).toBeNull();
    expect(rightButton).toBeNull();
  });
});
