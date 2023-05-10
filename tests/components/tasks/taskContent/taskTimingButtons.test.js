/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import TaskTimingButtons from 'src/components/tasks/taskContent/taskTimingButtons';

const taskTimings = {
  status: 'Completed Late',
  plannedStartDatetime: "2022-01-20T13:30:00Z",
  actualEndDatetime: "2022-01-20T13:45:00Z"
};

const triggerTiming = () => {};
const spyTriggerTiming = jest.fn(triggerTiming);

describe('TaskTimingButtons', () => {
  it('should call onClickTaskTiming with start as parameter when clicking on startButton', () => {
    render(
      <TaskTimingButtons
        triggerTiming={spyTriggerTiming}
        taskId={12345}
        taskTimings={taskTimings}
      />
    );

    fireEvent.click(document.querySelector("#taskButton12345Start"));

    expect(spyTriggerTiming).toHaveBeenCalledWith('start');

    spyTriggerTiming.mockClear();
  });

  it('should call onClickTaskTiming with end as parameter when clicking on endButton', () => {
    render(
      <TaskTimingButtons
        triggerTiming={spyTriggerTiming}
        taskId={12345}
        taskTimings={taskTimings}
      />
    );

    fireEvent.click(document.querySelector("#taskButton12345Finish"));

    expect(spyTriggerTiming).toHaveBeenCalledWith('end');

    spyTriggerTiming.mockClear();
  });
});
