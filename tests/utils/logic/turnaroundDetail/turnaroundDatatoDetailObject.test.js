import turnaroundDataToDetailObject from 'src/utils/logic/turnaroundDetail/turnaroundDataToDetailObject';

import {
  completeTurnaround,
  turnaroundWithDeparture,
  turnaroundWithArrival,
  resultTestingCompleteTurnaround,
  resultTestingTurnaroundWithoutDeparture,
  resultTestingTurnaroundWithoutArrival,
  resultTestingError,
} from './testingTurnaroundToDetail';

// This set of tests is launch with locale Date parameter (GMT+2). 

describe('Testing turnaroundDataToDetailObject function', function() {
  it('test complete turnaround with arrival & departure', function() {
    const expectedDetails = resultTestingCompleteTurnaround;

    let result = turnaroundDataToDetailObject(completeTurnaround);

    expect(result).toStrictEqual(expectedDetails);
  });

  it('test turnaround with arrival only', function() {
    const expectedDetails = resultTestingTurnaroundWithoutDeparture;

    let result = turnaroundDataToDetailObject(turnaroundWithArrival);

    expect(result).toStrictEqual(expectedDetails);
  });

  it('test turnaround with only departure', function() {
    const expectedDetails = resultTestingTurnaroundWithoutArrival;

    let result = turnaroundDataToDetailObject(turnaroundWithDeparture);

    expect(result).toStrictEqual(expectedDetails);
  });

  it('null provide', function() {
    const expectedDetails = resultTestingError;

    let result = turnaroundDataToDetailObject(null);

    expect(result).toStrictEqual(expectedDetails);
  });
});