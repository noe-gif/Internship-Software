/**
 * @jest-environment jsdom
*/

import React from "react";
import { getNodeText, render, screen } from 'tests/renderTimezoneFilter';
import '@testing-library/jest-dom';

import Tasks from 'src/components/turnaroundDetail/tasks';

const turnaround = {
  arrival_flight: {
    departure_airport: { iata_code: 'FDF' },
  },
  id: 21817
};

const selectedTurnaroundDetail = [{
  id: 21817,
  any_door_opened_datetime: "2021-10-12T05:41:00Z",
  normal_tasks_below_wing: [
    {
      name: "Sup Task 2",
      order: 6,
      planned_end_datetime: "2021-10-12T05:43:00Z",
      planned_start_datetime: "2021-10-12T05:42:00Z",
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
    },
    {
      name: "GSE Arrival",
      order: 1,
      planned_end_datetime: "2021-10-12T05:41:00Z",
      planned_start_datetime: null,
      requires_arrival: true,
      start_description: null,
      start_reference: null,
      status: "Completed On Time",
      status_color: "#09af52",
      duration: null,
      end_reference: "A+00:00",
      end_description: "Tous les GSE (Loader, tapis, escabeau) présents",
      id: 604171,
      comments: [],
    }
  ],
  normal_tasks_above_wing: [
    {
      name: "PRM Arrival",
      order: 2,
      planned_end_datetime: "2021-10-12T06:06:00Z",
      planned_start_datetime: null,
      requires_arrival: true,
      start_description: null,
      start_reference: null,
      status: "Completed On Time",
      status_color: "#09af52",
      duration: null,
      end_description: "Dernier PMR sorti de l’avion",
      end_reference: "A+00:25",
      id: 604169,
      comments: [],
    }
  ],
  comments: [{}],
}]

describe('TurnaroundDetailTaskList', () => {
  describe("tests when it's a large view", () => {
    beforeEach(() => {
      render(
        <Tasks
          componentSize="large"
          turnaroundId={turnaround.id}
          selectedTurnarounds={selectedTurnaroundDetail}
        />
      );
    });

    it('should display the name of the tasks', () => {
      expect(getNodeText(document.querySelector('#turnaroundTaskLineTitle604176')))
      .toStrictEqual('Sup Task 2');

      expect(getNodeText(document.querySelector('#turnaroundTaskLineTitle604171')))
      .toStrictEqual('GSE Arrival');

      expect(getNodeText(document.querySelector('#turnaroundTaskLineTitle604169')))
      .toStrictEqual('PRM Arrival');
    });

    it('should display startTiming, endTiming, ProcessTiming and the status of Sup Task 2', () => {
      expect(getNodeText(document.querySelector('#turnaroundTaskLineStartTiming604176')))
      .toStrictEqual('02:42');

      expect(getNodeText(document.querySelector('#turnaroundTaskLineEndTiming604176')))
      .toStrictEqual('02:43');

      expect(getNodeText(document.querySelector('#turnaroundTaskLineProcessTime604176')))
      .toStrictEqual('00:01');

      expect(getNodeText(document.querySelector('#turnaroundTaskLineStatus604176')))
      .toStrictEqual('Not Applicable');
    });

    it('should display header titles', () => {
      expect(getNodeText(document.querySelector('#taskLineHeaderStartTiming21817')))
      .toStrictEqual('Start');

      expect(getNodeText(document.querySelector('#taskLineHeaderEndTiming21817')))
      .toStrictEqual('End');

      expect(getNodeText(document.querySelector('#taskLineHeaderProcessTime21817')))
      .toStrictEqual('ProcessTime');

      expect(getNodeText(document.querySelector('#taskLineHeaderStatus21817')))
      .toStrictEqual('Status');
    });
  });

  describe("tests when it's a small/preview view", () => {
    beforeEach(() => {
      render(
        <Tasks
          componentSize="small"
          turnaroundId={turnaround.id}
          selectedTurnarounds={selectedTurnaroundDetail}
        />
      );
    });

    it('should display the name of the tasks', () => {
      expect(getNodeText(document.querySelector('#turnaroundTaskLineTitle604176')))
      .toStrictEqual('Sup Task 2');

      expect(getNodeText(document.querySelector('#turnaroundTaskLineTitle604171')))
      .toStrictEqual('GSE Arrival');

      expect(getNodeText(document.querySelector('#turnaroundTaskLineTitle604169')))
      .toStrictEqual('PRM Arrival');
    });

    it('should display startTiming, endTiming and the status of a task', () => {
      expect(getNodeText(document.querySelector('#turnaroundTaskLineStartTiming604176')))
      .toStrictEqual('02:42');

      expect(getNodeText(document.querySelector('#turnaroundTaskLineEndTiming604176')))
      .toStrictEqual('02:43');

      expect(getNodeText(document.querySelector('#turnaroundTaskLineStatus604176')))
      .toStrictEqual('Not Applicable');
    });

    it('should display header titles', () => {
      expect(getNodeText(document.querySelector('#taskLineHeaderStartTiming21817')))
      .toStrictEqual('Start');

      expect(getNodeText(document.querySelector('#taskLineHeaderEndTiming21817')))
      .toStrictEqual('End');

      expect(getNodeText(document.querySelector('#taskLineHeaderStatus21817')))
      .toStrictEqual('Status');
    });
  });
});