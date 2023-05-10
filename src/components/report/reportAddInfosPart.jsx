import React, { useEffect } from 'react';

import { Switch } from '@mui/material';

import Loading from 'src/components/loading';
import reportAddInfosHooks from 'src/hooks/report/reportAddInfosHooks';

import {
  REPORT_ADD_INFO_CHECKBOX_TYPE,
  REPORT_ADD_INFO_EMPTY_VALUE,
  REPORT_ADD_INFO_NUMBER_TYPE,
  REPORT_ADD_INFO_TEXT_TYPE,
} from 'src/constants/report/reportConstant';

import REPORT_TEXT from 'src/constants/report/reportText.json';

export default function ReportAddInfosPart(props) {
  const {
    turnaroundReportFormat,
    turnaroundCompleteInfos,
    hasLoadReport,
    reportFreeForm,
    setReportFreeForm,
  } = props;

  const {
    changeReportFreeForm,
    changeReportFreeFormCheckbox,
    checkAlreadyCompletedReport,
    checkAlreadyCompletedReportCheckbox,
    fillCheckBoxField,
  } = reportAddInfosHooks(reportFreeForm, setReportFreeForm, turnaroundReportFormat, turnaroundCompleteInfos);

  useEffect(() => {
    if (turnaroundCompleteInfos && turnaroundReportFormat && reportFreeForm === null) {
      fillCheckBoxField();
    }
  }, [turnaroundCompleteInfos, turnaroundReportFormat]);

  const renderAddInfoCheckboxType = (title, isAlreadyCompleted) =>
    (
      <div className="reportAddInfoCheckbox">
        <Switch
          color="primary"
          defaultChecked={checkAlreadyCompletedReportCheckbox(isAlreadyCompleted, title)}
          onChange={(event) => { changeReportFreeFormCheckbox(event, title); }}
        />
      </div>
    );

  const renderAddInfoTextType = (title, isAlreadyCompleted) =>
    (
      <div className="reportAddInfoText">
        <input
          className="fontSizeDefault fontColorDefault reportAddInfoInput"
          defaultValue={checkAlreadyCompletedReport(isAlreadyCompleted, title, REPORT_ADD_INFO_EMPTY_VALUE)}
          placeholder={REPORT_TEXT.add_infos.placeholder_text}
          onChange={(event) => { changeReportFreeForm(event, title); }}
        />
      </div>
    );

  const renderAddInfoNumberType = (title, isAlreadyCompleted) =>
    (
      <div className="reportAddInfoNumber">
        <input
          className="fontSizeDefault fontColorDefault reportAddInfoInput"
          type="number"
          placeholder={REPORT_TEXT.add_infos.placeholder_number}
          min={0}
          defaultValue={checkAlreadyCompletedReport(isAlreadyCompleted, title, REPORT_ADD_INFO_EMPTY_VALUE)}
          onChange={(event) => { changeReportFreeForm(event, title); }}
        />
      </div>
    );

  const renderAddInfoType = (type, title, isAlreadyCompleted) => {
    switch (type) {
    case REPORT_ADD_INFO_CHECKBOX_TYPE:
      return renderAddInfoCheckboxType(title, isAlreadyCompleted);
    case REPORT_ADD_INFO_TEXT_TYPE:
      return renderAddInfoTextType(title, isAlreadyCompleted);
    case REPORT_ADD_INFO_NUMBER_TYPE:
      return renderAddInfoNumberType(title, isAlreadyCompleted);
    default:
      return null;
    }
  };

  const renderIsCompulsoryBullet = (isCompulsory) =>
    (
      <div className="reportAddInfoCompulsoryBulletWrapper">
        {isCompulsory && <div className="reportAddInfoCompulsoryBullet" />}
      </div>
    );

  const renderAddInfo = (title, type, isCompulsory, isAlreadyCompleted) =>
    (
      <div className="reportAddInfo" key={title}>
        <div className="reportAddInfoLeftPart">
          <p className="fontSizeDefaultBold fontColorDefault reportAddInfoTitle">{title}</p>
        </div>
        {renderIsCompulsoryBullet(isCompulsory)}
        <div className="reportAddInfoRightPart">
          {renderAddInfoType(type, title, isAlreadyCompleted)}
        </div>
      </div>
    );

  const renderAddInfoLoad = () => (
    turnaroundReportFormat.turnaroundReport.free_form_fields.map((field) =>
      renderAddInfo(
        field.field_name,
        field.field_type,
        field.is_compulsory,
        turnaroundCompleteInfos.turnaroundInfos.close_information,
      ))
  );

  const renderLoadingAddInfoList = () => (
    <div className="reportLoading">
      <Loading />
    </div>
  );

  const renderAddInfoList = () => {
    if (hasLoadReport) {
      return renderAddInfoLoad();
    } else {
      return renderLoadingAddInfoList();
    }
  };

  return (
    <>
      <div className="reportPartHeader">
        <p className="fontSizeBigBold fontColorDefault reportPartHeaderText">{REPORT_TEXT.add_infos.title}</p>
      </div>
      <div className="reportAddInfosList">
        {renderAddInfoList()}
      </div>
    </>
  );
}
