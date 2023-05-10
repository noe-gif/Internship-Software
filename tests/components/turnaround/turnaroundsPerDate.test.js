/**
 * @jest-environment jsdom
*/

import React from "react";
import {getNodeText, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import TurnaroundsPerDate from 'src/components/turnaround/turnaroundsPerDate';

import TURNAROUNDS_PER_DATE_TEXT from 'src/constants/turnaround/turnaroundsPerDateText.json';

import {
  IN_PROGRESS,
} from 'src/types/FlightStatus';

const uniqueTurnaroundsPerDate = {
  date: new Date('Sat Dec 25 2021 13:21:03 GMT+0000 (Central European Standard Time)'),
  turnarounds: [{id: 12345, status: { category: IN_PROGRESS } }],
};

const multiTurnaroundsPerDate = [
  {
    date: new Date('Sat Dec 25 2021 13:21:03 GMT+0000 (Central European Standard Time)'),
    turnarounds: [{ id: 12345, status: { category: IN_PROGRESS } }],
  },
  {
    date: new Date('Sun Dec 26 2021 13:21:03 GMT+0000 (Central European Standard Time)'),
    turnarounds: [],
  },
];

jest.mock('src/containers/turnaround/turnaroundCategoryContainer',
  () => (params) => <p>Mocking TurnaroundCategory Component {params.title}</p>
);


describe('TurnaroundsPerDate', () => {
  describe('tests rendering constant html element in TurnaroundsPerDate', () => {
    it('should display date', () => {
      render(
        <TurnaroundsPerDate
          turnaroundCategoriesPerDate={[uniqueTurnaroundsPerDate]}
          turnaroundDateData={uniqueTurnaroundsPerDate}
        />
      );

      expect(screen.getByText('25 DECEMBER 2021 - SATURDAY')).toBeInTheDocument();
    });

    it('should display mocking element for turnaround categories', () => {
      render(
        <TurnaroundsPerDate
          turnaroundCategoriesPerDate={multiTurnaroundsPerDate}
          turnaroundDateData={uniqueTurnaroundsPerDate}
        />
      );

      expect(screen.getByText('Mocking TurnaroundCategory Component CANCELED')).toBeInTheDocument();
      expect(screen.getByText('Mocking TurnaroundCategory Component COMPLETED')).toBeInTheDocument();
      expect(screen.getByText('Mocking TurnaroundCategory Component INCOMING')).toBeInTheDocument();
      expect(screen.getByText('Mocking TurnaroundCategory Component IN PROGRESS')).toBeInTheDocument();
    });
  });

  describe('tests rendering empty date', () => {
    test('when turnaroundDateData turnarounds is empty', () => {
      render(
        <TurnaroundsPerDate
          turnaroundCategoriesPerDate={multiTurnaroundsPerDate}
          turnaroundDateData={{
            date: new Date('Sun Dec 26 2021 13:21:03 GMT+0000 (Central European Standard Time)'),
            turnarounds: [],
          }}
        />
      );

      expect(screen.getByText(TURNAROUNDS_PER_DATE_TEXT.no_flight)).toBeInTheDocument();
    });
  });
});
