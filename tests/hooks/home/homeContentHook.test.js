/**
 * @jest-environment jsdom
*/

import { renderHook, act } from 'tests/renderTimezoneFilter'

import '@testing-library/jest-dom';

import homeContentHook from 'src/hooks/home/homeContentHook';

describe('HOME CONTENT HOOK', () => {
  describe('Testing contentClass state', () => {
    it('should be initialized with an empty string', () => {
      const { result } = renderHook(() => homeContentHook(false, '25/12/2021'));

      expect(result.current.contentClass).toStrictEqual('');
    });
  });

  describe('Testing detailViewVisibility state', () => {
    it('should be initialized with detailsViewWrapper classname', () => {
      const { result } = renderHook(() => homeContentHook(false, '25/12/2021'));

      expect(result.current.detailViewVisibility).toStrictEqual('detailsViewWrapper');
    });
  });

  describe('Testing handleAutoScrollPosition function', () => {
    test('when isInDetailsView is false', () => {
      const { result } = renderHook(() => homeContentHook(false, '25/12/2021'));

      act(() => {
        result.current.handleAutoScrollPosition();
      });

      expect(result.current.contentClass).toStrictEqual('');
      expect(result.current.detailViewVisibility).toStrictEqual('detailsViewWrapper');
    });

    test('when isInDetailsView is true', () => {
      const { result } = renderHook(() => homeContentHook(true, '25/12/2021'));

      act(() => {
        result.current.handleAutoScrollPosition();
      });

      expect(result.current.contentClass).toStrictEqual('homeContentDetailsView');
      expect(result.current.detailViewVisibility).toStrictEqual('detailsViewVisible');
    });
  });
});
