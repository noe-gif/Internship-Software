/**
 * @jest-environment jsdom
*/

import React from 'react';
import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'

import '@testing-library/jest-dom';

import Turnarounds from 'src/components/turnaround/turnarounds';
import turnaroundsHook from 'src/hooks/turnaround/turnaroundsScrollerHook';

import {
  IN_PROGRESS,
} from 'src/types/FlightStatus';

const uniqueDatePicked = [new Date('Sat Dec 25 2021 13:21:03')];
const multiDatePicked = [new Date('Sat Dec 25 2021 13:21:03'), new Date('Sun Dec 26 2021 13:21:03')];
const turnarounds = [{ id: 12345, status: { category: IN_PROGRESS } }];

const selectedTurnaroundDate = uniqueDatePicked[0];

const multiTurnaroundsPerDate = [
  {
    date: new Date('Sat Dec 25 2021 13:21:03'),
    turnarounds: turnarounds,
  },
  {
    date: new Date('Sun Dec 26 2021 13:21:03'),
    turnarounds: turnarounds,
  },
];

const turnaroundsData = {
  datePicked: multiDatePicked,
  turnaroundCategoriesPerDate: multiTurnaroundsPerDate,
};

const contentClass = '';

jest.mock('src/containers/turnaround/turnaroundCategoryContainer',
  () => (params) => <p>Mocking TurnaroundCategory Component {params.title}</p>
);

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('TURNAROUNDS DATES HOOK', () => {
  describe('Testing isButtonDisabled function', () => {
    it('should return false when next date is invalidDate', () => {
      const { result } = renderHook(() => turnaroundsHook(false, selectedTurnaroundDate, ['', 'NaN'], true));

      expect(result.current.isButtonDisabled(false, 1)).toBeFalsy();
    });

    it('should return false when next date is invalidDate in detailsView', () => {
      const { result } = renderHook(() => turnaroundsHook(true, 'NaN', selectedTurnaroundDate, true));

      expect(result.current.isButtonDisabled(false, 1)).toBeFalsy();
    });

    it('should return false when previous date is invalidDate', () => {
      const { result } = renderHook(() => turnaroundsHook(false, selectedTurnaroundDate, ['Nan', ''], true));

      expect(result.current.isButtonDisabled(true, 0)).toBeFalsy();
    });

    it('should return false when next date is invalidDate in detailsView', () => {
      const { result } = renderHook(() => turnaroundsHook(true, 'NaN', [], true));

      expect(result.current.isButtonDisabled(true, 0)).toBeFalsy();
    });

    it('should return true when previous date is render on screen', () => {
      const { result } = renderHook(() => turnaroundsHook(
        true,
        'Sun Dec 26 2021 13:00:00',
        [new Date('Sat Dec 25 2021 13:00:00'), new Date('Sun Dec 26 2021 13:00:00')],
        true,
      ));

      expect(result.current.isButtonDisabled(true, 0)).toBeTruthy();
    });

    it('should return true when next date is render on screen', () => {
      const { result } = renderHook(() => turnaroundsHook(
        true,
        'Sun Dec 25 2021 13:00:00',
        [new Date('Sat Dec 25 2021 13:00:00'), new Date('Sun Dec 26 2021 13:00:00')],
        true,
      ));

      expect(result.current.isButtonDisabled(false, 1)).toBeTruthy();
    });

    it('should return false when there is no turnaround displayed', () => {
      const { result } = renderHook(() => turnaroundsHook(
        true,
        'Sun Dec 25 2021 13:00:00',
        [new Date('Sat Dec 25 2021 13:00:00'), new Date('Sun Dec 26 2021 13:00:00')],
        false,
      ));

      expect(result.current.isButtonDisabled(false, 1)).toBeFalsy();
    });
  });

  describe('Testing scrollToElement function', () => {
    it('should call scrollIntoView when previous element exist', () => {
      render(
        <Turnarounds
          contentClass={contentClass}
          datePicked={multiDatePicked}
          isInDetailsView={false}
          selectedTurnaroundDate={multiDatePicked[0]}
          turnaroundCategoriesPerDate={multiTurnaroundsPerDate}
          turnarounds={turnarounds}
        />
      );

      const { result } = renderHook(() => turnaroundsHook(
        true,
        'Sun Dec 26 2021 13:21:03',
        selectedTurnaroundDate,
      ));

      act(() => { result.current.scrollToElement(true, 0); });

      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
      window.HTMLElement.prototype.scrollIntoView.mockClear();
    });

    it('should not call scrollIntoView when previous element does not exist', () => {
      render(
        <Turnarounds
          contentClass={contentClass}
          datePicked={multiDatePicked}
          isInDetailsView={false}
          selectedTurnaroundDate={multiDatePicked[0]}
          turnaroundCategoriesPerDate={multiTurnaroundsPerDate}
          turnarounds={turnarounds}
        />
      );

      const { result } = renderHook(() => turnaroundsHook(
        true,
        'Sun Dec 25 2021 13:21:03',
        selectedTurnaroundDate,
      ));

      act(() => { result.current.scrollToElement(true, 0); });

      expect(window.HTMLElement.prototype.scrollIntoView).not.toHaveBeenCalled();
      window.HTMLElement.prototype.scrollIntoView.mockClear();
    });

    it('should call scrollIntoView when next element exist', () => {
      render(
        <Turnarounds
          contentClass={contentClass}
          datePicked={multiDatePicked}
          isInDetailsView={false}
          selectedTurnaroundDate={multiDatePicked[0]}
          turnaroundCategoriesPerDate={multiTurnaroundsPerDate}
          turnarounds={turnarounds}
        />
      );

      const { result } = renderHook(() => turnaroundsHook(
        true,
        'Sun Dec 25 2021 13:21:03',
        selectedTurnaroundDate,
      ));

      act(() => { result.current.scrollToElement(false, 1); });

      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
      window.HTMLElement.prototype.scrollIntoView.mockClear();
    });

    it('should not call scrollIntoView when next element does not exist', () => {
      render(
        <Turnarounds
          contentClass={contentClass}
          datePicked={multiDatePicked}
          isInDetailsView={false}
          selectedTurnaroundDate={multiDatePicked[0]}
          turnaroundCategoriesPerDate={multiTurnaroundsPerDate}
          turnarounds={turnarounds}
        />
      );

      const { result } = renderHook(() => turnaroundsHook(
        true,
        'Sun Dec 26 2021 13:21:03',
        selectedTurnaroundDate,
      ));

      act(() => { result.current.scrollToElement(false, 1); });

      expect(window.HTMLElement.prototype.scrollIntoView).not.toHaveBeenCalled();
      window.HTMLElement.prototype.scrollIntoView.mockClear();
    });
  });
});
