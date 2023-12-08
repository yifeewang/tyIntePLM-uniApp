<script lang="ts" setup>
import { ref } from 'vue';
const app: any = getApp();
const { useInit } = app.globalData.$hooks;
const url = ref('');

onLoad(() => {
    const { pageName, pagePath, pageQuery } = useInit();
    console.log(pageName, pagePath, pageQuery, 'pageName3,pagePath3, pageQuery3');
    url.value = decodeURIComponent(pageQuery.url);
});
</script>

<template>
  <web-view :src="url"></web-view>
</template>

<style lang="scss" scoped>
#demo-uview {
    width: 100vw;
    height: 100vh;
}
</style>
