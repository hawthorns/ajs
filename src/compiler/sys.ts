namespace ajs {

  export interface System {
    args : string[];
    readFile(filePath: string) : string;
    writeFile(filePath: string, contents: string): void;
    fileExists(filePath: string): boolean;
    print(value : any) : void;
  }

  declare const require: any;
  declare const process: any;

  export let sys : System = (function() : System {
    const fs_ = require("fs");

    function fileExists(filePath: string) : boolean {
      try {
        const stat = fs_.statSync(filePath);
        return stat.isFile();
      } catch (e) {
        return false;
      }
    }

    function readFile(filePath: string) : string {
      if (!fileExists(filePath)) {
        return undefined;
      }
      return fs_.readFileSync(filePath, {flag: 'r', encoding: 'utf8'});
    }

    function writeFile(filePath: string, contents: string): void {
      let fd: number;
      try {
      fd = fs_.openSync(filePath, "w");
      fs_.writeSync(fd, contents, /*position*/ undefined, "utf8");
      } finally {
        if (fd != undefined) fs_.closeSync(fd);
      }
    }

    const nodeSystem : System = {
      args : process.argv.slice(1),
      readFile,
      writeFile,
      fileExists,
      print(value : any) : void {
        console.log(value);
      }
    };
    return nodeSystem;
  })();
}
