import formatDateToDateTimeLocal from "src/utils/logic/date/formatDateToDateTimeLocal";

describe("formatDateToDateTimeLocal function", () => {
  it("Tests is return the date in local format when providing all correct data", () => {
    const date = "2021-11-22T10:25:00Z";

    let result = formatDateToDateTimeLocal(date);

    expect(result).toEqual("2021-11-22T07:25:00");
  });

  it("Tests is return null when date is null", () => {
    const date = null;

    let result = formatDateToDateTimeLocal(date);

    expect(result).toEqual(null);
  });

  it("must return the date with the seconds set to 0", () => {
    const date = "2021-11-22T10:25:35Z";

    let result = formatDateToDateTimeLocal(date);

    expect(result).toEqual("2021-11-22T07:25:00");
  });
});
