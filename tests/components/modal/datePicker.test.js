/**
 * @jest-environment jsdom
*/

import React from "react";
import { getNodeText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import DatePicker from 'src/components/modal/datePicker';


describe('DatePicker', () => {
  it('render primary element in DatePicker', () => {
    render(
      <DatePicker 
        responseStatus={{status: 'success', statusCode: 200 }}
        dateTimingTriggerId='rta'
        initialDateValue='2021-11-09'
        initialTimingValue='12:33'
        showModal={() => {}}
        onChangeDateToSend={() => {}}
        errorMessage=''
      />);
    
    expect(getNodeText(document.querySelector('#datePickerName')))
    .toStrictEqual('RTA');

    expect(screen.getByDisplayValue('12:33')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2021-11-09')).toBeInTheDocument();

    expect(getNodeText(document.querySelector('#datePickerCancelButton'))).toStrictEqual('Cancel');    
    expect(getNodeText(document.querySelector('#datePickerResetButton'))).toStrictEqual('Reset');    

    expect(getNodeText(document.querySelector('#datePickerConfirmButton')))
    .toStrictEqual('Confirm');
  });

  it('fetch status 200 and display nothing', () => {

    render(
      <DatePicker 
        responseStatus={{status: 'success', statusCode: 200 }}
        dateTimingTriggerId='rta'
        initialDateValue='2021-11-09'
        initialTimingValue='12:33'
        showModal={() => {}}
        onChangeDateToSend={() => {}}
        errorMessage=''
      />
    );

      expect(screen.getByDisplayValue('12:33')).toBeInTheDocument();
  });

  it('fetch status 403 and display an error message', () => {
    render(
      <DatePicker 
        responseStatus={{status: 'fail', statusCode: 403 }}
        dateTimingTriggerId='rta'
        initialDateValue='2021-11-09'
        initialTimingValue='12:33'
        showModal={() => {}}
        onChangeDateToSend={() => {}}
        errorMessage=''
      />
    );

    expect(getNodeText(document.querySelector('#datePickerErrorStatusMessage')))
    .toStrictEqual("You don't have the authorization to modify this value");  
  });

  it('fetch status 500 and display an error message', () => {
    render(
      <DatePicker 
        responseStatus={{status: 'fail', statusCode: 500 }}
        dateTimingTriggerId='rta'
        initialDateValue='2021-11-09'
        initialTimingValue='12:33'
        showModal={() => {}}
        onChangeDateToSend={() => {}}
        errorMessage=''
      />
    );

    expect(getNodeText(document.querySelector('#datePickerErrorStatusMessage')))
    .toStrictEqual("Failed to register new timing");
  });

  it('fetch status 400 and display an error message ', () => {
    render(
      <DatePicker 
        responseStatus={{status: 'fail', statusCode: 400 }}
        dateTimingTriggerId='rta'
        initialDateValue='2021-11-09'
        initialTimingValue='12:33'
        showModal={() => {}}
        onChangeDateToSend={() => {}}
        errorMessage=''
      />
    );
    
    expect(getNodeText(document.querySelector('#datePickerErrorStatusMessage')))
    .toStrictEqual("The information that you provide is not valid");
  });

  it('fetch status 401 and display an error message ', () => {
    render(
      <DatePicker 
        responseStatus={{status: 'fail', statusCode: 401 }}
        dateTimingTriggerId='rta'
        initialDateValue='2021-11-09'
        initialTimingValue='12:33'
        showModal={() => {}}
        onChangeDateToSend={() => {}}
        errorMessage=''
      />
    );

    expect(getNodeText(document.querySelector('#datePickerErrorStatusMessage')))
    .toStrictEqual("The access token provided is invalid");
  });
});