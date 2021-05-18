import configureRichText from '../common/configureRichText';
import configureStrikeOut from '../common/configureStrikeOut';

app.initializers.add('askvortsov/flarum-checklist', () => {
  app.extensionData.for('askvortsov-checklist').registerSetting({
    setting: 'askvortsov-checklist.cross_out_completed_items',
    label: app.translator.trans('askvortsov-checklist.admin.settings.cross_out_completed_items'),
    type: 'boolean',
  });

  configureRichText();
  configureStrikeOut();
});
