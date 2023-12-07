import 'uno.css';
import { createSSRApp } from 'vue';
import { createI18n } from 'vue-i18n'; // v9.x
import App from './App.vue';
import store from '@/store';
import messages from '@/locale/lang';
// import tools from '@/utils';
// import hooks from '@/hooks';
console.log('lang', uni.getLocale());
const i18nConfig = {
  locale: uni.getLocale(), // 获取已设置的语言
  //   legacy: false,
  //   globalInjection: true, // 全局注入 $t 函数
  messages
};
const i18n = createI18n(i18nConfig);
export function createApp() {
  const app = createSSRApp(App).use(store).use(i18n);
  return {
    app
  };
}
