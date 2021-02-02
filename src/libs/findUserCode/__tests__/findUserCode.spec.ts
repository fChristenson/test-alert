import { findUserCode } from "..";
import { join } from "path";

describe("findUserCode", () => {
  it("should be defined", () => {
    expect(findUserCode).toBeDefined();
  });

  it("should return a list of log lines by a named function", async () => {
    const pathToFile = join(__dirname, "named-function.log");
    const expected = [
      "code-creation,Eval,12,78944,0x1d2dd5c9a43e,6, /Users/fredrikchristenson/Documents/test-alert/src/libs/findUserCode/__tests__/fileToTest.js:1:1,0x1d2dd5c9a370,~",
      "code-creation,Eval,12,78971,0x1d2dd5c9a51e,12, /Users/fredrikchristenson/Documents/test-alert/src/libs/findUserCode/__tests__/fileToTest.js:1:1,0x1d2dd5c9a3a8,~",
      "code-creation,LazyCompile,12,79148,0x1d2dd5c9ab66,23,foo /Users/fredrikchristenson/Documents/test-alert/src/libs/findUserCode/__tests__/fileToTest.js:1:13,0x1d2dd5c9a470,~",
    ];
    const actual = await findUserCode(pathToFile, /test-alert\/src\/libs\/findUserCode/);
    expect(actual.length).toEqual(3);
    expect(actual[0]).toEqual(expected[0]);
    expect(actual[1]).toEqual(expected[1]);
    expect(actual[2]).toEqual(expected[2]);
  });

  it("should return a list of log lines by a named function", async () => {
    const pathToFile = join(__dirname, "lambda-function.log");
    const expected = [
      "code-creation,Eval,12,77361,0x2ba0e245a446,6, /Users/fredrikchristenson/Documents/test-alert/src/libs/findUserCode/__tests__/lambdaFuncTest.js:1:1,0x2ba0e245a378,~",
      "code-creation,Eval,12,77408,0x2ba0e245a526,9, /Users/fredrikchristenson/Documents/test-alert/src/libs/findUserCode/__tests__/lambdaFuncTest.js:1:1,0x2ba0e245a3b0,~",
    ];
    const actual = await findUserCode(pathToFile, /test-alert\/src\/libs\/findUserCode/);
    expect(actual.length).toEqual(2);
    expect(actual[0]).toEqual(expected[0]);
    expect(actual[1]).toEqual(expected[1]);
  });

  it("should return a list of log lines by a class method", async () => {
    const pathToFile = join(__dirname, "class.log");
    const expected = [
      "code-creation,Eval,12,87817,0x2111c881a496,6, /Users/fredrikchristenson/Documents/test-alert/src/libs/findUserCode/__tests__/classTest.js:1:1,0x2111c881a3c8,~",
      "code-creation,Eval,12,87869,0x2111c881a5fe,60, /Users/fredrikchristenson/Documents/test-alert/src/libs/findUserCode/__tests__/classTest.js:1:1,0x2111c881a400,~",
      "code-creation,LazyCompile,12,88043,0x2111c881ac76,3,Foo /Users/fredrikchristenson/Documents/test-alert/src/libs/findUserCode/__tests__/classTest.js:1:1,0x2111c881a4c8,~",
      "code-creation,LazyCompile,12,88088,0x2111c881ad5e,23,omg /Users/fredrikchristenson/Documents/test-alert/src/libs/findUserCode/__tests__/classTest.js:2:6,0x2111c881a518,~",
    ];
    const actual = await findUserCode(pathToFile, /test-alert\/src\/libs\/findUserCode/);
    expect(actual.length).toEqual(4);
    expect(actual[0]).toEqual(expected[0]);
    expect(actual[1]).toEqual(expected[1]);
    expect(actual[2]).toEqual(expected[2]);
    expect(actual[3]).toEqual(expected[3]);
  });

  it("should return a list of log lines by a variable", async () => {
    const pathToFile = join(__dirname, "variable.log");
    const expected = [
      "code-creation,Eval,12,75517,0x1aa28e21a43e,6, /Users/fredrikchristenson/Documents/test-alert/src/libs/findUserCode/__tests__/variableTest.js:1:1,0x1aa28e21a370,~",
      "code-creation,Eval,12,75772,0x1aa28e21a4b6,15, /Users/fredrikchristenson/Documents/test-alert/src/libs/findUserCode/__tests__/variableTest.js:1:1,0x1aa28e21a3a8,~",
    ];
    const actual = await findUserCode(pathToFile, /test-alert\/src\/libs\/findUserCode/);
    expect(actual.length).toEqual(2);
    expect(actual[0]).toEqual(expected[0]);
    expect(actual[1]).toEqual(expected[1]);
  });
});
