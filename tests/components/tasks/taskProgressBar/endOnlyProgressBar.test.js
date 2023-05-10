/**
 * @jest-environment jsdom
*/

import React from "react";
import {fireEvent, getNodeText, render} from '@testing-library/react';
import '@testing-library/jest-dom';

import EndOnlyProgressBar from 'src/components/tasks/taskProgressBar/endOnlyProgressBar';

const showDatePicker = () => {};
const spyShowDatePicker = jest.fn(showDatePicker);

const taskTimings = {
  plannedEndTiming: "07:10",
  endDifference: "-5min",
  actualEndTiming: "07:00",
};

describe('EndOnlyProgressBar', () => {
  it('should display actual end dateTime', () => {
    render(
      <EndOnlyProgressBar
        showDatePicker={spyShowDatePicker}
        taskId={1234}
        taskStatusColor={'#ffffff'}
        taskTimings={{...taskTimings, autoEndTiming: "-:-",}}
      />
    );

    expect(getNodeText(document.querySelector('#taskActualEndTiming1234'))).toStrictEqual("07:00");
  });

  it('should call showModal when clicking on actualEndDateTime value', () => {
    render(
      <EndOnlyProgressBar
        showDatePicker={spyShowDatePicker}
        taskId={1234}
        taskStatusColor={'#ffffff'}
        taskTimings={{ ...taskTimings, autoEndTiming: "-:-" }}
      />
    );

    fireEvent.click(document.querySelector('#taskActualEndTiming1234'));

    expect(spyShowDatePicker).toHaveBeenCalledWith('end', "07:00");

    spyShowDatePicker.mockClear();
  });

  it('should display planned timing', () => {
    render(
      <EndOnlyProgressBar
        showDatePicker={spyShowDatePicker}
        taskId={1234}
        taskStatusColor={'#ffffff'}
        taskTimings={{ ...taskTimings, autoEndTiming: "-:-" }}
      />
    );

    expect(getNodeText(document.querySelector("#taskPlannedEndTiming1234"))).toStrictEqual("07:10");
  });

  it('should display endDifference in left part of timeline when endDifference is negative', () => {
    render(
      <EndOnlyProgressBar
        showDatePicker={spyShowDatePicker}
        taskId={1234}
        taskStatusColor={'#ffffff'}
        taskTimings={{ ...taskTimings, autoEndTiming: "-:-" }}
      />
    );

    expect(getNodeText(document.querySelector('#task1234NegativeDifferenceId'))).toStrictEqual('-5min');
    expect(document.querySelector('#taskRight1234DifferenceId')).toBeNull();
  });

  it('should display endDifference in right part of timeline when endDifference is negative', () => {
    render(
      <EndOnlyProgressBar
        showDatePicker={spyShowDatePicker}
        taskId={1234}
        taskStatusColor={'#ffffff'}
        taskTimings={{ ...taskTimings, endDifference: '+9min', autoEndTiming: "-:-" }}
      />
    );

    expect(getNodeText(document.querySelector('#task1234PositiveDifferenceId'))).toStrictEqual('+9min');
    expect(document.querySelector('#taskLeft1234DifferenceId')).toBeNull();
  });

  
  it('should display auto end timing value if it exists', () => {
    render(
      <EndOnlyProgressBar
        showDatePicker={spyShowDatePicker}
        taskId={1234}
        taskStatusColor={'#ffffff'}
        taskTimings={{ ...taskTimings, endDifference: '+9min', autoEndTiming: "07:07" }}
      />
    );

    expect(getNodeText(document.querySelector('#taskActualEndTiming1234'))).toStrictEqual('07:07');
  });

  it('shouldnt display auto end timing value if it doesnt exists', () => {
    render(
      <EndOnlyProgressBar
        showDatePicker={spyShowDatePicker}
        taskId={1234}
        taskStatusColor={'#ffffff'}
        taskTimings={{ ...taskTimings, endDifference: '+9min', autoEndTiming: "-:-" }}
      />
    );

    expect(getNodeText(document.querySelector('#taskActualEndTiming1234'))).toStrictEqual('07:00');
  });
});
