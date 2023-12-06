<script lang="ts" setup>
const app: any = getApp();
const { useInit } = app.globalData.$hooks;
const { turnPage } = app.globalData.$tools;
onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit();
  console.log(pageName, pagePath, pageQuery, 'pageName,pagePath, pageQuery');
});
function goUview(url) {
  turnPage('webview', { url });
}
</script>

<template>
  <view class="flex flex-col justify-around m-10">
    <view class="mt-10">
      <button
        type="primary"
        @click="goUview('https://ijry.github.io/uview-plus/h5/#/')"
      >
        查看uview组件
      </button>
    </view>
    <view class="mt-10">
      <button
        type="warn"
        @click="
          goUview(
            'https://uniapp.dcloud.net.cn/component/uniui/uni-goods-nav.html'
          )
        "
      >
        查看uniapp组件
      </button>
    </view>
    <view class="m-20">{{ $t('index.title') }}</view>
  </view>
</template>

<style lang="scss" scoped></style>
