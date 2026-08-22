class Token {
  /**
   * @param {string} token
   */
  constructor(token) {
    this.zeroOrMore = token.length === 2;
    this.isAny = token.at(0) === '.';
    this.letter = token.at(0);
  }

  /**
   *
   * @param {string|null} input
   */
  matches(input) {
    if (typeof input !== 'string') return false;

    // match len 0?
    if (input.length === 0)
      return this.zeroOrMore;

    if (input.length > 1) {
      if (!this.zeroOrMore)
        return false;
      if (this.isAny)
        return true;

      for (const l of input) {
        if (this.letter !== l) return false;
      }
      return true;
    } else {
      if (this.isAny)
        return true;
      return (this.letter === input);
    }
  }

  toString() {
    return this.letter + this.zeroOrMore ? '*' : '';
  }
}

function parseTokens(p) {
  const patternTokens = [];
  let prevToken = null;
  let actLetter = null;
  for (let i = 0; i < p.length; i++) {
    const c = p[i];
    const isAny = (c === '*')

    if (isAny) actLetter += c;

    if (typeof actLetter === 'string') {
      let token = new Token(actLetter);
      // check on subsequent equal zeroOrMoreTokens - could be combined to one - so no push
      if (prevToken === null || !(prevToken.letter === token.letter && prevToken.zeroOrMore === token.zeroOrMore && token.zeroOrMore === true))
        patternTokens.push(token);
      prevToken = token;
    }

    if (isAny)
      actLetter = null;
    else
      actLetter = c;
  }

  if (typeof actLetter === 'string') {
    let token = new Token(actLetter);
    if (prevToken === null || !(prevToken.letter === token.letter && prevToken.zeroOrMore === token.zeroOrMore && token.zeroOrMore === true))
      patternTokens.push(token);
  }

  return patternTokens;
}

/**
 *
 * @param {string} input
 * @param patternTokens
 * @returns {boolean}
 */
function matches(input, patternTokens) {
  // console.log(input, patternTokens);
  if (patternTokens.length === 0)
    return false;
  if (patternTokens.length === 1)
    return patternTokens[0].matches(input);

  // recursive tests
  const firstToken = patternTokens[0];
  const nextTokens = patternTokens.slice(1);

  // check zero
  if (firstToken.matches('') && matches(input, nextTokens))
    return true;

  for (let i = 0; i <= input.length; i++) {
    let actInput = input.substring(0, i);
    let restInput = input.substring(i);
    if (firstToken.matches(actInput) && matches(restInput, nextTokens))
      return true;
  }

  return false;
}

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function (s, p) {
  const patternTokens = parseTokens(p);

  for (const patternToken of patternTokens) {
    // console.log(patternToken);
    // precheck check simple contains
    if (!patternToken.zeroOrMore && !patternToken.isAny) {
      if (!s.includes(patternToken.letter)) {
        // console.log("missing simple contains");
        return false;
      }
    }
  }

  // recursive tests for sub list of input and pattern tokens
  return matches(s, patternTokens);
};

// ==============================================================
//   Tests
// ==============================================================

const assertTrue = (val) => {
  if (!val) throw new Error(`Expected true - got: ${val}`);
};
const assertFalse = (val) => {
  if (val) throw new Error(`Expected false - got: ${val}`);
};

{
  // console.log("Token matching tests:")
  let token = new Token('a');
  assertTrue(token.matches('a'));
  assertFalse(token.matches('b'));
  assertFalse(token.matches('aa'));
  assertFalse(token.matches('ab'));
  assertFalse(token.matches(''));
  assertFalse(token.matches(null));

  token = new Token('a*');
  assertTrue(token.matches('a'));
  assertFalse(token.matches('b'));
  assertTrue(token.matches('aa'));
  assertTrue(token.matches('aaaaa'));
  assertFalse(token.matches('ab'));
  assertTrue(token.matches(''));
  assertFalse(token.matches(null));

  token = new Token('.');
  assertTrue(token.matches('a'));
  assertTrue(token.matches('b'));
  assertFalse(token.matches('aa'));
  assertFalse(token.matches('aaaaa'));
  assertFalse(token.matches('ab'));
  assertFalse(token.matches(''));
  assertFalse(token.matches(null));

  token = new Token('.*');
  assertTrue(token.matches('a'));
  assertTrue(token.matches('b'));
  assertTrue(token.matches('aa'));
  assertTrue(token.matches('aaaaa'));
  assertTrue(token.matches('ab'));
  assertTrue(token.matches(''));
  assertFalse(token.matches(null));
}

assertTrue(isMatch('a', 'a'));
assertTrue(isMatch('a', 'a*'));
assertTrue(isMatch('aa', 'aa'));
assertTrue(isMatch('aa', 'a*'));
assertTrue(isMatch('a', '.*'));
assertTrue(isMatch('aa', '.*'));
assertTrue(isMatch('a', '.'));
assertFalse(isMatch('a', 'b'));
assertFalse(isMatch('a', 'b*'));

assertTrue(isMatch('abc', 'abc'));
assertTrue(isMatch('abc', 'ab*c'));
assertTrue(isMatch('abbc', 'ab*c'));
assertTrue(isMatch('ac', 'ab*c'));
assertTrue(isMatch('abbc', 'a.*c'));
assertTrue(isMatch('ac', 'a.*c'));
assertTrue(isMatch('a', 'ab*'));

assertFalse(isMatch('aaaaaaaaaaaaaaaaaaab', 'a*a*a*a*a*a*a*a*a*a*'));
assertFalse(isMatch('aaaaaaaaaaaaaaaaaaab', 'a*a*a*a*a*a*a*a*a*a*c'));
assertTrue(isMatch('aab', 'c*a*b'));

