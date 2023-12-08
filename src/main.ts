import 'uno.css';
import { createSSRApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import store from '@/store';
import messages from '@/locale/lang';
// 初始化lang storage
console.log('lang', uni.getStorageSync('lang'));
let cur_cache_lang = uni.getStorageSync('lang');
if(!cur_cache_lang) {
    cur_cache_lang = 'zh-Hans';
    uni.setStorageSync('lang', cur_cache_lang);
}
const i18nConfig = {
    locale: cur_cache_lang, // 获取已设置的语言
    allowComposition: true, // 允许组合式api
    messages
};
const i18n = createI18n(i18nConfig);
export function createApp () {
    const app = createSSRApp(App).use(store).use(i18n);
    return {
        app
    };
}
