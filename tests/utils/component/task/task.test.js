import {
  classNameEnableButtonSingleEnd,
  classNameEnableButtonStart,
  isPostTaskTimingPossible,
} from 'src/utils/component/task';

import { DID_NOT_START, IN_PROGRESS, NOT_APPLICABLE } from 'src/types/TaskStatus';

import { getTaskBackgroundColorIfAutoValue } from 'src/utils/component/task';

describe('task utils', () => {
  describe('classNameEnableButtonStart function', () => {
    it('Tests if return taskButton-disabled when status is not applicable', () => {
      const taskTimings = {
        id: 12345,
        status: 'Not Applicable',
        actualStartDatetime: "2021-11-25T09:45:01Z",
      };

      let result = classNameEnableButtonStart(NOT_APPLICABLE, IN_PROGRESS, taskTimings.status, taskTimings.actualStartDatetime);

      expect(result).toEqual('taskButton-disabled');
    });

    it('Tests if return taskButton-disabled when the status is in progress', () => {
      const taskTimings = {
        id: 12345,
        status: 'In progress',
        actualStartDatetime: null,
      };

      let result = classNameEnableButtonStart(NOT_APPLICABLE, IN_PROGRESS, taskTimings.status, taskTimings.actualStartDatetime);

      expect(result).toEqual('taskButton-disabled');
    });

    it('Tests if return taskButton when all data are correct', () => {
      const taskTimings = {
        id: 12345,
        status: 'Did Not Start',
        actualStartDatetime: null,
      };

      let result = classNameEnableButtonStart(NOT_APPLICABLE, DID_NOT_START, taskTimings.status, taskTimings.actualStartDatetime);

      expect(result).toEqual('taskButton');
    });
  })

  describe('classNameEnableButtonSingleEnd function', () => {
    it('Tests if return taskButton when providing all correct data', () => {
      const taskTimings = {
        id: 12345,
        status: 'In Progress',
        actualEndDatetime: null,
        plannedStartDatetime: null,
      };

      let result = classNameEnableButtonSingleEnd(NOT_APPLICABLE, DID_NOT_START, taskTimings);

      expect(result).toEqual('taskButton');
    });

    it('Tests if return taskButton-disabled when planned_start_datetime is not null', () => {
      const taskTimings = {
        id: 12345,
        status: 'Did not start',
        actualEndDatetime: null,
        plannedStartDatetime: "2021-11-25T09:45:01Z",
      };

      let result = classNameEnableButtonSingleEnd(NOT_APPLICABLE, DID_NOT_START, taskTimings);

      expect(result).toEqual('taskButton-disabled');
    });

    it('Tests if return taskButton-disabled when actual_end_datetime is not null', () => {
      const taskTimings = {
        id: 12345,
        status: 'Did Not Start',
        actualEndDatetime: "2021-11-25T09:45:01Z",
        plannedStartDatetime: null,
      };

      let result = classNameEnableButtonSingleEnd(NOT_APPLICABLE, DID_NOT_START, taskTimings);

      expect(result).toEqual('taskButton-disabled');
    });
  });

  describe('isPostTaskTimingPossible function', () => {
    it('Test return true when the modify timing is start and correct data are provided', () => {
      let result = isPostTaskTimingPossible('start', { actual_start_datetime: null, is_applicable: true });

      expect(result).toStrictEqual(true);
    });

    it('Test return true when the modify timing is end and correct data are provided', () => {
      let result = isPostTaskTimingPossible('end', { actual_end_datetime: null, is_applicable: true });

      expect(result).toStrictEqual(true);
    });

    it('Test return false when dickKey is not start or end', () => {
      let result = isPostTaskTimingPossible('test', { actual_start_datetime: null, is_applicable: true });

      expect(result).toStrictEqual(false);
    });

    it('Test return false when actual_start_datetime is not empty', () => {
      let result = isPostTaskTimingPossible('start', { actual_start_datetime: "2021-11-25T09:45:01Z", is_applicable: true });

      expect(result).toStrictEqual(false);
    });

    it('Test return false when actual_end_datetime is not empty', () => {
      let result = isPostTaskTimingPossible('end', { actual_end_datetime: "2021-11-25T09:45:01Z", is_applicable: true });

      expect(result).toStrictEqual(false);
    });

    it('Test return false when is_applicable is false', () => {
      let result = isPostTaskTimingPossible('start', { actual_start_datetime: null, is_applicable: false });

      expect(result).toStrictEqual(false);
    });

    it('Test return false when is_applicable is null', () => {
      let result = isPostTaskTimingPossible('start', { actual_start_datetime: null, is_applicable: null });

      expect(result).toStrictEqual(false);
    });
  });

  describe('getTaskBackgroundColorIfAutoValue function ', () => {
    it('should return the classname value if the first parameter is not null', () => {
        const returnValueWithoutNullParam = getTaskBackgroundColorIfAutoValue('notNull', 'className');

        expect(returnValueWithoutNullParam).toStrictEqual('className');
    });

    it('should return an empty string if the first parameter is null', () => {
        const returnValueWithNullParam = getTaskBackgroundColorIfAutoValue(null, 'className');

        expect(returnValueWithNullParam).toStrictEqual('');
    });
  });
});