/**
 * @jest-environment jsdom
 */

import React from "react"
import {render, screen, fireEvent} from 'tests/renderTimezoneFilter'
import '@testing-library/jest-dom'

import Task from 'src/components/tasks/task';

const task = {
  above_below_wing: "ABOVE_WING",
  planned_start_datetime: "2021-08-30T11:05:00Z",
  id: 23444,
  is_applicable: false,
  task_additional_information: [],
  name: "Marshaller",
  comments: [
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ],
  number_of_comments: 3,
  messages: [
    { id: 2 },
    { id: 3 },
  ],
  number_of_messages: 2,
};

const turnaround = {
  arrival_flight: [{}],
  id: 12345,
  normal_tasks_above_wing: [
    task,
  ],
};

const openTaskCommentsFunction = () => {};
const openTaskMessagesFunction = () => {};

const spyOpenTaskCommentsFunction = jest.fn(openTaskCommentsFunction);
const spyOpenTaskMessagesFunction = jest.fn(openTaskMessagesFunction);


const status = 'Did not start';

describe('Task', () => {
  describe('permanent data displayed on the Task', () => {
    it('fetch status fail and display initial value of isApplicable', () => {
      const { rerender } = render(<Task
        task={task}
        turnaround={turnaround}
        selectedTasksDetails={[task]}
        closeTask={() => {}}
        getTaskDetail={() => {}}
        taskDetailStatus={[{status: 'default', statusCode: 0, taskId: task.id }]}
        taskApplicableStatus={{status: 'default', statusCode: 0}}
        resetTaskApplicableStatus={() => {}}
        updateTaskApplicableValue={() => {}}
        updateTaskTiming={() => {}}
        taskTimingStatus={{status: 'default', statusCode: 0}}
        resetTaskTimingStatus={() => {}}
        progressBarTimingStatus={{status: 'default', statusCode: 0}}
        resetProgressBarTimingStatus={() => {}}
        />);
      
      let input = screen.getAllByRole('checkbox');
      fireEvent.click(input[1]);

      rerender(<Task
        task={task}
        turnaround={turnaround}
        selectedTasksDetails={[task]}
        closeTask={() => {}}
        getTaskDetail={() => {}}
        taskDetailStatus={[{status: 'fail', statusCode: 400, taskId: task.id }]}
        taskApplicableStatus={{status: 'fail', statusCode: 400}}
        resetTaskApplicableStatus={() => {}}
        updateTaskApplicableValue={() => {}}
        updateTaskTiming={() => {}}
        taskTimingStatus={{status: 'fail', statusCode: 400}}
        resetTaskTimingStatus={() => {}}
        progressBarTimingStatus={{status: 'fail', statusCode: 400}}
        resetProgressBarTimingStatus={() => {}}
        />);
      
        input = screen.getAllByRole('checkbox');

      expect(input[1].checked).toEqual(false);
    });

    it('fetch status success and display changed value of isApplicable', () => {
      const { rerender } = render(<Task
        task={task}
        turnaround={turnaround}
        selectedTasksDetails={[task]}
        closeTask={() => {}}
        getTaskDetail={() => {}}
        taskDetailStatus={[{status: 'default', statusCode: 0, taskId: task.id }]}
        taskApplicableStatus={{status: 'default', statusCode: 0}}
        resetTaskApplicableStatus={() => {}}
        updateTaskApplicableValue={() => {}}
        updateTaskTiming={() => {}}
        taskTimingStatus={{status: 'default', statusCode: 0}}
        resetTaskTimingStatus={() => {}}
        progressBarTimingStatus={{status: 'default', statusCode: 0}}
        resetProgressBarTimingStatus={() => {}}
        />);
      
      let input = screen.getAllByRole('checkbox');
      fireEvent.click(input[1]);

      rerender(<Task
          task={task}
          turnaround={turnaround}
          selectedTasksDetails={[{...task, is_applicable: true}]}
          closeTask={() => {}}
          getTaskDetail={() => {}}
          taskDetailStatus={[{status: 'success', statusCode: 200, taskId: task.id }]}
          taskApplicableStatus={{status: 'success', statusCode: 200}}
          resetTaskApplicableStatus={() => {}}
          updateTaskApplicableValue={() => {}}
          updateTaskTiming={() => {}}
          taskTimingStatus={{status: 'success', statusCode: 400}}
          resetTaskTimingStatus={() => {}}
          progressBarTimingStatus={{status: 'success', statusCode: 200}}
          resetProgressBarTimingStatus={() => {}}
          />);
      
        input = screen.getAllByRole('checkbox');

      expect(input[1].checked).toEqual(true);
    });

    beforeEach(() => {
      render(<Task
        task={task}
        turnaround={turnaround}
        selectedTasksDetails={[task]}
        closeTask={() => {}}
        getTaskDetail={() => {}}
        taskDetailStatus={[{status: 'success', statusCode: 200, taskId: task.id }]}
        taskApplicableStatus={{status: 'success', statusCode: 200}}
        resetTaskApplicableStatus={() => {}}
        updateTaskApplicableValue={() => {}}
        updateTaskTiming={() => {}}
        taskTimingStatus={{status: 'success', statusCode: 200}}
        resetTaskTimingStatus={() => {}}
        progressBarTimingStatus={{status: 'success', statusCode: 200}}
        resetProgressBarTimingStatus={() => {}}
        openTaskCommentsFunction={spyOpenTaskCommentsFunction}
        openTaskMessagesFunction={spyOpenTaskMessagesFunction}
      />);
    });

    it('should call openComments when clicking on commentButton', () => {
      fireEvent.click(document.querySelector("#taskCommentsButton23444"));
  
      expect(spyOpenTaskCommentsFunction).toHaveBeenCalled();
  
      spyOpenTaskCommentsFunction.mockClear();
      spyOpenTaskMessagesFunction.mockClear();
    });
  
    it('should call openMessages when clicking on messageButton', () => {
      fireEvent.click(document.querySelector("#taskMessagesButton23444"));
  
      expect(spyOpenTaskMessagesFunction).toHaveBeenCalled();
  
      spyOpenTaskMessagesFunction.mockClear();
      spyOpenTaskCommentsFunction.mockClear();
    });
  
    it('displays task name', () => {
      expect(screen.getByText(task.name)).toBeInTheDocument();
    });
  
    it('displays comments button', () => {
      expect(screen.getByText('Comments')).toBeInTheDocument();
    });
  
    it('displays message button', () => {
      expect(screen.getByText('Messages')).toBeInTheDocument();
    });

    it('display message icon', () => {
      expect(screen.getAllByAltText("task-bottom-icon").length).toStrictEqual(2);
    });

    it('display number of comments in the comment button', () => {
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('display number of messages in the message button', () => {
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('displays switch to false', () => {
      const input = screen.getAllByRole('checkbox');

      expect(input[0].checked).toEqual(false);
    })
  });
});
