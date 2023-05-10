/**
 * @jest-environment jsdom
*/

import { renderHook, act } from "@testing-library/react-hooks";

import '@testing-library/jest-dom';

import addInfoSaverHook from 'src/hooks/task/addInfos/addInfoSaverHook';

const addInfoId = 12345;
const addInfoValue = 'testing';

const updateAddInfo = () => {};
const spyUpdateAddInfo = jest.fn(updateAddInfo);

describe('addInfoSaverHook', () => {
  describe('updateTaskAddInfo', () => {
    it('should call updateAddInfo with good parameter when calling hook', () => {
      const { result } = renderHook(() => addInfoSaverHook(
        addInfoId,
        addInfoValue,
        spyUpdateAddInfo,
      ));

      act(() => {
        result.current.updateTaskAddInfo();
      });

      expect(spyUpdateAddInfo).toHaveBeenCalledWith({ data: { value: 'testing' }, addInfoId: 12345 });
      spyUpdateAddInfo.mockClear();
    });
  });
});
