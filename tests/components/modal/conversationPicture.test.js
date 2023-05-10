/**
 * @jest-environment jsdom
*/

import React from "react";
import { getNodeText, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import ConversationPicture from 'src/components/modal/conversationPicture';

const picture = {
  picture: '/9j/4AAQSkZJRgABAQAASABIAAD/4QBYRXhpZgAATU0AKgAAA',
};

describe('ConversationPicture component', () => {
  it('should render primary element of this component', () => {
    render(
      <ConversationPicture
        picture={picture}
        pictureIndex={123455}
        pictureRequestStatus={'success'}
        pictureResponseErrorStatusCode={200}
        showModal={() => {}}
      />
    );

    expect(screen.getByAltText('Close Icon')).toBeInTheDocument();
    expect(screen.getByAltText('Conversation 123455')).toBeInTheDocument();
  });

  it('should not render the conversation picture when status is equal to Loading', () => {
    render(
      <ConversationPicture
        picture={picture}
        pictureIndex={123455}
        pictureRequestStatus={'loading'}
        pictureResponseErrorStatusCode={0}
        showModal={() => {}}
      />
    );

    expect(screen.getByAltText('Close Icon')).toBeInTheDocument();
    expect(document.querySelector('conversationPictureImage123455')).toBeNull();
  });

  it('should fetch status 403 and display an error message when status is equal to fail', () => {
    render(
      <ConversationPicture
        picture={picture}
        pictureIndex={123455}
        pictureRequestStatus={'fail'}
        pictureResponseErrorStatusCode={403}
        showModal={() => {}}
      />
    );

    expect(getNodeText(document.querySelector('#conversationPictureErrorMessage123455')))
    .toStrictEqual("You don't have the authorization to access to this picture");    
    expect(document.querySelector('conversationPictureImage123455')).toBeNull();
  });

  it('should fetch status 500 and display an error message when status is equal to fail', () => {
    render(
      <ConversationPicture
        picture={picture}
        pictureIndex={123455}
        pictureRequestStatus={'fail'}
        pictureResponseErrorStatusCode={500}
        showModal={() => {}}
      />
    );

    expect(getNodeText(document.querySelector('#conversationPictureErrorMessage123455')))
    .toStrictEqual("Failed to get the picture");
    expect(document.querySelector('conversationPictureImage123455')).toBeNull();
  });

  it('should fetch status 400 and display an error message  when status is equal to fail', () => {
    render(
      <ConversationPicture
        picture={picture}
        pictureIndex={123455}
        pictureRequestStatus={'fail'}
        pictureResponseErrorStatusCode={400}
        showModal={() => {}}
      />
    );

    expect(getNodeText(document.querySelector('#conversationPictureErrorMessage123455')))
    .toStrictEqual("The information that you provide is not valid");
    expect(document.querySelector('conversationPictureImage123455')).toBeNull();
  });

  it('should fetch status 401 and display an error message  when status is equal to fail', () => {
    render(
      <ConversationPicture
        picture={picture}
        pictureIndex={123455}
        pictureRequestStatus={'fail'}
        pictureResponseErrorStatusCode={401}
        showModal={() => {}}
      />
    );

    expect(getNodeText(document.querySelector('#conversationPictureErrorMessage123455')))
    .toStrictEqual("The access token provided is invalid");
    expect(document.querySelector('conversationPictureImage123455')).toBeNull();
  });

  it('should fetch status 404 and display an error message  when status is equal to fail', () => {
    render(
      <ConversationPicture
        picture={picture}
        pictureIndex={123455}
        pictureRequestStatus={'fail'}
        pictureResponseErrorStatusCode={404}
        showModal={() => {}}
      />
    );

    expect(getNodeText(document.querySelector('#conversationPictureErrorMessage123455')))
    .toStrictEqual("Image not found");
    expect(document.querySelector('conversationPictureImage123455')).toBeNull();
  });
});