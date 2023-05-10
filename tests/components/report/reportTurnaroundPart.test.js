/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from 'tests/renderTimezoneFilter';
import '@testing-library/jest-dom';

import ReportTurnaroundPart from 'src/components/report/reportTurnaroundPart';

import REPORT_TEXT from 'src/constants/report/reportText.json';

const turnaroundCompleteInfos = {
  turnaroundId: 1999,
  turnaroundInfos: {
    any_doors_open: "2021-09-28T00:10:00Z",
  },
};

const turnaroundReportFormat = {
  turnaroundId: 1999,
  turnaroundReport: {
    turnaround_fields: [
      { name: 'ADO', value: 'any_doors_open' },
    ],
  },
};

describe('ReportTurnaroundPart', () => {
  describe('test reportTurnaround Part component element display', () => {
    beforeEach(() => {
      render(
        <ReportTurnaroundPart
          turnaroundCompleteInfos={turnaroundCompleteInfos}
          turnaroundReportFormat={turnaroundReportFormat}
          hasLoadReport={true}
        />
      );
    });

    it('display title', () => {
      expect(screen.getByText(REPORT_TEXT.turnaround.title)).toBeInTheDocument();
    });

    it('display field title', () => {
      expect(screen.getByText('ADO')).toBeInTheDocument();
    });

    it('display field value', () => {
      expect(screen.getByText('21:10 (2021-09-27)')).toBeInTheDocument();
    });
  });
});
