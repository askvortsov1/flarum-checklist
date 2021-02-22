function splitListItemCheckbox(list_item_node, checkbox_node) {
  const liftListItem = require('@askvortsov-rich-text').liftListItem;
  const splitListItem = require('@askvortsov-rich-text').splitListItem;
  const Selection = require('@askvortsov-rich-text').Selection;

  return function (state, dispatch, view) {
    const path = state.selection.$anchor.path;

    let i;
    for (i = path.length - 1; i >= 0; i--) {
      if (path[i].type && path[i].type === list_item_node) {
        break;
      }
    }

    const prevCheckbox = path[i].content.content[0];

    if (!prevCheckbox || prevCheckbox.type !== checkbox_node) return false;

    const prevParagraph = path[i].content.content[1];

    if (prevParagraph && !prevParagraph.content.content.length) {
      dispatch(view.state.tr.delete(path[i + 2] - 1, view.state.selection.to));

      const newPos = view.state.doc.resolve(view.state.selection.from - 1);
      dispatch(view.state.tr.setSelection(Selection.near(view.state.doc.resolve(state.selection.from - 1))));
      return liftListItem(list_item_node)(state, dispatch);
    }

    if (!splitListItem(list_item_node)(state, dispatch)) return false;

    const listItemPos = view.state.selection.$from.before(-1);
    dispatch(view.state.tr.insert(listItemPos + 1, checkbox_node.create({ checked: false })));

    return true;
  };
}

export default function keymap(schema) {
  return {
    Enter: splitListItemCheckbox(schema.nodes.list_item, schema.nodes.list_checkbox),
  };
}
