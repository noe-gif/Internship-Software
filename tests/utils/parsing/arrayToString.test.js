import stringFromArrayOfObject from 'src/utils/parsing/arrayToString';

describe('Testing stringFromArrayOfObject function', () => {
  it('test with complete array and keyToExtract', () => {
    let result = stringFromArrayOfObject([{ myKey: "A" }], "myKey");
    let resultMultiple = stringFromArrayOfObject([{ myKey: "A" }, { myKey: "B" }], "myKey");

    expect(result).toStrictEqual("A");
    expect(resultMultiple).toStrictEqual("A\nB");
  });

  it('test with complete array and not in keyToExtract', () => {
    let result = stringFromArrayOfObject([{ myKey: "A" }], "notInKey");

    expect(result).toStrictEqual("");
  });

  it('test with params undefined', () => {
    let result = stringFromArrayOfObject();

    expect(result).toStrictEqual("");
  });

  it('test with params null', () => {
    let result = stringFromArrayOfObject(null, null);

    expect(result).toStrictEqual("");
  });
});
