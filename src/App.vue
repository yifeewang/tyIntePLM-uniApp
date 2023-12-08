<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import tools from '@/utils';
import hooks from '@/hooks';
import Services from '@/http/api';
onLaunch(() => {
    // 挂载全局变量
    getApp().globalData = {
        $tools: tools, // 工具方法
        $hooks: hooks, // 自定义hooks
        $Services: Services // http请求
    };
});
onShow(() => {});
onHide(() => {});
</script>

<style lang="scss">
/* 每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';
</style>
