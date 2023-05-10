import {
  extractStatusFromTask,
  extractTimingsFromTask,
} from 'src/utils/parsing/extractFromTask';

const task = {
  actual_end_datetime: '2021-08-30T12:05:00Z',
  actual_start_datetime: '2021-08-30T11:05:00Z',
  number_of_comments: 2,
  number_of_messages: 0,
  planned_start_datetime: '2021-08-30T11:00:00Z',
  planned_end_datetime: '2021-08-30T12:00:00Z',
  status: 'DID NOT START',
  status_color: '#000000',
};

describe('extractFromTask utils', () => {
  describe('extractTimingsFromTask function', () => {
    it('should return the timings', () => {
      const timings = extractTimingsFromTask(task);

      expect(timings).toStrictEqual({
        status: 'DID NOT START',
        actualEndDatetime: '2021-08-30T12:05:00Z',
        actualStartDatetime: '2021-08-30T11:05:00Z',
        plannedStartDatetime: '2021-08-30T11:00:00Z',
        plannedEndDatetime: '2021-08-30T12:00:00Z',
      });
    });

    it('should throw an error when parameter is null', () => {
      expect(() => { extractTimingsFromTask(null); })
      .toThrow('extractTimingsFromTask : Null provide as parameter');
    });
  });

  describe('extractStatusFromTask', () => {
    it('should return task status', () => {
      const taskStatus = extractStatusFromTask(task);

      expect(taskStatus).toStrictEqual({
        status: 'DID NOT START',
        statusColor: '#000000',
      });
    });

    it('should throw an error when parameter is null', () => {
      expect(() => { extractStatusFromTask(null); })
      .toThrow('extractStatusFromTask : Null provide as parameter');
    });
  });
});
