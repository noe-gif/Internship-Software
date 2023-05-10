export default function CustomError(source, message) {
  const customError = new Error(`${source} : ${message}`);

  return customError;
}
