/**
 * @jest-environment jsdom
*/

import React from "react";
import { getNodeText, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import AirportLocation from 'src/components/modal/airportLocation';

describe('AirportLocation component', () => {
  it('should render primary element in AirportLocation when arrival parking stand is trigger', () => {
    render(
      <AirportLocation 
        responseStatus={{status: 'success', statusCode: 200 }}
        textTriggerType='arrival'
        initialTextValue='TT45'
        showModal={() => {}}
        parkingStandToSend={() => {}}
        errorMessage=''
      />);
    
    expect(getNodeText(document.querySelector('#airportLocationName')))
    .toStrictEqual('Arrival Parking Stand');

    expect(getNodeText(document.querySelector('#airportLocationSubTitle')))
    .toStrictEqual('Please enter the arrival parking stand');

    expect(screen.getByDisplayValue('TT45')).toBeInTheDocument();
    expect(getNodeText(document.querySelector('#airportLocationCancelButton'))).toStrictEqual('Cancel');    
    expect(getNodeText(document.querySelector('#airportLocationResetButton'))).toStrictEqual('Reset');    

    expect(getNodeText(document.querySelector('#airportLocationConfirmButton')))
    .toStrictEqual('Confirm');

    expect(getNodeText(document.querySelector('#airportLocationBothParkingStandButton')))
    .toStrictEqual('Confirm & Apply for departure parking stand');    
  });

  it('should render primary element in AirportLocation when departure parking stand is trigger', () => {
    render(
      <AirportLocation 
        responseStatus={{status: 'success', statusCode: 200 }}
        textTriggerType='departure'
        initialTextValue='DDD5'
        showModal={() => {}}
        parkingStandToSend={() => {}}
        errorMessage=''
      />);

    expect(getNodeText(document.querySelector('#airportLocationName')))
    .toStrictEqual('Departure Parking Stand');

    expect(getNodeText(document.querySelector('#airportLocationSubTitle')))
    .toStrictEqual('Please enter the departure parking stand');

    expect(screen.getByDisplayValue('DDD5')).toBeInTheDocument();
    expect(getNodeText(document.querySelector('#airportLocationCancelButton'))).toStrictEqual('Cancel');    
    expect(getNodeText(document.querySelector('#airportLocationResetButton'))).toStrictEqual('Reset');    

    expect(getNodeText(document.querySelector('#airportLocationConfirmButton')))
    .toStrictEqual('Confirm');    

    expect(getNodeText(document.querySelector('#airportLocationBothParkingStandButton')))
    .toStrictEqual('Confirm & Apply for arrival parking stand');    
  });

  it('should fetch status 200 and display nothing', () => {

    render(
      <AirportLocation 
      responseStatus={{status: 'success', statusCode: 200 }}
      textTriggerType='arrival'
      initialTextValue='TT45'
      showModal={() => {}}
      parkingStandToSend={() => {}}
      errorMessage=''
      />
    );

      expect(screen.getByDisplayValue('TT45')).toBeInTheDocument();
  });

  it('should fetch status 403 and display an error message', () => {
    render(
      <AirportLocation 
      responseStatus={{status: 'fail', statusCode: 403 }}
      textTriggerType='arrival'
      initialTextValue='TT45'
      showModal={() => {}}
      parkingStandToSend={() => {}}
      errorMessage=''
      />
    );

    expect(getNodeText(document.querySelector('#airportLocationErrorStatusMessage')))
    .toStrictEqual("You don't have the authorization to modify this value");    
  });

  it('should fetch status 500 and display an error message', () => {
    render(
      <AirportLocation 
        responseStatus={{status: 'fail', statusCode: 500 }}
        textTriggerType='arrival'
        initialTextValue='TT45'
        showModal={() => {}}
        parkingStandToSend={() => {}}
        errorMessage=''
      />
    );

    expect(getNodeText(document.querySelector('#airportLocationErrorStatusMessage')))
    .toStrictEqual("Failed to register the parking stand");    
  });

  it('should fetch status 400 and display an error message ', () => {
    render(
      <AirportLocation 
        responseStatus={{status: 'fail', statusCode: 400 }}
        textTriggerType='arrival'
        initialTextValue='TT45'
        showModal={() => {}}
        parkingStandToSend={() => {}}
        errorMessage=''
      />
    );

    expect(getNodeText(document.querySelector('#airportLocationErrorStatusMessage')))
    .toStrictEqual("The information that you provide is not valid");    
  });

  it('should fetch status 401 and display an error message ', () => {
    render(
      <AirportLocation 
        responseStatus={{status: 'fail', statusCode: 401 }}
        textTriggerType='arrival'
        initialTextValue='TT45'
        showModal={() => {}}
        parkingStandToSend={() => {}}
        errorMessage=''
      />
    );

    expect(getNodeText(document.querySelector('#airportLocationErrorStatusMessage')))
    .toStrictEqual("The access token provided is invalid");    
  });

  it('should fetch status 404 and display an error message ', () => {
    render(
      <AirportLocation 
        responseStatus={{status: 'fail', statusCode: 404 }}
        textTriggerType='arrival'
        initialTextValue='TT45'
        showModal={() => {}}
        parkingStandToSend={() => {}}
        errorMessage=''
      />
    );

    expect(getNodeText(document.querySelector('#airportLocationErrorStatusMessage')))
    .toStrictEqual("Page not found");    
  });
});