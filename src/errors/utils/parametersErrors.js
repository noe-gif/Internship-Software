import CustomError from 'src/errors/customError';

export const ERROR_PARAMETER_NULL_PROVIDE = (source) => new CustomError(source, 'Null provide as parameter'); // eslint-disable-line
