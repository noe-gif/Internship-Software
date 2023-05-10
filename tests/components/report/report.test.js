/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, getNodeText} from 'tests/renderTimezoneFilter';
import '@testing-library/jest-dom';

import Report from 'src/components/report/report';

import REPORT_TEXT from 'src/constants/report/reportText.json';

const turnaroundData = {
  id: 12345,
  comments: [{ comment: 'Testing component' }],
  delays: [{ code: '34', duration: 20 }],
};

describe('Report', () => {
  describe('test report component when status default', () => {
    beforeEach(() => {
      render(
        <Report
          turnaroundData={turnaroundData}
          sendTurnaroundReportStatus={{turnaroundId: 12345, status: 'default'}}
          getTurnaroundReportRequest={() => {}}
          getTurnaroundAllInfoRequest={() => {}}
        />);
    });

    it('should display the report header title', () => {
      expect(getNodeText(document.querySelector("#reportHeaderTitle"))).toStrictEqual(REPORT_TEXT.header.title);
    });

    it('should display the save button', () => {
      expect(getNodeText(document.querySelector("#reportHeaderSave"))).toStrictEqual(REPORT_TEXT.header.save);
    });

    it('should display the send button', () => {
      expect(getNodeText(document.querySelector("#reportHeaderSend"))).toStrictEqual(REPORT_TEXT.header.send);
    });

    it('should not display the error message when status is default', () => {
      expect(document.querySelector("#reportHeaderError")).toBeNull();
    });
  });

  describe('test report component when status success', () => {
    beforeEach(() => {
      render(
        <Report
          turnaroundData={turnaroundData}
          sendTurnaroundReportStatus={{turnaroundId: 12345, status: 'success'}}
          getTurnaroundReportRequest={() => {}}
          getTurnaroundAllInfoRequest={() => {}}
        />);
    });

    it('should display the report header title', () => {
      expect(getNodeText(document.querySelector("#reportHeaderTitle"))).toStrictEqual(REPORT_TEXT.header.title);
    });

    it('should display the save button', () => {
      expect(getNodeText(document.querySelector("#reportHeaderSave"))).toStrictEqual(REPORT_TEXT.header.save);
    });

    it('should display the send button', () => {
      expect(getNodeText(document.querySelector("#reportHeaderSend"))).toStrictEqual(REPORT_TEXT.header.send);
    });

    it('should not display the error message when status is success', () => {
      expect(document.querySelector("#reportHeaderError")).toBeNull();
    });
  });

  describe('test report component when status fail', () => {
    beforeEach(() => {
      render(
        <Report
          turnaroundData={turnaroundData}
          sendTurnaroundReportStatus={{turnaroundId: 12345, status: 'fail'}}
          getTurnaroundReportRequest={() => {}}
          getTurnaroundAllInfoRequest={() => {}}
        />);
    });

    it('should display the report header title', () => {
      expect(getNodeText(document.querySelector("#reportHeaderTitle"))).toStrictEqual(REPORT_TEXT.header.title);
    });

    it('should display the save button', () => {
      expect(getNodeText(document.querySelector("#reportHeaderSave"))).toStrictEqual(REPORT_TEXT.header.save);
    });

    it('should display the send button', () => {
      expect(getNodeText(document.querySelector("#reportHeaderSend"))).toStrictEqual(REPORT_TEXT.header.send);
    });

    it('should display the error message when status is fail', () => {
      expect(getNodeText(document.querySelector("#reportHeaderError"))).toStrictEqual(REPORT_TEXT.header.error);
    });
  });
});
