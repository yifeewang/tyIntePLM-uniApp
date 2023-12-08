/**
 * 此hooks为 设置/获取 页面标题
 */
import { ref } from 'vue';
import useInit from './useInit';
export default function useTitle() {
    const { pageTitle } = useInit();
    const refTitle = ref(pageTitle);
    /**
     * @param {*} title 页面标题
     * @description  设置 页面标题
     */
    function changeTitle(title) {
        console.log('changeTitle', title);
        refTitle.value = title;
        // 改变页面标题
        uni.setNavigationBarTitle({
            title
        });
    }
    return {
        pageTitle: refTitle,
        changeTitle
    };
}
