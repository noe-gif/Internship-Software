/**
 * @jest-environment jsdom
 */

import React from "react"
import {render, fireEvent, getNodeText} from '@testing-library/react'
import '@testing-library/jest-dom'

import TaskTimingButton from 'src/components/tasks/taskContent/taskTimingButton';

const taskId = 12345;
const className = 'className';
const label = 'label';

const onClick = () => {};
const spyOnClick = jest.fn(onClick);

describe('TaskTimingButton', () => {
  it('should display taskButton label', () => {
    render(
      <TaskTimingButton
        className={className}
        label={label}
        onClick={onClick}
        taskId={taskId}
      />
    );

    expect(getNodeText(document.querySelector("#taskButton12345Labellabel"))).toStrictEqual("label");
  });

  it('should call onClick when clicking on timingButton', () => {
    render(
      <TaskTimingButton
        className={className}
        label={label}
        onClick={spyOnClick}
        taskId={taskId}
      />
    );

    fireEvent.click(document.querySelector("#taskButton12345label"));

    expect(spyOnClick).toHaveBeenCalled();
  });
})
