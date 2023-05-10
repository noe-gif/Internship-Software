/**
 * @jest-environment jsdom
*/

import React from "react";
import { getNodeText, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import DeleteConversationModal  from 'src/components/modal/deleteConversationModal';

describe('DeleteConversationModal component', () => {
  it('should render primary element of this component', () => {
    render(
      <DeleteConversationModal
        conversation={{id: 12344, comment: 'Hello'}}
        conversationType='comment'
        deleteConversation={() => {}}
        responseStatus={{ status: 'success', statusCode: 200}}
        showModal={() => {}}
      />
    );

    expect(getNodeText(document.querySelector('#deleteConversationModalTitle12344')))
    .toStrictEqual('Are you sure you want to delete this comment');

    expect(getNodeText(document.querySelector('#deleteConversationModalText12344')))
    .toStrictEqual('Hello');

    expect(getNodeText(document.querySelector('#deleteConversationModalCancelButton12344')))
    .toStrictEqual('Cancel');

    expect(getNodeText(document.querySelector('#deleteConversationModalConfirmButton12344')))
    .toStrictEqual('Confirm');
  });

  it('should fetch status 403 and display an error message', () => {
    render(
      <DeleteConversationModal
        conversation={{id: 12344, comment: 'Hello'}}
        conversationType='comment'
        deleteConversation={() => {}}
        responseStatus={{ status: 'fail', statusCode: 403 }}
        showModal={() => {}}
      />
    );

    expect(getNodeText(document.querySelector('#deleteConversationModalErrorStatusMessage12344')))
    .toStrictEqual("You don't have the authorization to modify this value");    
  });

  it('should fetch status 500 and display an error message', () => {
    render(
      <DeleteConversationModal
        conversation={{id: 12344, comment: 'Hello'}}
        conversationType='comment'
        deleteConversation={() => {}}
        responseStatus={{ status: 'fail', statusCode: 500 }}
        showModal={() => {}}
      />
    );

    expect(getNodeText(document.querySelector('#deleteConversationModalErrorStatusMessage12344')))
    .toStrictEqual("Failed to delete this conversation");    
  });

  it('should fetch status 400 and display an error message ', () => {
    render(
      <DeleteConversationModal
      conversation={{id: 12344, comment: 'Hello'}}
      conversationType='comment'
      deleteConversation={() => {}}
      responseStatus={{ status: 'fail', statusCode: 400 }}
      showModal={() => {}}
    />
    );

    expect(getNodeText(document.querySelector('#deleteConversationModalErrorStatusMessage12344')))
    .toStrictEqual("The information that you provide is not valid");    
  });

  it('should fetch status 401 and display an error message ', () => {
    render(
      <DeleteConversationModal
        conversation={{id: 12344, comment: 'Hello'}}
        conversationType='comment'
        deleteConversation={() => {}}
        responseStatus={{ status: 'fail', statusCode: 401 }}
        showModal={() => {}}
      />
    );

    expect(getNodeText(document.querySelector('#deleteConversationModalErrorStatusMessage12344')))
    .toStrictEqual("The access token provided is invalid");    
  });

  it('should fetch status 404 and display an error message ', () => {
    render(
      <DeleteConversationModal
      conversation={{id: 12344, comment: 'Hello'}}
      conversationType='comment'
      deleteConversation={() => {}}
      responseStatus={{ status: 'fail', statusCode: 404 }}
      showModal={() => {}}
    />
    );

    expect(getNodeText(document.querySelector('#deleteConversationModalErrorStatusMessage12344')))
    .toStrictEqual("Page not found");    
  });
});