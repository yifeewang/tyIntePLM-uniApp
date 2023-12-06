<script setup lang="ts">
import { ref } from 'vue';
const app: any = getApp();
const { useTitle } = app.globalData.$hooks;
const { turnPage, formatDate } = app.globalData.$tools;

const value1 = ref(0);
const click1 = (item) => {
  console.log('click1', item);
  value1.value = item;
};
const change1 = (item) => {
  console.log('change1', item);
};
const { title, changeTitle } = useTitle();
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
    <view @click="changeTitle">{{ title }}</view>
    <view class="p-20 w-100% box-border" @click="goTest">
      <u-button type="warning" text="跳转"></u-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
.title {
  color: $uni-color-error;
}
</style>
@/utils/router-tool
