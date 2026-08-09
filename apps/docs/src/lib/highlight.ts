/**
 * A ~60-line TSX tokenizer, in place of a syntax-highlighting dependency.
 *
 * Shiki and Prism are both larger than every other dependency in this app put
 * together, and the docs only ever highlight snippets we wrote ourselves. So
 * this trades generality for size: it is a lexer, not a parser, it will
 * mis-colour code it was never given, and that is an acceptable deal for a
 * fixed set of hand-written samples.
 *
 * It is a pure string -> array function with no DOM access, which is what
 * lets the prerender run it on the server.
 */

export type TokenKind =
  | "comment"
  | "string"
  | "keyword"
  | "tag"
  | "attr"
  | "type"
  | "number"
  | "plain";

export type Token = { kind: TokenKind; text: string };

const KEYWORDS = [
  "import",
  "export",
  "from",
  "const",
  "let",
  "var",
  "function",
  "return",
  "type",
  "interface",
  "extends",
  "as",
  "default",
  "new",
  "async",
  "await",
  "if",
  "else",
  "true",
  "false",
  "null",
  "undefined",
].join("|");

// Alternation order IS precedence: a `//` inside a string must lose to the
// string rule, so strings and comments come before everything structural.
const PATTERN = new RegExp(
  [
    String.raw`(\/\/[^\n]*|\/\*[\s\S]*?\*\/)`, // 1 comment
    String.raw`("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|` +
      "`(?:[^`\\\\]|\\\\.)*`)", // 2 string
    String.raw`(<\/?[A-Za-z][\w.]*)`, // 3 JSX tag, incl. Tooltip.Root
    String.raw`\b(${KEYWORDS})\b`, // 4 keyword
    // An identifier immediately before `=` is a JSX attribute or an
    // assignment target. `=>` and `==` are excluded so arrow params and
    // comparisons are not mistaken for attributes.
    String.raw`([A-Za-z_$][\w$]*)(?=\s*=(?![=>]))`, // 5 attribute
    String.raw`\b([A-Z][A-Za-z0-9]*)\b`, // 6 component / type name
    String.raw`\b(\d+(?:\.\d+)?)\b`, // 7 number
  ].join("|"),
  "g",
);

const KIND_BY_GROUP: TokenKind[] = [
  "comment",
  "string",
  "tag",
  "keyword",
  "attr",
  "type",
  "number",
];

export function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  PATTERN.lastIndex = 0;

  for (let m = PATTERN.exec(code); m !== null; m = PATTERN.exec(code)) {
    if (m.index > last) {
      tokens.push({ kind: "plain", text: code.slice(last, m.index) });
    }
    const group = KIND_BY_GROUP.findIndex((_, i) => m[i + 1] !== undefined);
    tokens.push({
      kind: group === -1 ? "plain" : (KIND_BY_GROUP[group] as TokenKind),
      text: m[0],
    });
    last = m.index + m[0].length;
  }

  if (last < code.length) {
    tokens.push({ kind: "plain", text: code.slice(last) });
  }
  return tokens;
}
