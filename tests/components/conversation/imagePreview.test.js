/**
 * @jest-environment jsdom
*/

import React from "react";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ImagePreview from 'src/components/conversation/imagePreview';

describe('Image preview', () => {
  describe('Tests when image preview is correctly displayed ', () => {
    it('should display the preview image when an image has been set', () => {
      render(
        <ImagePreview
          currentImagePreviewAlt={'testAlt'}
          currentImagePreviewSrc={'testSrc'}
          displayClosePreview={true}
          imagePreviewDynamicPosition={null}
          removeCurrentImage={() => {}}
          setDisplayClosePreview={() => {}}
        />
      );
      const testImage = document.querySelector('img');
      expect(testImage.src).toContain('testSrc');
    });

    it('should not display the preview image when no image has been set', () => {
      render(
        <ImagePreview
          currentImagePreviewAlt={''}
          currentImagePreviewSrc={''}
          displayClosePreview={true}
          imagePreviewDynamicPosition={null}
          removeCurrentImage={() => {}}
          setDisplayClosePreview={() => {}}
        />
      );
      const testImage = document.querySelector('img');
      expect(testImage).toBeNull();
    });

    it('should not display the preview image when the image has been set to null', () => {
      render(
        <ImagePreview
          currentImagePreviewAlt={''}
          currentImagePreviewSrc={null}
          displayClosePreview={true}
          imagePreviewDynamicPosition={null}
          removeCurrentImage={() => {}}
          setDisplayClosePreview={() => {}}
        />
      );
      const testImage = document.querySelector('img');
      expect(testImage).toBeNull();
    });
  });
});