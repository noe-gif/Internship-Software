/**
 * @jest-environment jsdom
*/

import React from 'react';
import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'

import '@testing-library/jest-dom';

import turnaroundHook from 'src/hooks/turnaround/turnaroundHook';

const date = null;
const selectedTurnaroundsEmpty = [];
const selectedTurnaroundsWithTurnaround = [
  { id: 12345 },
  { id: 56789 },
];
const turnaround = { id: 12345 };

const getTurnaroundDetailsRequest = () => {};
const spyGetTurnaroundDetailsRequest = jest.fn(getTurnaroundDetailsRequest);

const closeDetailView = () => {};
const spyCloseDetailView = jest.fn(closeDetailView);

const fakeEvent = { preventDefault: () => {} };

describe('TurnaroundHook', () => {
  describe('handleTurnaroundSelection function', () => {
    it('should add turnaround in selectedTurnarounds when turnaround has not been selected', () => {
      const { result } = renderHook(() => turnaroundHook({
        closeDetailView,
        date,
        selectedTurnarounds: selectedTurnaroundsEmpty,
        turnaround,
        getTurnaroundDetailsRequest: spyGetTurnaroundDetailsRequest,
      }));

      act(() => { result.current.handleTurnaroundSelection(fakeEvent) });

      expect(spyGetTurnaroundDetailsRequest).toHaveBeenCalledWith({
        selectedTurnarounds: [turnaround],
        date,
      });

      spyGetTurnaroundDetailsRequest.mockClear();
    });
    it('should close selected detail view when turnaround is already selected', () => {
      const { result } = renderHook(() => turnaroundHook({
        closeDetailView: spyCloseDetailView,
        date,
        selectedTurnarounds: selectedTurnaroundsWithTurnaround,
        turnaround,
        getTurnaroundDetailsRequest,
      }));

      act(() => { result.current.handleTurnaroundSelection(fakeEvent) });

      expect(spyCloseDetailView).toHaveBeenCalledWith([{ id: 56789 }]);

      spyCloseDetailView.mockClear();
    });
  });
});
