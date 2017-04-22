/// <reference path="sys.ts" />
/// <reference path="scanner.ts" />
/// <reference path="token.ts" />


namespace ajs {
  let fileName = sys.args[1];
  let source : string = sys.readFile(fileName);
  let scanner : Scanner = CreateScanner(source);
  let token;
  do {
    token = scanner.scan();
    sys.print(tokenToString(token));
} while(token != Token.EOF);

}
