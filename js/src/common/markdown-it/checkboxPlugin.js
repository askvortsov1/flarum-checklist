function isListItemToken(t) {
  return t.type === 'list_item_open';
}
function isParagraphOpenToken(t) {
  return t.type === 'paragraph_open';
}
function isInlineToken(t) {
  return t.type === 'inline';
}

const rule = (state) => {
  let edited = false;
  const tokens = state.tokens;
  const tokensLength = tokens.length;
  for (let i = tokensLength - 3; i >= 0; i--) {
    if (isListItemToken(tokens[i]) && isParagraphOpenToken(tokens[i + 1]) && isInlineToken(tokens[i + 2])) {
      const inlineToken = tokens[i + 2];
      const match = /^\[([ |x|X])\]\s?/.exec(inlineToken.content);
      if (match) {
        const checked = match[1] === 'x' || match[1] === 'X';
        inlineToken.content = inlineToken.content.slice(match[0].length);
        inlineToken.children[0].content = inlineToken.content;
        const checkboxToken = new (Object.getPrototypeOf(state).Token)('list_checkbox', 'input', 0);

        // Needed so that checklists will be tight
        // Has no effect since we don't use Markdown it's renderer.
        checkboxToken.hidden = true;
        checkboxToken.attrPush(['type', 'checkbox']);
        if (checked) {
          checkboxToken.attrPush(['checked', '']);
        }
        tokens.splice(i + 1, 0, checkboxToken);
        edited = true;
      }
    }
  }
  return edited;
};

// A markdown-it plugin for selectable list checkbox
function checkboxPlugin(md) {
  md.core.ruler.push('markdown-it-list-checkbox', rule);
}

export default checkboxPlugin;
