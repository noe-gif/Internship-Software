/**
 * @jest-environment jsdom
*/

import React from "react";
import {fireEvent, getNodeText, render, screen} from 'tests/renderTimezoneFilter';
import '@testing-library/jest-dom';

import TaskProgressBar from 'src/components/tasks/taskProgressBar';

const completeWithStartAndEndTimings = {
  planned_start_datetime: "2021-09-10T07:06:00Z",
  planned_end_datetime: "2021-09-10T07:26:00Z",
  actual_start_datetime: "2021-09-10T07:05:00Z",
  actual_end_datetime: "2021-09-10T07:35:00Z",
  id: 1234,
};

const endOnlyTaskTiming = {
  planned_end_datetime: "2021-09-10T07:26:00Z",
  actual_end_datetime: "2021-09-10T07:35:00Z",
  id: 12345,
};

const resetProgressBarTimingStatus = () => {};
const spyResetProgressBarTimingStatus = jest.fn(resetProgressBarTimingStatus);

const updateTaskTiming = () => {};
const spyUpdateTaskTiming = jest.fn(updateTaskTiming);

jest.mock('src/components/modal/datePicker',
  () => () => <div className="modalEntitiesWrapper" />
);

describe('TaskProgressBar', () => {
  describe('Testing when start timing exist in task', () => {
    it('should render CompleteProgressBar component', () => {
      render(
        <TaskProgressBar
          task={completeWithStartAndEndTimings}
          updateTaskTiming={updateTaskTiming}
          resetProgressBarTimingStatus={resetProgressBarTimingStatus}
          progressBarTimingStatus={{ status: 'success', statusCode: 200 }}
        />
      );

      const completeTaskProgressWrapper = document.querySelector('.taskProgressWrapper');
      const endOnlyTaskProgressWrapper = document.querySelector('.taskEndOnlyProgressWrapper');

      expect(completeTaskProgressWrapper).not.toBeNull();
      expect(endOnlyTaskProgressWrapper).toBeNull();
    });

    it('should render planned timings', () => {
      render(
        <TaskProgressBar
          task={completeWithStartAndEndTimings}
          updateTaskTiming={updateTaskTiming}
          resetProgressBarTimingStatus={resetProgressBarTimingStatus}
          progressBarTimingStatus={{ status: 'success', statusCode: 200 }}
        />
      );

      expect(getNodeText(document.querySelector("#taskPlannedStartTiming1234"))).toStrictEqual("04:06");
      expect(getNodeText(document.querySelector("#taskPlannedEndTiming1234"))).toStrictEqual("04:26");
    });

    it('should render actual timings', () => {
      render(
        <TaskProgressBar
          task={completeWithStartAndEndTimings}
          updateTaskTiming={updateTaskTiming}
          resetProgressBarTimingStatus={resetProgressBarTimingStatus}
          progressBarTimingStatus={{ status: 'success', statusCode: 200 }}
        />
      );

      expect(getNodeText(document.querySelector("#taskActualStartTiming1234"))).toStrictEqual("04:05");
      expect(getNodeText(document.querySelector("#taskActualEndTiming1234"))).toStrictEqual("04:35");
    });
    
    it('should render end Difference', () => {
      render(
        <TaskProgressBar
          task={completeWithStartAndEndTimings}
          updateTaskTiming={updateTaskTiming}
          resetProgressBarTimingStatus={resetProgressBarTimingStatus}
          progressBarTimingStatus={{ status: 'success', statusCode: 200 }}
        />
      );

      expect(getNodeText(document.querySelector("#taskEndDifferenceTiming1234"))).toStrictEqual("+9min");
    });

    it('should call resetProgressBarTimingStatus when clicking on an actual timing', () => {
      render(
        <TaskProgressBar
          task={completeWithStartAndEndTimings}
          updateTaskTiming={updateTaskTiming}
          resetProgressBarTimingStatus={spyResetProgressBarTimingStatus}
          progressBarTimingStatus={{ status: 'success', statusCode: 200 }}
        />
      );

      fireEvent.click(document.querySelector('#taskActualStartTiming1234'));

      expect(spyResetProgressBarTimingStatus).toHaveBeenCalled();

      spyResetProgressBarTimingStatus.mockClear();
    });

    it('should open modal when clicking on an actual timing', () => {
      render(
        <TaskProgressBar
          task={completeWithStartAndEndTimings}
          updateTaskTiming={spyUpdateTaskTiming}
          resetProgressBarTimingStatus={resetProgressBarTimingStatus}
          progressBarTimingStatus={{ status: 'success', statusCode: 200 }}
        />
      );

      expect(document.querySelector('.modalEntitiesWrapper')).not.toBeInTheDocument();

      fireEvent.click(document.querySelector('#taskActualStartTiming1234'));

      expect(document.querySelector('.modalEntitiesWrapper')).toBeInTheDocument();
    });
  });

  describe('Testing when start timing does not exist in task', () => {
    it('should render endOnlyProgressBar Component', () => {
      render(
        <TaskProgressBar
          task={endOnlyTaskTiming}
          updateTaskTiming={updateTaskTiming}
          resetProgressBarTimingStatus={resetProgressBarTimingStatus}
          progressBarTimingStatus={{ status: 'success', statusCode: 200 }}
        />
      );

      const completeTaskProgressWrapper = document.querySelector('.taskProgressWrapper');
      const endOnlyTaskProgressWrapper = document.querySelector('.taskEndOnlyProgressWrapper');

      expect(completeTaskProgressWrapper).toBeNull();
      expect(endOnlyTaskProgressWrapper).not.toBeNull();
    });

    it('should render actual End DateTime', () => {
      render(
        <TaskProgressBar
          task={endOnlyTaskTiming}
          updateTaskTiming={updateTaskTiming}
          resetProgressBarTimingStatus={resetProgressBarTimingStatus}
          progressBarTimingStatus={{ status: 'success', statusCode: 200 }}
        />
      );

      expect(getNodeText(document.querySelector("#taskActualEndTiming12345"))).toStrictEqual("04:35");
    });

    it('should render planned end timing', () => {
      render(
        <TaskProgressBar
          task={endOnlyTaskTiming}
          updateTaskTiming={updateTaskTiming}
          resetProgressBarTimingStatus={resetProgressBarTimingStatus}
          progressBarTimingStatus={{ status: 'success', statusCode: 200 }}
        />
      );

      expect(getNodeText(document.querySelector("#taskPlannedEndTiming12345"))).toStrictEqual("04:26");
    });

    it('should display timing difference on left part of the progressBar when timing difference is negative', () => {
      render(
        <TaskProgressBar
          task={{ ...endOnlyTaskTiming, actual_end_datetime: "2021-09-10T07:22:00Z" }}
          updateTaskTiming={updateTaskTiming}
          resetProgressBarTimingStatus={resetProgressBarTimingStatus}
          progressBarTimingStatus={{ status: 'success', statusCode: 200 }}
        />
      );

      expect(getNodeText(document.querySelector('#task12345NegativeDifferenceId'))).toStrictEqual('-4min');
    });
  });
});