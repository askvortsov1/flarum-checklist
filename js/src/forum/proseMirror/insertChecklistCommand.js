export default function (listNodeType, listItemNodeType, checkboxNodeType) {
  const wrapInList = require('@askvortsov-rich-text').wrapInList;

  return function (state, dispatch, view) {
    let path = state.selection.$anchor.path;

    let i;
    for (i = path.length - 1; i >= 0; i--) {
      if (path[i].type && path[i].type === listItemNodeType) {
        break;
      }
    }

    if (i < 0) {
      wrapInList(listNodeType)(view.state, view.dispatch);
    }

    path = view.state.selection.$anchor.path;
    for (i = path.length - 1; i >= 0; i--) {
      if (path[i].type && path[i].type === listItemNodeType) {
        break;
      }
    }

    const prevCheckbox = path[i] && path[i].content.content[0];
    if (!prevCheckbox || prevCheckbox.type !== checkboxNodeType) {
      dispatch(view.state.tr.insert(path[i + 2], checkboxNodeType.create({ checked: false })));
    } else {
      dispatch(view.state.tr.delete(path[i + 2] - 1, path[i + 2]));
    }

    return true;
  };
}
