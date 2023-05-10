/**
 * @jest-environment jsdom
*/

import React from "react";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddInfoCompletionStatus from 'src/components/tasks/addInfos/AddInfoCompletionStatus';

const notCompletedTask = {
  id: 23444,
  is_applicable: true,
  task_additional_information: [
    {
      auto_value: null,
      value: null
    },
    {
      auto_value: 'filled',
      value: 'test',
    }
  ],
};

const taskNotApplicable = {
  id: 23444,
  is_applicable: false,
  task_additional_information: [
    {
      auto_value: 'filled',
      value: 'test',
    }
  ],
};

const visibleTask = {
  id: 23444,
  is_applicable: true,
  task_additional_information: [
    {
      auto_value: 'test',
      value: 'test'
    },
    {
      auto_value: 'filled',
      value: 'test',
    }
  ],
};

const emptyAndApplicableTask = {
  id: 23444,
  is_applicable: true,
  task_additional_information: [],
};


const componentSize = 'large';

describe('AddInfoCompletionStatus', () => {
  it('should display a red background color in case of not completed task add info and applicable', () => {
    render(
      <AddInfoCompletionStatus task={notCompletedTask} componentSize={componentSize} />
    ); 
    expect(document.querySelector('#AddInfoCompletionStatus23444')).toHaveStyle(`backgroundColor: red`);
    expect(document.querySelector('#AddInfoCompletionStatus23444')).toHaveStyle(`visibility: visible`);
  });

  it('should not display the completion status in case of not applicable task', () => {
    render(
      <AddInfoCompletionStatus task={taskNotApplicable} componentSize={componentSize} />
    ); 
    expect(document.querySelector('#AddInfoCompletionStatus23444')).toHaveStyle(`visibility: hidden`);
  });

  it('should display a greeb background color in case of completed task add info and applicable', () => {
    render(
      <AddInfoCompletionStatus task={visibleTask} componentSize={componentSize} />
    ); 
    expect(document.querySelector('#AddInfoCompletionStatus23444')).toHaveStyle(`backgroundColor: green`);
    expect(document.querySelector('#AddInfoCompletionStatus23444')).toHaveStyle(`visibility: visible`);
  });

  it('should not display the completion status in case of non existent add info and not applicable task', () => {
    render(
      <AddInfoCompletionStatus task={emptyAndApplicableTask} componentSize={componentSize} />
    ); 
    expect(document.querySelector('#AddInfoCompletionStatus23444')).toHaveStyle(`visibility: hidden`);
  });
});