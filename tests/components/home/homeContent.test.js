/**
 * @jest-environment jsdom
*/

import React from "react";
import {getNodeText, render, screen} from '@testing-library/react';
import { TimezoneFilterProvider } from 'src/context/timezoneFilterContext';
import '@testing-library/jest-dom';

import HomeContent from 'src/components/home/homeContent';

import { IN_PROGRESS } from 'src/types/FlightStatus';

import { dateRange } from 'src/utils/logic/date/dateRange';

import HOME_TEXT from 'src/constants/home/homeText.json';

import { Provider } from 'react-redux';
import store from 'src/store';

const isInDetailsView = true;
const selectedTurnaroundDate = '25/12/2021';
const turnarounds = [{ id: 12345, status: { category: IN_PROGRESS } }, { id: 12345, status: { category: IN_PROGRESS } }];
const datePicked = [new Date('Sat Dec 25 2021 13:21:03 GMT+0000 (Central European Standard Time)'), new Date('Sun Dec 26 2021 13:21:03 GMT+0000 (Central European Standard Time)')]

jest.mock('src/containers/turnaroundDetail/turnaroundsDetailsContainer',
  () => () => <p>Mocking TurnaroundsDetails Component</p>,
);

jest.mock('src/containers/turnaround/turnaroundCategoryContainer',
  () => (params) => <p>Mocking TurnaroundCategory Component {params.title}</p>
);

jest.mock('src/containers/header/turnaroundAirportPickerContainer',
  () => () => <p>Mocking TurnaroundAirportPickerContainer</p>
);

const Wrapper = ({ children }) => (
    <TimezoneFilterProvider>
      <Provider store={store}>{children}</Provider>
    </TimezoneFilterProvider>
);

describe('HomeContent', () => {
  describe('tests rendering html element in HomeContent', () => {
    it('should display one date title when one date picked is provide', () => {
      render(
        <HomeContent
          airportPicked="ORY"
          datePicked={[new Date('Sat Dec 25 2021 13:21:03 GMT+0000 (Central European Standard Time)')]}
          isCurrentlyLoading={false}
          isInDetailsView={isInDetailsView}
          selectedTurnaroundDate={selectedTurnaroundDate}
          turnarounds={turnarounds}
        />,
        { wrapper: Wrapper },
      );

      expect(getNodeText(document.querySelector("#title25-12-2021Id"))).toStrictEqual('25 DECEMBER 2021 - SATURDAY');
      expect(document.querySelectorAll(".colTurnaroundsElement")).toHaveLength(1);
    });

    it('should display multiple dates title when to multi dates selection', () => {
      render(
        <HomeContent
          airportPicked="ORY"
          datePicked={datePicked}
          isCurrentlyLoading={false}
          isInDetailsView={isInDetailsView}
          selectedTurnaroundDate={selectedTurnaroundDate}
          turnarounds={turnarounds}
        />,
        { wrapper: Wrapper },
      );

      const numberOfDayBetweenTwoDates = dateRange(datePicked[0], datePicked[1]).length;

      expect(getNodeText(document.querySelector("#title25-12-2021Id"))).toStrictEqual('25 DECEMBER 2021 - SATURDAY');
      expect(getNodeText(document.querySelector("#title26-12-2021Id"))).toStrictEqual('26 DECEMBER 2021 - SUNDAY');
      expect(document.querySelectorAll(".colTurnaroundsElement")).toHaveLength(numberOfDayBetweenTwoDates);
    });

    it('should not display date title when date picked is empty', () => {
      render(
        <HomeContent
          airportPicked="ORY"
          datePicked={[]}
          isCurrentlyLoading={false}
          isInDetailsView={isInDetailsView}
          selectedTurnaroundDate={selectedTurnaroundDate}
          turnarounds={[]}
        />,
        { wrapper: Wrapper },
      );

      expect(document.querySelectorAll(".colTurnaroundsElement")).toHaveLength(0);
    });

    it('should display mocked TurnaroundsDetails', () => {
      render(
        <HomeContent
          airportPicked="ORY"
          datePicked={datePicked}
          isCurrentlyLoading={false}
          isInDetailsView={isInDetailsView}
          selectedTurnaroundDate={selectedTurnaroundDate}
          turnarounds={turnarounds}
        />,
        { wrapper: Wrapper },
      );

      expect(screen.getByText('Mocking TurnaroundsDetails Component'));
    });

    it('should display loader when turnaroundsData is loading', () => {
      render(
        <HomeContent
          airportPicked="ORY"
          datePicked={datePicked}
          isCurrentlyLoading={true}
          isInDetailsView={isInDetailsView}
          selectedTurnaroundDate={selectedTurnaroundDate}
          turnarounds={turnarounds}
        />,
        { wrapper: Wrapper },
      );

      const loaderElement = document.querySelector('.loading');
      expect(loaderElement).not.toBeNull();
    });

    it('should display error message when no airport is selected', () => {
      render(
        <HomeContent
          airportPicked=""
          datePicked={datePicked}
          isCurrentlyLoading={false}
          isInDetailsView={isInDetailsView}
          selectedTurnaroundDate={selectedTurnaroundDate}
          turnarounds={turnarounds}
        />,
        { wrapper: Wrapper },
      );

      expect(screen.getByText(HOME_TEXT.messages.airport)).toBeInTheDocument();
    });

    it('should display error no turnaround message when turnaround is empty', () => {
      render(
        <HomeContent
          airportPicked="ORY"
          datePicked={datePicked}
          isCurrentlyLoading={false}
          isInDetailsView={isInDetailsView}
          selectedTurnaroundDate={selectedTurnaroundDate}
          turnarounds={[]}
        />,
        { wrapper: Wrapper },
      );

      expect(screen.getByText(HOME_TEXT.messages.turnaround)).toBeInTheDocument();
    });
  });
});
