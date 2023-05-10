import { PROGRESS_BAR_DEFAULT_COLOR } from 'src/constants/tasks/tasksConstant';

import {
  isActualEndDatetimeNotEmpty,
  isFormattedDateHasRealValue,
  progressBarBackgroundColor,
  startTimingIsHigherThanStopTiming,
  stopTimingIsLowerThanStartTiming,
} from 'src/utils/component/progressBar';

describe('progressBar utils', () => {
  describe('isActualEndDatetimeNotEmpty function', () => {
    it('test return true when pushing start timing to reset it but actual_end_datetime is not empty', () => {
      let result = isActualEndDatetimeNotEmpty('start', { actualEndDatetime: "2021-11-25T09:45:01Z" }, null);

      expect(result).toStrictEqual(true);
    });

    it('test return false when trigger id is end and actual_end_datetime is null anf the timing is not', () => {
      let result = isActualEndDatetimeNotEmpty('end', { actualEndDatetime: null }, null);

      expect(result).toStrictEqual(false);
    });
  });

  describe('isFormattedDateHasRealValue function', () => {
    it('test return true when formattedDate has the correct format', () => {
      let result = isFormattedDateHasRealValue({date: '2021-11-30', timing: '12:12'});

      expect(result).toStrictEqual(true);
    });

    it('test return false when formattedDate.timing is null', () => {
      let result = isFormattedDateHasRealValue({date: '2021-11-30', timing: null});

      expect(result).toStrictEqual(false);
    });

    it('test return false when formattedDate.timing is equal to -:-', () => {
      let result = isFormattedDateHasRealValue({date: '2021-11-30', timing: '-:-'});

      expect(result).toStrictEqual(false);
    });

    it('test return false when formattedDate.date is equal to yyyy-mm-dd', () => {
      let result = isFormattedDateHasRealValue({date: 'yyyy-mm-dd', timing: '12:12'});

      expect(result).toStrictEqual(false);
    });
  });

  describe('stopTimingIsLowerThanStartTiming function', () => {
    it('test return true when id is end and the date changed is lower than the actual_start_datetime', () => {
      let result = stopTimingIsLowerThanStartTiming('end', "2021-11-25T09:45:01Z", new Date("2021-11-25T07:45:01Z"));

      expect(result).toStrictEqual(true);
    });

    it('test return false when id is end and the date changed is not lower than the actual_start_datetime', () => {
      let result = stopTimingIsLowerThanStartTiming('end', "2021-11-25T09:45:01Z", new Date("2021-11-25T10:45:01Z"));

      expect(result).toStrictEqual(false);
    });

    it('test return false when actual_start_datetime is null', () => {
      let result = stopTimingIsLowerThanStartTiming('end', null, new Date("2021-11-25T07:45:01Z"));

      expect(result).toStrictEqual(false);
    });
  });

  describe('startTimingIsHigherThanStopTiming function', () => {
    it('test return true when id is end and the date changed is higher than the actual_end_datetime', () => {
      let result = startTimingIsHigherThanStopTiming('start', "2021-11-25T09:45:01Z", new Date("2021-11-25T10:45:01Z"));

      expect(result).toStrictEqual(true);
    });

    it('test return false when id is end and the date changed is not higher than the actual_end_datetime', () => {
      let result = startTimingIsHigherThanStopTiming('start', "2021-11-25T09:45:01Z", new Date("2021-11-25T07:45:01Z"));

      expect(result).toStrictEqual(false);
    });

    it('test return false when actual_end_datetime is null', () => {
      let result = startTimingIsHigherThanStopTiming('start', null, new Date("2021-11-25T07:45:01Z"));

      expect(result).toStrictEqual(false);
    });
  });

  describe('progressBarBackgroundColor function', () => {
    it('test return the task color when actual_start_datetime and actual_end_datetime exists and not empty', () => {
      let result = progressBarBackgroundColor({actualStartDatetime: "2021-11-25T09:45:01Z", actualEndDatetime: "2021-11-25T10:45:01Z"}, '#12345');

      expect(result).toStrictEqual('#12345');
    });

    it('test return the default color when actual_start_datetime do not exist', () => {
      let result = progressBarBackgroundColor({actualStartDatetime: null, actualEndDatetime: "2021-11-25T10:45:01Z" }, '#12345');

      expect(result).toStrictEqual(PROGRESS_BAR_DEFAULT_COLOR);
    });

    it('test return the default color when actual_end_datetime do not exist', () => {
      let result = progressBarBackgroundColor({actualEndDatetime: null, actualStartDatetime: "2021-11-25T10:45:01Z" }, '#12345');

      expect(result).toStrictEqual(PROGRESS_BAR_DEFAULT_COLOR);
    });
  });
});
