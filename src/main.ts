import 'uno.css';
import { createSSRApp } from 'vue';
import { createI18n } from 'vue-i18n'; // v9.x
import App from './App.vue';
import store from '@/store';
import messages from '@/config/lang';
// import tools from '@/utils';
// import hooks from '@/hooks';

const i18nConfig = {
  locale: uni.getLocale(), // 获取已设置的语言
  messages
};
const i18n = createI18n(i18nConfig);
export function createApp() {
  const app = createSSRApp(App).use(store).use(i18n);
  return {
    app
  };
}
