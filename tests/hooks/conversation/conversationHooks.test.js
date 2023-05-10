/**
 * @jest-environment jsdom
*/

import { renderHook, act } from 'tests/renderTimezoneFilter'

import '@testing-library/jest-dom';

import conversationHooks from 'src/hooks/conversation/conversationHooks';

import CONVERSATION_TEXT from 'src/constants/conversation/conversationText.json';

const conversationType = CONVERSATION_TEXT.conversation.conversationTypeComment;
const task = [
  {
    comment: "Hello",
    date: "2021-12-02T09:48:01Z",
    id: 160996,
    picture: null,
    turnaround_task: 706976,
    username: "anthoine.dusselier",
  },
  {
    comment: "HelloTest",
    date: "2021-12-02T10:48:01Z",
    id: 160997,
    picture: 'Yes its picture',
    turnaround_task: 706976,
    username: "anthoine.dusselier",
  }
];
const getConversationPicture = () => {};
const handleSend = () => {};
const resetConversationResponseStatus = () => {};

const spyHandleSend = jest.fn(handleSend);
const spyResetConversationResponseStatus = jest.fn(resetConversationResponseStatus);

describe('CONVERSATION HOOKS', () => {
  describe('sendConversation function', () => {
    it(' should called handleSend function', () => {
      const { result } = renderHook(
        () => conversationHooks(
          conversationType,
          spyHandleSend,
          task,
          getConversationPicture,
          false,
          resetConversationResponseStatus,
        )
      );

      act(() => {
        result.current.sendConversation({ target: { value: { comment: 'text', picture: '' } } });
      });

      expect(spyHandleSend).toBeCalledWith({ target: { value: { comment: 'text', picture: '' } } }, { comment: '', picture: '' });
    });
  });

  describe('classnamesDisplay function', () => {
    it('should return all classnames with user.tester as classNamePrefix', () => {
      const { result } = renderHook(
        () => conversationHooks(
          conversationType,
          handleSend,
          task,
          getConversationPicture,
          false,
          resetConversationResponseStatus,
        )
      );

      const functionResult = result.current.classnamesDisplay('user.tester');

      expect(functionResult).toStrictEqual({
        wrapperConversationLine: 'conversationuser.testerUserWrapper',
        username: 'conversationuser.testerUserUsername',
        wrapperPicture: 'conversationuser.testerUserImgWrapper',
        picture: 'conversationuser.testerUserImg',
        wrapperConversation: 'conversationuser.testerUserTextWrapper',
        conversation: 'conversationuser.testerUserText',
        conversationContent: "conversationuser.testerUserContent",
      });
    });
  });

  describe('whichPlaceHolderPut function', () => {
    it('should return the comment placeholder', () => {
      const { result } = renderHook(
        () => conversationHooks(
          conversationType,
          handleSend,
          task,
          getConversationPicture,
          false,
          resetConversationResponseStatus,
        )
      );

      const resultFunction = result.current.whichPlaceHolderPut();

      expect(resultFunction).toStrictEqual(CONVERSATION_TEXT.conversation.inputCommentPlaceholder);
    });
  });

  describe('isNotSameDate function', () => {
    it('should return true providing 1 as index', () => {
      const { result } = renderHook(
        () => conversationHooks(
          conversationType,
          handleSend,
          task,
          getConversationPicture,
          false,
          resetConversationResponseStatus,
        )
      );

      const resultFunction = result.current.isNotSameDate(1);

      expect(resultFunction).toBeTruthy();
    });
  });

  describe('isPicture', () => {
    it('should return true when providing comment index that contain a picture', () => {
      const { result } = renderHook(
        () => conversationHooks(
          conversationType,
          handleSend,
          task,
          getConversationPicture,
          false,
          resetConversationResponseStatus,
        )
      );

      const resultFunction = result.current.isPicture(1);

      expect(resultFunction).toBeTruthy();
    });
  });

  describe('showDeleteConversationModal function', () => {
    it('should had called resetConversationResponseStatus function', () => {
      const { result } = renderHook(
        () => conversationHooks(
          conversationType,
          handleSend,
          task,
          getConversationPicture,
          false,
          spyResetConversationResponseStatus,
        )
      );

      act(() => {
        result.current.showDeleteConversationModal({ comment: 'Hello', id: 12344 });
      });

      expect(spyResetConversationResponseStatus).toHaveBeenCalled();
      
      spyResetConversationResponseStatus.mockClear();
    });
  });

  describe('isUserTypeLogged function', () => {
    it('should return true when providing userType to Logged', () => {
      const { result } = renderHook(
        () => conversationHooks(
          conversationType,
          handleSend,
          task,
          getConversationPicture,
          false,
          resetConversationResponseStatus,
        )
      );

      expect(result.current.isUserTypeLogged('Logged')).toBeTruthy();
      
    });

    it('should return false when providing userType to Other', () => {
      const { result } = renderHook(
        () => conversationHooks(
          conversationType,
          handleSend,
          task,
          getConversationPicture,
          false,
          resetConversationResponseStatus,
        )
      );


      expect(result.current.isUserTypeLogged('Other')).toBeFalsy();
      
    });
  });
});
