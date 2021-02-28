export default function () {
  const CommandButton = require('@askvortsov-rich-text').components.CommandButton;

  class ChecklistButton extends CommandButton {
    onEditorUpdate() {
      let active = true;
      const path = this.state.editorView.state.selection.$anchor.path;

      let i;
      for (i = path.length - 1; i >= 0; i--) {
        if (path[i].type && path[i].type === this.state.getSchema().nodes.list_item) {
          break;
        }
      }

      const prevCheckbox = path[i] && path[i].content.content[0];

      if (!prevCheckbox || prevCheckbox.type !== this.state.getSchema().nodes.list_checkbox) active = false;

      this.$().toggleClass('active', active);
    }
  }

  return ChecklistButton;
}
