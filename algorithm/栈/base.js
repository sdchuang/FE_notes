
/**
 * 有效括号
 */
function isValid(s) {
  const stack = [];
  const map = {
    '(': ')',
    '[': ']',
    '{': '}',
  };
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (map[c]) {
      stack.push(c);
    } else {
      if (stack.length === 0 || map[stack.pop()] !== c) {
        return false;
      }
    }
  }
  return stack.length === 0;
}