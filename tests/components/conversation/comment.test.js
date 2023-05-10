/**
 * @jest-environment jsdom
*/

import React from "react";
import {getNodeText, render, screen } from 'tests/renderTimezoneFilter';
import '@testing-library/jest-dom';

import Comment from 'src/components/tasks/comment';

import { SUCCESS } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

const task = {
  id: 12345,
  comments: [
    {
      comment: "Hello",
      date: "2021-09-22T16:08:09Z",
      id: 123945,
      picture: null,
      turnaround_task: 580990,
      username: "anthoine.dusselier"
    },
    {
      comment: "toto",
      date: "2021-09-23T08:56:37Z",
      id: 124367,
      picture: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJC",
      turnaround_task: 580990,
      username: "heloise.tronche"
    }
  ]  
};

const turnaround = {
  arrival_flight: {
    carrier_code: "KL",
    flight_number: "605",
  },
  departure_flight : {
    carrier_code: "KL",
    flight_number: "606"
  },
  normal_tasks_above_wing: [
    task,
  ],
  normal_tasks_below_wing: [],
};

window.HTMLElement.prototype.scrollIntoView = jest.fn();
// this component use scrollIntoView, this function is not implemented in jsdom

describe('CommentCard', () => {
  describe('tests rendering html element in CommentCard', () => {
    beforeEach(() => {
      render(
        <Comment
          getTaskComments={() => {}}
          selectedTasksDetails={[task]}
          task={task}
          taskCommentsRequestStatus={{ taskId: 12345, status: SUCCESS }}
          turnaround={turnaround}
        />);
    });

    it('displays the date', () => {
      expect(getNodeText(document.querySelector("#conversationDate123945"))).toStrictEqual('22SEP21\u00a013:08');
    });

    it('displays the logged user username', () => {
      expect(getNodeText(document.querySelector("#conversationUserName123945"))).toStrictEqual('anthoine.dusselier');
    });

    it('displays the other user username', () => {
      expect(getNodeText(document.querySelector("#conversationUserName124367"))).toStrictEqual('heloise.tronche');
    });

    it('displays the comment of the other user', () => {
      expect(getNodeText(document.querySelector("#conversationText124367"))).toStrictEqual('toto');
    });

    it('displays the comment of the logged user', () => {
      expect(getNodeText(document.querySelector("#conversationText123945"))).toStrictEqual('Hello');
    });

    it('displays the placeholder on the input button', () => {
      expect(screen.getByPlaceholderText("Write a comment")).toBeInTheDocument();
    });
  })
})