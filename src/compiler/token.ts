namespace ajs {
 export enum Token {
  LParenToken = 0,
  RParenToken,
  LBrackToken,
  RBrackToken,
  LBraceToken,
  RBraceToken,
  ColonToken,
  SemicolonToken,
  DotToken,
  EllipsisToken,
  ConditionalToken,
  IncToken,
  DecToken,
  ArrowToken,
  AssignToken,
  AssignBitOrToken,
  AssignBitXorToken,
  AssignBitAndToken,
  AssignShlToken,
  AssignSarToken,
  AssignShrToken,
  AssignAddToken,
  AssignSubToken,
  AssignMulToken,
  AssignDivToken,
  AssignModToken,
  AssignExpToken,
  CommaToken,
  OrToken,
  AndToken,
  BitOrToken,
  BitXorToken,
  BitAndToken,
  ShlToken,
  SarToken,
  ShrToken,
  AddToken,
  SubToken,
  MulToken,
  DivToken,
  ModToken,
  ExpToken,
  EqToken,
  NeToken,
  EqStrictToken,
  NeStrictToken,
  LtToken,
  GtToken,
  LteToken,
  GteToken,
  NotToken,
  BitNotToken,
  InstanceofKeyword,
  InKeyword,
  DeleteKeyword,
  TypeofKeyword,
  VoidKeyword,
  BreakKeyword,
  CaseKeyword,
  CatchKeyword,
  ContinueKeyword,
  DebuggerKeyword,
  DefaultKeyword,
  DoKeyword,
  ElseKeyword,
  FinallyKeyword,
  ForKeyword,
  FunctionKeyword,
  IfKeyword,
  NewKeyword,
  ReturnKeyword,
  SwitchKeyword,
  ThisKeyword,
  ThrowKeyword,
  TryKeyword,
  VarKeyword,
  WhileKeyword,
  WithKeyword,
  NullLiteralKeyword,
  TrueLiteralKeyword,
  FalseLiteralKeyword,
  NumberKeyword,
  StringKeyword,
  AsyncKeyword,
  AwaitKeyword,
  ClassKeyword,
  InterfaceKeyword,
  ConstKeyword,
  EnumKeyword,
  ExportKeyword,
  ExtendsKeyword,
  ImplmentsKeyword,
  ImportKeyword,
  StaticKeyword,
  YieldKeyword,
  SuperKeyword,
  PublicKeyword,
  PrivateKeyword,
  ProtectedKeyword,
  Identifier,
  NumericLiteral,
  EOF,
 }

 export let textToken = {
  "(": Token.LParenToken,
  ")": Token.RParenToken,
  "[": Token.LBrackToken,
  "]": Token.RBrackToken,
  "{": Token.LBraceToken,
  "}": Token.RBraceToken,
  ":": Token.ColonToken,
  ";": Token.SemicolonToken,
  ".": Token.DotToken,
  "...": Token.EllipsisToken,
  "?": Token.ConditionalToken,
  "++": Token.IncToken,
  "--": Token.DecToken,
  "=>": Token.ArrowToken,
  "=": Token.AssignToken,
  "|=": Token.AssignBitOrToken,
  "^=": Token.AssignBitXorToken,
  "&=": Token.AssignBitAndToken,
  "<<=": Token.AssignShlToken,
  ">>=": Token.AssignSarToken,
  ">>>=": Token.AssignShrToken,
  "+=": Token.AssignAddToken,
  "-=": Token.AssignSubToken,
  "*=": Token.AssignMulToken,
  "/=": Token.AssignDivToken,
  "%=": Token.AssignModToken,
  "**=": Token.AssignExpToken,
  ",": Token.CommaToken,
  "||": Token.OrToken,
  "&&": Token.AndToken,
  "|": Token.BitOrToken,
  "^": Token.BitXorToken,
  "&": Token.BitAndToken,
  "<<": Token.ShlToken,
  ">>": Token.SarToken,
  ">>>": Token.ShrToken,
  "+": Token.AddToken,
  "-": Token.SubToken,
  "*": Token.MulToken,
  "/": Token.DivToken,
  "%": Token.ModToken,
  "**": Token.ExpToken,
  "==": Token.EqToken,
  "!=": Token.NeToken,
  "===": Token.EqStrictToken,
  "!==": Token.NeStrictToken,
  "<": Token.LtToken,
  ">": Token.GtToken,
  "<=": Token.LteToken,
  ">=": Token.GteToken,
  "!": Token.NotToken,
  "~": Token.BitNotToken,
  "instanceof": Token.InstanceofKeyword,
  "in": Token.InKeyword,
  "delete": Token.DeleteKeyword,
  "typeof": Token.TypeofKeyword,
  "void": Token.VoidKeyword,
  "break": Token.BreakKeyword,
  "case": Token.CaseKeyword,
  "catch": Token.CatchKeyword,
  "continue": Token.ContinueKeyword,
  "debugger": Token.DebuggerKeyword,
  "default": Token.DefaultKeyword,
  "do": Token.DoKeyword,
  "else": Token.ElseKeyword,
  "finally": Token.FinallyKeyword,
  "for": Token.ForKeyword,
  "function": Token.FunctionKeyword,
  "if": Token.IfKeyword,
  "new": Token.NewKeyword,
  "return": Token.ReturnKeyword,
  "switch": Token.SwitchKeyword,
  "this": Token.ThisKeyword,
  "throw": Token.ThrowKeyword,
  "try": Token.TryKeyword,
  "var": Token.VarKeyword,
  "while": Token.WhileKeyword,
  "with": Token.WithKeyword,
  "null": Token.NullLiteralKeyword,
  "true": Token.TrueLiteralKeyword,
  "false": Token.FalseLiteralKeyword,
  "number": Token.NumberKeyword,
  "string": Token.StringKeyword,
  "async": Token.AsyncKeyword,
  "await": Token.AwaitKeyword,
  "class": Token.ClassKeyword,
  "interface": Token.InterfaceKeyword,
  "const": Token.ConstKeyword,
  "enum": Token.EnumKeyword,
  "export": Token.ExportKeyword,
  "extends": Token.ExtendsKeyword,
  "implments": Token.ImplmentsKeyword,
  "import": Token.ImportKeyword,
  "let": Token.LteToken,
  "static": Token.StaticKeyword,
  "yield": Token.YieldKeyword,
  "super": Token.SuperKeyword,
  "public": Token.PublicKeyword,
  "private": Token.PrivateKeyword,
  "protected": Token.ProtectedKeyword,
  "identifier": Token.Identifier,
  "numeric literal": Token.NumericLiteral,
  "eof" : Token.EOF,
 };

 function createTokenNameArray() : Array<string> {
   let array : Array<string> = new Array<string>();
   for(const key in textToken) {
     const token : Token = textToken[key];
     array[token] = key;
   }
   return array;
 }
 export let tokenNameArray : Array<string> = createTokenNameArray();

 export function tokenToString(t: Token): string {
   return tokenNameArray[t];
 }

 export function stringToToken(s: string): Token {
   return textToken[s];
 }
}
