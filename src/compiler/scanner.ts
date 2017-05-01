/// <reference path="sys.ts" />
/// <reference path="token.ts" />
/// <reference path="charactor.ts" />

namespace ajs {
  export interface Scanner {
    getStartPos() : number;
    getEndPos() : number;
    getToken() : Token;
    scan() : Token;
    reset(source: string) : void;
  }

  export function createScanner(source: string) : Scanner {
    let startPos : number;
    let endPos : number;
    let currentPos : number = 0;
    let token : Token;
    let sourceLength : number = source.length;
    let tokenValue : string;

    function reset(source : string) : void {
      currentPos = 0;
      sourceLength = 0;
      startPos = 0;
      endPos = 0;
      token = null;
      tokenValue = null;
    }

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
          case CharacterCodes.openParen:
            token = Token.LParenToken;
            break;
          case CharacterCodes.closeParen:
            token = Token.RParenToken;
            break;
          case CharacterCodes.openBracket:
            token = Token.LBrackToken;
            break;
          case CharacterCodes.closeBracket:
            token = Token.RBrackToken;
            break;
          case CharacterCodes.openBrace:
            token = Token.LBraceToken;
            break;
          case CharacterCodes.closeBrace:
            token = Token.RBraceToken;
            break;
          case CharacterCodes.colon:
            token = Token.ColonToken;
            break;
          case CharacterCodes.semicolon:
            token = Token.SemicolonToken;
            break;
          case CharacterCodes.comma:
            token = Token.CommaToken;
          case CharacterCodes.dot:
            if (isDigit(source.charCodeAt(currentPos + 1))) {
              token = Token.NumericLiteral;
              tokenValue = scanNumber(true);
            } else if ((source.charCodeAt(currentPos + 1) === CharacterCodes.dot)
                && (source.charCodeAt(currentPos + 1) === CharacterCodes.dot)) {
                  currentPos += 2;
                  token = Token.EllipsisToken;
            } else  {
              token = Token.DotToken;
            }
            break;
          case CharacterCodes.question:
            token = Token.ConditionalToken;
            break;
          case CharacterCodes.plus:
            if (source.charCodeAt(currentPos + 1) === CharacterCodes.plus) {
              currentPos++;
              token = Token.IncToken;
            } else if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals) {
              currentPos++;
              token = Token.AssignAddToken;
            } else {
              token = Token.AddToken;
            }
            break;
          case CharacterCodes.minus:
            if (source.charCodeAt(currentPos + 1) === CharacterCodes.minus) {
              currentPos++;
              token = Token.DecToken;
            } else if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals) {
              currentPos++;
              token = Token.AssignSubToken;
            } else {
              token = Token.SubToken;
            }
            break;
          case CharacterCodes.asterisk:
            if (source.charCodeAt(currentPos + 1) === CharacterCodes.asterisk) {
              currentPos++;
              if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals) {
                currentPos++;
                token = Token.AssignExpToken;
              } else {
                token = Token.ExpToken;
              }
            } else if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals) {
              currentPos++;
              token = Token.AssignMulToken;
            } else {
              currentPos++;
              token = Token.MulToken;
            }
            break;
          case CharacterCodes.slash:
            if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals) {
              currentPos++;
              token = Token.AssignDivToken;
            } else {
              token = Token.DivToken;
            }
            break;
          case CharacterCodes.percent:
            if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals) {
              currentPos++;
              token = Token.AssignModToken;
            } else {
              token = Token.ModToken;
            }
            break;
          case CharacterCodes.equals:
            if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals) {
              currentPos++;
              if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals) {
                currentPos++;
                token = Token.EqStrictToken;
              } else {
                token = Token.EqToken;
              }
            } else if (source.charCodeAt(currentPos + 1) === CharacterCodes.greaterThan) {
              currentPos++;
              token = Token.ArrowToken;
            } else {
              token = Token.AssignToken;
            }
            break;
          case CharacterCodes.exclamation:
            if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals) {
              currentPos++;
              if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals) {
                token = Token.NeStrictToken;
                currentPos++;
              } else {
                token = Token.NeToken;
              }
            } else {
              token = Token.NotToken;
            }
            break;
          case CharacterCodes.tilde:
            token = Token.BitNotToken;
            break;
          case CharacterCodes.bar:
            if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals) {
              currentPos++;
              token = Token.AssignBitOrToken;
            } else if (source.charCodeAt(currentPos + 1) === CharacterCodes.bar) {
              currentPos++;
              token = Token.OrToken;
            } else {
              token = Token.BitOrToken;
            }
            break;
          case CharacterCodes.ampersand:
            if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals) {
              currentPos++;
              token = Token.AssignBitAndToken;
            } else if (source.charCodeAt(currentPos + 1) === CharacterCodes.ampersand) {
              currentPos++;
              token = Token.AndToken;
            } else {
              token = Token.BitAndToken;
            }
            break;
          case CharacterCodes.caret:
            if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals) {
              currentPos++;
              token = Token.AssignBitXorToken;
            } else {
              token = Token.BitXorToken;
            }
            break;
          case CharacterCodes.greaterThan:
            if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals) {
              currentPos++;
              token = Token.GteToken;
            } else if (source.charCodeAt(currentPos + 1) === CharacterCodes.greaterThan) {
              currentPos++;
              if (source.charCodeAt(currentPos + 1) === CharacterCodes.greaterThan) {
                currentPos++;
                if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals) {
                  currentPos++;
                  token = Token.AssignShrToken;
                } else {
                  token = Token.ShrToken;
                }
              } else if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals){
                currentPos++;
                token = Token.AssignSarToken;
              } else {
                token = Token.SarToken;
              }
            } else {
              token = Token.GtToken;
            }
            break;
          case CharacterCodes.greaterThan:
            if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals) {
              currentPos++;
              token = Token.LteToken;
            } else if (source.charCodeAt(currentPos + 1) === CharacterCodes.lessThan) {
              currentPos++;
              if (source.charCodeAt(currentPos + 1) === CharacterCodes.equals){
                currentPos++;
                token = Token.AssignShlToken;
              } else {
                token = Token.ShlToken;
              }
            } else {
              token = Token.LtToken;
            }
            break;
          case CharacterCodes._0:
          case CharacterCodes._1:
          case CharacterCodes._2:
          case CharacterCodes._3:
          case CharacterCodes._4:
          case CharacterCodes._5:
          case CharacterCodes._6:
          case CharacterCodes._7:
          case CharacterCodes._8:
          case CharacterCodes._9:

          default:
            break;
        }
      } while(ch != CharacterCodes.space);
      return token;
    }

    function scanNumber(seenDot : boolean) : string {
      const start : number = currentPos;
      while (isDigit(source.charCodeAt(currentPos))) currentPos++;
      if (seenDot) {
        return source.substring(start, currentPos);
      }
      if (source.charCodeAt(currentPos) == CharacterCodes.dot) {
        while (isDigit(source.charCodeAt(currentPos))) currentPos++;
      }
      const end : number = currentPos;
      // scan exponent
      return source.substring(start, end);
    }

    return {
      getStartPos : () => startPos,
      getEndPos : () => endPos,
      getToken : () => token,
      scan,
      reset,
    };
  }
}
