export default function dateTimeFormatMock(mocked_locale) {
  const DateTimeFormat = Intl.DateTimeFormat
  jest
  .spyOn(global.Intl, 'DateTimeFormat')
  .mockImplementation((locale, option) => new DateTimeFormat(mocked_locale))
}