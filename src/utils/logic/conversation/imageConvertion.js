import {
  CANVAS_TYPE,
  WIDTH,
  HEIGHT,
  QUALITY,
} from 'src/constants/conversation/conversation';

const adjustPictureDimensions = (
  pictureCanvas,
  convertedPicture,
  canvasWithoutTransparentBackground,
) => {
  pictureCanvas.width = convertedPicture.width; // eslint-disable-line
  pictureCanvas.height = convertedPicture.height; // eslint-disable-line
  canvasWithoutTransparentBackground.drawImage(convertedPicture, WIDTH, HEIGHT);

  return (pictureCanvas);
};

export const removeAlphaFromPicture = (file) => {
  const convertedPictureSrc = URL.createObjectURL(file);
  const pictureCanvas = document.createElement('canvas');
  const canvasWithoutTransparentBackground = pictureCanvas.getContext(CANVAS_TYPE);
  const convertedPicture = new Image();

  convertedPicture.src = convertedPictureSrc;
  return {
    canvasWithoutTransparentBackground,
    convertedPicture,
    pictureCanvas,
  };
};

export const convertImageToBase64 = async (imageWithoutAlpha) => (
  new Promise((resolve, reject) => {
    const {
      canvasWithoutTransparentBackground,
      convertedPicture,
      pictureCanvas,
    } = imageWithoutAlpha;

    convertedPicture.onload = () => {
      const convertedImage = adjustPictureDimensions(
        pictureCanvas,
        convertedPicture,
        canvasWithoutTransparentBackground,
      ).toDataURL('image/jpeg', QUALITY);

      resolve(convertedImage);
    };
    convertedPicture.onerror = (error) => {
      reject(error);
    };
  })
);
