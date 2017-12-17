<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/popular">时下流行</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/songslist">歌单</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/rating">排行榜</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/singers">热门歌手</router-link>
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header';

export default {
  name: 'app',
  components: {
    'v-header': header
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "./assets/theme.less";

.tab{
  display: flex;
  width: 100%;
  height: 48px;
  line-height: 48px;
  background-color:#fff;
  .tab-item{
    flex: 1;
    text-align: center;
    border-bottom: 2px solid #fff;
    >a{
      display: block;
      text-decoration: none;
      font-size: 14px;
      color:rgba(102,102,102,1);
      &.active{
        color:@primaryColor;
        border-bottom: 2px solid rgb(240,20,20);
      }
    }
  }
}
</style>
