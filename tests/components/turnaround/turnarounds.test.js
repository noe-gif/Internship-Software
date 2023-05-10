/**
 * @jest-environment jsdom
*/

import React from "react";
import {getNodeText, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import { dateRange } from 'src/utils/logic/date/dateRange';

import Turnarounds from 'src/components/turnaround/turnarounds';

import {
  IN_PROGRESS,
} from 'src/types/FlightStatus';

const uniqueTurnaroundsPerDate = {
  date: new Date('Sat Dec 25 2021 13:21:03 GMT+0000 (Central European Standard Time)'),
  turnarounds: [{ id: 12345, status: { category: IN_PROGRESS } }],
};

const multiTurnaroundsPerDate = [
  {
    date: new Date('Sat Dec 25 2021 13:21:03 GMT+0000 (Central European Standard Time)'),
    turnarounds: [{ id: 12345, status: { category: IN_PROGRESS } }],
  },
  {
    date: new Date('Sun Dec 26 2021 13:21:03 GMT+0000 (Central European Standard Time)'),
    turnarounds: [{ id: 12345, status: { category: IN_PROGRESS } }],
  },
];

const uniqueDatePicked = [new Date('Sat Dec 25 2021 13:21:03 GMT+0000 (Central European Standard Time)')];
const multiDatePicked = [
  new Date('Sat Dec 25 2021 13:21:03 GMT+0000 (Central European Standard Time)'),
  new Date('Sun Dec 26 2021 13:21:03 GMT+0000 (Central European Standard Time)')
];

const turnarounds = [{ id: 12345, status: { category: IN_PROGRESS } }];

const contentClass = '';

jest.mock('src/containers/turnaround/turnaroundCategoryContainer',
  () => (params) => <p>Mocking TurnaroundCategory Component {params.title}</p>
);

describe('Turnarounds', () => {
  it('should render one date title when a unique date is provide', () => {
    render(
      <Turnarounds
        contentClass={contentClass}
        datePicked={uniqueDatePicked}
        isInDetailsView={false}
        selectedTurnaroundDate={uniqueDatePicked[0]}
        turnaroundCategoriesPerDate={[uniqueTurnaroundsPerDate]}
        turnarounds={turnarounds}
      />
    );

    expect(screen.getByText('25 DECEMBER 2021 - SATURDAY')).toBeInTheDocument();
  });

  it('should render multi dates title when multiple dates are provide', () => {
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
  
    const numberOfDayBetweenTwoDates = dateRange(
      new Date('Sat Dec 25 2021 13:21:03 GMT+0000 (Central European Standard Time)'),
      new Date('Sun Dec 26 2021 13:21:03 GMT+0000 (Central European Standard Time)'),
    ).length;

    expect(getNodeText(document.querySelector("#title25-12-2021Id"))).toStrictEqual('25 DECEMBER 2021 - SATURDAY');
    expect(getNodeText(document.querySelector("#title26-12-2021Id"))).toStrictEqual('26 DECEMBER 2021 - SUNDAY');
    expect(document.querySelectorAll(".colTurnaroundsElement")).toHaveLength(numberOfDayBetweenTwoDates);
  });
});
