/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from 'tests/renderTimezoneFilter';
import '@testing-library/jest-dom'

import ReportTasksPart from 'src/components/report/reportTasksPart';

import REPORT_TEXT from 'src/constants/report/reportText.json';

const turnaroundCompleteInfos = {
  turnaroundID: 1999,
  turnaroundInfos: {
    normal_tasks_above_wing: [
      { name: 'Check-In', planned_start_datetime: "2021-09-29T10:00:00Z" },
      { name: 'Onboarding', planned_start_datetime: "2021-09-29T10:20:00Z", planned_end_datetime: "2021-09-29T10:30:00Z" },
    ],
    normal_tasks_below_wing: [
      { name: 'Fuelling', planned_start_datetime: '' },
    ],
  },
};

const turnaroundReportFormat = {
  turnaroundID: 1999,
  turnaroundReport: {
    turnaround_task_fields: [
      { name: 'Check-In', value: [ "planned_start_datetime" ] },
      { name: 'Fuelling', value: [ "planned_end_datetime" ] },
      { name: 'Onboarding', value: [ "planned_start_datetime", "planned_end_datetime" ] },
      { name: 'Agent At Gate', value: [ "planned_start_datetime" ] },
    ],
  },
};

describe('ReportTasksPart', () => {
  describe('test reportTasksPart component element display', () => {
    beforeEach(() => {
      render(
        <ReportTasksPart
          turnaroundCompleteInfos={turnaroundCompleteInfos}
          turnaroundReportFormat={turnaroundReportFormat}
          hasLoadReport={true}
        />
      );
    });

    it('display Task part title', () => {
      expect(screen.getByText(REPORT_TEXT.tasks.title)).toBeInTheDocument();
    });

    describe('display field title for available fields', () => {
      it('display Check-In title', () => {
        expect(screen.getByText('Check-In')).toBeInTheDocument();
      });

      it('display Onboarding title', () => {
        expect(screen.getByText('Onboarding')).toBeInTheDocument();
      });

      it('display Fuelling title', () => {
        expect(screen.getByText('Fuelling')).toBeInTheDocument();
      });
    });

    describe('display field values for available fields', () => {
      it('display Check-In timings', () => {
        expect(screen.getByText('07:00')).toBeInTheDocument();
      });

      it('display Onboarding timings', () => {
        expect(screen.getByText('07:20')).toBeInTheDocument();
        expect(screen.getByText('07:30')).toBeInTheDocument();
      });
    });
  });
});
