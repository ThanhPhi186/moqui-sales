import I18n from 'i18n-js';

import vi from './locales/vi';
I18n.fallbacks = true;
I18n.translations = {
  vi,
};
I18n.locale = 'vi';
export const trans = messages => I18n.t(messages);
export default I18n;
