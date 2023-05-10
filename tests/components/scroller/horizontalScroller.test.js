/**
 * @jest-environment jsdom
*/

import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import HorizontalScroller from 'src/components/scroller/horizontalScroller';

const mockLeftOnClick = () => {};

const spyMockLeftOnClick = jest.fn(mockLeftOnClick);

const mockRightOnClick = () => {};

const spyMockRightOnClick = jest.fn(mockRightOnClick);

describe('HorizontalScroller', () => {
  describe('Testing left button parameters', () => {
    it('should display left button when hasLeftButton is true', () => {
      render(
        <HorizontalScroller
          hasLeftButton
        />
      );

      const leftButton = document.querySelector('.horizontalScrollButtonLeft');
      expect(leftButton).not.toBeNull();
    });

    it('should not display left button when hasLeftButton is false', () => {
      render(
        <HorizontalScroller
          id={'testingId'}
        />
      );

      const leftButton = document.querySelector('#testingIdLeft');
      expect(leftButton).toBeNull();
    });

    it('should call leftButtonClick function when clicking on left button', () => {
      render(
        <HorizontalScroller
          id={'testingId'}
          hasLeftButton
          leftButtonClick={spyMockLeftOnClick}
        />
      );

      const leftButton = document.querySelector('#testingIdLeft');
      fireEvent.click(leftButton);

      expect(spyMockLeftOnClick).toHaveBeenCalled();

      spyMockLeftOnClick.mockClear();
    });

    it('should disable left button when leftButtonDisabled is true', () => {
      render(
        <HorizontalScroller
          id={'testingId'}
          hasLeftButton
          leftButtonDisabled
        />
      );

      const leftButtonDisabled = document.querySelector('#testingIdLeft');
      expect(leftButtonDisabled).toHaveAttribute('aria-disabled');
    });
  });

  describe('Testing right button parameters', () => {
    it('should display right button when hasRightButton is true', () => {
      render(
        <HorizontalScroller
          id={'testingId'}
          hasRightButton
        />
      );

      const rightButton = document.querySelector('#testingIdRight');
      expect(rightButton).not.toBeNull();
    });

    it('should not display right button when hasRightButton is false', () => {
      render(
        <HorizontalScroller
          id={'testingId'}
        />
      );

      const rightButton = document.querySelector('#testingIdRight');
      expect(rightButton).toBeNull();
    });

    it('should call rightButtonClick function when clicking on right button', () => {
      render(
        <HorizontalScroller
          id={'testingId'}
          hasRightButton
          rightButtonClick={spyMockRightOnClick}
        />
      );

      const rightButton = document.querySelector('#testingIdRight');
      fireEvent.click(rightButton);

      expect(spyMockRightOnClick).toHaveBeenCalled();

      spyMockRightOnClick.mockClear();
    });

    it('should disable right button when rightButtonDisabled is true', () => {
      render(
        <HorizontalScroller
          id={'testingId'}
          hasRightButton
          rightButtonDisabled
        />
      );

      const rightButtonDisabled = document.querySelector('#testingIdRight');
      expect(rightButtonDisabled).toHaveAttribute('aria-disabled');
    });
  });
});
