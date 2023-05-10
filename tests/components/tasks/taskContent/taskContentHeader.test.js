/**
 * @jest-environment jsdom
 */

import React from "react"
import {render, screen, fireEvent, getNodeText} from '@testing-library/react'
import '@testing-library/jest-dom'

import TaskContentHeader from 'src/components/tasks/taskContent/taskContentHeader';

const filteredTask = {
  id: 12345,
  name: 'Jetbridge',
  status: 'Completed Late',
  status_color: 'red',
  start_description: 'start',
  end_description: 'end'
};

const isApplicable = true;

const changeTaskIsApplicable = () => {};
const spyChangeTaskIsApplicable = jest.fn(changeTaskIsApplicable);

describe('TaskContentHeader', () => {
  it('should display task logo', () => {
    render(
      <TaskContentHeader
        changeTaskIsApplicable={changeTaskIsApplicable}
        isApplicable={isApplicable}
        taskId={12345}
        taskName={filteredTask.name}
        taskStatus={{ status: filteredTask.status, statusColor: filteredTask.status_color }}
        taskDescription={{ start: filteredTask.start_description, end: filteredTask.end_description }}
      />
    );

    expect(document.querySelector("#Jetbridge12345Logo")).toBeInTheDocument();
  });

  it('should display task name and status', () => {
    render(
      <TaskContentHeader
        changeTaskIsApplicable={changeTaskIsApplicable}
        isApplicable={isApplicable}
        taskId={12345}
        taskName={filteredTask.name}
        taskStatus={{ status: filteredTask.status, statusColor: filteredTask.status_color }}
        taskDescription={{ start: filteredTask.start_description, end: filteredTask.end_description }}
      />
    );

    expect(getNodeText(document.querySelector("#Jetbridge12345Name"))).toStrictEqual("Jetbridge");
    expect(getNodeText(document.querySelector("#Jetbridge12345Status"))).toStrictEqual("Completed Late");
  });

  it('should call changeTaskIsApplicable when clicking on Switch button', () => {
    render(
      <TaskContentHeader
        changeTaskIsApplicable={spyChangeTaskIsApplicable}
        isApplicable={isApplicable}
        taskId={12345}
        taskName={filteredTask.name}
        taskStatus={{ status: filteredTask.status, statusColor: filteredTask.status_color }}
        taskDescription={{ start: filteredTask.start_description, end: filteredTask.end_description }}
      />
    );

    fireEvent.click(document.querySelector("#Jetbridge12345Switch"));

    expect(spyChangeTaskIsApplicable).toHaveBeenCalled();

    spyChangeTaskIsApplicable.mockClear();
  });
});
