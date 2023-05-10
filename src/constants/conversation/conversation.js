export const CONVERSATION_DECODE_FORMAT = 'data:image/png;base64,';
export const CONVERSATION_LOAD_ERROR = 'Error while fetching conversation';
export const EMPTY_CONVERSATION_INPUT_VALUE = '';
export const EMPTY_CONVERSATION_TIMING = '-';
export const EMPTY_TASK_TIMING = '-';
export const NEW_LINE_EVENT = 'keyup';
export const DEFAULT_INPUT_HEIGHT = '0.1vmax';
export const MAX_HEIGHT_VALUE = 19;
export const HEXADECIMAL_BASE = 10;
export const TWO_INPUT_LINES_HEIGHT_VALUE = 65;
export const BIG_SCREEN_HEIGHT = 3000;
export const INPUT_WRAPPER_HEIGHT = 500;
export const ACCEPTED_FILE_EXTENSIONS = '.jpg,.jpeg,.png';
export const HIDE = 'none';
export const CURRENT_UPLOAD = 0;
export const VALID_IMAGE_TYPE = 'image';
export const NOT_IMAGE_TYPE = -1;
export const EMPTY_MESSAGE_BODY_OBJECT = {
  picture: '',
  comment: '',
};
export const EMPTY = '';
export const DISPLAY = '';
export const IMAGE_PREVIEW_CLASSNAME = 'removeImageButton';
export const HIDE_PREVIEW_CLASSNAME = '';
export const HIDE_PREVIEW = 'hidden';
export const MAX_IMAGE_FILE_SIZE = 0.7;
export const TYPE_ERROR_MESSAGE = 'This format is not accepted (only png,jpg,jpeg files are accepted)';
export const SIZE_ERROR_MESSAGE = 'This size of the file is above the maximum authorized';
export const UNKNOWN_ERROR_MESSAGE = 'An error has occurred, please try again or contact the support team';
export const META_DATA_START_CHARACTER = 22;
export const FILE_EXTENSION_STRING_START = 0;
export const FILE_EXTENSION_STRING_END = 5;
export const CANVAS_TYPE = '2d';
export const WIDTH = 0;
export const HEIGHT = 0;
export const QUALITY = 1;

export const deleteConversationResponseAcronym = {
  200: '',
  404: 'Page not found',
  500: 'Failed to delete this conversation',
  403: "You don't have the authorization to modify this value",
  401: 'The access token provided is invalid',
  400: 'The information that you provide is not valid',
};

export const displayConversationPictureAcronym = {
  404: 'Image not found',
  500: 'Failed to get the picture',
  403: "You don't have the authorization to access to this picture",
  401: 'The access token provided is invalid',
  400: 'The information that you provide is not valid',
};
