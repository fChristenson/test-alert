import { createReadStream, PathLike } from "fs";
import { createInterface } from "readline";

const filePathLineRegexp = /.+,.*\s.+:[0-9]+:[0-9]+,/;

export const findUserCode = (pathToProfileLogFile: PathLike, pathGlob: RegExp): Promise<string[]> => {
  return new Promise((resolve) => {
    const stream = createReadStream(pathToProfileLogFile);
    const readline = createInterface(stream);
    const results: string[] = [];

    readline.on("line", (line: string) => {
      if (filePathLineRegexp.test(line) && pathGlob.test(line)) results.push(line);
    });

    readline.on("close", () => {
      resolve(results);
    });
  });
};
