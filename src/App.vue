<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import tools from '@/utils';
import hooks from '@/hooks';
import Services from '@/http/api';
getApp().globalData = {
  $tools: tools,
  $hooks: hooks,
  $Services: Services
};
onLaunch(() => {});
onShow(() => {});
onHide(() => {});
</script>

<style lang="scss">
/* 每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';
</style>
