<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'app'
};
</script>

<style lang="less" rel="stylesheet/less">
@import "./assets/theme.less";

</style>
