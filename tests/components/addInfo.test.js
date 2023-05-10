/**
 * @jest-environment jsdom
*/

import React from "react";
import { fireEvent, getNodeText, render } from '@testing-library/react';
import { TimezoneFilterProvider } from 'src/context/timezoneFilterContext';
import '@testing-library/jest-dom';

import AddInfo from 'src/components/tasks/addInfos/addInfo';

import { Provider } from 'react-redux';
import store from 'src/store';

const addInfoText = {
  auto_value: null,
  custom_label: "01- Nom agent embarquement",
  id: 26630553,
  information_type: "TEXT",
  is_required: false,
  order: 1,
  value: 'michelle',
};

const addInfoNumber = {
  auto_value: null,
  custom_label: "02- Numéro tél embarquement",
  id: 26630554,
  information_type: "NUMBER",
  is_required: false,
  order: 2,
  value: 12,
};

const addInfoDate = {
  auto_value: null,
  custom_label: "10- Dernier pax à l'avion",
  id: 26630562,
  information_type: "DATETIME",
  is_required: false,
  order: 10,
  value: '2021-11-22T10:25:00Z',
};

const addInfoCheckbox = {
  auto_value: null,
  custom_label: "Impression de la LDS par TRC ?",
  id: 26630584,
  information_type: "CHECKBOX",
  is_required: false,
  order: 1,
  value: false,
};

const addInfoCheckboxNull = {
  auto_value: null,
  custom_label: "Impression de la LDS par TRC ?",
  id: 26630584,
  information_type: "CHECKBOX",
  is_required: false,
  order: 1,
  value: null,
};

const addInfoCheckboxTrue = {
  auto_value: null,
  custom_label: "Impression de la LDS par TRC ?",
  id: 26630584,
  information_type: "CHECKBOX",
  is_required: false,
  order: 1,
  value: true,
};

const Wrapper = ({ children }) => (
   <TimezoneFilterProvider>
      <Provider store={store}>{children}</Provider>
   </TimezoneFilterProvider>
);

describe('AddInfos', () => {
  describe('AddInfoText', () => {
    it('should fetch the success status and display modify value of addInfoText', () => {
      const {rerender} = render(
        <AddInfo
          addInfo={addInfoText}
        />,
        { wrapper: Wrapper },
      );

      let addInfoTypeText = document.querySelector("#addInfoTypeText26630553");

      fireEvent.change(addInfoTypeText, { target: { value: 'marco' } });

      rerender(<AddInfo
        addInfo={addInfoText}
      />);

      addInfoTypeText = document.querySelector("#addInfoTypeText26630553");

      expect(addInfoTypeText.value).toStrictEqual('marco');
    });

    it('should display the add info text custom label', () => {
      render(
        <AddInfo
          addInfo={addInfoText}
        />,
        { wrapper: Wrapper },
      );

      expect(getNodeText(document.querySelector('#addInfoCustomLabel26630553')))
      .toStrictEqual(addInfoText.custom_label);

    });

    it('should display the placeholder of the input text when receive an addInfoText', () => {
      render(
        <AddInfo
          addInfo={addInfoText}
        />,
        { wrapper: Wrapper },
      );

      const addInfoTypeText = document.querySelector("#addInfoTypeText26630553");

      expect(addInfoTypeText.placeholder).toStrictEqual('Text');
    });

    it('should display the add info text display value', () => {
      render(
        <AddInfo
          addInfo={addInfoText}
        />,
        { wrapper: Wrapper },
      );

      const addInfoTypeText = document.querySelector("#addInfoTypeText26630553");

      expect(addInfoTypeText.value).toStrictEqual('michelle');
    });

    it('should display the addInfoTypeText auto value if it exists', () => {
      render(
        <AddInfo
          addInfo={{...addInfoText, auto_value: 'test'}}
        />,
        { wrapper: Wrapper },
      );

      const addInfoTypeText = document.querySelector("#addInfoTypeText26630553");

      expect(addInfoTypeText.value).toStrictEqual('test');
    });
  });

  
  describe('AddInfoNumber', () => {
    it('should fetch success status and display modify value of addInfoNumber', () => {
      const { rerender } = render(
        <AddInfo
          addInfo={addInfoNumber}
        />,
        { wrapper: Wrapper },
      );

      let addInfoTypeNumber = document.querySelector("#addInfoTypeNumber26630554");
      
      fireEvent.change(addInfoTypeNumber, { target: { value: 15 } });
      
      rerender(
        <AddInfo
          addInfo={addInfoNumber}
        />,
        { wrapper: Wrapper }
      );

      addInfoTypeNumber = document.querySelector("#addInfoTypeNumber26630554");

      expect(addInfoTypeNumber.value).toStrictEqual("15");
    });

    it('should display the correct add info number custom label', () => {
      render(
        <AddInfo
          addInfo={addInfoNumber}
        />,
        { wrapper: Wrapper },
      );

      expect(getNodeText(document.querySelector('#addInfoCustomLabel26630554')))
      .toStrictEqual(addInfoNumber.custom_label);
    });

    it('should display the input placeholder number when receive an addInfoNumber', () => {
      render(
        <AddInfo
          addInfo={addInfoNumber}
        />,
        { wrapper: Wrapper },
      );

      const addInfoTypeNumber = document.querySelector("#addInfoTypeNumber26630554");
      expect(addInfoTypeNumber.placeholder).toStrictEqual('Number');
    });

    it('should display the addInfoTypeText auto value if it exists', () => {
      render(
        <AddInfo
        addInfo={{...addInfoNumber, auto_value: '2'}}
        />,
        { wrapper: Wrapper },
      );

      const addInfoTypeNumber = document.querySelector("#addInfoTypeNumber26630554");
      expect(addInfoTypeNumber.value).toStrictEqual('2');
    });
  });

  describe('AddInfoCheckbox', () => {
    it('should fetch success status and display modify value of addInfoText', () => {
      const {rerender} = render(
        <AddInfo
          addInfo={addInfoCheckbox}
        />,
        { wrapper: Wrapper },
      );

      let addInfoTypeCheckbox = document.querySelector("#addInfoCheckbox26630584True");

      fireEvent.click(addInfoTypeCheckbox);

      rerender(
        <AddInfo
          addInfo={addInfoCheckbox}
        />,
        { wrapper: Wrapper },
      );

      addInfoTypeCheckbox = document.querySelector("#addInfoCheckbox26630584True");

      expect(addInfoTypeCheckbox.checked).toEqual(true);
    });
    
    it('should check if the checkbox No is checked', () => {
      render(
        <AddInfo
          addInfo={addInfoCheckbox}
        />,
        { wrapper: Wrapper },
      );

      const addInfoTypeCheckboxFalse = document.querySelector("#addInfoCheckbox26630584False");
      const addInfoTypeCheckboxTrue = document.querySelector("#addInfoCheckbox26630584True");

      expect(addInfoTypeCheckboxFalse.checked).toEqual(true);
      expect(addInfoTypeCheckboxTrue.checked).toEqual(false);
    });

    it('should check if not of Yes or No checkbox are checked', () => {
      render(
        <AddInfo
          addInfo={addInfoCheckboxNull}
        />,
        { wrapper: Wrapper },
      );

      const addInfoTypeCheckboxFalse = document.querySelector("#addInfoCheckbox26630584False");
      const addInfoTypeCheckboxTrue = document.querySelector("#addInfoCheckbox26630584True");

      expect(addInfoTypeCheckboxFalse.checked).toEqual(false);
      expect(addInfoTypeCheckboxTrue.checked).toEqual(false);
    });

    it('should check if checkbox Yes is checked', () => {
      render(
        <AddInfo
          addInfo={addInfoCheckboxTrue}
        />,
        { wrapper: Wrapper },
      );

      const addInfoTypeCheckboxFalse = document.querySelector("#addInfoCheckbox26630584False");
      const addInfoTypeCheckboxTrue = document.querySelector("#addInfoCheckbox26630584True");

      expect(addInfoTypeCheckboxFalse.checked).toEqual(false);
      expect(addInfoTypeCheckboxTrue.checked).toEqual(true);
    });

    it('should display the correct add info checkbox custom label', () => {
      render(
        <AddInfo
          addInfo={addInfoCheckbox}
        />,
        { wrapper: Wrapper },
      );

      expect(getNodeText(document.querySelector('#addInfoCustomLabel26630584')))
      .toStrictEqual(addInfoCheckbox.custom_label);
    });

    it('should display checkboxes when receive an addInfosCheckbox', () => {
      render(
        <AddInfo
          addInfo={addInfoCheckbox}
        />,
        { wrapper: Wrapper },
      );

      const addInfoTypeCheckboxFalse = document.querySelector("#addInfoCheckbox26630584False");
      const addInfoTypeCheckboxTrue = document.querySelector("#addInfoCheckbox26630584True");

      expect(addInfoTypeCheckboxFalse).not.toBeNull();
      expect(addInfoTypeCheckboxTrue).not.toBeNull();
    });

    it('should display the addInfoTypeText auto value if it exists', () => {
      render(
        <AddInfo
          addInfo={{...addInfoCheckbox, auto_value: true}}
        />,
        { wrapper: Wrapper },
      );

      const addInfoTypeCheckboxFalse = document.querySelector("#addInfoCheckbox26630584False");
      const addInfoTypeCheckboxTrue = document.querySelector("#addInfoCheckbox26630584True");

      expect(addInfoTypeCheckboxFalse).not.toBeNull();
      expect(addInfoTypeCheckboxTrue).not.toBeNull();
      expect(addInfoTypeCheckboxTrue).toBeChecked();
      expect(addInfoTypeCheckboxFalse).not.toBeChecked();
    });
  });

  describe("AddInfoDate", () => {
    it('should display the correct add info date custom label', () => {
      render(
        <AddInfo
          addInfo={addInfoDate}
        />,
        { wrapper: Wrapper },
      );;
      
      expect(getNodeText(document.querySelector('#addInfoCustomLabel26630562')))
      .toStrictEqual(addInfoDate.custom_label);
    });
  });
});