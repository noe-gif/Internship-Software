/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import ReportDelaysPart from 'src/components/report/reportDelaysPart';

import REPORT_TEXT from 'src/constants/report/reportText.json';

const turnaroundData = {
  delays: [{ code: '34', duration: 20 }],
};

describe('ReportDelaysPart', () => {
  describe('test reportDelays Part component element display', () => {
    beforeEach(() => {
      render(
        <ReportDelaysPart
          turnaroundData={turnaroundData}
          reportDelays={[{ code: '34', duration: 20 }]}
          setReportDelays={() => {}}
        />);
    });

    it('title display', () => {
      expect(screen.getByText(REPORT_TEXT.delay.title)).toBeInTheDocument();
    });

    it('display 3 Delay lines title', () => {
      expect(screen.getByText(`${REPORT_TEXT.delay.line_title}1`)).toBeInTheDocument();
      expect(screen.getByText(`${REPORT_TEXT.delay.line_title}2`)).toBeInTheDocument();
      expect(screen.getByText(`${REPORT_TEXT.delay.line_title}3`)).toBeInTheDocument();
    });

    it('display of turnaround delay info', () => {
      expect(screen.getByDisplayValue(turnaroundData.delays[0].code)).toBeInTheDocument();
      expect(screen.getByDisplayValue(turnaroundData.delays[0].duration)).toBeInTheDocument();
    });

    it('display inputs placeholder', () => {
      expect(screen.getAllByPlaceholderText(REPORT_TEXT.delay.placeholder_code).length).toStrictEqual(3);
      expect(screen.getAllByPlaceholderText(REPORT_TEXT.delay.placeholder_duration).length).toStrictEqual(3);
    });
  });
});
