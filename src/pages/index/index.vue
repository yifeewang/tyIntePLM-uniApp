<script setup lang="ts">
const app: any = getApp();
const { useTitle, useInit, usePlatformCompatibility } = app.globalData.$hooks;
const { turnPage, formatDate } = app.globalData.$tools;
const { changeTitle } = useTitle();
onLoad(() => {
    const { pageName, pagePath, pageQuery } = useInit();
    const { changeLangText } = usePlatformCompatibility();
    changeLangText('index');
    console.log(pageName, pagePath, pageQuery, 'pageName ,pagePath , pageQuery ');
});
function changePageTitle() {
    // ui18设置标题
    changeTitle('hallo');
}
function goTest() {
    turnPage('test', {
        a: 1
    });
}
</script>

<template>
  <view class="flex flex-col justify-center items-center">
    <image
      class="ml-auto mr-auto mt-100 mb-25 w-100 h-100"
      src="/static/login_logo.png"
    />
    <view class="flex justify-center">
      <text class="fs-18 title">{{
        formatDate(new Date(), 'yyyy年mm月dd日')
      }}</text>
    </view>
    <view @click="changePageTitle">{{ $t('index.title') }}</view>
    <view class="p-20 w-100% box-border" @click="goTest">
      <button type="warn">测试页</button>
    </view>
  </view>
</template>

<style scoped lang="scss">
.title {
    color: $uni-color-error;
}
</style>
