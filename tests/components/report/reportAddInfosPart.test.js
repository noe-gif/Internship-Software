/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import ReportAddInfosPart from 'src/components/report/reportAddInfosPart';

import REPORT_TEXT from 'src/constants/report/reportText.json';
import {
  REPORT_ADD_INFO_CHECKBOX_TYPE,
  REPORT_ADD_INFO_NUMBER_TYPE,
  REPORT_ADD_INFO_TEXT_TYPE,
} from 'src/constants/report/reportConstant';

const turnaroundCompleteInfos = {
  turnaroundId: 1999,
  turnaroundInfos:
    { close_information: {
      "CEP": "Alain",
      "Valise livrée": "true",
      "Nombre de bagage": "3"
    }},
};

const turnaroundReportFormat = {
  turnaroundReport: {
    free_form_fields: [
      { field_name: "CEP", field_type: REPORT_ADD_INFO_TEXT_TYPE },
      { field_name: "Valise livrée", field_type: REPORT_ADD_INFO_CHECKBOX_TYPE },
      { field_name: "Nombre de bagage", field_type: REPORT_ADD_INFO_NUMBER_TYPE },
    ],
  },
  turnaroundId: 1999,
};

describe('ReportAddInfosPart', () => {
  describe('test reportAddInfos Part component element display', () => {
    beforeEach(() => {
      render(
        <ReportAddInfosPart
          turnaroundCompleteInfos={turnaroundCompleteInfos}
          turnaroundReportFormat={turnaroundReportFormat}
          hasLoadReport={true}
        />
      );
    });

    it('display title', () => {
      expect(screen.getByText(REPORT_TEXT.add_infos.title)).toBeInTheDocument();
    });

    it('display 1 text input with value', () => {
      expect(
        screen.getByText(turnaroundReportFormat.turnaroundReport.free_form_fields[0].field_name)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(turnaroundCompleteInfos.turnaroundInfos.close_information.CEP)
      ).toBeInTheDocument();
    });

    it('display 1 number input with value', () => {
      expect(
        screen.getByText(turnaroundReportFormat.turnaroundReport.free_form_fields[1].field_name)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(turnaroundCompleteInfos.turnaroundInfos.close_information['Nombre de bagage'])
      ).toBeInTheDocument();
    });
  });
});
