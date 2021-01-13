import { findUserCode } from "..";
import { join } from "path";

describe("findUserCode", () => {
  it("should be defined", () => {
    expect(findUserCode).toBeDefined();
  });

  it("should return a list of function calls made by users code", async () => {
    const pathToFile = join(__dirname, "profile.log");
    const expected =
      "code-creation,LazyCompile,12,79148,0x1d2dd5c9ab66,23,foo /Users/fredrikchristenson/Documents/test-alert/src/libs/findUserCode/__tests__/fileToTest.js:1:13,0x1d2dd5c9a470,~";
    const actual = await findUserCode(pathToFile, /test-alert\/src\/libs\/findUserCode/);
    expect(actual.length).toEqual(1);
    expect(actual[0]).toEqual(expected);
  });
});
