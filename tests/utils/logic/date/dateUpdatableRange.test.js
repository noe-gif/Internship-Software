import { isDateRepresentationOutOfUpdatableRange } from 'src/utils/logic/date/dateUpdatableRange';

describe('isDateRepresentationOutOfUpdatableRange function', () => {
  it('should return false if user didnt exceeded over 12 hours difference', () => {
    const task = {
      planned_start_datetime: "2022-06-03T00:00:00Z",
      planned_end_datetime: "2022-06-03T00:30:00Z"
    };
    const newStartActualDateTime = '2022-06-03T08:59:00Z';
    const newInvalidStartActualDateTime = '2022-06-03T12:00:00Z';
    const plannedTimingType = 'start';

    expect(isDateRepresentationOutOfUpdatableRange(
      newStartActualDateTime,
      plannedTimingType,
      task,
    )).toBeFalsy();
    expect(isDateRepresentationOutOfUpdatableRange(
      newInvalidStartActualDateTime,
      plannedTimingType,
      task,
    )).toBeTruthy();
  });

  it('should return false if user didnt exceeded below 12 hours difference', () => {
    const task = { planned_start_datetime: "2022-06-03T00:00:00Z" };
    const newStartActualDateTime = '2022-06-02T12:01:00Z';
    const newInvalidStartActualDateTime = '2022-06-02T09:00:00Z';
    const plannedTimingType = 'start';

    expect(isDateRepresentationOutOfUpdatableRange(
      newStartActualDateTime,
      plannedTimingType,
      task,
    )).toBeFalsy();
    expect(isDateRepresentationOutOfUpdatableRange(
      newInvalidStartActualDateTime,
      plannedTimingType,
      task,
    )).toBeTruthy();
  });

  it('should return false if user didnt exceeded over 12 hours difference', () => {
    const task = { planned_end_datetime: "2022-06-03T00:00:00Z" };
    const newEndActualDateTime = '2022-06-03T08:59:00Z';
    const newInvalidEndActualDateTime = '2022-06-03T12:00:00Z';
    const plannedTimingType = 'end';

    expect(isDateRepresentationOutOfUpdatableRange(
      newEndActualDateTime,
      plannedTimingType,
      task,
    )).toBeFalsy();
    expect(isDateRepresentationOutOfUpdatableRange(
      newInvalidEndActualDateTime,
      plannedTimingType,
      task,
    )).toBeTruthy();
  });

  it('should return false if user didnt exceeded below 12 hours difference', () => {
    const task = { planned_end_datetime: "2022-06-03T00:00:00Z" };
    const newEndActualDateTime = '2022-06-02T12:01:00Z';
    const newInvalidEndActualDateTime = '2022-06-02T09:00:00Z';
    const plannedTimingType = 'end';

    expect(isDateRepresentationOutOfUpdatableRange(
      newEndActualDateTime,
      plannedTimingType,
      task,
    )).toBeFalsy();
    expect(isDateRepresentationOutOfUpdatableRange(
      newInvalidEndActualDateTime,
      plannedTimingType,
      task,
    )).toBeTruthy();
  });
});
