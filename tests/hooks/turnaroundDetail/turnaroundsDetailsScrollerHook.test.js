/**
 * @jest-environment jsdom
*/

import React from 'react';
import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'

import '@testing-library/jest-dom';

import TurnaroundsDetails from 'src/components/turnaroundDetail/turnaroundsDetails';
import turnaroundsDetailsScrollerHook from 'src/hooks/turnaroundDetail/turnaroundsDetailsScrollerHook';

const closeDetailView = () => {};

const selectedTurnaroundDetail = [];
const selectedTurnaroundsWithMultipleTurnaroundsDetails = [
  { id: 12345 },
  { id: 45678 },
  { id: 78901 }
];

const selectedTurnaroundIds = [12345, 45678, 78901];

window.HTMLElement.prototype.scrollIntoView = jest.fn();

jest.mock('src/containers/turnaroundDetail/turnaroundDetailDisplayerContainer',
  () => (params) => <p id={`turnaroundDetails${params.turnaround.id}`} >Mocking TurnaroundDetail Component</p>
);

describe('TURNAROUNDS DETAILS SCROLLER HOOK', () => {
  describe('Testing scrollToNextElement function', () => {
    it('should call scrollIntoView when next element exist', () => {
      render(
        <TurnaroundsDetails
          closeDetailView={closeDetailView}
          selectedTurnaroundDetail={selectedTurnaroundDetail}
          selectedTurnarounds={selectedTurnaroundsWithMultipleTurnaroundsDetails}
        />
      );

      const { result } = renderHook(() => turnaroundsDetailsScrollerHook(
        selectedTurnaroundIds,
      ));

      act(() => { result.current.scrollToNextElement(); });

      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
      window.HTMLElement.prototype.scrollIntoView.mockClear();
    });

    it('should not call scrollIntoView when next element does not exist', () => {
      render(
        <TurnaroundsDetails
          closeDetailView={closeDetailView}
          selectedTurnaroundDetail={selectedTurnaroundDetail}
          selectedTurnarounds={[]}
        />
      );

      const { result } = renderHook(() => turnaroundsDetailsScrollerHook(
        [],
      ));

      act(() => { result.current.scrollToNextElement(); });

      expect(window.HTMLElement.prototype.scrollIntoView).not.toHaveBeenCalled();
      window.HTMLElement.prototype.scrollIntoView.mockClear();
    });
  });

  describe('Testing scrollToPreviousElement function', () => {
    it('should call scrollIntoView when previous element exist', () => {
      render(
        <TurnaroundsDetails
          closeDetailView={closeDetailView}
          selectedTurnaroundDetail={selectedTurnaroundDetail}
          selectedTurnarounds={selectedTurnaroundsWithMultipleTurnaroundsDetails}
        />
      );

      const { result } = renderHook(() => turnaroundsDetailsScrollerHook(
        selectedTurnaroundIds,
      ));

      act(() => { result.current.setMinimumIndexInScreen(1) });

      act(() => { result.current.scrollToPreviousElement(); });

      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
      window.HTMLElement.prototype.scrollIntoView.mockClear();
    });

    it('should not call scrollIntoView when previous element does not exist', () => {
      render(
        <TurnaroundsDetails
          closeDetailView={closeDetailView}
          selectedTurnaroundDetail={selectedTurnaroundDetail}
          selectedTurnarounds={[]}
        />
      );

      const { result } = renderHook(() => turnaroundsDetailsScrollerHook(
        [],
      ));

      act(() => { result.current.scrollToPreviousElement(); });

      expect(window.HTMLElement.prototype.scrollIntoView).not.toHaveBeenCalled();
      window.HTMLElement.prototype.scrollIntoView.mockClear();
    });
  });

  describe('Testing isNextScrollDisabled function', () => {
    it('should return false when next element exist', () => {
      render(
        <TurnaroundsDetails
          closeDetailView={closeDetailView}
          selectedTurnaroundDetail={selectedTurnaroundDetail}
          selectedTurnarounds={selectedTurnaroundsWithMultipleTurnaroundsDetails}
        />
      );

      const { result } = renderHook(() => turnaroundsDetailsScrollerHook(
        selectedTurnaroundIds,
      ));

      expect(result.current.isNextScrollDisabled()).toStrictEqual(false);
    });

    it('should return true when next element does not exist', () => {
      render(
        <TurnaroundsDetails
          closeDetailView={closeDetailView}
          selectedTurnaroundDetail={selectedTurnaroundDetail}
          selectedTurnarounds={[]}
        />
      );

      const { result } = renderHook(() => turnaroundsDetailsScrollerHook(
        [],
      ));

      expect(result.current.isNextScrollDisabled()).toStrictEqual(true);
    });
  });

  describe('Testing isPreviousScrollDisabled function', () => {
    it('should return false when previous element exist', () => {
      render(
        <TurnaroundsDetails
          closeDetailView={closeDetailView}
          selectedTurnaroundDetail={selectedTurnaroundDetail}
          selectedTurnarounds={selectedTurnaroundsWithMultipleTurnaroundsDetails}
        />
      );

      const { result } = renderHook(() => turnaroundsDetailsScrollerHook(
        selectedTurnaroundIds,
      ));

      act(() => { result.current.setMinimumIndexInScreen(1) });

      expect(result.current.isPreviousScrollDisabled()).toStrictEqual(false);
    });

    it('should return true when previous element does not exist', () => {
      render(
        <TurnaroundsDetails
          closeDetailView={closeDetailView}
          selectedTurnaroundDetail={selectedTurnaroundDetail}
          selectedTurnarounds={[]}
        />
      );

      const { result } = renderHook(() => turnaroundsDetailsScrollerHook(
        [],
      ));

      expect(result.current.isPreviousScrollDisabled()).toStrictEqual(true);
    });
  });
});
