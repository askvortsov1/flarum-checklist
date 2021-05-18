import { extend, override } from 'flarum/extend';
import ChecklistButton from './components/ChecklistButton';
import checkboxPlugin from './markdown-it/checkboxPlugin';
import checkboxEditorPlugin from './proseMirror/checkboxEditorPlugin';
import insertChecklistCommand from './proseMirror/insertChecklistCommand';
import keymap from './proseMirror/keymap';

export default function configureRichText() {
  if (!('askvortsov-rich-text' in flarum.extensions)) return;

  const ProseMirrorMenu = require('@askvortsov-rich-text').components.ProseMirrorMenu;
  const ChecklistButtonComponent = ChecklistButton();

  extend(ProseMirrorMenu.prototype, 'items', function (items) {
    items.add(
      'check_list',
      ChecklistButtonComponent.component({
        type: 'check_list',
        icon: 'fas fa-check-square',
        tooltip: app.translator.trans('askvortsov-checklist.lib.composer.checklist_tooltip'),
        state: this.attrs.state,
        command: insertChecklistCommand(
          this.attrs.state.getSchema().nodes.bullet_list,
          this.attrs.state.getSchema().nodes.list_item,
          this.attrs.state.getSchema().nodes.list_checkbox
        ),
      }),
      10
    );
  });

  const MarkdownSerializerBuilder = require('@askvortsov-rich-text').proseMirror.markdown.MarkdownSerializerBuilder;

  extend(MarkdownSerializerBuilder.prototype, 'buildNodes', function (nodes) {
    nodes.list_checkbox = function list_checkbox(state, node) {
      state.text(node.attrs.checked ? '[x] ' : '[ ] ', false);
    };
  });

  const MarkdownParserBuilder = require('@askvortsov-rich-text').proseMirror.markdown.MarkdownParserBuilder;

  extend(MarkdownParserBuilder.prototype, 'buildTokens', function (tokens) {
    Object.assign(tokens, {
      list_checkbox: { node: 'list_checkbox', getAttrs: (tok) => ({ checked: tok.attrGet('checked') === '' }) },
    });
  });

  extend(MarkdownParserBuilder.prototype, 'buildTokenizer', function (tokenizer) {
    tokenizer.use(checkboxPlugin);
  });

  const SchemaBuilder = require('@askvortsov-rich-text').proseMirror.markdown.SchemaBuilder;

  override(SchemaBuilder.prototype, 'buildNodes', function (original) {
    const nodes = original();

    return nodes
      .update('list_item', Object.assign({}, nodes.get('list_item'), { content: 'list_checkbox? paragraph block*' }))
      .addBefore('list_item', 'list_checkbox', {
        defining: true,
        group: 'list_checkbox',
        attrs: {
          checked: { default: false },
        },
        parseDOM: [
          {
            tag: 'input[type=checkbox]',
            getAttrs: (dom) => (isElementDOMNode(dom) ? { checked: dom.hasAttribute('checked') } : {}),
          },
        ],
        toDOM(node) {
          const attrs = { type: 'checkbox' };
          if (node.attrs.checked) attrs.checked = '';
          return ['input', attrs];
        },
      });
  });

  const ProseMirrorEditorDriver = require('@askvortsov-rich-text').proseMirror.ProseMirrorEditorDriver;

  extend(ProseMirrorEditorDriver.prototype, 'buildPluginItems', function (items) {
    items.add('checkboxEditorPlugin', checkboxEditorPlugin());
  });

  const InputRule = require('@askvortsov-rich-text').InputRule;

  extend(ProseMirrorEditorDriver.prototype, 'buildInputRules', function (items) {
    items.push(
      new InputRule(/^\[([ |x]?)\] $/, function (state, match, start, end) {
        const $from = state.selection.$from;
        if (
          $from.depth >= 3 &&
          $from.node(-1).type.name === 'list_item' &&
          $from.index(-1) === 0 // The cursor is at the first child (paragraph) of this list item.
        ) {
          const attrs = { checked: match[1] === 'x' };
          const listItemPos = $from.before(-1);
          return state.tr.delete(start, end).insert(listItemPos + 1, state.schema.nodes.list_checkbox.create(attrs));
        }
        return null;
      })
    );
  });

  extend(ProseMirrorEditorDriver.prototype, 'buildPluginItems', function (items) {
    items.add('checkListKeymap', require('@askvortsov-rich-text').keymap(keymap(this.schema)), 10);
  });
}
