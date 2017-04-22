/// <reference path="sys.ts" />
/// <reference path="token.ts" />
/// <reference path="charactor.ts" />

namespace ajs {
  export interface Scanner {
    getStartPos() : number;
    getEndPos() : number;
    getToken() : Token;
    scan() : Token;
  }

  export function CreateScanner(source: string) : Scanner {
    let startPos : number;
    let endPos : number;
    let currentPos : number;
    let token : Token;
    let sourceLength : number;

    currentPos = 0;
    sourceLength = source.length;

    function scan() : Token {
      startPos = currentPos;
      let ch;
      let isLineTerminator : boolean = false;
      do {
        if (currentPos >= sourceLength) {
          token = Token.EOF;
          break;
        }
        ch = source.charCodeAt(currentPos);
        currentPos++;
        switch(ch) {
          case CharacterCodes.lineFeed:
            isLineTerminator = true;
            ch = CharacterCodes.space;
            break;
          case CharacterCodes.plus:
            token = Token.AddToken;
            break;
          case CharacterCodes.minus:
            token = Token.SubToken;
            break;
          case CharacterCodes.asterisk:
            token = Token.MulToken;
            break;
          case CharacterCodes.slash:
            token = Token.DivToken;
            break;
          default:
            break;
        }
      } while(ch != CharacterCodes.space);
      return token;
    }

    return {
      getStartPos : () => startPos,
      getEndPos : () => endPos,
      getToken : () => token,
      scan,
    };
  }
}
