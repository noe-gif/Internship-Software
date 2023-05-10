/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import ReportRemarksPart from 'src/components/report/reportRemarksPart';

import REPORT_TEXT from 'src/constants/report/reportText.json';

const turnaroundData = {
  comments: [{ comment: 'Awaiting clearance before start-up' }]
};

describe('ReportRemarksPart', () => {
  describe('test reportRemarksPart component element display', () => {
    beforeEach(() => {
      render(<ReportRemarksPart turnaroundData={turnaroundData} reportRemarks="New comment on Turnaround" setReportRemarks={() => {}} />);
    });

    it('display title', () => {
      expect(screen.getByText(REPORT_TEXT.remarks.title)).toBeInTheDocument();
    });

    it('display of turnaround comment', () => {
      expect(screen.getByText("New comment on Turnaround")).toBeInTheDocument();
    });
  });
});
