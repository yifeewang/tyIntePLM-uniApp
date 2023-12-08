/**
 * 此hooks为跨平台兼容hooks
 */
import { getCurrentInstance } from 'vue';
import useTitle from './useTitle';
import { tabList } from '@/utils/urlMap-tool';
export default function usePlatformCompatibility() {
    const { proxy } = getCurrentInstance() as any;
    /**
     * @descriptiop 多语言处理tabbar 兼容小程序
     * @descriptiop 此方法必须在tab页调用
     */
    function changeTabText() {
        // 改变tab text
        tabList.forEach((tab, index) => {
            // tab.list里面的text路径需要和该设置的一致 方便处理，也就是说 locale里面两份文件，里面字段对应的路径需要一致
            const langPath = tab.text.replace(/%/g, '');
            console.log('changeTabText', index, proxy.$t(langPath));
            uni.setTabBarItem({
                index,
                text: proxy.$t(langPath)
            });
        });
    }
    /**
     * @param {*} pageName 页面名称
     * @descriptiop 小程序/h5兼容tabtext 和 title
     * @descriptiop 此方法必须在tab页调用
     */
    function changeLangText(pageName) {
        console.log('changeLangText', pageName);
        const { changeTitle } = useTitle();
        const pageTitle = proxy.$t(`${pageName}.title`);
        // 改变tab text
        changeTabText();
        // 改变tab页面 title
        changeTitle(pageTitle);

    }
    return {
        changeTabText,
        changeLangText
    };
}
