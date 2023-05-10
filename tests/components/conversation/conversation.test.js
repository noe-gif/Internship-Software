/**
 * @jest-environment jsdom
*/

import React from "react";
import {fireEvent, getNodeText, render, screen} from 'tests/renderTimezoneFilter';
import '@testing-library/jest-dom';

import Conversation from 'src/components/conversation/conversation';

import { SUCCESS } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

const taskComment = {
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
      comment: "testing",
      date: "2021-09-23T08:56:37Z",
      id: 124367,
      picture: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJC",
      turnaround_task: 580990,
      username: "heloise.tronche"
    }
  ]  
}

const taskMessage = {
  messages: [
    {
      message: "Hello message",
      date: "2021-09-22T16:08:09Z",
      id: 123945,
      turnaround_task: 580990,
      username: "anthoine.dusselier"
    },
    {
      message: "Testing conversation component",
      date: "2021-09-23T08:56:37Z",
      id: 124367,
      turnaround_task: 580990,
      username: "heloise.tronche"
    }
  ]  
}

const turnaround = {
  arrival_flight: {
    carrier_code: "KL",
    flight_number: "605",
  },
  departure_flight : {
    carrier_code: "KL",
    flight_number: "606"
  }
}

window.HTMLElement.prototype.scrollIntoView = jest.fn();
// this component use scrollIntoView, this function is not implemented in jsdom

describe('Conversation', () => {
  describe('Tests when is comment data', () => {
    beforeEach(() => {
      render(
        <Conversation
          conversationData={taskComment.comments}
          conversationDataStatus={SUCCESS}
          conversationType='comment'
          turnaround={turnaround}
          username='anthoine.dusselier'
        />);
    });

    it('should display the different date in conversationData', () => {
      expect(getNodeText(document.querySelector("#conversationDate123945"))).toStrictEqual('22SEP21\u00a013:08');
      expect(getNodeText(document.querySelector("#conversationDate124367"))).toStrictEqual('23SEP21\u00a005:56');
      expect(document.querySelectorAll(".conversationUserDate").length).toStrictEqual(2);
    });

    it('should display the logged user username for every group of message', () => {
      expect(getNodeText(document.querySelector("#conversationUserName123945"))).toStrictEqual('anthoine.dusselier');
      expect(document.querySelectorAll(".conversationLoggedUserUsername").length).toStrictEqual(1);
    });

    it('should display the other user username for every group of message from a unique user', () => {
      expect(getNodeText(document.querySelector("#conversationUserName124367"))).toStrictEqual('heloise.tronche');
      expect(document.querySelectorAll(".conversationOtherUserUsername").length).toStrictEqual(1);
    });

    it('should display comment of other users', () => {
      expect(getNodeText(document.querySelector("#conversationText124367"))).toStrictEqual('testing');
    });

    it('should display comment of logged user', () => {
      expect(getNodeText(document.querySelector("#conversationText123945"))).toStrictEqual('Hello');
      expect(document.querySelectorAll(".conversationLoggedUserText").length).toStrictEqual(1);
    });

    it('should display placeholder on the conversation input button', () => {
      expect(screen.getByPlaceholderText("Write a comment")).toBeInTheDocument();
    });
  });
  describe('Tests when is message data', () => {
    it('should display placeholder on the conversation input button', () => {
      render(
        <Conversation
          conversationData={taskMessage.messages}
          conversationDataStatus={SUCCESS}
          conversationType='message'
          turnaround={turnaround}
          username='anthoine.dusselier'
        />
      );

      expect(screen.getByPlaceholderText("Write a message")).toBeInTheDocument();
    });

    it('should disable sent button when isDisabled is true', () => {
      render(
        <Conversation
          conversationData={taskMessage.messages}
          conversationDataStatus={SUCCESS}
          conversationType='message'
          turnaround={turnaround}
          username='anthoine.dusselier'
          isDisabled
        />
      );

      expect(screen.getByRole('button')).toBeDisabled();

      const conversationInputElement = document.querySelector(".conversationInput");
      
      fireEvent.change(conversationInputElement, { target: { value: 'Testing' } });

      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should enable sent conversation button when inputConversation value is not empty', () => {
      render(
        <Conversation
          conversationData={taskMessage.messages}
          conversationDataStatus={SUCCESS}
          conversationType='message'
          turnaround={turnaround}
          username='anthoine.dusselier'
        />
      );

      expect(screen.getByRole('button')).toBeDisabled();

      const conversationInputElement = document.querySelector(".conversationInput");
      
      fireEvent.change(conversationInputElement, { target: { value: 'Testing' } });

      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });
});