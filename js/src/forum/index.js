import { extend } from 'flarum/extend';
import CommentPost from 'flarum/components/CommentPost';
import configureRichText from '../common/configureRichText';
import configureStrikeOut from '../common/configureStrikeOut';

app.initializers.add('askvortsov/flarum-checklist', () => {
  function toggleCheckbox(post, remainingCheckboxes, checked) {
    let match;
    const checkListRegex = /([\-\*]|[0-9]+\.) (\[[ xX]\])/g;
    const currContent = post.content();

    while ((match = checkListRegex.exec(currContent))) {
      if (remainingCheckboxes === 0) {
        const valIndex = match.index + match[0].length - 2;
        let content = currContent.substring(0, valIndex) + (checked ? 'x' : ' ') + currContent.substring(valIndex + 1);

        post.save({ content }).then(() => {
          m.redraw();
        });
        return;
      }
      remainingCheckboxes--;
    }
  }

  function processChecklists() {
    const post = this.attrs.post;
    if (!post.canEdit()) return;

    this.$('input[type="checkbox"]').each(function (i, element) {
      element.disabled = false;

      element.onchange = () => {
        toggleCheckbox(post, i, element.checked);
      };
    });
  }

  extend(CommentPost.prototype, 'oncreate', processChecklists);
  extend(CommentPost.prototype, 'onupdate', processChecklists);

  configureRichText();
  configureStrikeOut();
});
