/**
 * @jest-environment jsdom
*/

import React from "react";
import {fireEvent, getNodeText, render} from '@testing-library/react';
import '@testing-library/jest-dom';

import CompleteProgressBar from 'src/components/tasks/taskProgressBar/completeProgressBar';

const taskDateTimes = {
  actualEndDatetime: "2021-09-10T07:35:00Z",
  actualStartDatetime: "2021-09-10T07:05:00Z",
  plannedEndDatetime: "2021-09-10T07:26:00Z",
  plannedStartDatetime: "2021-09-10T07:06:00Z",
  autoEndDatetime: "-:-",
  autoStartDatetime: "-:-",
};

const taskTimings = {
  actualEndTiming: "07:25",
  actualStartTiming: "07:07",
  endDifference: "+9min",
  plannedEndTiming: "07:26",
  plannedStartTiming: "07:06",
};

const showDatePicker = () => {};
const spyShowDatePicker = jest.fn(showDatePicker);

describe('CompleteTaskProgressBar', () => {
  it('should display actualEndDateTime and actualStartDateTime provide', () => {
    render(
      <CompleteProgressBar
        showDatePicker={spyShowDatePicker}
        taskDateTimes={taskDateTimes}
        taskId={1234}
        taskStatusColor={"#000000"}
        taskTimings={{ ...taskTimings, autoStartTiming: "-:-", autoEndTiming: "-:-" }}
      />
    );

    expect(getNodeText(document.querySelector("#taskActualStartTiming1234"))).toStrictEqual("07:07");
    expect(getNodeText(document.querySelector("#taskActualEndTiming1234"))).toStrictEqual("07:25");
  });

  it('should call showModal when clicking on actualStartDateTime', () => {
    render(
      <CompleteProgressBar
        showDatePicker={spyShowDatePicker}
        taskDateTimes={taskDateTimes}
        taskId={1234}
        taskStatusColor={"#000000"}
        taskTimings={{ ...taskTimings, autoStartTiming: "-:-", autoEndTiming: "-:-" }}
      />
    );

    fireEvent.click(document.querySelector("#taskActualStartTiming1234"));

    expect(spyShowDatePicker).toHaveBeenCalledWith('start', "07:07");

    spyShowDatePicker.mockClear();
  });

  it('should call showModal when clicking on actualEndDateTime', () => {
    render(
      <CompleteProgressBar
        showDatePicker={spyShowDatePicker}
        taskDateTimes={taskDateTimes}
        taskId={1234}
        taskStatusColor={"#000000"}
        taskTimings={{ ...taskTimings, autoStartTiming: "-:-", autoEndTiming: "-:-" }}
      />
    );

    fireEvent.click(document.querySelector("#taskActualEndTiming1234"));

    expect(spyShowDatePicker).toHaveBeenCalledWith('end', "07:25");

    spyShowDatePicker.mockClear();
  });

  it('should display endDifference', () => {
    render(
      <CompleteProgressBar
        showDatePicker={spyShowDatePicker}
        taskDateTimes={taskDateTimes}
        taskId={1234}
        taskStatusColor={"#000000"}
        taskTimings={{ ...taskTimings, autoStartTiming: "-:-", autoEndTiming: "-:-" }}
      />
    );

    expect(getNodeText(document.querySelector("#taskEndDifferenceTiming1234"))).toStrictEqual("+9min");
  });

  it('should display planned Timing', () => {
    render(
      <CompleteProgressBar
        showDatePicker={spyShowDatePicker}
        taskDateTimes={taskDateTimes}
        taskId={1234}
        taskStatusColor={"#000000"}
        taskTimings={{ ...taskTimings, autoStartTiming: "-:-", autoEndTiming: "-:-" }}
      />
    );

    expect(getNodeText(document.querySelector("#taskPlannedStartTiming1234"))).toStrictEqual("07:06");
    expect(getNodeText(document.querySelector("#taskPlannedEndTiming1234"))).toStrictEqual("07:26");
  });

  it('should display auto start timing value if it exists', () => {
    render(
      <CompleteProgressBar
        showDatePicker={spyShowDatePicker}
        taskDateTimes={taskDateTimes}
        taskId={1234}
        taskStatusColor={"#000000"}
        taskTimings={{ ...taskTimings, autoStartTiming: "07:07", autoEndTiming: "-:-" }}
      />
    );

    expect(getNodeText(document.querySelector("#taskActualStartTiming1234"))).toStrictEqual("07:07");
  });

  it('shouldnt display auto start timing value if it doesnt exists', () => {
    render(
      <CompleteProgressBar
        showDatePicker={spyShowDatePicker}
        taskDateTimes={taskDateTimes}
        taskId={1234}
        taskStatusColor={"#000000"}
        taskTimings={{ ...taskTimings, autoStartTiming: "-:-", autoEndTiming: "-:-" }}
      />
    );

    expect(getNodeText(document.querySelector("#taskActualStartTiming1234"))).not.toStrictEqual("-:-");
  });

  it('should display auto end timing value if it exists', () => {
    render(
      <CompleteProgressBar
        showDatePicker={spyShowDatePicker}
        taskDateTimes={taskDateTimes}
        taskId={1234}
        taskStatusColor={"#000000"}
        taskTimings={{ ...taskTimings, autoStartTiming: "-:-", autoEndTiming: "07:07" }}
      />
    );

    expect(getNodeText(document.querySelector("#taskActualEndTiming1234"))).toStrictEqual("07:07");
  });

  it('shouldnt display auto end timing value if it doesnt exists', () => {
    render(
      <CompleteProgressBar
        showDatePicker={spyShowDatePicker}
        taskDateTimes={taskDateTimes}
        taskId={1234}
        taskStatusColor={"#000000"}
        taskTimings={{ ...taskTimings, autoStartTiming: "-:-", autoEndTiming: "-:-" }}
      />
    );

    expect(getNodeText(document.querySelector("#taskActualEndTiming1234"))).toStrictEqual("07:25");
  });
});
