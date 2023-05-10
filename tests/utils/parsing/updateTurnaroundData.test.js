import {
  checkIncomingDataType,
  cleanUpdatedTask,
  extractTaskPositionAndIndex,
  extractTurnaroundFromTask,
  extractTurnaroundFromAddInfo,
  filterAndCheckTaskAddInfo,
  updateTurnaroundFromAddInfo,
  updateTurnaroundFromTask,
} from 'src/utils/parsing/updateTurnaroundData';

import {
  UPDATE_TURNAROUND_TYPE,
  UPDATE_TASK_TYPE,
  UPDATE_ADDINFO_TYPE,
} from 'src/constants/turnaroundDetail/updateTurnaroundDataConstant';

const selectedTurnaroundDetail = {
  id: 12345,
  normal_tasks_above_wing: [
    {
      id: 112233,
      status: 'Did not start',
      task_additional_information: [],
    },
  ],
  normal_tasks_below_wing: [
    {
      id: 223344,
      status: 'Completed Late',
      task_additional_information: [{ id: 111222333, custom_label: 'is everything cleaned', value: null }],
    },
  ],
};

const selectedTurnaroundDetailUpdated = {
  id: 12345,
  normal_tasks_above_wing: [
    {
      id: 112233,
      status: 'Completed Late',
      task_additional_information: [],
    },
  ],
  normal_tasks_below_wing: [
    {
      id: 223344,
      status: 'Completed Late',
      task_additional_information: [{ id: 111222333, custom_label: 'is everything cleaned', value: null }],
    },
  ],
};

const selectedTurnaroundDetailAddInfos = {
  id: 12345,
  normal_tasks_above_wing: [
    {
      id: 112233,
      status: 'Did not start',
      task_additional_information: [],
    },
  ],
  normal_tasks_below_wing: [
    {
      id: 223344,
      status: 'Completed Late',
      task_additional_information: [{ id: 111222333, custom_label: 'is everything cleaned', value: null }],
    },
  ],
};

const selectedTurnaroundDetailAddInfoUpdated = {
  id: 12345,
  normal_tasks_above_wing: [
    {
      id: 112233,
      status: 'Did not start',
      task_additional_information: [],
    },
  ],
  normal_tasks_below_wing: [
    {
      id: 223344,
      status: 'Completed Late',
      task_additional_information: [{ id: 111222333, custom_label: 'is everything cleaned', value: true }],
    },
  ],
};

describe('Testing updateTurnaroundData', () => {
  describe('Testing checkIncomingDataType', () => {
    test('when data type is default', () => {
      const result = checkIncomingDataType([selectedTurnaroundDetail], { id: 12345 }, 'Unhandled type');

      expect(result).toStrictEqual(null);
    });
    
    test('when data type is turnaround', () => {
      const result = checkIncomingDataType([selectedTurnaroundDetail], { id: 12345 }, UPDATE_TURNAROUND_TYPE);

      expect(result).toStrictEqual(UPDATE_TURNAROUND_TYPE);
    });

    test('when data type is task', () => {
      const result = checkIncomingDataType([selectedTurnaroundDetail], { id: 12345 }, UPDATE_TASK_TYPE);

      expect(result).toStrictEqual(UPDATE_TASK_TYPE);
    });

    test('when data type is addInfo', () => {
      const result = checkIncomingDataType([selectedTurnaroundDetail], { id: 12345 }, UPDATE_ADDINFO_TYPE);

      expect(result).toStrictEqual(UPDATE_ADDINFO_TYPE);
    });

    test('when dataUpdated is null', () => {
      const result = checkIncomingDataType([selectedTurnaroundDetail], null, UPDATE_TURNAROUND_TYPE);

      expect(result).toStrictEqual(null);
    });

    test('when params are undefined', () => {
      const result = checkIncomingDataType();

      expect(result).toStrictEqual(null);
    });
  });

  describe('Testing extractTurnaroundFromTask function', () => {
    test('when taskId is found in selectedTurnaroundDetail', () => {
      const result = extractTurnaroundFromTask(
        [selectedTurnaroundDetail],
        { id: 112233, above_below_wing: "ABOVE_WING"},
        'normal_tasks_above_wing',
      );

      expect(result).toStrictEqual(selectedTurnaroundDetail);
    });

    test('when taskId is found in below tasks selectedTurnaroundDetail', () => {
      const result = extractTurnaroundFromTask(
        [selectedTurnaroundDetail],
        { id: 223344, above_below_wing: "BELOW_WING"},
        'normal_tasks_below_wing',
      );

      expect(result).toStrictEqual(selectedTurnaroundDetail);
    });

    test('when taskId is not found in selectedTurnaroundDetail', () => {
      const result = extractTurnaroundFromTask(
        [selectedTurnaroundDetail],
        { id: 11334, above_below_wing: "ABOVE_WING" },
        'normal_tasks_above_wing',
      );

      expect(result).toStrictEqual(null);
    });
  });

  describe('Testing extractTurnaroundFromAddInfo function', () => {
    test('when addInfo is found on task in turnaround', () => {
      const result = extractTurnaroundFromAddInfo(
        [selectedTurnaroundDetail],
        { id: 111222333, custom_label: 'is everything cleaned', value: true },
      );

      expect(result).toStrictEqual(
        {
          matchingTurnaround: selectedTurnaroundDetail,
          matchingTask: {
            id: 223344,
            status: 'Completed Late',
            task_additional_information: [{ id: 111222333, custom_label: 'is everything cleaned', value: null }],
          },
        },
      );
    });

    test('when addInfo is not found in turnaround', () => {
      const result = extractTurnaroundFromAddInfo(
        [selectedTurnaroundDetail],
        { id: 9876544, custom_label: 'is tested', value: true },
      );

      expect(result).toStrictEqual(null);
    });
  });

  describe('Testing updateTurnaroundFromTask function', () => {
    it('should update the complete turnaround with the updated task', () => {
      const result = updateTurnaroundFromTask(
        [selectedTurnaroundDetail],
        { id: 112233, above_below_wing: "ABOVE_WING", status: 'Completed Late', task_additional_information: [] },
      );

      expect(result).toStrictEqual(selectedTurnaroundDetailUpdated);
    });

    it('should return null due to no match in turnaround task', () => {
      const result = updateTurnaroundFromTask(
        [selectedTurnaroundDetail],
        { id: 56789, above_below_wing: "ABOVE_WING", status: "Completed Late" }
      );

      expect(result).toStrictEqual(null);
    });
  });

  describe('Testing updateTurnaroundFromAddInfo function', () => {
    it('should update the complete turnaround with the updated addInfo', () => {
      const result = updateTurnaroundFromAddInfo(
        [selectedTurnaroundDetailAddInfos],
        { id: 111222333, custom_label: 'is everything cleaned', value: true },
      );

      expect(result).toStrictEqual(selectedTurnaroundDetailAddInfoUpdated);
    });

    it('should return null due to no match in turnaround tasks addInfos', () => {
      const result = updateTurnaroundFromAddInfo(
        [selectedTurnaroundDetail],
        { id: 6735839, custom_label: 'is everything cleaned', value: true },
      );

      expect(result).toStrictEqual(null);
    });
  });

  describe('Testing cleanUpdatedTask function', () => {
    test('cleaning updated task data', () => {
      const result = cleanUpdatedTask({
        above_below_wing: "BELOW_WING",
        id: 12345,
        is_reduced: false,
        status: "Completed Late",
      });

      expect(result).toStrictEqual({ id: 12345, status: "Completed Late" });
    });

    test('when param is undefined', () => {
      const result = cleanUpdatedTask();

      expect(result).toStrictEqual({});
    });
  });

  describe('Testing filterAndCheckTaskAddInfo', () => {
    test('when updatedAddInfoId is in task addInfos', () => {
      const result = filterAndCheckTaskAddInfo(
        {
          id: 12345,
          task_additional_information: [{
            id: 111222333,
          }],
        },
        111222333,
      );

      expect(result).toBeTruthy();
    });

    test('when updatedAddInfoId is not in task addInfos', () => {
      const result = filterAndCheckTaskAddInfo(
        {
          id: 12345,
          task_additional_information: [],
        },
        111222333,
      );

      expect(result).toBeFalsy();
    });
  });

  describe('Testing extractTaskPositionAndIndex function', () => {
    test('when task is found in above wing', () => {
      const result = extractTaskPositionAndIndex(selectedTurnaroundDetail, 112233);

      expect(result).toStrictEqual({ isTaskAbove: true, updatedTaskIndex: 0 });
    });

    test('when task is found in below wing', () => {
      const result = extractTaskPositionAndIndex(selectedTurnaroundDetail, 223344);

      expect(result).toStrictEqual({ isTaskAbove: false, updatedTaskIndex: 0 });
    });
  });
});