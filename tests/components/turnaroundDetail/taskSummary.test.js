/**
 * @jest-environment jsdom
*/

import React from "react";
import { getNodeText, render, screen } from 'tests/renderTimezoneFilter';
import '@testing-library/jest-dom';

import TaskSummary from 'src/components/turnaroundDetail/taskSummary';

const task = {
  name: "Sup Task 2",
  order: 6,
  requires_arrival: true,
  start_description: "Début de la tâche non programmée",
  start_reference: "A+00:00",
  status: "Not Applicable",
  status_color: "#FDB7B1",
  duration: 60,
  end_description: "Fin de la tâche non programmée",
  end_reference: "A+00:01",
  id: 604176,
  comments: [],
}

describe('TurnaroundDetailTaskList', () => {
  describe("tests when it's a large view", () => {
    beforeEach(() => {
      render(
        <TaskSummary
          componentSize="large"
          task={{ ...task, auto_end_datetime: null, auto_start_datetime: null,
            actual_end_datetime: null, actual_start_datetime: null,
            planned_end_datetime: "2021-10-12T05:43:00Z", planned_start_datetime: "2021-10-12T05:42:00Z",
          }}
        />
      );
    });

    it('should return the task name', () => {
      expect(getNodeText(document.querySelector('#turnaroundTaskLineTitle604176'))).toStrictEqual('Sup Task 2');
    });

    it('should return all the central information of the task', () => {
      expect(getNodeText(document.querySelector('#turnaroundTaskLineStartTiming604176'))).toStrictEqual('02:42');
      expect(getNodeText(document.querySelector('#turnaroundTaskLineEndTiming604176'))).toStrictEqual('02:43');
      expect(getNodeText(document.querySelector('#turnaroundTaskLineProcessTime604176'))).toStrictEqual('00:01');
      expect(getNodeText(document.querySelector('#turnaroundTaskLineStatus604176'))).toStrictEqual('Not Applicable');
    });

    it('should display auto end timing value if it exists', () => {
      expect(getNodeText(document.querySelector('#turnaroundTaskLineStartTiming604176'))).toStrictEqual('02:42');
    });
  });

  describe("tests when it's a small/preview view", () => {    
    it('should return the task name', () => {
      render(
        <TaskSummary
          componentSize="small"
          task={{ ...task, auto_end_datetime: null, auto_start_datetime: null,
            actual_end_datetime: null, actual_start_datetime: null,
            planned_end_datetime: "2021-10-12T05:43:00Z", planned_start_datetime: "2021-10-12T05:42:00Z",
          }}
        />
      );

      expect(getNodeText(document.querySelector('#turnaroundTaskLineTitle604176'))).toStrictEqual('Sup Task 2');
    });

    it('should display the late DifferenceTiming calculed from auto values', () => {
      render(
        <TaskSummary
          componentSize="small"
          task={{ ...task, actual_end_datetime: null, actual_start_datetime: null,
            auto_end_datetime: "2022-05-02T09:20:00Z", auto_start_datetime: "2022-05-02T08:10:00Z",
            planned_end_datetime: "2022-05-02T08:46:00Z", planned_start_datetime: "2022-05-02T08:06:00Z",
          }}
        />
      );

      expect(getNodeText(document.querySelector('#taskSummaryDifferenceTimingLate604176'))).toStrictEqual('+4min');
    });

    it('should display the late DifferenceTiming calculed from auto values', () => {
      render(
        <TaskSummary
          componentSize="small"
          task={{ ...task, actual_end_datetime: "2022-05-02T09:20:00Z", actual_start_datetime: null,
            auto_end_datetime: null, auto_start_datetime: "2022-05-02T08:10:00Z",
            planned_end_datetime: "2022-05-02T08:46:00Z", planned_start_datetime: "2022-05-02T08:06:00Z",
          }}
        />
      );

      expect(getNodeText(document.querySelector('#taskSummaryDifferenceTimingLate604176'))).toStrictEqual('+4min');
    });

    it('should display the late DifferenceTiming calculed from auto values', () => {
      render(
        <TaskSummary
          componentSize="small"
          task={{ ...task, actual_end_datetime: null, actual_start_datetime: "2022-05-02T08:15:00Z",
            auto_end_datetime: "2022-05-02T09:20:00Z", auto_start_datetime: null,
            planned_end_datetime: "2022-05-02T08:46:00Z", planned_start_datetime: "2022-05-02T08:06:00Z",
          }}
        />
      );

      expect(getNodeText(document.querySelector('#taskSummaryDifferenceTimingLate604176'))).toStrictEqual('+9min');
    });

    it('should display the on time DifferenceTiming calculed from auto values', () => {
      render(
        <TaskSummary
          componentSize="small"
          task={{ ...task, actual_end_datetime: null, actual_start_datetime: "2022-05-02T08:06:00Z",
            auto_end_datetime: "2022-05-02T08:44:00Z", auto_start_datetime: null,
            planned_end_datetime: "2022-05-02T08:46:00Z", planned_start_datetime: "2022-05-02T08:06:00Z",
          }}
        />
      );

      expect(getNodeText(document.querySelector('#taskSummaryDifferenceTimingOnTime604176'))).toStrictEqual('-2min');
    });
  });
});