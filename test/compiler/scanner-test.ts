/// <reference path="../../out/asc.d.ts" />
/// <reference path="../test-unit.ts" />

namespace test {
  let source = "";
  let scanner : ajs.Scanner = ajs.createScanner(source);

  function testToken() : void {
    for(const key in ajs.textToken) {
      const expectedToken : ajs.Token = ajs.textToken[key];
      scanner.reset(key);
      let foundToken = scanner.scan();
      console.log(key);
      expected(expectedToken, foundToken, "wrong token");
    }
  }

  testToken();
}
