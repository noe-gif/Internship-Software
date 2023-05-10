/**
 * @jest-environment jsdom
*/

import { renderHook, act } from '@testing-library/react-hooks'

import '@testing-library/jest-dom';

import taskHeaderHook from 'src/hooks/task/taskHeaderHook';

describe('taskHeaderHook', () => {
  describe('isComponentSizeSmall function', () => {
    it('should return true when providing component size to small', () => {
      const { result } = renderHook(() => taskHeaderHook('small'));

      act(() => {
        result.current.isComponentSizeSmall();
      });

      expect(result.current.isComponentSizeSmall()).toBeTruthy();
    });

    it('should return false when providing component size to large.splitView', () => {
      const { result } = renderHook(() => taskHeaderHook('large.splitView'));

      act(() => {
        result.current.isComponentSizeSmall();
      });

      expect(result.current.isComponentSizeSmall()).toBeFalsy();
    });
  });
});
