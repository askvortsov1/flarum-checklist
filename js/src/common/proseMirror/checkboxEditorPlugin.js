class ListItemNodeView {
  constructor(node, view, getPos) {
    this.dom = this.contentDOM = document.createElement('li');
    this.schema = view.state.schema;
    this.recalcTaskStatus(node);
  }

  update(node) {
    this.recalcTaskStatus(node);
  }

  recalcTaskStatus(node) {
    if (node.content.content[0] && node.content.content[0].type.name === 'list_checkbox') {
      this.contentDOM.setAttribute('data-task-id', '');
      this.contentDOM.setAttribute('data-task-state', node.content.content[0].attrs.checked ? 'checked' : 'unchecked');
    } else {
      this.contentDOM.removeAttribute('data-task-id');
      this.contentDOM.removeAttribute('data-task-state');
    }
  }
}

class CheckBoxNodeView {
  constructor(node, view, getPos) {
    let checked = !!node.attrs.checked;
    const dom = document.createElement('input');
    dom.setAttribute('type', 'checkbox');
    dom.onclick = () => {
      const pos = getPos();
      checked = !checked;
      view.dispatch(view.state.tr.setNodeMarkup(pos, undefined, { checked }));
    };
    if (node.attrs.checked) dom.setAttribute('checked', '');

    this.dom = this.contentDom = dom;
  }
}

export default function checkboxEditorPlugin() {
  const Plugin = require('@askvortsov-rich-text').Plugin;
  return new Plugin({
    props: {
      nodeViews: {
        list_checkbox: function (node, view, getPos) {
          return new CheckBoxNodeView(node, view, getPos);
        },
        list_item: function (node, view, getPos) {
          return new ListItemNodeView(node, view, getPos);
        },
      },
    },
  });
}
