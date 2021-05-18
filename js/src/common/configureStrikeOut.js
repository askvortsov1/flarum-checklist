import { extend } from 'flarum/extend';
import Application from 'flarum/common/Application';

export default function () {
  extend(Application.prototype, 'boot', function () {
    if (this.forum.attribute('askvortsov-checklist.cross_out_completed_items')) {
      $('.App').addClass('checklist-cross-completed');
    }
  });
}
