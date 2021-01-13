import { createReadStream, PathLike } from "fs";
import { createInterface } from "readline";

const functionCallLineRegexp = /.+,([a-zA-Z]+\s.+:[0-9]+:[0-9]+)/;
const functionCallSegmentRegexp = /[a-zA-Z]+\s.+:[0-9]+:[0-9]+/;

export const findUserCode = (pathToProfileLogFile: PathLike, pathGlob: RegExp): Promise<string[]> => {
  return new Promise((resolve) => {
    const stream = createReadStream(pathToProfileLogFile);
    const readline = createInterface(stream);
    const results: string[] = [];

    readline.on("line", (line: string) => {
      if (!functionCallLineRegexp.test(line)) return;
      const fileReference = line.split(",").find((s) => functionCallSegmentRegexp.test(s));
      if (fileReference && pathGlob.test(fileReference)) results.push(line);
    });

    readline.on("close", () => {
      resolve(results);
    });
  });
};
